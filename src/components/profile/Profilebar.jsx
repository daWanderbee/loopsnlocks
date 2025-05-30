import { Image } from "@heroui/image";
export function Profilebar() {
    return (
        <div className="flex  bg-darkPink align-top flex-col w-full min-h-screen">
            <Image
                disableSkeleton={true}
                alt="HeroUI hero Image"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={300}
                className="mx-auto my-0 mt-4 *:rounded-xl *:border-2 *:border-black *:shadow-lg *:shadow-black/20 *:hover:shadow-black/30 *:transition-all *:duration-300 *:ease-in-out"
            />

            <div className="flex flex-col items-center mt-4 border-black border-1">
                <div className="text-2xl font-bold text-white">
                    Username
                </div>
            </div>

            

        </div>
    );
}