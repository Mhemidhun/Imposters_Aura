"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactDOM from "react-dom";

// Zod schema for validation
const productSchema = z.object({
  productName: z.string().trim().min(3, "Product name must be at least 3 characters"),
  productQuantity: z.number().min(1, "Quantity must be at least 1"),
  productPrice: z.number().min(1, "Price must be greater than 0"),
  productDescription: z.string().trim().min(10, "Description must be at least 10 characters"),
  productImages: z
    .array(z.instanceof(File))
    .min(3, "You must select exactly 3 images")
    .max(3, "You can only select 3 images"),
  categoryId: z.string().trim().min(1, "Category is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

type Category = {
  id: string;
  name: string;
};

export default function AddProductPage({ onClose, categories }: { onClose: () => void; categories: Category[] }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 3) {
      setValue("productImages", files);
      setPreviewImages(files.map((file) => URL.createObjectURL(file)));
    } else {
      alert("Please select exactly 3 images.");
    }
  };

  // Form submission
  const onSubmit = (data: ProductFormValues) => {
    console.log("Submitted Data:", data);
    reset(); // Reset form after submission
    setPreviewImages([]);
    onClose(); // Close modal after submission
  };

  // Render portal in Next.js (ensure `document` is available)
  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="menu flex-1 bg-[#182237] p-6 rounded-lg max-w-lg mx-auto relative">
        <h2 className="text-xl font-semibold mb-4 text-white">Add New Product</h2>

        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
          ✖
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Product Name</label>
            <input
              type="text"
              {...register("productName")}
              className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.productName && <p className="text-red-400 text-sm mt-1">{errors.productName.message}</p>}
          </div>

          {/* Product Quantity */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Quantity</label>
            <input
              type="number"
              {...register("productQuantity", { valueAsNumber: true })}
              className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.productQuantity && <p className="text-red-400 text-sm mt-1">{errors.productQuantity.message}</p>}
          </div>

          {/* Product Price */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Price</label>
            <input
              type="number"
              {...register("productPrice", { valueAsNumber: true })}
              className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.productPrice && <p className="text-red-400 text-sm mt-1">{errors.productPrice.message}</p>}
          </div>

          {/* Product Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Description</label>
            <textarea
              {...register("productDescription")}
              className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.productDescription && <p className="text-red-400 text-sm mt-1">{errors.productDescription.message}</p>}
          </div>

          {/* Product Images */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Upload Images (3 only)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.productImages && <p className="text-red-400 text-sm mt-1">{errors.productImages.message}</p>}
            {/* Image Previews */}
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, index) => (
                <img key={index} src={src} alt="Preview" className="w-16 h-16 rounded" />
              ))}
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Category</label>
            <select {...register("categoryId")} className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-400 text-sm mt-1">{errors.categoryId.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full">
            Add Product
          </button>
        </form>
      </div>
    </div>,
    document.body // Attach modal to body using Portal
  );
}
