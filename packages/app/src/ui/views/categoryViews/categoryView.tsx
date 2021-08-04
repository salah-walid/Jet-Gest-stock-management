import { observer } from "mobx-react";
import Pagination from "../../components/pagination";
import {default as vm} from "../../viewmodels/categoriesViewModels/categoryViewModel";

import addImg from "../../../assets/images/add.png";
import { Link } from "react-router-dom";
import Routes from "../../../core/managers/routes";
import Category from "../../../core/models/Category";
import CategoryCard from "../../components/categoryCard";
import SubCategoryCard from "../../components/subCategoryCard";
import { Component } from "react";

class CategoryPage extends Component{

    constructor(props: any){
        super(props);

        vm.init();
    }

    render(){
        return (
            <div className="container">
                <h1 className="display-1 text-center">
                    Liste des catégories
                </h1>

                
                <form onSubmit={vm.submited} className="mb-5">
                    <div className="mb-3">
                        <input 
                            type="text" 
                            name="recherche" 
                            className="form-control" 
                            id="rechercheField" 
                            aria-describedby="Recherche" 
                            placeholder="Recherche"
                            value={vm.search}
                            onChange={vm.researchChanged}
                        />
                    </div>
                    
                    <div className="row mt-4">
                        <button type="submit" className="btn btn-primary fs-6 text-white col-lg-2 col-12 offset-lg-10 offset-0">
                            Rechercher
                        </button>
                    </div>

                </form>

                <div className="row">
                        <div className="offset-lg-5 offset-0 col-lg-3 col-12 mb-4">
                            <Link className="btn btn-primary" to={Routes.categoryForm}>
                                <img src={addImg} className="btn-image" /> Ajouter une categorie
                            </Link>
                        </div>
                        <div className="offset-lg-1 offset-0 col-lg-3 col-12 mb-4">
                            <Link className="btn btn-primary" to={Routes.subCategoryForm}>
                                <img src={addImg} className="btn-image" /> Ajouter une sous categorie
                            </Link>
                        </div>
                    </div>

                <div className="mt-4">
                    {
                        vm.categories.categories.map((cat: Category) => {
                            return (
                                <div key={cat.id} className="row border-bottom pb-4 my-3">
                                    <div className="col-lg-3 col-6">
                                        <CategoryCard category={cat} onDelete={vm.deleteCategory} />
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            {
                                                cat.subCategories.map(subCat => {
                                                    return (
                                                        <div key={subCat.id} className="col-lg-4 col-12 mb-4 offset-lg-1 offset-0">
                                                            <SubCategoryCard subCategory={subCat} onDelete={vm.deleteSubCategory} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>


                <Pagination pageCount={vm.categories.pageCount} activePage={vm.currentPage} onPageChanged={vm.setPage} maxShownPages={2} />
            </div>
        );
    }
}

export default observer(CategoryPage);