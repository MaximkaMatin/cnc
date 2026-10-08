import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const leadSchema = z.object({
  name: z.string().min(2, "Укажите имя").max(120),
  phone: z.string().min(6, "Укажите телефон").max(30),
  machine: z.string().max(120).nullish(),
  comment: z.string().max(2000).nullish(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    // types.ts regenerates with the new table later; cast keeps this compiling
    const leads = supabase.from("leads" as never) as unknown as {
      insert: (
        values: Record<string, unknown>,
      ) => PromiseLike<{ error: { message: string } | null }>;
    };
    const { error } = await leads.insert({
      name: data.name,
      phone: data.phone,
      machine: data.machine ?? null,
      comment: data.comment ?? null,
    });
    if (error) {
      console.error("Lead insert failed:", error.message);
      throw new Error("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
    return { ok: true as const };
  });

const DRAWING_EXTENSIONS = ["dxf", "dwg", "pdf", "step", "stp"];
const MAX_DRAWING_SIZE = 50 * 1024 * 1024;

export const submitLeadWithFile = createServerFn({ method: "POST" })
  .inputValidator((formData: FormData) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Ожидались данные формы");
    }
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const machine = String(formData.get("machine") ?? "").trim();
    const comment = String(formData.get("comment") ?? "").trim();
    const rawFile = formData.get("file");
    const file = rawFile instanceof File && rawFile.size > 0 ? rawFile : null;
    if (name.length < 2 || name.length > 120) throw new Error("Укажите имя");
    if (phone.replace(/\D/g, "").length < 6 || phone.length > 30)
      throw new Error("Укажите телефон");
    let ext = "";
    if (file) {
      if (file.size > MAX_DRAWING_SIZE)
        throw new Error("Файл больше 50 МБ — отправьте его в WhatsApp");
      ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!DRAWING_EXTENSIONS.includes(ext))
        throw new Error("Поддерживаются форматы: DXF, DWG, PDF, STEP");
    }
    return { name, phone, machine, comment, file, ext };
  })
  .handler(async ({ data }) => {
    let drawingNote: string | null = null;
    if (data.file) {
      const storage = supabase.storage.from("drawings");
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${data.ext}`;
      const { error: uploadError } = await storage.upload(path, data.file, {
        contentType: data.file.type || "application/octet-stream",
      });
      if (uploadError) {
        console.error("Drawing upload failed:", uploadError.message);
        throw new Error("Не удалось загрузить файл. Попробуйте ещё раз.");
      }
      drawingNote = `Файл чертежа: drawings/${path} (${data.file.name})`;
    }
    const leads = supabase.from("leads" as never) as unknown as {
      insert: (
        values: Record<string, unknown>,
      ) => PromiseLike<{ error: { message: string } | null }>;
    };
    const { error } = await leads.insert({
      name: data.name,
      phone: data.phone,
      machine: data.machine || null,
      comment: [data.comment || null, drawingNote].filter(Boolean).join("\n") || null,
    });
    if (error) {
      console.error("Lead insert failed:", error.message);
      throw new Error("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
    return { ok: true as const };
  });
