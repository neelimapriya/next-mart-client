import { Button } from "@/components/ui/button";
import styles from "./HeroSection.module.css"
import cupImg from "@/app/assets/cup-with-headphone.png"
import Image from "next/image";
const HeroSection = () => {
    return (
        <div
        className={`${styles.banner} border-2 border-white rounded-3xl  mt-10`}
      >
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="pl-12">
            <h1 className="text-4xl font-bold leading-normal">
              Don&apos;t Miss Out on <br /> These Unbeatable Black <br /> Friday
              Deals!
            </h1>
            <p className="my-5">
              Save big this Black Friday with unbeatable deals on tech, home
              essentials, fashion, and more! Limited stock.
            </p>
            <Button size="lg" className="mr-5 rounded-full">
              Buy Now
            </Button>
            <Button
              size="lg"
              className="rounded-full bg-white text-black hover:bg-gray-100"
            >
              All Products
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Image src={cupImg} alt="cup with headphone" />
          </div>
        </div>
      </div>
    );
};

export default HeroSection;