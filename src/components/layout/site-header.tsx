import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/ui/logo";
const navigation = [["Home", "/"], ["Courses", "/courses"], ["Creators", "/creators"]] as const;
export function SiteHeader() { return <header className="h-[120px] border-b border-brand-purple/10 bg-brand-cream/90"><Container className="flex h-full items-center justify-between"><Logo /><nav aria-label="Primary navigation" className="hidden gap-8 md:flex">{navigation.map(([label, href]) => <Link key={href} href={href} className="text-sm font-medium text-brand-muted hover:text-brand-purple">{label}</Link>)}</nav><div className="flex items-center gap-5 text-sm font-medium"><Link href="/sign-in" className="text-brand-muted hover:text-brand-purple">Sign In</Link><Link href="/register" className="rounded-xl bg-brand-purple px-5 py-3 text-white hover:bg-brand-purple-dark">Join Us</Link></div></Container></header>; }
