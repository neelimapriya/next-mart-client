"use client";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Logo from "@/app/assets/svgs/Logo";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginUser, recaptchaTokenVerification, registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { LoginSchema } from "./loginValidation";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";


export default function LoginForm() {
  const searchParam=useSearchParams()
  const redirect=searchParam.get("redirectPath")
  const router=useRouter()
  const form = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const {setIsLoading}=useUser()
  const [recaptchaStatus, setRecaptchaStatus]=useState(false)

  const {
    formState: { isSubmitting },
  } = form;
  const handleRecaptcha=async(value:string | null)=>{
    try{
      const res=await recaptchaTokenVerification(value !)
      if(res?.success){
        setRecaptchaStatus(true)
      }
    }catch(err:any){
      console.error(err)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res);
      setIsLoading(true)
      if (res?.success) {
        toast.success(res?.message);
        if(redirect){
          router.push(redirect)
        }else{
          router.push("/")
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full mt-3">
            <ReCAPTCHA  sitekey={(process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY)!}
    onChange={handleRecaptcha} className="mx-auto"/>
          </div>
          <Button
          disabled={recaptchaStatus? false : true}
          type="submit" className="mt-5 w-full">
            {isSubmitting ? "Logging in...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?
        <Link href="/register" className="text-primary">
          Registration
        </Link>
      </p>
    </div>
  );
}
