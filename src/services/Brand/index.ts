"use server";
import { isTokenExpired } from "@/lib/verifyToken";
import { AwardIcon } from "lucide-react";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getNewToken } from "../AuthService";

//  get all brands
export const getAllBrands = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      next: {
        tags: ["Brands"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// create brand
export const createBrand = async (brandData: FormData): Promise<any> => {
  const cookieStore=await cookies()
  let token=cookieStore.get("accessToken")!.value
  if(!token || (await isTokenExpired(token))){
    const {data}=await getNewToken()
    token=data?.accessToken
    cookieStore.set("accessToken",token)
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      method: "POST",
      body: brandData,
      headers: {
        Authorization:token
      },
    });
    revalidateTag("Brands");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete brand
export const deleteBrand = async (brandId: string): Promise<any> => {
  const cookieStore=await cookies()
  let token=cookieStore.get("accessToken")!.value
  if(!token || (await isTokenExpired(token))){
    const {data}=await getNewToken()
    token=data?.accessToken
    cookieStore.set("accessToken",token)
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/brand/${brandId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token
        },
      }
    );
    revalidateTag("Brands");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};