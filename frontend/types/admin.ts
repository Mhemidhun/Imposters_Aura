




/* Users Types */

export interface User {
    id: number;
    username: string;
    email: string;
    phone: number;
    password: string;
    isBlocked: boolean;
  }

  export enum SubCategoryEnum {
    ELECTRONICS = "Electronics",
    CLOTHING = "Clothing",
    BOOKS = "Books",
  }
  
  export type CategoryFormValues = {
    categoryName: string;
    description: string;
    subCategories: SubCategoryEnum[];
  };
  