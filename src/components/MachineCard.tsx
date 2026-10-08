import { Link } from "@tanstack/react-router";
import { Image as ImageIcon, Ruler, Zap } from "lucide-react";
import type { Machine } from "@/data/machines";
import { MachineGallery } from "@/components/MachineGallery";
import { Button } from "@/components/ui/button";

export function MachineCard({ machine }: { machine: Machine }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {machine.gallery ? (
        <MachineGallery images={machine.gallery} alt={machine.name} />
      ) : (
        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 bg-secondary text-muted-foreground">
          <ImageIcon className="h-8 w-8" />
          <span className="text-sm">Фото появится позже</span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">{machine.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{machine.tagline}</p>
        </div>
        <ul className="flex-1 space-y-2 text-sm">
          {machine.specs.map(([label, value]) => (
            <li key={label} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                {label.toLowerCase().includes("мощность") ? (
                  <Zap className="h-3.5 w-3.5" />
                ) : label.toLowerCase().includes("поле") ? (
                  <Ruler className="h-3.5 w-3.5" />
                ) : (
                  <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground" />
                )}
                {label}
              </span>
              <span className="text-right font-medium text-foreground">{value}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">
            {machine.priceFrom !== false && "от "}
            <span className="font-display text-lg font-semibold text-foreground">
              {machine.price}
            </span>{" "}
            млн ₸
          </span>
          <Button size="sm" asChild>
            <Link to="/" search={{ machine: machine.id }} hash="request">
              Оставить заявку
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
