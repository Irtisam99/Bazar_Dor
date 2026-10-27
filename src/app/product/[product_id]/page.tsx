
import ProductDetails from "@/Components/ProductDetails";
import { notFound } from "next/navigation";

interface ProductPageProps {
    params: Promise<{
        product_id: string;
    }>;
}

const Product_Id = async ({ params }: ProductPageProps) => {
    const { product_id } = await params;

    const resData = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products/${product_id}`
    );

    if (!resData.ok) {
        notFound();
    }

    const data = await resData.json();

    return (
        <div>
            <ProductDetails data={data} />
        </div>
    );
};

export default Product_Id;
