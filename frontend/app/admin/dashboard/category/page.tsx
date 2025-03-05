"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddCategoryPage from "@/components/admin/dashboard/category/add-category";

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

const categoriesData: Category[] = [
  {
    id: 1,
    name: "Electronics",
    image: "https://via.placeholder.com/50",
    description: "Devices, gadgets, and technology-related products.",
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://via.placeholder.com/50",
    description: "Clothing, accessories, and apparel.",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://via.placeholder.com/50",
    description: "Furniture, appliances, and kitchen essentials.",
  },
];

export default function CategoryPage() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(categoriesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddCategory,setIsAddCategory]=useState(false)
  const itemsPerPage = 5;

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <>
      <div className="bg-[#151c2c]   box-border text-white flex flex-col p-[20px]">
        <div className="menu flex-1 bg-[#182237] p-4 rounded-lg">
          {/* Top Section (Search & Add Category) */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/3 px-3 py-2 rounded-md bg-[#1f2a40] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={()=>setIsAddCategory((isOpen:boolean)=>!isOpen)}
              >
              Add Category
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#1f2a40] text-white">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-700 hover:bg-[#1f2a40]">
                    <td className="p-3">
                      <img src={category.image} alt={category.name} className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="p-3">{category.name}</td>
                    <td className="p-3 max-w-[200px] truncate" title={category.description}>
                      {category.description}
                    </td>
                    <td className="p-3 text-center">
                      <button className="text-yellow-400 hover:text-yellow-500 px-2">
                        <Pencil size={18} />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-500 px-2"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end mt-4 space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-white p-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      {isAddCategory && <AddCategoryPage onClose={()=>setIsAddCategory(false)} />}
    </>
  );
}
