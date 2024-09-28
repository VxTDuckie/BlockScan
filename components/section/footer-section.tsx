import { Github, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-footer white border-t border-subsection__grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold white">Contact Information</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 white" />
                <span className='text-[15px]'>nguyenphuoc4805@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 white" />
                <span className='text-[15px]'>+84 7988 96 946</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 white" />
                <span className='text-[15px]'>Your mom house</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold white text-right">Connect</h4>
            <div className="flex justify-end space-x-4">
              <a href="https://github.com/Levironexe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-red transition-colors">
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://x.com/yourmom" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-re transition-colors">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61566144360040" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-red transition-colors">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-subtitle__grey text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BlockScan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}