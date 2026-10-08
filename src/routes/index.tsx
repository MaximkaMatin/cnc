import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import heroBg from "@/assets/hero-bg.jpg";
import { MACHINES } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";
import { SitePage } from "@/components/SiteChrome";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLeadWithFile } from "@/lib/leads.functions";
import { PHONE_DISPLAY, WHATSAPP_LINK, scrollToId } from "@/lib/site";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  FileUp,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from "lucide-react";

type IndexSearch = {
  machine?: string;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): IndexSearch => ({
    machine: typeof search.machine === "string" ? search.machine : undefined,
  }),
  head: () => ({
    meta: [
      { title: "CNC GROUP — волоконные лазерные станки в Алматы" },
      {
        name: "description",
        content:
          "Волоконные лазерные станки для резки металла CNC GROUP: каталог, характеристики, калькулятор окупаемости. Доставка и сервис по Казахстану.",
      },
      { property: "og:title", content: "CNC GROUP — волоконные лазерные станки" },
      {
        property: "og:description",
        content:
          "Промышленные волоконные лазерные станки для резки металла. Каталог, характеристики, расчёт окупаемости, заявка онлайн.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const DAYS_PER_MONTH = 22;

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <img
        src={heroBg}
        alt="Лазерная резка металла"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:py-28">
        <span className="rounded-full border border-border bg-card px-4 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Промышленное оборудование
        </span>
        <h1 className="font-display max-w-2xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Волоконные лазерные станки для резки металла
        </h1>
        <p className="max-w-xl text-base font-medium text-foreground/90 sm:text-lg">
          CNC GROUP поставляет, запускает и обслуживает волоконные лазерные
          комплексы по всему Казахстану. Подберём станок под ваш металлопрокат
          и посчитаем окупаемость под ваши объёмы.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="gap-2" asChild>
            <Link to="/catalog">
              Смотреть каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollToId("calculator")} className="gap-2">
            <Calculator className="h-4 w-4" /> Рассчитать окупаемость
          </Button>
        </div>
        <dl className="mt-4 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-border pt-6">
          {[
            ["1–12 кВт", "мощность резака"],
            ["до 40 мм", "толщина реза стали"],
            ["24 мес", "гарантия на станок"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                {value}
              </dt>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CatalogPreview() {
  return (
    <section id="catalog" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Каталог станков
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Три базовые комплектации. Мощность резака и опции подбираются под
            ваши задачи — итоговую цену согласуем в заявке.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/catalog">Открыть каталог</Link>
        </Button>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {MACHINES.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </section>
  );
}

const ADVANTAGES = [
  {
    icon: Truck,
    title: "Доставка и пусконаладка",
    text: "Привозим и запускаем станок в любом городе Казахстана, обучаем операторов.",
  },
  {
    icon: Wrench,
    title: "Сервис и запчасти",
    text: "Своя сервисная служба в Алматы, склад расходников: сопла, керамика, линзы.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия 24 месяца",
    text: "Гарантия на источник излучения и механику, выезд инженера в течение 48 часов.",
  },
  {
    icon: Users,
    title: "Подбор под задачу",
    text: "Проведём тестовый рез вашего металла и посчитаем себестоимость детали.",
  },
];

function Advantages() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-4">
        {ADVANTAGES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PaybackCalculator() {
  const [machineId, setMachineId] = useState(MACHINES[1]!.id);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [incomePerHour, setIncomePerHour] = useState(9000);

  const machine = MACHINES.find((m) => m.id === machineId) ?? MACHINES[0]!;
  const monthlyIncome = Math.round(hoursPerDay * DAYS_PER_MONTH * incomePerHour);
  const paybackMonths = Math.ceil((machine.price * 1_000_000) / Math.max(monthlyIncome, 1));
  const paybackText =
    paybackMonths < 12 ? `${paybackMonths} мес.` : `${(paybackMonths / 12).toFixed(1)} г.`;

  return (
    <section id="calculator" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        Калькулятор окупаемости
      </h2>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Прикиньте, за сколько станок отобьётся при ваших загрузке и ставке за
        час работы. Расчёт предварительный — точный сделаем по вашему металлу.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-3">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="calc-machine">Станок</Label>
              <select
                id="calc-machine"
                value={machineId}
                onChange={(e) => setMachineId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {MACHINES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.priceFrom !== false ? "от " : ""}
                    {m.price} млн ₸
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="calc-hours">Часов резки в день</Label>
              <Input
                id="calc-hours"
                type="number"
                min={1}
                max={24}
                value={hoursPerDay}
                onChange={(e) =>
                  setHoursPerDay(Math.min(24, Math.max(1, Number(e.target.value) || 1)))
                }
              />
              <p className="text-xs text-muted-foreground">Рабочих дней в месяце: {DAYS_PER_MONTH}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="calc-income">Доход с часа работы, ₸</Label>
              <Input
                id="calc-income"
                type="number"
                min={1000}
                step={500}
                value={incomePerHour}
                onChange={(e) =>
                  setIncomePerHour(Math.max(0, Number(e.target.value) || 0))
                }
              />
              <p className="text-xs text-muted-foreground">
                Чистый доход после расходных материалов, электричества и зарплаты оператора.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 rounded-2xl border border-border bg-primary p-6 text-primary-foreground shadow-sm lg:col-span-2">
          <div>
            <p className="flex items-center gap-2 text-sm opacity-80">
              <Clock className="h-4 w-4" /> Срок окупаемости
            </p>
            <p className="font-display mt-2 text-4xl font-semibold">{paybackText}</p>
            <p className="mt-1 text-sm opacity-80">при загрузке {hoursPerDay} ч/день</p>
          </div>
          <div className="border-t border-primary-foreground/20 pt-4">
            <p className="text-sm opacity-80">Доход в месяц</p>
            <p className="font-display mt-1 text-3xl font-semibold">
              {monthlyIncome.toLocaleString("ru-RU")} ₸
            </p>
          </div>
          <Button
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            onClick={() => scrollToId("request")}
          >
            Получить точный расчёт
          </Button>
        </div>
      </div>
    </section>
  );
}

function RequestForm({
  machineId,
  onMachineChange,
}: {
  machineId: string;
  onMachineChange: (id: string) => void;
}) {
  const sendLead = useServerFn(submitLeadWithFile);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: (formData: FormData) => sendLead({ data: formData }),
    onSuccess: () => setError(null),
    onError: (e: Error) => setError(e.message),
  });

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-whatsapp" />
        <h3 className="font-display text-2xl font-semibold text-foreground">Заявка отправлена!</h3>
        <p className="max-w-sm text-muted-foreground">
          Менеджер CNC GROUP свяжется с вами в рабочее время. Если срочно —
          напишите нам в WhatsApp.
        </p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
          <Button className="mt-2 gap-2 bg-whatsapp text-white hover:bg-whatsapp/90">
            <WhatsAppIcon className="h-4 w-4" /> Написать в WhatsApp
          </Button>
        </a>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const digits = phone.replace(/\D/g, "");
        if (name.trim().length < 2 || digits.length < 6) {
          setError("Укажите имя и корректный номер телефона");
          return;
        }
        const machineName = MACHINES.find((m) => m.id === machineId)?.name ?? "";
        const formData = new FormData();
        formData.set("name", name.trim());
        formData.set("phone", phone.trim());
        formData.set("machine", machineName);
        formData.set("comment", comment.trim());
        if (file) formData.set("file", file);
        mutation.mutate(formData);
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="lead-name">Ваше имя</Label>
        <Input
          id="lead-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например, Аслан"
          required
          minLength={2}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lead-phone">Телефон</Label>
        <Input
          id="lead-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 (___) ___-__-__"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lead-machine">Интересующая модель</Label>
        <select
          id="lead-machine"
          value={machineId}
          onChange={(e) => onMachineChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {MACHINES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
          <option value="consult">Нужна консультация — не определился</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lead-comment">Комментарий</Label>
        <Textarea
          id="lead-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Толщина и тип металла, планируемые объёмы работ…"
          rows={3}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lead-file">
          Чертёж для тестового реза{" "}
          <span className="font-normal text-muted-foreground">(необязательно)</span>
        </Label>
        <input
          ref={fileInputRef}
          id="lead-file"
          type="file"
          accept=".dxf,.dwg,.pdf,.step,.stp"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-md border border-dashed border-input bg-background px-4 py-5 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground"
        >
          <FileUp className="h-5 w-5" />
          {file ? file.name : "Прикрепить файл — DXF, DWG, PDF, STEP (до 50 МБ)"}
        </button>
        <p className="text-xs text-muted-foreground">
          Пришлите чертёж — бесплатно вырежем деталь и покажем качество реза на
          вашем металле.
        </p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" size="lg" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? "Отправляем…" : "Отправить заявку"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
      </p>
    </form>
  );
}

function RequestSection({
  machineId,
  onMachineChange,
}: {
  machineId: string;
  onMachineChange: (id: string) => void;
}) {
  return (
    <section id="request" className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Оставьте заявку
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Расскажите, что планируете резать, — подберём станок, посчитаем
            окупаемость и согласуем цену с доставкой в ваш город.
          </p>
          <ul className="mt-8 space-y-4">
            {["Перезвоним в течение рабочего дня", "Тестовый рез на вашем металле"].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp" />
                <span className="text-sm text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Или свяжитесь с нами напрямую</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a href={`tel:${PHONE_DISPLAY.replace(/[^+\d]/g, "")}`}>
                <Button variant="outline">{PHONE_DISPLAY}</Button>
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                <Button className="gap-2 bg-whatsapp text-white hover:bg-whatsapp/90">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <RequestForm machineId={machineId} onMachineChange={onMachineChange} />
        </div>
      </div>
    </section>
  );
}

function Index() {
  const { machine } = Route.useSearch();
  const initial =
    machine && MACHINES.some((m) => m.id === machine) ? machine : "consult";
  const [requestedMachine, setRequestedMachine] = useState(initial);

  useEffect(() => {
    if (machine && MACHINES.some((m) => m.id === machine)) {
      setRequestedMachine(machine);
      requestAnimationFrame(() => scrollToId("request"));
    }
  }, [machine]);

  return (
    <SitePage>
      <Hero />
      <CatalogPreview />
      <Advantages />
      <PaybackCalculator />
      <RequestSection machineId={requestedMachine} onMachineChange={setRequestedMachine} />
    </SitePage>
  );
}
