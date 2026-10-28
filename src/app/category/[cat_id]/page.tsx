import Category_Details from "@/Components/Category_Details";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{
        cat_id: string;
    }>;
}

interface CategoryType {
    id: number | string;
    nameBn: string;
    icon: string;
}

const CategoryId = async({params}:CategoryPageProps) => {
    const {cat_id}=await params

    const resData=await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${cat_id}`)
    const data=await resData.json()

    console.log(data)
    return (
        <div>
            {
             <Category_Details data={data}></Category_Details>
            
            }
        </div>
    );
};

export default CategoryId;