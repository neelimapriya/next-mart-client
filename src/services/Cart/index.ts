"use server";

import { isTokenExpired } from "@/lib/verifyToken";
import { IOrder } from "@/types/cart";

import { cookies } from "next/headers";
import { getNewToken } from "../AuthService";

export const createOrder = async (order: IOrder) => {
  const cookieStore=await cookies()
    let token=cookieStore.get("accessToken")!.value
    if(!token || (await isTokenExpired(token))){
      const {data}=await getNewToken()
      token=data?.accessToken
      cookieStore.set("accessToken",token)
    }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    return await res.json();
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
export const addCoupon = async (
  couponCode: string,
  subTotal: number,
  shopId: string
) => {
  const cookieStore=await cookies()
  let token=cookieStore.get("accessToken")!.value
  if(!token || (await isTokenExpired(token))){
    const {data}=await getNewToken()
    token=data?.accessToken
    cookieStore.set("accessToken",token)
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`,
      {
        method: "POST",
        headers: {
          Authorization:token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderAmount: subTotal, shopId }),
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
