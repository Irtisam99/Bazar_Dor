import Category_Details from "@/Components/Category_Details";

const CategoryId = async({params}) => {
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