const Reviews = () => {
  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl text-white font-light text-center mb-14">
          What Our Clients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "James R.",
              text: "Flawless experience. The car was immaculate and the service unmatched.",
            },
            {
              name: "Sophia L.",
              text: "Best luxury rental service I’ve ever used. Highly recommended.",
            },
            {
              name: "Daniel K.",
              text: "From booking to delivery — absolute perfection.",
            },
          ].map((review, i) => (
            <div key={i} className="animated-border rounded-2xl">
              <div className="relative z-10 bg-zinc-900 p-8 rounded-2xl h-full">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  “{review.text}”
                </p>
                <p className="text-white font-semibold">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
