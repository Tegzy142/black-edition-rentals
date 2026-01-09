import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // PROTECT ROUTE
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading dashboard...</p>
      </section>
    );
  }

  if (!user) return null;

  return (
    <section className="min-h-screen bg-black text-white pt-32 px-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-2">
            Welcome back
          </h1>
          <p className="text-gray-400">
            {user.email}
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* BOOKINGS */}
          <Link
            to="/bookings"
            className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800
            hover:border-blue-500 transition"
          >
            <h2 className="text-xl mb-2">My Bookings</h2>
            <p className="text-gray-400 text-sm">
              View and manage your reservations
            </p>
          </Link>

          {/* BROWSE */}
          <Link
            to="/cars"
            className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800
            hover:border-blue-500 transition"
          >
            <h2 className="text-xl mb-2">Browse Cars</h2>
            <p className="text-gray-400 text-sm">
              Explore our elite fleet
            </p>
          </Link>

          {/* CONTACT */}
          <Link
            to="/contact"
            className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800
            hover:border-blue-500 transition"
          >
            <h2 className="text-xl mb-2">Support</h2>
            <p className="text-gray-400 text-sm">
              Get help or request changes
            </p>
          </Link>
        </div>

        {/* LOGOUT */}
        <div className="mt-16">
          <button
            onClick={handleLogout}
            className="px-6 py-3 border border-red-500 text-red-400 rounded-lg
            hover:bg-red-500 hover:text-white transition"
          >
            Log out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
