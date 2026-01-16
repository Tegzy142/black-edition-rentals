import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // BOOKING STATE
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [days, setDays] = useState(0);

  // PAYMENT STATE
  const [showPayment, setShowPayment] = useState(false);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  // FETCH CAR
  useEffect(() => {
    const fetchCar = async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setCar(data);

      const { data: related } = await supabase
        .from("cars")
        .select("*")
        .neq("id", id)
        .limit(3);

      setSimilarCars(related || []);
      setLoading(false);
    };

    fetchCar();
  }, [id]);

  // CALCULATE PRICE
  useEffect(() => {
    if (!startDate || !endDate || !car) {
      setTotalPrice(0);
      setDays(0);
      return;
    }

    const diff =
      (new Date(endDate) - new Date(startDate)) /
      (1000 * 60 * 60 * 24);

    if (diff > 0) {
      setDays(diff);
      setTotalPrice(diff * car.price + (delivery ? 50 : 0));
    } else {
      setDays(0);
      setTotalPrice(0);
    }
  }, [startDate, endDate, delivery, car]);

  // STEP 1 — PROCEED TO PAYMENT
  const handleProceedToPayment = () => {
    if (!user) {
      navigate("/auth", { state: { redirectTo: `/cars/${id}` } });
      return;
    }

    if (!totalPrice) return;
    setShowPayment(true);
  };

  // STEP 2 — FAKE PAYMENT + SAVE BOOKING
  const handleFakePayment = async () => {
    setPaying(true);

    setTimeout(async () => {
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            car_id: car.id,
            start_date: startDate,
            end_date: endDate,
            total_price: totalPrice,
            delivery,
            payment_status: "paid",
          },
        ])
        .select();

      if (error) {
        console.error("BOOKING INSERT ERROR:", error);
        alert(error.message);
        setPaying(false);
        return;
      }

      console.log("BOOKING SAVED:", data);

      setPaying(false);
      setShowPayment(false);
      setSuccess(true);

      setStartDate("");
      setEndDate("");
      setDelivery(false);
      setTotalPrice(0);
    }, 1500);
  };

  if (loading) return <p className="text-white p-8">Loading...</p>;
  if (!car) return <p className="text-white p-8">Car not found</p>;

  return (
    <section className="min-h-screen bg-black text-white px-8 py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-light mb-6">{car.brand}</h1>
          <p className="text-gray-300 mb-8">{car.description}</p>
          <p className="text-blue-400 text-3xl mb-8">${car.price} / day</p>

          <div className="bg-zinc-900 rounded-2xl p-6 space-y-4 border border-zinc-800">

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 bg-black border border-zinc-700 rounded"
            />

            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={!startDate}
              className="w-full p-3 bg-black border border-zinc-700 rounded"
            />

            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={delivery}
                onChange={(e) => setDelivery(e.target.checked)}
              />
              Chauffeur delivery (+$50)
            </label>

            {totalPrice > 0 && (
              <div className="border-t border-zinc-700 pt-4 text-sm space-y-1">
                <p>{days} day(s) × ${car.price}</p>
                {delivery && <p>Delivery: $50</p>}
                <p className="text-blue-400 text-lg font-semibold">
                  Total: ${totalPrice}
                </p>
              </div>
            )}

            <button
              onClick={handleProceedToPayment}
              disabled={!totalPrice}
              className="w-full mt-4 bg-blue-600 py-3 rounded-lg hover:bg-blue-700 disabled:bg-zinc-700 transition"
            >
              Proceed to Payment
            </button>

            {success && (
              <p className="text-green-400 text-sm pt-2">
                ✅ Payment successful. Booking confirmed.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="h-[500px] rounded-2xl overflow-hidden">
          <img
            src={car.image}
            alt={car.brand}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl mb-4">Payment</h3>

            <div className="space-y-3 text-sm text-gray-400">
              <input
                placeholder="4242 4242 4242 4242"
                className="w-full p-3 bg-black border border-zinc-700 rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="MM / YY"
                  className="p-3 bg-black border border-zinc-700 rounded"
                />
                <input
                  placeholder="CVC"
                  className="p-3 bg-black border border-zinc-700 rounded"
                />
              </div>
            </div>

            <button
              onClick={handleFakePayment}
              disabled={paying}
              className="w-full mt-6 bg-blue-600 py-3 rounded hover:bg-blue-700 transition disabled:bg-zinc-700"
            >
              {paying ? "Processing..." : `Pay $${totalPrice}`}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CarDetails;






// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// const CarDetails = () => {
//   const { id } = useParams();

//   const [car, setCar] = useState(null);
//   const [similarCars, setSimilarCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [visible, setVisible] = useState(false);

//   // BOOKING STATE
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [delivery, setDelivery] = useState(false);
//   const [totalDays, setTotalDays] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // BRAND LOGOS
//   const getBrandLogo = (brand) => {
//     const logos = {
//       BMW: "/logos/bmw.svg",
//       Lamborghini: "/logos/lamborghini.svg",
//       Mercedes: "/logos/mercedes.svg",
//       Porsche: "/logos/porsche.svg",
//       Bentley: "/logos/bentley.svg",
//       "Range Rover": "/logos/rangerover.svg",
//     };
//     return logos[brand] || null;
//   };

//   // FETCH CAR + SIMILAR CARS
//   useEffect(() => {
//     const fetchCar = async () => {
//       const { data, error } = await supabase
//         .from("cars")
//         .select("*")
//         .eq("id", id)
//         .single();

//       if (error) {
//         console.error(error);
//         setLoading(false);
//         return;
//       }

//       setCar(data);

//       const { data: related } = await supabase
//         .from("cars")
//         .select("*")
//         .neq("id", id)
//         .limit(3);

//       setSimilarCars(related || []);
//       setLoading(false);
//       setTimeout(() => setVisible(true), 100);
//     };

//     fetchCar();
//   }, [id]);

//   // CALCULATE PRICE
//   useEffect(() => {
//     if (!startDate || !endDate || !car) return;

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const days =
//       Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 0;

//     if (days > 0) {
//       setTotalDays(days);
//       setTotalPrice(days * car.price + (delivery ? 50 : 0));
//     } else {
//       setTotalDays(0);
//       setTotalPrice(0);
//     }
//   }, [startDate, endDate, delivery, car]);

//   // BOOKING FUNCTION
//   const handleBooking = async () => {
//     if (!totalPrice) return;

//     const { error } = await supabase.from("bookings").insert([
//       {
//         car_id: car.id,
//         car_name: car.brand,
//         start_date: startDate,
//         end_date: endDate,
//         total_days: totalDays,
//         total_price: totalPrice,
//         delivery,
//       },
//     ]);

//     if (error) {
//       alert("Booking failed");
//       console.error(error);
//     } else {
//       alert("Booking successful!");
//     }
//   };

//   // LOADING STATES
//   if (loading) {
//     return <p className="text-white p-8">Loading car...</p>;
//   }

//   if (!car) {
//     return <p className="text-white p-8">Car not found</p>;
//   }

//   return (
//     <section className="min-h-screen bg-black text-white px-8 py-20">
//       {/* MAIN CONTENT */}
//       <div
//         className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center
//         transition-all duration-700
//         ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
//       >
//         {/* LEFT */}
//         <div>
//           {getBrandLogo(car.brand) && (
//             <img
//               src={getBrandLogo(car.brand)}
//               alt={car.brand}
//               className="h-10 mb-6 opacity-80"
//             />
//           )}

//           <h1 className="text-5xl font-light mb-6">{car.brand}</h1>

//           <p className="text-gray-300 text-lg mb-8">
//             {car.description}
//           </p>

//           <p className="text-blue-400 text-3xl font-semibold mb-8">
//             ${car.price} <span className="text-lg font-normal">/ day</span>
//           </p>

//           {/* BOOKING UI */}
//           <div className="space-y-4 mb-8">
//             <div>
//               <label className="block text-sm text-gray-400 mb-1">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-400 mb-1">
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded"
//               />
//             </div>

//             <label className="flex items-center gap-3 text-sm">
//               <input
//                 type="checkbox"
//                 checked={delivery}
//                 onChange={(e) => setDelivery(e.target.checked)}
//               />
//               Chauffeur delivery (+$50)
//             </label>

//             {totalPrice > 0 && (
//               <p className="text-lg text-blue-400">
//                 Total: ${totalPrice} ({totalDays} days)
//               </p>
//             )}
//           </div>

//           <button
//             onClick={handleBooking}
//             disabled={!totalPrice}
//             className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 transition"
//           >
//             Confirm Booking
//           </button>
//         </div>

//         {/* RIGHT */}
//         <div className="w-full h-[500px] rounded-2xl overflow-hidden">
//           <img
//             src={car.image}
//             alt={car.brand}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* SIMILAR CARS */}
//       {similarCars.length > 0 && (
//         <div className="max-w-7xl mx-auto py-24">
//           <h2 className="text-3xl font-light mb-12">Similar Cars</h2>

//           <div className="grid md:grid-cols-3 gap-10">
//             {similarCars.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-zinc-900 rounded-xl overflow-hidden hover:-translate-y-2 transition"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.brand}
//                   className="h-64 w-full object-cover"
//                 />

//                 <div className="p-6">
//                   <h3 className="text-xl mb-2">{item.brand}</h3>
//                   <p className="text-blue-400 font-semibold">
//                     ${item.price} / day
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default CarDetails;
