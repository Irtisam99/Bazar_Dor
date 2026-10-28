import Image from "next/image";
import BanglaData from "./BanglaDate";
import Link from "next/link";
import UserInfo from "./UserInfo";

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
            
            <UserInfo></UserInfo>

        </div>

    );
};

export default Header;