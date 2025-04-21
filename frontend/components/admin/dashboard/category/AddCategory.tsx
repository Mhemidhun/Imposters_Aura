"use client"
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/schemas/admin/category"; // adjust path as needed
import { CategoryFormValues, SubCategoryEnum } from "@/types/admin"; // adjust as needed

export default function AddCategory({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data: CategoryFormValues) => {
    console.log("Category Submitted:", data);
    reset();
    onClose();
  };

  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div className="bg-[#182237] p-6 rounded-lg max-w-md w-full mx-auto relative">
        <h2 className="text-xl font-semibold mb-4 text-white">Add New Category</h2>
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
          ✖
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Category Name</label>
            <input
              type="text"
              {...register("categoryName")}
              className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.categoryName && <p className="text-red-400 text-sm mt-1">{errors.categoryName.message}</p>}
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

          {/* Subcategories */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Sub Categories</label>
            <select
              multiple
              {...register("subCategories")}
              className="w-full px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(SubCategoryEnum).map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
            {errors.subCategories && <p className="text-red-400 text-sm mt-1">{errors.subCategories.message}</p>}
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full">
            Add Category
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
