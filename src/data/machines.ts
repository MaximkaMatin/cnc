import fiberFront from "@/assets/fiber-3015-front.jpg";
import fiberTop from "@/assets/fiber-3015-top.jpg";
import fiberHead from "@/assets/fiber-3015-head.jpg";
import welder1 from "@/assets/welder-1.jpg";
import welder2 from "@/assets/welder-2.jpg";
import welder3 from "@/assets/welder-3.jpg";
import cobot1 from "@/assets/cobot-1.jpg";
import cobot2 from "@/assets/cobot-2.jpg";
import cobot3 from "@/assets/cobot-3.jpg";

export type MachineCategory = "cutting" | "welding" | "robots";

export interface Machine {
  id: string;
  name: string;
  tagline: string;
  category: MachineCategory;
  gallery?: string[];
  specs: [string, string][];
  price: number; // млн ₸
  priceFrom?: boolean; // false = фиксированная цена, без «от»
}

export const MACHINE_CATEGORIES: { id: "all" | MachineCategory; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "cutting", label: "Лазерная резка" },
  { id: "welding", label: "Лазерная сварка" },
  { id: "robots", label: "Роботы" },
];

export const MACHINES: Machine[] = [
  {
    id: "fiber-3015",
    name: "CNC Fiber 3015",
    tagline: "Универсальный станок для листового металла",
    category: "cutting",
    gallery: [fiberFront, fiberTop, fiberHead],
    specs: [
      ["Рабочее поле", "3000 × 1500 мм"],
      ["Мощность резака", "1,5 / 3 кВт"],
      ["Скорость позиционирования", "до 100 м/мин"],
      ["Макс. толщина (сталь)", "до 16 мм"],
      ["Точность", "±0,05 мм"],
    ],
    price: 15,
  },
  {
    id: "welder",
    name: "CNC Weld Robot",
    tagline: "Роботизированный комплекс лазерной сварки",
    category: "welding",
    gallery: [welder1, welder2, welder3],
    specs: [
      ["Тип сварки", "волоконно-лазерная"],
      ["Мощность источника", "1,5 / 2 / 3 кВт"],
      ["Толщина сварки (сталь)", "до 6 мм"],
      ["Повторяемость", "±0,05 мм"],
      ["Комплектация", "робот, источник, горелка, ЧПУ"],
    ],
    price: 5,
  },
  {
    id: "cobot",
    name: "CNC Cobot",
    tagline: "Коллаборативный робот для сварки и обработки",
    category: "robots",
    gallery: [cobot1, cobot2, cobot3],
    specs: [
      ["Грузоподъёмность", "до 10 кг"],
      ["Радиус действия", "до 1500 мм"],
      ["Повторяемость", "±0,03 мм"],
      ["Программирование", "ручное ведение + ЧПУ"],
      ["Работа рядом с человеком", "без ограждений"],
    ],
    price: 8,
  },
];
