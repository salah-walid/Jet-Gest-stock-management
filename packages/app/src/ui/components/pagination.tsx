import {FC} from "react";

interface Props{
    pageCount: number,
    activePage: number,
    maxShownPages: number,
    onPageChanged: (page: number) => void
}

const Pagination : FC<Props> = (props) => {
    
    function getPagination() {

        const list = [];

        let start: number = (props.activePage - props.maxShownPages) >= 1 ? (props.activePage - props.maxShownPages + 1) : 1;
        let end : number = (props.activePage + props.maxShownPages) <= props.pageCount ? (props.activePage + props.maxShownPages - 1) : props.pageCount;



        if(props.activePage > 1)
            list.push(
                <li className="page-item mx-2" key={-1}><a className="page-link" onClick={() => props.onPageChanged(props.activePage - 1)} > &lt; Précédent</a></li>
            );

        for (let i = start; i <= end; i++){
            
            if(i == props.activePage){
                list.push(
                    <li className="page-item mx-2 active" key={i}><a className="page-link rounded-circle" >{i}</a></li>
                );
            }else{
                list.push(
                    <li className="page-item mx-2" key={i}><a className="page-link rounded-circle" onClick={() => props.onPageChanged(i)} >{i}</a></li>
                );
            }

        }

        if(props.activePage < props.pageCount)
            list.push(
                <li className="page-item mx-2" key={-2}><a className="page-link" onClick={() => props.onPageChanged(props.activePage + 1)} >Suivant &gt;</a></li>
            );

        return (
            <>
                {list}
            </>
        );
    }

    return (
        <ul className="pagination justify-content-center">
            {getPagination()}
        </ul>
    )
}

export default Pagination;