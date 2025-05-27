import {Button} from "@heroui/button"
import "./globals.css";
import { MyNavbar } from "@/components/layout/MyNavbar"

export default function Home() {
  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen  bg-[url('/background.png')] bg-cover bg-center bg-no-repeat w-full px-4 sm:px-6 lg:px-8">
      <MyNavbar />
      <div
        className="
      w-full
      aspect-[4/1]              
      bg-[url('/fulllogo.png')]
      bg-contain                
      bg-no-repeat
      bg-center
      max-w-6xl
      mb-0
      pb-0
  "
      ></div> 
      <a href="/sign-in"> <Button size="lg" className="bg-darkPink border-black border-1 mt-0" >Get Started</Button></a>
      
    </div>
  )
}