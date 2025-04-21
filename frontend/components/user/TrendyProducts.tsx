import Image from "next/image";

const products = [
  { id: 1, image: "/download (1).jpeg", label: "Offer 20%" },
  { id: 2, image: "/download (1).jpeg" },
  { id: 3, image: "/download (1).jpeg" },
  { id: 4, image: "/download (1).jpeg" },
  { id: 5, image: "/download (1).jpeg", label: "Offer 20%" },
  { id: 6, image: "/download (1).jpeg" },
];

const TrendyProducts = () => {
  return (
    <section className="py-12">
      <h3 className="text-center text-gray-500 uppercase">Hot items of this year</h3>
      <h2 className="text-center text-2xl font-bold">TRENDY PRODUCTS</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-4 md:px-14">
        {products.map((product) => (
          <div key={product.id} className="relative p-4 bg-gray-100 rounded-lg">
            {product.label && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.label}
              </span>
            )}
            <Image
              src={product.image}
              alt="Product Image"
              width={300}
              height={400}
              className="object-cover w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendyProducts;
