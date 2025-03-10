import ProductsBanner from "@/components/modules/products/banner";
import ProductDetails from "@/components/modules/products/productDetails";
import NMContainer from "@/components/ui/core/NMContainer";
import { getSingleProduct } from "@/services/Product";

const ProductDetailsPage =async ({params,}:{params:Promise<{productId:string}>}) => {
    console.log(await params);
    const {productId}=await params
    const {data:product}=await getSingleProduct(productId)
    // console.log(data);
    return (
       <NMContainer>
        <ProductsBanner title="Product Details" path="Home - Products - Product Details"></ProductsBanner>
        <ProductDetails product={product}/>
       </NMContainer>
    );
};

export default ProductDetailsPage;