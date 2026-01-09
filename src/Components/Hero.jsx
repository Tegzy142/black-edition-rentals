const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* HERO IMAGE (LCP Optimized) */}
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
        alt="Luxury car rental experience with premium vehicles"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <p className="text-sm uppercase tracking-widest text-gray-300 mb-4">
          Premium Car Rental
        </p>

        <h1 className="text-5xl md:text-7xl font-light text-white leading-tight">
          Rent Elite Cars <br />
          <span className="font-semibold">Drive the Experience</span>
        </h1>

        <p className="text-gray-300 mt-6 max-w-xl text-lg">
          Luxury and performance vehicles available for daily or weekly rental.
          Delivered to your doorstep or ready for pickup.
        </p>

        <div className="flex gap-4 mt-10">
          <a
            href="/cars"
            className="px-6 py-3 bg-blue-600 text-white rounded-md
            hover:bg-blue-700 transition"
          >
            Rent a Car
          </a>

          <a
            href="/cars"
            className="px-6 py-3 border border-gray-400 text-white rounded-md
            hover:bg-white hover:text-black transition"
          >
            View Fleet
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;



























// const Hero = () => {
//   return (
//     <section
//       className="relative min-h-screen flex items-center"
//       aria-label="Luxury car rental hero section"
//     >
//       {/* BACKGROUND IMAGE (performance-optimized) */}
//       <img
//         src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80"
//         alt="Luxury sports car available for premium rental"
//         className="absolute inset-0 w-full h-full object-cover"
//         loading="eager"
//         fetchpriority="high"
//       />

//       {/* DARK OVERLAY */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* CONTENT */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
//         <p className="text-sm uppercase tracking-widest text-gray-300 mb-4">
//           Premium Car Rental
//         </p>

//         {/* MAIN H1 (this is your REAL SEO H1 now) */}
//         <h1 className="text-5xl md:text-7xl font-light text-white leading-tight">
//           Rent Elite Cars <br />
//           <span className="font-semibold">Drive the Experience</span>
//         </h1>

//         <p className="text-gray-300 mt-6 max-w-xl text-lg">
//           Luxury and performance vehicles available for daily or weekly rental.
//           Delivered to your doorstep or ready for pickup.
//         </p>

//         <div className="flex gap-4 mt-10">
//           <a
//             href="/cars"
//             className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//           >
//             Rent a Car
//           </a>

//           <a
//             href="/cars"
//             className="px-6 py-3 border border-gray-400 text-white rounded-md hover:bg-white hover:text-black transition"
//           >
//             View Fleet
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
















// const Hero = () => {
//   return (
//     <section
//     className="h-screen bg-cover bg-center"
//     style={{
//       backgroundImage:
//       "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80')"
//     }}
//     >
//       <div className="h-full w-full bg-black/40 flex items-center">
//         <div className="max-w-4xl px-8 text-white">

//           <p className="uppercase tracking-widest text-sm text-gray-400">
//             Premium Car Rental
//           </p>

//           <h1 className="text-6xl font-light mt-4 leading-tight">Rent Elite Cars
//           <br />
//           <span className="font-semibold">Drive the Experience</span>
//           </h1>

//           <p className="mt-6 text-gray-300 text-lg max-w-xl">
//              Luxury and performance vehicles available for daily or weekly rental.
//             Delivered to you or ready for pickup.
//           </p>

//           <div className="mt-10 flex gap-4">
//             <button className="px-8 py-4 bg-blue-500 text-black font-semibold rounded-lg hover:bg-blue-400 transition">
//               Rent a Car
//             </button>

//             <button className="px-8 py-4 border border-gray-500 rounded-lg hover:border-white transition">
//               View Fleet

//             </button>

//           </div>

//         </div>
//       </div>

//     </section>
//   );
// };

// export default Hero






