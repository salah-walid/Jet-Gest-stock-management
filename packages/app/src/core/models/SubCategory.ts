import FormData from "form-data";

export default interface SubCategory{
    id: number | null;
    title: string;
    image: string | File | null;
}

export const subCategoryToFormData = (subCat: SubCategory, updateImage=true) : FormData => {
    let formData = new FormData();

    formData.append("id", subCat.id);
    formData.append("title", subCat.title);
    if(updateImage)
        formData.append("image", subCat.image);
   
    return formData;
}

export const subCategorySimplifiedToFormData = (subCat: SubCategory) : FormData => {
    let formData = new FormData();

    formData.append("id", subCat.id);
   
    return formData;
}

export const listSubCategorySimplifiedToFormData = (subCat: SubCategory[]) => {

    let list = [];
    for(let item of subCat){
        list.push(item.id);
    }

    return JSON.stringify(list);
}