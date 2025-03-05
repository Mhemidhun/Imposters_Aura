
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for validation
const categorySchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.any(), // Accepts a file instead of a URL
});

type CategoryFormValues = z.infer<typeof categorySchema>;