import HeroSection from "@/components/Home/HeroSection";
import FeaturedSection from "@/components/Home/FeaturedSection";
import CategoriesSection from "@/components/Home/CategoriesSection";
import StatsSection from "@/components/Home/StatsSection";
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="bg-primary-50 dark:bg-dark-200 flex flex-col">
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <StatsSection />
    </div>
  );
}
