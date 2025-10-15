import { Navbar } from "@/components/layout/navbar";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <footer className="border-t border-border/40 py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 个人网站. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
