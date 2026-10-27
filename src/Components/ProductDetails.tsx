
import Link from "next/link";

// Types
interface MarketType {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface ProductType {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: MarketType[];
}

interface ProductDetailsProps {
    data: ProductType;
}

const ProductDetails = ({ data }: ProductDetailsProps) => {

    // Convert English numbers to Bangla
    const toBangla = (value: number) => {
        return value.toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        });
    };

    // Unit conversion
    const unitBn =
        data.unit === "kg" ? "কেজি" :
            data.unit === "liter" ? "লিটার" :
                data.unit === "piece" ? "পিস" :
                    data.unit;

    // Yesterday price difference
    const difference = data.today - data.yesterday;

    // Market calculations
    const markets = data.markets || [];

    const minimumPrice = markets.length
        ? Math.min(...markets.map((market) => market.min))
        : 0;

    const maximumPrice = markets.length
        ? Math.max(...markets.map((market) => market.max))
        : 0;

    // Average price from market midpoints
    const averagePrice = markets.length
        ? markets.reduce(
            (sum, market) => sum + (market.min + market.max) / 2,
            0
        ) / markets.length
        : 0;

    const isUp = data.change.dir === "up";
    const isDown = data.change.dir === "down";

    return (
        <section className="min-h-screen bg-[#F1F6F2] py-4">
            <div className="container mx-auto px-4">

                {/* Breadcrumb Navigation */}
                <div className="mb-8 flex flex-wrap items-center gap-3 text-[14px] text-[#263129]">

                    <Link href="/" className="hover:text-green-700">
                        হোম
                    </Link>

                    <span>›</span>

                    <Link
                        href={`/category/${data.category}`}
                        className="hover:text-green-700"
                    >
                        {data.categoryNameBn}
                    </Link>

                    <span>›</span>

                    <span>{data.nameBn}</span>
                </div>

                {/* Product Header */}
                <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#DFE8DF] bg-white/75 p-5 sm:flex-row sm:items-center">

                    {/* Product Information */}
                    <div className="flex items-center gap-4">

                        <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-2xl bg-[#F1F5F1] text-[38px]">
                            {data.image}
                        </div>

                        <div>
                            <h1 className="text-[26px] font-extrabold text-[#202B22] sm:text-[30px]">
                                {data.nameBn}
                            </h1>

                            <p className="text-[14px] text-[#68736B]">
                                প্রতি {unitBn} · চাল
                            </p>

                            <p className="mt-2 text-[13px] text-[#364039]">
                                গতকালের তুলনায় আজ দাম{" "}
                                <span className="font-semibold">
                                    {isUp
                                        ? "বেড়েছে"
                                        : isDown
                                            ? "কমেছে"
                                            : "অপরিবর্তিত রয়েছে"}
                                </span>

                                {difference !== 0 && (
                                    <> · {toBangla(Math.abs(difference))} টাকা</>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Today's Price */}
                    <div className="flex min-w-[120px] flex-col items-center justify-center rounded-2xl bg-[#F1F5F1] px-5 py-4">

                        <p className="text-[13px] text-[#68736B]">
                            আজকের দাম
                        </p>

                        <h2 className="text-[34px] font-extrabold leading-tight text-[#202B22]">
                            {toBangla(data.today)}
                        </h2>

                        <p className="text-[13px] text-[#68736B]">
                            টাকা / {unitBn}
                        </p>

                        <p
                            className={`mt-1 text-[14px] font-bold ${isUp
                                    ? "text-red-500"
                                    : isDown
                                        ? "text-green-600"
                                        : "text-gray-600"
                                }`}
                        >
                            {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                            {toBangla(Math.abs(data.change.pct))}%
                        </p>
                    </div>
                </div>

                {/* Price Overview Section */}
                <div className="mt-6 rounded-2xl border border-[#DFE8DF] bg-white/75 p-5">

                    <h2 className="mb-4 text-[18px] font-bold text-[#202B22]">
                        দামের সারসংক্ষেপ
                    </h2>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                        {/* Minimum Price */}
                        <div className="rounded-2xl border border-[#DFE8DF] p-6">
                            <p className="text-[13px] text-[#364039]">
                                সর্বনিম্ন দাম
                            </p>

                            <h3 className="mt-2 text-[24px] font-extrabold text-green-600">
                                {toBangla(minimumPrice)}
                                <span className="ml-1 text-[15px] font-medium">
                                    টাকা
                                </span>
                            </h3>

                            <p className="mt-1 text-[12px] text-[#364039]">
                                সবচেয়ে কম দামের বাজার
                            </p>
                        </div>

                        {/* Maximum Price */}
                        <div className="rounded-2xl border border-[#DFE8DF] p-6">
                            <p className="text-[13px] text-[#364039]">
                                সর্বোচ্চ দাম
                            </p>

                            <h3 className="mt-2 text-[24px] font-extrabold text-red-500">
                                {toBangla(maximumPrice)}
                                <span className="ml-1 text-[15px] font-medium">
                                    টাকা
                                </span>
                            </h3>

                            <p className="mt-1 text-[12px] text-[#364039]">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                        </div>

                        {/* Average Price */}
                        <div className="rounded-2xl border border-[#DFE8DF] p-6">
                            <p className="text-[13px] text-[#364039]">
                                গড় দাম
                            </p>

                            <h3 className="mt-2 text-[24px] font-extrabold text-green-600">
                                {toBangla(Number(averagePrice.toFixed(2)))}
                                <span className="ml-1 text-[15px] font-medium">
                                    টাকা
                                </span>
                            </h3>

                            <p className="mt-1 text-[12px] text-[#364039]">
                                প্রতি {unitBn}-এর হিসাবে
                            </p>
                        </div>
                    </div>

                    {/* Market Table Heading */}
                    <h2 className="mb-4 mt-7 text-[18px] font-bold text-[#202B22]">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    {/* Market Table */}
                    <div className="overflow-x-auto rounded-2xl border border-[#DFE8DF]">

                        <table className="w-full min-w-[650px] border-collapse text-left text-[14px]">

                            <thead className="bg-white/50 text-[#68736B]">
                                <tr>
                                    <th className="px-4 py-4 font-semibold">
                                        বাজার
                                    </th>

                                    <th className="px-4 py-4 font-semibold">
                                        বিভাগ
                                    </th>

                                    <th className="px-4 py-4 text-right font-semibold">
                                        সর্বনিম্ন
                                    </th>

                                    <th className="px-4 py-4 text-right font-semibold">
                                        সর্বোচ্চ
                                    </th>

                                    <th className="px-4 py-4 text-right font-semibold">
                                        গড়
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {markets.map((market, index) => {

                                    const average =
                                        (market.min + market.max) / 2;

                                    return (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className="border-t border-[#DFE8DF] transition-colors hover:bg-[#EAF2EC]"
                                        >
                                            <td className="px-4 py-4 text-[#202B22]">
                                                {market.market}
                                            </td>

                                            <td className="px-4 py-4 text-[#364039]">
                                                {market.division}
                                            </td>

                                            <td className="px-4 py-4 text-right">
                                                {toBangla(market.min)} টাকা
                                            </td>

                                            <td className="px-4 py-4 text-right">
                                                {toBangla(market.max)} টাকা
                                            </td>

                                            <td className="px-4 py-4 text-right font-bold text-[#202B22]">
                                                {toBangla(average)} টাকা
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {markets.length === 0 && (
                            <p className="p-8 text-center text-[#68736B]">
                                কোনো বাজারের তথ্য পাওয়া যায়নি।
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
