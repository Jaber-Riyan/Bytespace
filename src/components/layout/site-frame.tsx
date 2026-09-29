import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

export function SiteFrame({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col"><SiteHeader /><div className="flex-1">{children}</div><SiteFooter /></div>;
}
