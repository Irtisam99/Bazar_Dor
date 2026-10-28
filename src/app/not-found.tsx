
import Link from "next/link";
import { House, SearchX } from "lucide-react";

const NotFound = () => {
    return (
        <section className="flex min-h-[75vh] items-center justify-center bg-[#F1F6F2] px-4 py-12">
            <div className="w-full max-w-[520px] text-center">

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-[28px] bg-[#E1EFE4]">
                    <SearchX
                        size={48}
                        strokeWidth={1.7}
                        className="text-[#05893E]"
                    />
                </div>

                {/* Error Code */}
                <h1 className="text-[76px] font-extrabold leading-none tracking-tight text-[#05893E] sm:text-[96px]">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-5 text-[25px] font-bold text-[#202B22] sm:text-[30px]">
                    পেজটি খুঁজে পাওয়া যায়নি!
                </h2>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-[400px] text-[15px] leading-7 text-[#68736B]">
                    আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
                    অথবা লিংকটি সঠিক নয়।
                </p>

                {/* Home Button */}
                <Link
                    href="/"
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#05893E] px-7 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#057636] hover:shadow-md"
                >
                    <House size={19} />
                    হোম পেজে ফিরে যান
                </Link>

            </div>
        </section>
    );
};

export default NotFound;
