import { Skeleton } from "@/components/ui/skeleton";

interface CategoriesSectionProps {
  categories: any[];
  isHomeLoading: boolean;
  selectedCategoryId: string | null;
  getCategoryMeta: (slug: string) => any;
  handleCategorySelect: (id: string) => void;
}

export function CategoriesSection({
  categories,
  isHomeLoading,
  selectedCategoryId,
  getCategoryMeta,
  handleCategorySelect
}: CategoriesSectionProps) {
  return (
    <section id="categories-section" className="container mx-auto px-4 mt-40 max-w-5xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 mb-3">
          Telusuri Berdasarkan Kategori
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
          Cari postingan dengan mudah berdasarkan kebutuhanmu. Klik salah satu kategori di bawah untuk menyaring postingan secara langsung.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {isHomeLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-5 rounded-xl border flex flex-col items-center text-center border-slate-100 bg-white">
              <Skeleton className="w-12 h-12 rounded-full mb-3" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-28 mt-1" />
            </div>
          ))
        ) : (
          categories.map((cat: any) => {
            const meta = getCategoryMeta(cat.slug);
            const IconComponent = meta.icon;
            const isSelected = selectedCategoryId === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`cursor-pointer p-5 rounded-xl border flex flex-col items-center text-center transition-all duration-300 ${isSelected
                  ? meta.borderHoverColor
                  : `${meta.bgColor} border-transparent`
                  } hover:shadow-md hover:-translate-y-0.5`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-white shadow-sm ${meta.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-gray-900 mb-1.5">
                  {cat.category_name}
                </h3>
                <p className="text-xs text-gray-500 leading-normal font-light">
                  {meta.description}
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
