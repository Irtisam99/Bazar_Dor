import Link from "next/link";

const convertUnitToBangla = (unit) => {
    const units = {
        kg: "কেজি",
        gm: "গ্রাম",
        g: "গ্রাম",
        gram: "গ্রাম",
        liter: "লিটার",
        litre: "লিটার",
        ml: "মিলিলিটার",
        piece: "টি",
        pieces: "টি",
        pcs: "টি",
        dozen: "ডজন",
        packet: "প্যাকেট",
        bottle: "বোতল",
        pound: "পাউন্ড",
    };

    return units[String(unit).trim().toLowerCase()] || unit;
};

const HomeCard = ({ datas }) => {
    return (
        <Link key={datas.id} href={`/product/${datas.id}`}>

            <div className="flex h-full flex-col rounded-[28px] border-[3px] border-[#e0e8e0] bg-[#f9fbf9] p-5 sm:p-5">

                {/* Product name and icon */}
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] bg-[#eff4ef] text-4xl">
                        {datas.image}
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-[20px] font-bold text-[#202a22]">
                            {datas.nameBn}
                        </h3>
                        <p className="mt-1 text-[16px] text-[#202a22]">
                            প্রতি {convertUnitToBangla(datas.unit)}
                        </p>
                    </div>
                </div>

                {/* Price and price change */}
                <div className="mt-4 flex flex-wrap items-end justify-between">
                    <div>
                        <p className="text-md text-[#202a22]">আজকের দাম</p>
                        <p className="text-[25px] font-bold text-[#202a22]">
                            {Number(datas.today).toLocaleString("bn-BD")}
                            <small> টাকা </small>
                        </p>
                    </div>

                    <div
                        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-md font-bold ${Number(datas.change.pct) === 0
                            ? "bg-gray-100 text-gray-500"
                            : datas.change.dir === "up"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                    >
                        <span>
                            {Number(datas.change.pct) === 0
                                ? "—"
                                : datas.change.dir === "up"
                                    ? "▲"
                                    : "▼"}
                        </span>

                        <span>
                            {Math.abs(Number(datas.change.pct)).toLocaleString("bn-BD")}%
                        </span>
                    </div>
                </div>
            </div>
            </Link>
            );
};

            export default HomeCard;
