import { observer } from "mobx-react";
import {Component} from "react";
import ProductData from "../../../core/models/ProductData";
import Pagination from "../../components/pagination";
import ProductCard from "../../components/productCard";
import {default as vm} from "../../viewmodels/gestionViewModels/gestionViewModel";

import addImg from "../../../assets/images/add.png";
import Routes from "../../../core/managers/routes";
import PopUpProp from "../../../core/models/PopupProp";


class Gestion extends Component<PopUpProp<ProductData>>{

    constructor(props: any){
        super(props);

        vm.init();
    }

    render(){
        return (
            <div className="container">
                <h1 className="display-1 text-center">
                    Liste de produits
                </h1>

                
                <form onSubmit={vm.submited}>
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
                    <div className="row">
                        <div className="col">
                            <label htmlFor="categoriesForm" className="form-label">Catégories : </label>
                            <select name="categories" className="form-select" id="categoriesForm" onChange={vm.dropDownChanged} value={vm.selectedCategory}>
                                <option value="">Filtrer par catégorie...</option>
                                {
                                    vm.categoriesList.map((item, index) => {
                                        return (<option key={index} value={item.id?.toString()}>{item.title}</option>)
                                    })
                                }
                            </select>
                        </div>

                        <div className="col">
                            <label htmlFor="subCategoriesForm" className="form-label">Sous Catégories : </label>
                            <select name="subCategory" className="form-select" id="subCategoriesForm" onChange={vm.dropDownChanged} value={vm.selectedSubCategory}>
                                <option value="">Filtrer par sous catégorie...</option>
                                {
                                    vm.categoriesList.find(elt => elt.id?.toString() === vm.selectedCategory)?.subCategories.map(
                                        item => {
                                            return(<option key={item.id} value={item.id?.toString()}>{item.title}</option>)
                                        }
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary float-end" onClick={(e) => Routes.navigator.push(Routes.productForm)}>
                        <img src={addImg} className="btn-image"></img>
                    </button>
                    <div className="clearfix"></div>

                </form>

                <div className="mt-4">
                    {
                        vm.products.products.map((item: ProductData) => {
                            return (
                                <ProductCard 
                                    product={item} 
                                    key={item.id} 
                                    onDelete={(id) => vm.deleteProduct(id)} 
                                    onClick={() => {
                                        if(!this.props.isPopup)
                                            Routes.navigator.push(`${Routes.productDetail}/${item.id}`);
                                        else{
                                            if(this.props.select)
                                                this.props.select(item);
                                        }
                                            
                                    }}
                                />
                            );
                        })
                    }
                </div>


                <Pagination pageCount={vm.products.pageCount} activePage={vm.currentPage} onPageChanged={vm.setPage} maxShownPages={2} />
            </div>
        );
    }
}

export default observer(Gestion);