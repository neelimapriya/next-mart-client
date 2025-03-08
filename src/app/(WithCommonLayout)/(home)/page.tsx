import Category from "@/components/modules/home/Category";
import HeroSection from "@/components/modules/home/HeroSection";
import { useUser } from "@/context/UserContext";
import { getCurrentUser } from "@/services/AuthService";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Category></Category>
    </div>
  );
};

export default HomePage;
