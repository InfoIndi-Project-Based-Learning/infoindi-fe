import { useHomePage } from "@/features/public/hook/use-home-page";
import { HeroSection } from "@/features/public/home/components/hero-section";
import { CategoriesSection } from "@/features/public/home/components/categories-section";
import { RecentPostsSection } from "@/features/public/home/components/recent-posts-section";
import { FeaturesSection } from "@/features/public/home/components/features-section";
import { CtaSection } from "@/features/public/home/components/cta-section";

export default function HomePage() {
  const {
    selectedCategoryId,
    isHomeLoading,
    posts,
    categories,
    stats,
    getCategoryMeta,
    handleCategorySelect,
    setSelectedCategoryId
  } = useHomePage();

  return (
    <>
      <HeroSection stats={stats} />
      <CategoriesSection 
        categories={categories}
        isHomeLoading={isHomeLoading}
        selectedCategoryId={selectedCategoryId}
        getCategoryMeta={getCategoryMeta}
        handleCategorySelect={handleCategorySelect}
      />
      <RecentPostsSection 
        posts={posts}
        categories={categories}
        isHomeLoading={isHomeLoading}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <FeaturesSection />
      <CtaSection />
    </>
  );
}
