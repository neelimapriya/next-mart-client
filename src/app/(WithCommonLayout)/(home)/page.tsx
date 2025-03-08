import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection";
import TopBrands from "@/components/modules/home/TopBrand";
import { useUser } from "@/context/UserContext";
import { getCurrentUser } from "@/services/AuthService";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Category></Category>
      <FeaturedProducts></FeaturedProducts>
      <TopBrands/>
    </div>
  );
};

export default HomePage;
