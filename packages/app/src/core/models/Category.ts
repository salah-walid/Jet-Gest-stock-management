import SubCategory from "./SubCategory";
import FormData from "form-data";

export default interface Category extends CategorySimplified{
    subCategories: SubCategory[];
}

export interface CategorySimplified{
    id: number | null;
    title: string;
    image: string | File | null;
}

export const categoryToFormData = (cat: Category, updateImage=true) : FormData => {
    let formData = new FormData();

    formData.append("id", cat.id);
    formData.append("title", cat.title);
    if(updateImage)
        formData.append("image", cat.image);
    let listSubCat = []
    for(let item of cat.subCategories){
        listSubCat.push(item.id);
    }
    formData.append("subCategories", JSON.stringify(listSubCat));
   
    return formData;
}

export const categorySimplifiedToFormData = (cat: CategorySimplified) : FormData => {
    let formData = new FormData();

    formData.append("id", cat.id);
   
    return formData;
}

export const listCategorySimplifiedToFormData = (cat: CategorySimplified[]) => {

    let list = [];
    for(let item of cat){
        list.push(item.id);
    }

    return JSON.stringify(list);
}

export interface CatSubCatCombo{
    categories: CategorySimplified[];
    subCategory: SubCategory[];
}

export interface CategoryPageCombo{
    categories: Category[];
    pageCount: number;
}