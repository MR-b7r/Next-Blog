import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 dark:bg-gray-900">
        {children} <Footer />
      </main>
    </div>
  );
}
