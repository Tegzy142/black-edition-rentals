const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 py-10">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Black Edition Rentals. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
