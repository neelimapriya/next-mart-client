"use server";
import { cookies, headers } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    const setCookies = await cookies();
    if (result.success) {
      setCookies.set("accessToken", result.data.accessToken);
    }
  } catch (error: any) {
    return Error(error);
  }
};
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    const setCookies = await cookies();
    if (result.success) {
      setCookies.set("accessToken", result.data.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const recaptchaTokenVerification = async (token: string) => {
 try{
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:new URLSearchParams({
      secret:process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
      response:token,
    }),
  });
  return res.json()

 }catch(err:any){
  return Error(err)
 }
};
export const Logout=async()=>{
((await cookies()).delete("accessToken"))
}