import BanglaData from "@/Components/BanglaDate";
import HomeCard from "@/Components/HomeCard";
import Image from "next/image";

export default async function Home() {
  const resData = await fetch('https://openapi.programming-hero.com/api/bazardor/products')
  const data = await resData.json()


  const upData = [...data].filter((datas) => {
    return (
      datas.change.dir === 'up'
    )
  }).sort((a, b) => {
    return Number(b.change.pct) - Number(a.change.pct)
  }).slice(0, 6)



  const downData = [...data].filter((datas) => {
    return (
      datas.change.dir === 'down'
    )
  }).sort((a, b) => {
    return Number(a.change.pct) - Number(b.change.pct)
  }).slice(0, 6)




  return (
    <div className="bg-[#f0f5f0] ">
      <div className="py-[30px] h-[343px]">
        <div className="flex justify-between container mx-auto bg-white rounded-2xl p-6">
          <div className="flex flex-col gap-2">
            <p className="bg-[#e1f0e7] w-fit rounded-2xl px-4 py-1 text-[#05893E] font-semibold"><BanglaData></BanglaData></p>
            <h1 className="font-bold text-[36px]">আজকের বাজারের দাম এক নজরে</h1>
            <p className="text-[16px] text-[#5f6761]">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন- <br></br>সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
            <button className="w-fit bg-[#05893E] text-white px-4 py-2 rounded-lg font-bold mt-4">সব পণ্য দেখুন</button>
          </div>

          <div className="mr-10">
            <Image src='/bazar-hero.png' alt="hero" width={300} height={300}></Image>
          </div>

        </div>
      </div>




      <div className="container mx-auto mt-10">
        <div>
          <h3 className="text-[25px] mb-4 font-bold">

            <span className="text-red-500 text-[18px] mr-2">▲</span>
            আজ দাম বেড়েছে

          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {
              upData.map((datas) => {
                return (

                  <HomeCard key={datas.id} datas={datas}></HomeCard>


                )
              })
            }
          </div>
        </div>

      </div>






      <div className="container mx-auto mt-10">
        <div>
          <h3 className="text-[25px] mb-4 font-bold">

            <span className="text-green-500 text-[18px] mr-2">▼</span>
            আজ দাম কমেছে
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {
              downData.map((datas) => {
                return (

                  <HomeCard key={datas.id} datas={datas}></HomeCard>


                )
              })
            }
          </div>
        </div>

      </div>




      <div className="container mx-auto mt-10">
        <div>
          <h3 className="text-[25px] font-bold">

            সব পণ্য         
           </h3>
           <p className="mb-4">মোট {Number(data.length).toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {
              data.map((datas) => {
                return (

                  <HomeCard key={datas.id} datas={datas}></HomeCard>


                )
              })
            }
          </div>
        </div>

      </div>



    </div>



  );
}
