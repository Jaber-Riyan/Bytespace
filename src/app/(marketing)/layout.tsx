import { SiteFrame } from "@/components/layout/site-frame";
export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteFrame>{children}</SiteFrame>;
}
