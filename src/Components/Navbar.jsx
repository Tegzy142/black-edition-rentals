import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-white text-xl font-semibold">
          Black Edition
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-blue-500 transition">
            Home
          </Link>

          <Link to="/cars" className="text-gray-300 hover:text-blue-500 transition">
            Cars
          </Link>

          <Link to="/contact" className="text-gray-300 hover:text-blue-500 transition">
            Contact
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-blue-500 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-500 text-red-400 rounded-md
                hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black px-6 pb-6 space-y-4">
          <Link to="/" onClick={() => setOpen(false)} className="block text-gray-300">
            Home
          </Link>

          <Link to="/cars" onClick={() => setOpen(false)} className="block text-gray-300">
            Cars
          </Link>

          <Link to="/contact" onClick={() => setOpen(false)} className="block text-gray-300">
            Contact
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="block text-gray-300"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="w-full border border-red-500 text-red-400 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="block bg-blue-600 text-white px-4 py-2 rounded-md text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
