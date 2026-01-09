import Footer from "../Components/Footer";

const Contact = () => {
  return (
    <>
      {/* HERO HEADER */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Text */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Have a question, special request, or need concierge assistance?
            Our team is ready to help.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16">
          {/* CONTACT INFO */}
          <div>
            <h2 className="text-2xl text-white mb-6">
              Contact Information
            </h2>

            <p className="text-gray-400 mb-4">
              <span className="text-white">Email:</span><br />
              support@tegzyluxury.com
            </p>

            <p className="text-gray-400 mb-4">
              <span className="text-white">Phone:</span><br />
              +1 (555) 123-4567
            </p>

            <p className="text-gray-400">
              <span className="text-white">Location:</span><br />
              Lagos, Nigeria
            </p>
          </div>

          {/* FORM */}
          <form className="bg-zinc-900 p-8 rounded-2xl space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-black border border-zinc-700 rounded-md p-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-black border border-zinc-700 rounded-md p-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                className="w-full bg-black border border-zinc-700 rounded-md p-3 text-white"
              ></textarea>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-md text-white">
              Send Message
            </button>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Contact;
