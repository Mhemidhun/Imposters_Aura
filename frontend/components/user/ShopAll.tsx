import Image from 'next/image';

const products = [
  {
    id: 1,
    name: "Drawstring Dress",
    category: "Women",
    price: 159.99,
    originalPrice: 730,
    image: "/download.jpeg",
    sale: true,
  },
  {
    id: 2,
    name: "Mesh Brown Sandal",
    category: "Accessories",
    price: 190.0,
    image: "/download.jpeg",
  },
  {
    id: 3,
    name: "Tribal Grey Blazer",
    category: "Women",
    price: 330.0,
    image: "/download.jpeg",
  },
];

export default function ShopPage() {
  return (
    <div className="container mx-auto p-4 pt-[120px]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 p-4 border-r">
          <h2 className="font-bold text-lg mb-4">CATEGORIES</h2>
          <ul>
            {['Women', 'Men', 'Accessories', 'Bags', 'Watches', 'Shoes'].map((category) => (
              <li key={category} className="py-1 cursor-pointer hover:underline">
                {category}
              </li>
            ))}
          </ul>
          <h2 className="font-bold text-lg mt-6 mb-2">FILTER BY PRICE</h2>
          <input type="range" className="w-full" />
        </aside>

        {/* Product Grid */}
        <section className="w-3/4 p-4 grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 relative group">
              {product.sale && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">SALE</span>
              )}
              <Image src={product.image} alt={product.name} width={200} height={250} className="w-full" />
              <button className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                QUICK VIEW
              </button>
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="text-lg font-bold">
                ${product.price.toFixed(2)}{' '}
                {product.originalPrice && <span className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</span>}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
