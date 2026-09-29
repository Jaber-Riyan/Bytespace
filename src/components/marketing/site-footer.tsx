import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/marketing/newsletter-form";

type FooterItem = { label: string; href?: string };

const footerGroups: FooterItem[][] = [
  [
    { label: "Featured Courses", href: "/courses" },
    { label: "Featured Categories", href: "/#learning-paths-title" },
    { label: "Business" },
    { label: "IT", href: "/courses?category=Data%20Science" },
    { label: "Design", href: "/courses?category=Graphic%20Design" },
  ],
  [
    { label: "Development" },
    { label: "Marketing", href: "/courses?category=Marketing" },
    { label: "Photography" },
    { label: "Finance" },
    { label: "Sport" },
  ],
  [
    { label: "Become a Creator", href: "/register" },
    { label: "Affiliate Program" },
    { label: "Contact" },
    { label: "Help" },
    { label: "About" },
  ],
];

function FooterNavItem({ item }: { item: FooterItem }) {
  return item.href ? (
    <Link
      href={item.href}
      className="hover:text-persian-blue focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue"
    >
      {item.label}
    </Link>
  ) : (
    <span>{item.label}</span>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-white text-shuttle-ink">
      <Image
        src="/images/footer/top-divider.svg"
        alt=""
        width={1440}
        height={1}
        className="pointer-events-none absolute left-1/2 top-0 max-w-none -translate-x-1/2"
      />
      <Container className="relative pb-12 pt-[71px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,528px)_minmax(0,580px)] lg:gap-[92px]">
          <div className="max-w-[528px]">
            <Logo />
            <p className="mt-4 text-[14px] leading-[1.6]">
              Stay Up to date with our latest features and releases by joining our newsletter.
            </p>
            <div className="mt-[45px]">
              <NewsletterForm />
            </div>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-5 gap-y-8 text-[14px] leading-[1.6] sm:grid-cols-3 lg:grid-cols-[repeat(3,167px)] lg:gap-x-10 lg:pt-12"
          >
            {footerGroups.map((group, index) => (
              <div key={index} className="flex flex-col items-start gap-4">
                {group.map((item) => (
                  <FooterNavItem key={item.label} item={item} />
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-16 border-t border-[#ced0d3] pt-5 text-[12px] leading-[1.6] lg:mt-[130px] lg:pt-[21px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} ByteSpace. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookies Settings</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
