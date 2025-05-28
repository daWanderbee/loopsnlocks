
export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/background.png')] bg-cover bg-center bg-no-repeat w-full px-4 sm:px-6 lg:px-8">
           
            <div className="max-w-md w-full bg-darkPink shadow-lg rounded-lg p-6 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4 font-moul self-center text-lightPink drop-shadow-[0_1px_1px_black]">
                    OTP Verification
                </h1>
                <form className="space-y-4 w-full">
                    <div>
                        <label htmlFor="otp" className="block text-lg font-medium text-gray-800">Enter OTP</label>
                        <input type="text" id="otp" name="otp" required className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm" />
                    </div>
                    <button type="submit" className="w-full bg-darkPink text-white py-2 px-4 rounded-md hover:bg-lightPink hover:text-darkPink transition duration-200 border-1 border-black">Verify OTP</button>
                </form>
            </div>
        </div>
    );
}