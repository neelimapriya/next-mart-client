import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import TopBrands from "@/components/modules/home/TopBrand";
import { useUser } from "@/context/UserContext";
import { getCurrentUser, getNewToken } from "@/services/AuthService";

const HomePage = async() => {
  const result=await getNewToken()
  console.log(result);
  return (
    <div>
      <HeroSection></HeroSection>
      <Category></Category>
      <FeaturedProducts></FeaturedProducts>
      <FlashSale/>
      <TopBrands/>
    </div>
  );
};

export default HomePage;
