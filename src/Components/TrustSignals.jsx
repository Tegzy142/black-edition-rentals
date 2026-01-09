const TrustSignals = () => {
  return (
    <section className="bg-black py-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          { title: "500+", label: "Happy Clients" },
          { title: "50+", label: "Luxury Cars" },
          { title: "24/7", label: "Support" },
          { title: "5★", label: "Average Rating" },
        ].map((item, i) => (
          <div key={i}>
            <h3 className="text-4xl text-white font-light">{item.title}</h3>
            <p className="text-gray-400 mt-2 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSignals;
