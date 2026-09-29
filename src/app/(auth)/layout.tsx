export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="min-h-screen bg-brand-cream">{children}</main>;
}
