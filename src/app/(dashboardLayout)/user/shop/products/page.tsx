import { getAllProducts } from "@/services/Product";
import AddProductPage from "./add-product/page";
import ManageProducts from "@/components/modules/shop/product";

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllProducts(page, "3");
  return (
    <div>
      <ManageProducts products={data} meta={meta} />
      {/* <AddProductPage></AddProductPage> */}
    </div>
  );
};

export default ManageProductsPage;
