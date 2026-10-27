import CategoryLinkItem from "./CategoryLinkItem";

interface CategoryType {
    id: number;
    icon: string;
    nameBn: string;
}

const CategoryLinks = async () => {
    const resData = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories"
    );

    const cateData: CategoryType[] = await resData.json();

    return (
        <div className="container mx-auto flex flex-wrap items-center gap-3 mt-5 pl-4">
            {cateData.map((data) => (
                <CategoryLinkItem key={data.id} data={data} />
            ))}
        </div>
    );
};

export default CategoryLinks;