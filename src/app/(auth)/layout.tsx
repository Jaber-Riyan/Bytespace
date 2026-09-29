export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen overflow-hidden bg-persian-blue bg-[url('/images/hero/imgGroup4.svg')] bg-[position:center_top] bg-repeat-y">
      {children}
    </main>
  );
}