import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { MACHINE_CATEGORIES, MACHINES, type MachineCategory } from "@/data/machines";
import { MachineCard } from "@/components/MachineCard";
import { SitePage } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Каталог станков — CNC GROUP" },
      {
        name: "description",
        content:
          "Каталог волоконных лазерных станков CNC GROUP: резка металла, лазерная сварка и коллаборативные роботы. Алматы, Казахстан.",
      },
      { property: "og:title", content: "Каталог станков — CNC GROUP" },
      {
        property: "og:description",
        content:
          "Волоконные лазеры, сварочные комплексы и коботы. Подбор под задачу и заявка онлайн.",
      },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const [category, setCategory] = useState<"all" | MachineCategory>("all");
  const machines = useMemo(
    () => (category === "all" ? MACHINES : MACHINES.filter((m) => m.category === category)),
    [category],
  );

  return (
    <SitePage>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <p className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Каталог</span>
          </p>
          <h1 className="font-display mt-4 text-3xl font-semibold text-foreground sm:text-5xl">
            Каталог оборудования
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Сейчас в каталоге три модели. Новые станки и комплектации будем
            добавлять сюда по мере появления.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="flex flex-wrap gap-2">
          {MACHINE_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                category === item.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {machines.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {machines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <p className="font-medium text-foreground">В этой категории пока нет моделей</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Добавим оборудование сюда, как только появятся фото и характеристики.
            </p>
          </div>
        )}

        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl font-semibold text-foreground">
              Не нашли нужную комплектацию?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Подберём мощность, рабочее поле и опции под ваш металл.
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link to="/" hash="request">
              Оставить заявку <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SitePage>
  );
}
