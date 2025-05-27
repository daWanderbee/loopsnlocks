import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/background.png')] bg-cover bg-center bg-no-repeat w-full px-4 sm:px-6 lg:px-8">
            <Card isBlurred="true" className="max-w-md w-full bg-darkPink shadow-lg rounded-lg p-6 flex flex-col items-center">
                <CardHeader className="justify-center  text-2xl font-bold mb-4 font-moul self-center text-lightPink drop-shadow-[0_1px_1px_black]">
                    Sign Up
                </CardHeader>
                <CardBody>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-800 font- ">Email</label>
                            <input type="email" id="email" name="email" required className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm " />
                        </div>
                        <button type="submit" className="w-full bg-darkPink text-white py-2 px-4 rounded-md hover:bg-lightPink hover:text-darkPink transition duration-200 border-1 border-black">Sign Up</button>
                        <div className="flex gap-2 items-center justify-between flex-row w-full">
                            <Button variant="flat" className="w-1/2 bg-lightPurple text-lightPink hover:bg-darkPurple hover:text-white transition duration-200">
                                <i className="fa-brands fa-google mr-2"></i> Sign Up with Google
                            </Button>
                            <Button variant="flat" className="w-1/2 bg-lightPurple text-lightPink hover:bg-darkPurple hover:text-white transition duration-200">
                                <i className="fa-brands fa-github mr-2"></i> Sign Up with GitHub
                            </Button>
                        </div>
                    </form>
                </CardBody>
                <CardFooter className="text-center mt-4 justify-center mx-auto  p-4">
                    <p className="text-sm text-gray-800"> Have an account? <a href="/sign-in" className="text-darkPurple hover:underline">Sign In</a></p>
                </CardFooter>
            </Card>
        </div>

    )
}