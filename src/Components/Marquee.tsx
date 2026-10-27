import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const convertUnitToBangla = (unit) => {
    const units = {
        kg: "কেজি",
        kilogram: "কেজি",
        kilograms: "কেজি",
        gm: "গ্রাম",
        g: "গ্রাম",
        gram: "গ্রাম",
        grams: "গ্রাম",
        liter: "লিটার",
        liters: "লিটার",
        litre: "লিটার",
        ml: "মিলিলিটার",
        milliliter: "মিলিলিটার",
        millilitre: "মিলিলিটার",
        piece: "পিস",
        pieces: "পিস",
        pcs: "পিস",
        pc: "পিস",
        unit: "টি",
        units: "টি",
        dozen: "ডজন",
        packet: "প্যাকেট",
        pack: "প্যাকেট",
        bottle: "বোতল",
        jar: "বয়াম",
        box: "বাক্স",
        bag: "ব্যাগ",
        bunch: "আঁটি",
        pair: "জোড়া",
        half: "আধা",
        pound: "পাউন্ড",
        lb: "পাউন্ড",
        oz: "আউন্স",
        ton: "টন",
        cup: "কাপ",
        tablespoon: "টেবিল চামচ",
        teaspoon: "চা চামচ",
    };

    if (!unit) return "";

    const normalizedUnit = String(unit).trim().toLowerCase();

    return units[normalizedUnit] || unit;
};

const Marquee = async () => {
    const resData = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    const data = await resData.json();

    return (
        <div className="mt-4 border-y border-gray-200 py-2">
            <MarqueeText direction="right" duration={10}>
                {data.map((datas) => (
                    <Link key={datas.id} href={`/product/${datas.id}`}>
                    <div
                        key={datas.id}
                        className="mr-10 inline-flex items-center gap-1.5 hover:underline"
                    >
                        <p>{datas.image}</p>

                        <p className="whitespace-nowrap">
                            {datas.nameBn}
                        </p>

                        <p className="whitespace-nowrap">
                            {Number(datas.today).toLocaleString("bn-BD")}
                            {" টাকা/"}
                            {convertUnitToBangla(datas.unit)}
                        </p>

                        <span className="whitespace-nowrap">
                            {
                                Number(datas.change.pct) === 0 ? (
                                    <span>
                                        <span style={{ color: "#9ca3af", marginRight: "4px" }}>
                                            ➖
                                        </span>
                                        {Number(datas.change.pct).toLocaleString("bn-BD")}%
                                    </span>

                                ) : datas.change.dir === "up"?(
                                    <span>
                                        🔺
                                        {Number(datas.change.pct).toLocaleString("bn-BD")}%
                                    </span>
                                ) : (
                            <span>
                                <span style={{ color: "#10b981", marginRight: "4px" }}>
                                    ▼
                                </span>
                                {Math.abs(Number(datas.change.pct)).toLocaleString("bn-BD")}%
                            </span>
                            )
                            }
                        </span>
                    </div>
                    </Link>
                ))}
            </MarqueeText>
        </div>
    );
};

export default Marquee;