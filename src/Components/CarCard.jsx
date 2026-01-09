import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <article
      className="group bg-zinc-900 rounded-2xl overflow-hidden transition
      hover:-translate-y-2 will-change-transform"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* IMAGE */}
      <div className="aspect-[3/4] overflow-hidden bg-black">
        <img
          src={car.image}
          alt={`${car.brand} luxury rental car`}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-700
          group-hover:scale-110"
          itemProp="image"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col gap-4">
        <h3
          className="text-white text-2xl font-light"
          itemProp="name"
        >
          {car.brand}
        </h3>

        <p
          className="text-gray-400 text-sm line-clamp-2"
          itemProp="description"
        >
          {car.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span
            className="text-blue-400 text-lg font-semibold"
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="price" content={car.price} />
            ${car.price} / day
          </span>

          <Link
            to={`/cars/${car.id}`}
            aria-label={`Rent ${car.brand}`}
            className="px-4 py-2 border border-blue-500 text-white text-sm
            rounded-md hover:bg-blue-600 hover:border-blue-600 transition-colors"
          >
            Rent Now
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
