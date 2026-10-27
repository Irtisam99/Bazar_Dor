
"use client";

import { useState } from "react";

// Product Type
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
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
}

interface CategoryDetailsProps {
    data: ProductType[];
}

const Category_Details = ({ data = [] }: CategoryDetailsProps) => {
    const [sortBy, setSortBy] = useState("default");

    // Convert numbers to Bangla
    const toBangla = (value: number) => {
        return value.toLocaleString("bn-BD");
    };

    // Category information
    const category = data[0];

    // Sort products
    const sortedProducts = [...data].sort((a, b) => {
        if (sortBy === "low") return a.today - b.today;
        if (sortBy === "high") return b.today - a.today;
        if (sortBy === "increase") {
            return b.change.pct - a.change.pct;
        }
        if (sortBy === "decrease") {
            return a.change.pct - b.change.pct;
        }
        return 0;
    });

    return (
        <section className="min-h-screen bg-[#F1F6F2] py-3">
            <div className="container mx-auto px-4">

                {/* Category Header */}
                <div className="flex items-center gap-4 rounded-2xl border border-[#DFE8DF] bg-white/70 px-6 py-6">

                    <span className="text-4xl">
                        {category?.categoryIcon}
                    </span>

                    <div>
                        <h1 className="text-[26px] font-bold text-[#202B22]">
                            {category?.categoryNameBn}
                        </h1>

                        <p className="text-[14px] text-[#68736B]">
                            {toBangla(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                {/* Sorting Section */}
                <div className="mt-6 flex h-[72px] items-center justify-end rounded-2xl border border-[#DFE8DF] bg-white/70 px-6">

                    <div className="flex items-center gap-3">
                        <span className="text-[14px] text-[#68736B]">
                            সাজান
                        </span>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-lg border border-[#CBD5CB] bg-white px-3 py-2 text-[13px] text-[#202B22] outline-none"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low">দাম: কম থেকে বেশি</option>
                            <option value="high">দাম: বেশি থেকে কম</option>
                            <option value="increase">দাম বৃদ্ধি</option>
                            <option value="decrease">দাম হ্রাস</option>
                        </select>
                    </div>
                </div>

                {/* Product Count */}
                <p className="mb-5 mt-4 text-[14px] text-[#68736B]">
                    মোট {toBangla(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
                </p>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">

                    {sortedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex min-h-[148px] flex-col justify-between rounded-2xl border border-[#DFE8DF] bg-white/75 p-[18px] transition-all duration-200 hover:shadow-md"
                        >

                            {/* Product Name and Icon */}
                            <div className="flex items-center gap-3">

                                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-[#F1F5F1] text-[26px]">
                                    {product.image}
                                </div>

                                <div>
                                    <h2 className="text-[17px] font-bold text-[#202B22]">
                                        {product.nameBn}
                                    </h2>

                                    <p className="text-[13px] text-[#364039]">
                                        প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                                    </p>
                                </div>
                            </div>

                            {/* Price and Change */}
                            <div className="mt-4 flex items-end justify-between">

                                <div>
                                    <p className="text-[12px] text-[#364039]">
                                        আজকের দাম
                                    </p>

                                    <h3 className="text-[22px] font-extrabold leading-tight text-[#202B22]">
                                        {toBangla(product.today)}{" "}
                                        <span className="text-[16px] font-medium">
                                            টাকা
                                        </span>
                                    </h3>
                                </div>

                                {/* Price Change Badge */}
                                <span
                                    className={`rounded-full bg-[#F1F5F1] px-3 py-2 text-[12px] font-semibold ${product.change.dir === "up"
                                            ? "text-red-500"
                                            : product.change.dir === "down"
                                                ? "text-green-600"
                                                : "text-[#364039]"
                                        }`}
                                >
                                    {product.change.dir === "up"
                                        ? "▲"
                                        : product.change.dir === "down"
                                            ? "▼"
                                            : "—"}{" "}

                                    {toBangla(Math.abs(product.change.pct))}%
                                </span>

                            </div>
                        </div>
                    ))}

                </div>

                {/* Empty State */}
                {data.length === 0 && (
                    <div className="py-16 text-center text-[#68736B]">
                        কোনো পণ্য পাওয়া যায়নি।
                    </div>
                )}

            </div>
        </section>
    );
};

export default Category_Details;
