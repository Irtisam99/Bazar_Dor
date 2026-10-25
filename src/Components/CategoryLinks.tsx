import Image from "next/image";

const CategoryLinks = async () => {
    const resData = await fetch('https://openapi.programming-hero.com/api/bazardor/categories')
    const cateData = await resData.json()


    return (
        <div className="container mx-auto flex gap-7 mt-5 pl-4">
            
            {
                cateData.map((data) => {

                    return (
                        <div key={data.id} className="flex gap-2">
                            <p>{data.icon}</p>
                            <p className="font-bold text-[14px]">{data.nameBn}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default CategoryLinks;