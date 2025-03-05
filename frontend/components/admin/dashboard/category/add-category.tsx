"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactDOM from "react-dom";

// Zod schema for validation
const categorySchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.any(), // Accepts a file instead of a URL
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function AddCategoryPage({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file); // Set file in form
      setPreviewImage(URL.createObjectURL(file)); // Create preview
    }
  };

  // Form submission
  const onSubmit = (data: CategoryFormValues) => {
    console.log("Submitted Data:", data);
    reset(); // Reset form after submission
    setPreviewImage(null);
    onClose(); // Close modal after submission
  };

  // Render portal in Next.js (ensure `document` is available)
  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="menu flex-1 bg-[#182237] p-6 rounded-lg max-w-lg mx-auto relative">
        <h2 className="text-xl font-semibold mb-4 text-white">Add New Category</h2>

        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
          ✖
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Category Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.image && <p className="text-red-400 text-sm mt-1">Image is required</p>}

            {/* Image Preview */}
            {previewImage && (
              <img src={previewImage} alt="Preview" className="mt-3 w-16 h-16 rounded" />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Description</label>
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>,
    document.body // Attach modal to body using Portal
  );
}
