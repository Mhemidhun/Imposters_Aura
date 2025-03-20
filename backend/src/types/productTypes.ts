
export type productInput = {
        productName: string;
        categoryId: string;
        productPrice: number;
        productColour: string;
        productSize: string;
        productDescription: string;
        productImages: { [key: string]: string };
}

export type categoryInput = {
        categoryName: string;
        description: string;
}