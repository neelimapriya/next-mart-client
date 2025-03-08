import UpdateProductForm from "@/components/modules/shop/product/updateProductForm";
import { getSingleProduct } from "@/services/Product";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  // console.log(await params);
  const { productId } = await params;
  const { data: product } = await getSingleProduct(productId);
  console.log(product);
  return (
    <div className="flex items-center justify-center">
      <UpdateProductForm product={product}></UpdateProductForm>{" "}
    </div>
  );
};

export default UpdateProductPage;
