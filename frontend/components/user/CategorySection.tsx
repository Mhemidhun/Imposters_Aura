import Image from "next/image";

const categories = [
  {
    title: "FOR HER",
    subtitle: "Best Selling Deals",
    image:
      "/Download premium image of T-shirt laughing smile white_  by Tanasiri about white t-shirt, face, person, mockup, and portrait 12477761.jpeg",
  },
  { title: "Accessories", subtitle: "Hot Trends", image: "/download (1).jpeg" },
  { title: "FOR HIM", subtitle: "New Collection", image: "/download.jpeg" },
];

export default function CategorySection() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg cursor-pointer h-[600px]"
          >
            <Image
              src={category.image}
              alt={category.title}
              layout="fill" // Ensures it fills the div
              objectFit="cover" // Crops and fills while maintaining aspect ratio
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
              <h2 className="text-4xl font-bold">{category.title}</h2>
              <p className="text-lg">{category.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
