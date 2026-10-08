import type { ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { PHONE_DISPLAY, WHATSAPP_LINK, scrollToId } from "@/lib/site";

export function SiteHeader() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  const goHomeSection = (id: string) => {
    if (onHome) {
      scrollToId(id);
      return;
    }
    void navigate({ to: "/", hash: id });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {onHome ? (
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="flex flex-col items-start leading-none"
          >
            <BrandMark />
          </button>
        ) : (
          <Link to="/" className="flex flex-col items-start leading-none">
            <BrandMark />
          </Link>
        )}
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link
            to="/catalog"
            className={
              pathname.startsWith("/catalog")
                ? "text-foreground"
                : "hover:text-foreground"
            }
          >
            Каталог
          </Link>
          <button type="button" onClick={() => goHomeSection("calculator")} className="hover:text-foreground">
            Калькулятор
          </button>
          <button type="button" onClick={() => goHomeSection("request")} className="hover:text-foreground">
            Заявка
          </button>
        </nav>
        <div className="flex items-center gap-2">
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
              <span className="hidden sm:inline">WhatsApp</span>
            </Button>
          </a>
          <a href={`tel:${PHONE_DISPLAY.replace(/[^+\d]/g, "")}`}>
            <Button size="sm">{PHONE_DISPLAY}</Button>
          </a>
        </div>
      </div>
    </header>
  );
}

function BrandMark() {
  return (
    <>
      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="font-display text-2xl font-semibold tracking-wide text-foreground">
          CNC GROUP
        </span>
        <span className="rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
          CNC TRADE
        </span>
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Лазерные станки · Алматы
      </span>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-foreground">CNC GROUP</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Волоконные лазерные станки для резки металла. Алматы, Казахстан.
          </p>
          <Link to="/catalog" className="mt-3 inline-block text-sm text-foreground hover:underline">
            Каталог оборудования
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Контакты</p>
          <p className="mt-2">{PHONE_DISPLAY}</p>
          <p className="mt-1">almaty_cnc_group@mail.ru</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Режим работы</p>
          <p className="mt-2">Пн–Пт: 9:00–18:00</p>
          <p className="mt-1">Сб: 10:00–14:00</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CNC GROUP. Все права защищены.
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Написать в WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export function SitePage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
