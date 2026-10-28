
import ProductCardSkeleton from "@/Components/ProductCartSkeleton";

const HomeLoading = () => {
    return (
        <main className="min-h-screen bg-[#F1F6F2] py-5">
            <div className="container mx-auto px-4">

                {/* Heading Skeleton */}
                <div className="mb-6 animate-pulse space-y-3">
                    <div className="h-8 w-64 max-w-full rounded-lg bg-[#DFE8DF]" />
                    <div className="h-4 w-80 max-w-full rounded-md bg-[#DFE8DF]" />
                </div>

                {/* Category Navigation Skeleton */}
                <div className="mb-8 flex flex-wrap gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-12 w-28 animate-pulse rounded-xl bg-[#DFE8DF]"
                        />
                    ))}
                </div>

                {/* Products Heading Skeleton */}
                <div className="mb-5 animate-pulse">
                    <div className="h-6 w-48 rounded-md bg-[#DFE8DF]" />
                </div>

                {/* Product Cards */}
                <ProductCardSkeleton count={9} />
            </div>
        </main>
    );
};

export default HomeLoading;
