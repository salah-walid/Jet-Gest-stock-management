import FormData from "form-data";
import { CategorySimplified, listCategorySimplifiedToFormData } from "./Category";
import SubCategory, { listSubCategorySimplifiedToFormData } from "./SubCategory";

export default interface ProductData{
    id?: number | null;
    title: string;
    description: string;
    creationDate?: string;
    image: string | File | null;
    forcePrice: boolean;
    generatedPrice: number;
    price: number;
    salesCount: number;
    stock: number;
    categories: CategorySimplified[];
    subCategories: SubCategory[];
}

export const productToFormData = (product: ProductData, updateImage = true) : FormData => {
    let formData = new FormData();

    formData.append("id", product.id);
    formData.append("title", product.title);
    formData.append("description", product.description);
    if(updateImage)
        formData.append("image", product.image);
    formData.append("forcePrice", product.forcePrice);
    if (product.forcePrice)
        formData.append("price", product.price);
    
    formData.append("categories", listCategorySimplifiedToFormData(product.categories));
    formData.append("subCategories", listSubCategorySimplifiedToFormData(product.subCategories))

    return formData;
}

export interface ProductPageCountCombo{
    products: ProductData[];
    pageCount: number;
}
