import { Github, Twitter, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-footer text-white border-t border-subsection__grey w-full relative"> {/* Đảm bảo chiều rộng full */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-12"> 
        {/* Grid with 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full justify-items-center"> {/* justify-items-center giúp căn giữa */}
          
          {/* Column 1: Logo and Brand Name */}
          <div className="space-y-4 text-center"> {/* text-center để căn giữa text */}
            <img src="/images/logo.png" alt="BlockScan Logo" className="w-24 h-auto mx-auto" />
            <h4 className="bg-gradient-to-r from-primary-red via-pink-500 to-purple-600 text-transparent bg-clip-text font-bold text-4xl">BlockScan</h4> {/* Tăng kích thước chữ BlockScan */}
          </div>

          {/* Column 2: Address Information */}
          <div className="space-y-4 text-center"> {/* text-center để căn giữa text */}
            <h4 className="text-lg font-semibold">Hồ Chí Minh City</h4>
            <p className="text-[15px]">
              A35 Bạch Đằng, Quận Tân Bình
            </p>
          </div>

          {/* Column 3: Contact Information */}
          <div className="space-y-4 text-center"> {/* text-center để căn giữa text */}
            <h4 className="text-lg font-semibold">Contact Through</h4>
            <ul className="space-y-2">
              <li className="flex items-center justify-center space-x-2"> {/* justify-center để căn giữa */}
                <Mail className="w-5 h-5" />
                <span className='text-[15px]'>nguyenphuoc4805@gmail.com</span>
              </li>
              <li className="flex items-center justify-center space-x-2"> {/* justify-center để căn giữa */}
                <Phone className="w-5 h-5" />
                <span className='text-[15px]'>+84 7988 96 946</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-4 text-center"> {/* text-center để căn giữa text */}
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex justify-center space-x-4"> {/* justify-center để căn giữa các biểu tượng */}
              {/* GitHub Link */}
              <button>
              <a href="https://github.com/Levironexe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-red transition-colors">
                <Github className="w-7 h-7" />
                <span className="sr-only">GitHub</span>
              </a>
              </button>
              
              {/* Twitter Link */}
              <button>
              <a href="https://x.com/yourmom" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-red transition-colors">
                <Twitter className="w-7 h-7" />
                <span className="sr-only">Twitter</span>
              </a>
              </button>
              
              {/* Facebook Link */}
              <button>
              <a href="https://www.facebook.com/profile.php?id=61566144360040" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-red transition-colors">
                <Facebook className="w-7 h-7" />
                <span className="sr-only">Facebook</span>
              </a>
              </button>

            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 pt-8 border-t border-subtitle__grey text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BlockScan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}