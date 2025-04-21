"use client"
import { useState } from "react";
import { CheckCircle, Ban, Pencil, Trash2, PlusCircle } from "lucide-react";
import AddProductPage from "@/components/admin/dashboard/product/AddProduct";
interface IProduct {
  id: string;
  productName: string;
  productQuantity: number;
  productPrice: number;
  productDescription: string;
  productImage: string;
  isBlocked: boolean;
}

const productsData: IProduct[] = [
  {
    id: "1",
    productName: "Product A",
    productQuantity: 10,
    productPrice: 199,
    productDescription: "High-quality product A",
    productImage: "https://via.placeholder.com/50",
    isBlocked: false,
  },
  {
    id: "2",
    productName: "Product B",
    productQuantity: 5,
    productPrice: 299,
    productDescription: "Premium product B",
    productImage: "https://via.placeholder.com/50",
    isBlocked: true,
  },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>(productsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenAddProduct,setIsOpenAddProduct] = useState(false)

  const productsPerPage = 5;

  const toggleBlock = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, isBlocked: !product.isBlocked } : product
      )
    );
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <div className="bg-[#151c2c] text-white p-5 rounded-lg w-full max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-center sm:text-left">Product Management</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center mt-2 sm:mt-0"
            onClick={() => setIsOpenAddProduct(true)}
          >
            <PlusCircle size={18} className="mr-2" /> Add Product
          </button>
        </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead className="bg-[#1f2a40] text-white">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Product Name</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left hidden md:table-cell">Description</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700 hover:bg-[#1f2a40]">
                    <td className="p-3">
                      <img src={product.productImage} alt={product.productName} className="w-12 h-12 object-cover rounded-md" />
                    </td>
                    <td className="p-3">{product.productName}</td>
                    <td className="p-3">{product.productQuantity}</td>
                    <td className="p-3">${product.productPrice}</td>
                    <td className="p-3 hidden md:table-cell">{product.productDescription}</td>
                    <td className="p-3">
                      {product.isBlocked ? (
                        <span className="text-red-500">Blocked</span>
                      ) : (
                        <span className="text-green-500">Active</span>
                      )}
                    </td>
                    <td className="p-3 text-center space-x-2 h-full m-3 flex justify-center">
                      <button
                        className={`px-2 ${
                          product.isBlocked ? "text-green-400 hover:text-green-500" : "text-red-400 hover:text-red-500"
                        }`}
                        onClick={() => toggleBlock(product.id)}
                      >
                        {product.isBlocked ? <CheckCircle size={18} /> : <Ban size={18} />}
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-500 px-2">
                        <Pencil size={18} />
                      </button>
                      <button className="text-red-400 hover:text-red-500 px-2" onClick={() => handleDelete(product.id)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50 w-full sm:w-auto"
              >
                Previous
              </button>
              <span className="text-white p-2 text-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50 w-full sm:w-auto"
              >
                Next
              </button>
            </div>
          )}

          {isOpenAddProduct && <AddProductPage onClose={() => setIsOpenAddProduct(false)} categories={[{id: "string",
  name: "string"}]} />}
        </div>
    </>
  );
};

export default ProductsPage;
