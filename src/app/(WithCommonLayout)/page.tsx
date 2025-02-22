import { getCurrentUser } from "@/services/AuthService";

const HomePage = async() => {
    const user=await getCurrentUser()
    console.log(user);
    return (
        <div>
           <h2 className="text-center text-2xl">Welcome to home page</h2> 
        </div>
    );
};

export default HomePage;