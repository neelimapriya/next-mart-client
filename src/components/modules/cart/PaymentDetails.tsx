"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import {
  citySelector,
  clearCart,
  couponSelector,
  discountAmountSelector,
  grandTotalSelector,
  orderedProductSelector,
  orderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { currencyFormatter } from "@/lib/CurrencyFormatter";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/services/Cart";
// import { createOrder } from "@/services/Cart";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  // console.log(shippingCost);
  const discountAmount = useAppSelector(discountAmountSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const city = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedProductSelector);
  const coupon = useAppSelector(couponSelector);

  const user = useUser();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");
    try {
      if (!user.user) {
        router.push("/login");
        throw new Error("Please login first.");
      }

      if (!city) {
        throw new Error("City is missing");
      }
      if (!shippingAddress) {
        throw new Error("Shipping address is missing");
      }

      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }
      let orderData;
      if (coupon.code) {
        orderData = { ...order, coupon: coupon.code };
      } else {
        orderData = order;
      }

      const res = await createOrder(orderData);
      console.log(res);

      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());

        router.push(res.data.paymentUrl);
      }

      if (!res.success) {
        toast.error(res.message, { id: orderLoading });
        console.log(res.message);
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
      console.log(error.message);
    }
    console.log(order);
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      {coupon.isLoading && <p>Loading</p>}
      {!coupon.isLoading && (
        <>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <p className="text-gray-500 ">Subtotal</p>
              <p className="font-semibold">{currencyFormatter(subTotal)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500 ">Discount</p>
              <p className="font-semibold">{currencyFormatter(discountAmount)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500 ">Shipment Cost</p>
              <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
            </div>
          </div>
          <div className="flex justify-between mt-10 mb-5">
            <p className="text-gray-500 ">Grand Total</p>
            <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
          </div>
        </>
      )}

      <Button
        onClick={handleOrder}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
