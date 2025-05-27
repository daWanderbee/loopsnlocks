export default function Footer() {
    return (
        <footer className="w-full bg-darkPink text-white shadow-2xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Brand Info */}
                <div className="flex flex-col items-center sm:items-start">
                    <h2 className="text-2xl font-bold mb-4">LoopsnLocks</h2>
                    <p className="text-sm mb-2">© 2023 LoopsnLocks. All rights reserved.</p>
                    <p className="text-sm">Follow us on social media for updates!</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                        <li><a href="/services" className="hover:underline">Services</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <p className="text-sm">Email: support@loopsnlocks.com</p>
                    <p className="text-sm">Phone: +91-9876543210</p>
                    <p className="text-sm">Address: Mumbai, India</p>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 ">Follow Us</h3>
                    <div className="flex space-x-4 text-xl flex justify-between sm:justify-start  w-full ">
                        <a href="#" aria-label="Instagram" className="hover:text-lightPink"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" aria-label="Twitter" className="hover:text-lightPink"><i className="fa-brands fa-linkedin"></i></a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-lightPink"><i className="fa-brands fa-github"></i></a>
                        <a href="#" aria-label="Facebook" className="hover:text-lightPink"><i className="fa-solid fa-briefcase"></i></a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
  