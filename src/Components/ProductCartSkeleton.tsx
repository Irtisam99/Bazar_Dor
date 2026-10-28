
interface ProductCardSkeletonProps {
    count?: number;
}

const ProductCardSkeleton = ({
    count = 6,
}: ProductCardSkeletonProps) => {
    return (
        <div
            role="status"
            aria-label="পণ্য লোড হচ্ছে"
            className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3"
        >
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="flex min-h-[148px] animate-pulse flex-col justify-between rounded-2xl border border-[#DFE8DF] bg-white/75 p-[18px]"
                >
                    {/* Product Name and Icon */}
                    <div className="flex items-center gap-3">
                        <div className="h-[52px] w-[52px] shrink-0 rounded-xl bg-[#E3EBE4]" />

                        <div className="flex-1 space-y-3">
                            <div className="h-4 w-2/3 rounded-md bg-[#E3EBE4]" />
                            <div className="h-3 w-1/3 rounded-md bg-[#E3EBE4]" />
                        </div>
                    </div>

                    {/* Price and Change */}
                    <div className="mt-4 flex items-end justify-between">
                        <div className="space-y-2">
                            <div className="h-3 w-20 rounded-md bg-[#E3EBE4]" />
                            <div className="h-6 w-28 rounded-md bg-[#E3EBE4]" />
                        </div>

                        <div className="h-8 w-20 rounded-full bg-[#E3EBE4]" />
                    </div>
                </div>
            ))}

            <span className="sr-only">পণ্য লোড হচ্ছে...</span>
        </div>
    );
};

export default ProductCardSkeleton;
