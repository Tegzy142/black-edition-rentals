import { Helmet } from "react-helmet-async";
import Hero from "../Components/Hero";
import TrustSignals from "../Components/TrustSignals";
import WhyChooseUs from "../Components/WhyChooseUs";
import CarGallery from "../Components/CarGallery";
import Reviews from "../Components/Reviews";
import CallToAction from "../Components/CallToAction";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      {/* PAGE-LEVEL SEO (extra boost) */}
      <Helmet>
        <link rel="canonical" href="https://blackedition.com/" />
      </Helmet>

      {/* SEMANTIC MAIN */}
      <main>
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Luxury Car Rentals with Chauffeur Service
        </h1>

        <Hero />
        <TrustSignals />
        <WhyChooseUs />
        <CarGallery />
        <Reviews />
        <CallToAction />
        <Footer />
      </main>
    </>
  );
};

export default Home;



