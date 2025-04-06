import { z } from "zod";
import { SubCategoryEnum } from "@/types/admin";



export const categorySchema = z.object({
  categoryName: z.string().trim().min(1, "Category name is required"),
  description: z.string().trim().min(5, "Description should be at least 5 characters"),
  subCategories: z
    .array(z.nativeEnum(SubCategoryEnum), {
      required_error: "At least one subcategory must be selected",
    })
    .min(1, "Select at least one subcategory"),
});


export type CategoryFormValues = z.infer<typeof categorySchema>;