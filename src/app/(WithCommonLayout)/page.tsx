"use client"
import { useUser } from "@/context/UserContext";
// import { getCurrentUser } from "@/services/AuthService";

const HomePage = () => {
    const user= useUser()
    console.log(user);
    return (
        <div>
           <h2 className="text-center text-2xl">Welcome to home page</h2> 
        </div>
    );
};

export default HomePage;