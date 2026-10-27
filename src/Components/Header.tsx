import Image from "next/image";
import BanglaData from "./BanglaDate";
import Link from "next/link";

const Header = () => {
    return (
        <div className="container mx-auto flex justify-between items-center mt-2">
            <Link href='/'>
            <div className="flex items-center gap-2">

                <div className="bg-[#05893E] rounded-lg inline-flex ">
                    <Image src='/logo3.png' alt='Logo' width={40} height={40}
                        className="p-2">

                    </Image>
                </div>
                <div>
                    <h2 className="font-bold text-[20px]">বাজার দর</h2>
                    <p><BanglaData></BanglaData></p>
                </div>
            </div>
            </Link>
            <div className="flex items-center gap-4">
                <Link href={'/signin'}> <button className="btn btn-ghost text-neutral-700 transition-colors hover:text-[#05893E] font-bold">সাইন ইন</button>
                </Link>
                <Link href={'/signup'}> <button className="btn bg-[#05893E] px-3 py-2 font-semibold text-white transition-colors hover:bg-[#057636] rounded-xl">সাইন আপ</button>
                </Link>
            </div>
        </div>
    );
};

export default Header;