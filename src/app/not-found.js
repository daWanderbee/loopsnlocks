// app/not-found.js
import { Button } from "@heroui/button";
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/background.png')] bg-cover bg-center bg-no-repeat w-full px-4 sm:px-6 lg:px-8">
           
                <h1 className="text-2xl font-bold mb-4 font-moul self-center text-lightPink drop-shadow-[0_1px_1px_black]">
                    Page Not Found
                </h1>
                <p className="text-lg text-lightPink mb-4">The page you are looking for does not exist.</p>
                <div className="bg-[url('/wool.png')] bg-cover bg-center bg-no-repeat w-44 h-64 mb-4">
                </div>
                <a href="/" >
                  <Button size="lg" className="bg-darkPink border-black border-1 mt-0">
                    Go to Home
                    </Button>
                </a>
         
        </div>
    );
}
  