import { IconProp } from "@fortawesome/fontawesome-svg-core";
import * as fa from "@fortawesome/free-solid-svg-icons";
import React, { ReactNode } from "react";
import CoordinatesSettings from "./tabs-content/Coordinates";
import SellsSettings from "./tabs-content/Sells";
import TabExample from "./tabs-content/tab-example";
import tabsKeys from "./tabsKeys";

export interface tabInfo{
    title: string;
    icon: IconProp;
    subMenus: SubMenuInfo[],
}

export interface SubMenuInfo{
    title: string,
    icon: IconProp,
    key: string;
    content: ReactNode;
    tab?: tabInfo;
}

const tabsList: tabInfo[] = [
    {
        title: "Génerale",
        icon: fa.faHome,
        subMenus: [
            {
                title: "Paramètres générales",
                icon: fa.faSearch,
                key: tabsKeys.general_params,
                content: <TabExample title="Paramètres générales" />,
            }
        ]
    },

    {
        title: "Société",
        icon: fa.faDollarSign,
        subMenus: [
            {
                title: "Coordonnée",
                icon: fa.faLocationArrow,
                key: tabsKeys.company_coordinates,
                content: <CoordinatesSettings />,
            }
        ]
    },

    {
        title: "Numérotation",
        icon: fa.faListOl,
        subMenus: [
            {
                title: "Vente",
                icon: fa.faListOl,
                key: tabsKeys.numbering_sells,
                content: <SellsSettings />,
            },
            {
                title: "Achat",
                icon: fa.faListOl,
                key: tabsKeys.numbering_buys,
                content: <TabExample title="Achat" />,
            },
            {
                title: "Stock",
                icon: fa.faListOl,
                key: tabsKeys.numbering_stock,
                content: <TabExample title="Stock" />,
            },
            {
                title: "Autre",
                icon: fa.faListOl,
                key: tabsKeys.numbering_others,
                content: <TabExample title="Autre" />,
            },
        ]
    }
];

export default tabsList;