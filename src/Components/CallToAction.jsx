const CallToAction = () => {
  return (
    <section className="bg-zinc-950 py-24">
      <div className="max-w-5xl mx-auto px-8 text-center">
        <h2 className="text-4xl text-white font-light mb-6">
          Ready to Drive Something Extraordinary?
        </h2>

        <p className="text-gray-400 mb-10 text-lg">
          Choose your car, pick your dates, and enjoy the ride.
        </p>

        <a
          href="/cars"
          className="inline-block bg-blue-600 px-10 py-4 rounded-xl text-white text-lg hover:bg-blue-700 transition"
        >
          View Available Cars
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
