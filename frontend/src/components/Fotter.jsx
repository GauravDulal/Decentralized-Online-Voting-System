import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#05080F] text-gray-400 rounded-lg px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-center sm:text-left">
          © 2024 DVSUB, Inc. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-white transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaXTwitter />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
