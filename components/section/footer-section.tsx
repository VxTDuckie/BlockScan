import { Github, Twitter, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-footer text-white border-t border-subsection__grey w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1: Logo and Brand Name */}
            <div className="space-y-4 text-center">
              <img src="/images/logo.png" alt="BlockScan Logo" className="w-20 sm:w-24 h-auto mx-auto" />
              <h4 className="bg-gradient-to-r from-primary-red via-pink-500 to-purple-600 text-transparent bg-clip-text font-bold text-3xl sm:text-4xl">BlockScan</h4>
            </div>

            {/* Column 2: Address Information */}
            <div className="space-y-2 sm:space-y-4 text-center">
              <h4 className="text-lg font-semibold">Hồ Chí Minh City</h4>
              <p className="text-sm sm:text-base">
                A35 Bạch Đằng, Quận Tân Bình
              </p>
            </div>

            {/* Column 3: Contact Information */}
            <div className="space-y-2 sm:space-y-4 text-center">
              <h4 className="text-lg font-semibold">Contact Through</h4>
              <ul className="space-y-2">
                <li className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">nguyenphuoc4805@gmail.com</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">+84 7988 96 946</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-2 sm:space-y-4 text-center lg:text-right">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex justify-center lg:justify-end space-x-4">
              <a href="https://github.com/Levironexe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-red transition-all duration-300 ease-in-out transform hover:scale-110">
                <Github className="w-6 h-6 sm:w-7 sm:h-7" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://x.com/yourmom" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-red transition-all duration-300 ease-in-out transform hover:scale-110">
                <Twitter className="w-6 h-6 sm:w-7 sm:h-7" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61566144360040" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-red transition-all duration-300 ease-in-out transform hover:scale-110">
                <Facebook className="w-6 h-6 sm:w-7 sm:h-7" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-subtitle__grey text-xs sm:text-sm text-center text-gray-400">
          <p>&copy; 2024 BlockScan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}