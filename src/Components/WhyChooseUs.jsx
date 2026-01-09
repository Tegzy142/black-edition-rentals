const WhyChooseUs = () => {
  return (
    <section className="bg-zinc-950 py-24">
      <div className="max-w-7xl mx-auto px-8">
       <h2 className="text-4xl md:text-4xl text-white font-light text-center mb-20 -mt-10">
               Why Choose Tegzy Luxury
        </h2>


        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Elite Fleet",
              desc: "Handpicked luxury and performance vehicles, always in pristine condition.",
            },
            {
              title: "Seamless Booking",
              desc: "Quick, transparent, and fully online booking experience.",
            },
            {
              title: "White-Glove Service",
              desc: "Optional delivery, concierge support, and premium treatment.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative rounded-xl p-[1px] group"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-xl bg-[conic-gradient(from_0deg,#2563eb,transparent,transparent,#2563eb)] animate-spin-slow group-hover:animate-none"></div>

              {/* Card Content */}
              <div className="relative rounded-xl bg-zinc-900 p-8 h-full">
                <h3 className="text-xl text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom animation */}
      <style>
        {`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 6s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default WhyChooseUs;
