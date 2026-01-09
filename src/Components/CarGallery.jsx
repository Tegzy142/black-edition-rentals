import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CarCard from "./CarCard";

const CarGallery = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <section
        className="bg-black py-32 text-center text-gray-400"
        role="status"
        aria-live="polite"
      >
        Loading cars...
      </section>
    );
  }

  return (
    <section
      className="bg-black py-28"
      aria-labelledby="available-cars-heading"
    >
      <div className="max-w-7xl mx-auto px-8">
        <h2
          id="available-cars-heading"
          className="text-white text-4xl text-center font-light mb-16"
        >
          Available Luxury Cars for Rent
        </h2>

        {cars.length === 0 ? (
          <p className="text-center text-gray-400">
            No cars available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CarGallery;
