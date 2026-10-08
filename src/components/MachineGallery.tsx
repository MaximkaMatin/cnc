import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export function MachineGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = images.length;
  const show = (i: number) => setActive((i + total) % total);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      else if (e.key === "ArrowRight") show(active + 1);
      else if (e.key === "ArrowLeft") show(active - 1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [fullscreen, active, total]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setFullscreen(true)}
        aria-label={`Открыть фото на весь экран: ${alt}`}
        className="group relative block w-full cursor-zoom-in"
      >
        <img
          src={images[active]}
          alt={alt}
          loading="lazy"
          width={1024}
          height={1024}
          className="aspect-[4/3] w-full object-cover"
        />
        <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 transition group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" />
          На весь экран
        </span>
      </button>
      <div className="flex gap-2 border-t border-border p-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Фото ${i + 1}`}
            className={`h-14 w-20 overflow-hidden rounded-md border-2 transition ${
              i === active
                ? "border-primary"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {fullscreen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} — фото ${active + 1} из ${total}`}
            className="fixed inset-0 z-[60] flex flex-col bg-background"
          >
            <div className="flex items-center gap-4 px-4 py-3">
              <span className="flex-1 truncate text-sm text-muted-foreground">{alt}</span>
              <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                {active + 1} / {total}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setFullscreen(false)}
                aria-label="Закрыть просмотр"
                className="shrink-0 rounded-full bg-secondary p-2 text-secondary-foreground transition hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-2"
              onClick={(e) => {
                if (e.target === e.currentTarget) setFullscreen(false);
              }}
            >
              <img
                src={images[active]}
                alt={alt}
                className="max-h-full max-w-full object-contain"
              />
              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => show(active - 1)}
                    aria-label="Предыдущее фото"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-2.5 text-secondary-foreground transition hover:bg-muted"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => show(active + 1)}
                    aria-label="Следующее фото"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-2.5 text-secondary-foreground transition hover:bg-muted"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-center gap-2 px-4 pb-5 pt-3">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Открыть фото ${i + 1}`}
                  className={`h-12 w-16 overflow-hidden rounded-md border-2 transition ${
                    i === active
                      ? "border-primary"
                      : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
