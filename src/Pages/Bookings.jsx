import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // cancellation state
  const [cancelId, setCancelId] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { redirectTo: "/bookings" } });
      return;
    }

    let mounted = true;

    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          start_date,
          end_date,
          total_price,
          delivery,
          created_at,
          cars (
            id,
            brand,
            image
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && mounted) {
        setBookings(data || []);
      }

      if (mounted) setLoading(false);
    };

    fetchBookings();

    return () => {
      mounted = false;
    };
  }, [user, navigate]);

  const handleCancel = async () => {
    if (!cancelId || cancelLoading) return;

    setCancelLoading(true);

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", cancelId)
      .eq("user_id", user.id);

    if (!error) {
      setBookings((prev) =>
        prev.filter((booking) => booking.id !== cancelId)
      );
    }

    setCancelId(null);
    setCancelLoading(false);
  };

  if (loading) {
    return (
      <section
        className="min-h-screen bg-black text-white pt-32 px-8"
        role="status"
        aria-live="polite"
      >
        Loading your bookings…
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white pt-32 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-light mb-14">
          Your Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
            <p className="text-gray-400 mb-6">
              You haven’t made any bookings yet.
            </p>

            <Link
              to="/cars"
              className="inline-block border border-blue-500 px-6 py-3 rounded
              hover:bg-blue-600 hover:border-blue-600 transition"
            >
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {bookings.map((booking) => {
              const car = booking.cars;

              if (!car) return null;

              return (
                <article
                  key={booking.id}
                  className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800"
                >
                  {/* IMAGE */}
                  <div className="h-56 overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.brand} rental`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 space-y-3">
                    <h2 className="text-2xl font-light">
                      {car.brand}
                    </h2>

                    <p className="text-sm text-gray-400">
                      {new Date(booking.start_date).toLocaleDateString()} →{" "}
                      {new Date(booking.end_date).toLocaleDateString()}
                    </p>

                    {booking.delivery && (
                      <p className="text-sm text-blue-400">
                        Chauffeur delivery included
                      </p>
                    )}

                    <p className="text-blue-400 text-lg font-semibold">
                      Total: ${booking.total_price}
                    </p>

                    <div className="flex justify-between items-center pt-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                        Confirmed
                      </span>

                      <div className="flex gap-3">
                        <Link
                          to={`/cars/${car.id}`}
                          className="text-sm border border-blue-500 px-4 py-2 rounded
                          hover:bg-blue-600 hover:border-blue-600 transition"
                        >
                          View Car
                        </Link>

                        <button
                          onClick={() => setCancelId(booking.id)}
                          className="text-sm border border-red-500 px-4 py-2 rounded
                          text-red-400 hover:bg-red-500 hover:text-white transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* CONFIRMATION MODAL */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md text-center">
            <h3 className="text-xl mb-4">
              Cancel this booking?
            </h3>

            <p className="text-gray-400 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCancelId(null)}
                className="px-6 py-3 border border-zinc-600 rounded hover:bg-zinc-800 transition"
              >
                Keep Booking
              </button>

              <button
                onClick={handleCancel}
                disabled={cancelLoading}
                className="px-6 py-3 bg-red-600 rounded hover:bg-red-700 transition disabled:bg-zinc-700"
              >
                {cancelLoading ? "Cancelling…" : "Cancel Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Bookings;


























// import { useBookings } from "../context/BookingContext";

// const Bookings = () => {
//   const { bookings } = useBookings();

//   return (
//     <section className="min-h-screen bg-black text-white pt-32 px-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-light mb-8">My Bookings</h1>

//         {bookings.length === 0 ? (
//           <p className="text-gray-400">No bookings yet.</p>
//         ) : (
//           <div className="space-y-6">
//             {bookings.map((booking) => (
//               <div
//                 key={booking.id}
//                 className="border border-zinc-700 rounded-xl p-6"
//               >
//                 <h2 className="text-xl mb-2">{booking.carName}</h2>

//                 <p className="text-gray-400">
//                   {booking.startDate} → {booking.endDate} ({booking.days} days)
//                 </p>

//                 <p className="text-blue-400 mt-2">
//                   Total: ${booking.totalPrice}
//                 </p>

//                 <p className="text-sm text-gray-500 mt-1">
//                   Delivery: {booking.delivery ? "Yes" : "No"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Bookings;





