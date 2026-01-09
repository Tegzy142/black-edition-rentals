import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";
import CarCard from "../Components/CarCard";
import Footer from "../Components/Footer";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATE
  const [brandFilter, setBrandFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("none");

  useEffect(() => {
    let mounted = true;

    const fetchCars = async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("id, brand, description, price, image");

      if (!error && mounted) {
        setCars(data || []);
      }

      if (mounted) setLoading(false);
    };

    fetchCars();

    return () => {
      mounted = false;
    };
  }, []);

  // FILTER + SORT (derived state, memoized)
  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (brandFilter !== "all") {
      result = result.filter((car) => car.brand === brandFilter);
    }

    if (priceSort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (priceSort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [cars, brandFilter, priceSort]);

  // UNIQUE BRANDS
  const brands = useMemo(
    () => ["all", ...new Set(cars.map((car) => car.brand))],
    [cars]
  );

  if (loading) {
    return (
      <section
        className="min-h-screen bg-black text-white p-8"
        role="status"
        aria-live="polite"
      >
        Loading cars...
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-light mb-12">
          Available Luxury Cars
        </h1>

        {/* FILTER BAR */}
        <div className="flex flex-wrap gap-6 mb-14">
          {/* BRAND FILTER */}
          <label className="sr-only" htmlFor="brand-filter">
            Filter by brand
          </label>
          <select
            id="brand-filter"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2 text-sm"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand === "all" ? "All Brands" : brand}
              </option>
            ))}
          </select>

          {/* PRICE SORT */}
          <label className="sr-only" htmlFor="price-sort">
            Sort by price
          </label>
          <select
            id="price-sort"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2 text-sm"
          >
            <option value="none">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

        {/* GRID */}
        {filteredCars.length === 0 ? (
          <p className="text-gray-400">
            No cars match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </section>
  );
};

export default Cars;
