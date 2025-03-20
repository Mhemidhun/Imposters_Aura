import mongoose, { Schema, Document } from "mongoose";

// Enum for Subcategories
export enum SubCategoryEnum {
    OVERSIZED = "oversized",
    JAGGY = "jaggy",
}

// Category Interface
export interface ICategory extends Document {
    categoryName: string;
    description: string;
    subCategories: SubCategoryEnum[];
    isBlocked: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
    {
        categoryName: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        subCategories: {
            type: [String],
            enum: Object.values(SubCategoryEnum),
            required: true,
        },
        isBlocked: { type: Boolean, default: false }, // Block/Unblock status
        isDeleted: { type: Boolean, default: false }, // Block/Unblock status
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

export const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);
