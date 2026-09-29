import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { CartProvider } from "@/components/cart/cart-provider";
import { courses } from "@/data/courses";

const catalog = courses.map(({ id, title, image, price }) => ({ id, title, image, price }));
export function SiteFrame({ children }: { children: ReactNode }) {
  return <CartProvider catalog={catalog}><div className="flex min-h-screen flex-col"><SiteHeader /><div className="flex-1">{children}</div><SiteFooter /></div></CartProvider>;
}
