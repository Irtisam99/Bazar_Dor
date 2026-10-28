
import ProductCardSkeleton from "@/Components/ProductCartSkeleton";

const CategoryLoading = () => {
    return (
        <section className="min-h-screen bg-[#F1F6F2] py-3">
            <div className="container mx-auto px-4">

                {/* Category Header Skeleton */}
                <div className="flex animate-pulse items-center gap-4 rounded-2xl border border-[#DFE8DF] bg-white/70 px-6 py-6">

                    {/* Category Icon */}
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-[#E3EBE4]" />

                    {/* Category Title */}
                    <div className="space-y-3">
                        <div className="h-7 w-36 rounded-md bg-[#E3EBE4]" />
                        <div className="h-4 w-56 max-w-full rounded-md bg-[#E3EBE4]" />
                    </div>
                </div>

                {/* Sorting Section Skeleton */}
                <div className="mt-6 flex h-[72px] animate-pulse items-center justify-end rounded-2xl border border-[#DFE8DF] bg-white/70 px-6">

                    <div className="flex items-center gap-3">
                        <div className="h-4 w-12 rounded-md bg-[#E3EBE4]" />
                        <div className="h-10 w-44 rounded-lg bg-[#E3EBE4]" />
                    </div>
                </div>

                {/* Product Count Skeleton */}
                <div className="mb-5 mt-4 animate-pulse">
                    <div className="h-4 w-48 rounded-md bg-[#DFE8DF]" />
                </div>

                {/* Product Card Skeletons */}
                <ProductCardSkeleton count={9} />

            </div>
        </section>
    );
};

export default CategoryLoading;
