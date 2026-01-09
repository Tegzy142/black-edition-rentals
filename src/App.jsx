import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Navbar from "./Components/Navbar";

/* =========================
   LAZY LOADED PAGES
========================= */
const Home = lazy(() => import("./Pages/Home"));
const Cars = lazy(() => import("./Pages/Cars"));
const CarDetails = lazy(() => import("./Components/CarDetails"));
const Bookings = lazy(() => import("./Pages/Bookings"));
const Auth = lazy(() => import("./Pages/Auth"));
const Contact = lazy(() => import("./Pages/Contact"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));

/* =========================
   SEO HANDLER
========================= */
const SEO = () => {
  const location = useLocation();

  const meta = {
    "/": {
      title: "Luxury Car Rentals | Black Edition",
      description:
        "Premium luxury car rentals with chauffeur service. Book exclusive vehicles with Black Edition.",
    },
    "/cars": {
      title: "Browse Luxury Cars | Black Edition",
      description:
        "Explore our collection of high-end luxury vehicles available for rent.",
    },
    "/bookings": {
      title: "Your Bookings | Black Edition",
      description:
        "Manage your luxury car bookings and reservations.",
    },
    "/contact": {
      title: "Contact Us | Black Edition",
      description:
        "Get in touch with Black Edition for luxury car rental inquiries.",
    },
    "/dashboard": {
      title: "Dashboard | Black Edition",
      description:
        "Your personal dashboard for managing your Black Edition account.",
    },
    "/auth": {
      title: "Login | Black Edition",
      description:
        "Login or create an account to book luxury vehicles.",
    },
  };

  const current = meta[location.pathname] || {
    title: "Black Edition Luxury Rentals",
    description:
      "Luxury car rental experience with premium vehicles and service.",
  };

  return (
    <Helmet>
      <title>{current.title}</title>
      <meta name="description" content={current.description} />
    </Helmet>
  );
};

/* =========================
   APP
========================= */
function App() {
  return (
    <>
      <SEO />
      <Navbar />

      <Suspense
        fallback={
          <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
            Loading experience…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
