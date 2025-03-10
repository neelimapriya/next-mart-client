import CartProducts from "@/components/modules/cart/CartProduct";
import Coupon from "@/components/modules/cart/Coupon";
import ProductsBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer";

const CartPage = () => {
    return (
        <NMContainer>
            <ProductsBanner title="Cart" path="Home - Cart"></ProductsBanner>
            <div className="grid grid-cols-12 gap-8 my-5">
            <CartProducts></CartProducts>
            <Coupon></Coupon>
            </div>
        </NMContainer>
    );
};

export default CartPage;