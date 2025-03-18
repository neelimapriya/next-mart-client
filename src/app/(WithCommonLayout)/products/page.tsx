import AllProducts from "@/components/modules/products";
import ProductsBanner from "@/components/modules/products/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllCategories } from "@/services/Category";
import { getAllProducts } from "@/services/Product";
import { ICategory } from "@/types";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const AllProductPage = async ({searchParams}:{searchParams: SearchParams}) => {
  const { data: categories } = await getAllCategories();
  const {data:products}=await getAllProducts(undefined,undefined,query)
  console.log(await searchParams);
  return (
    <NMContainer>
      <ProductsBanner title="All Products" path="Home-All products" />
      <h2 className="text-xl font-bold my-5">Featured Products</h2>
      <div className="grid grid-cols-6 gap-6 ">
        {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
      <AllProducts products={products}/>
    </NMContainer>
  );
};

export default AllProductPage;
