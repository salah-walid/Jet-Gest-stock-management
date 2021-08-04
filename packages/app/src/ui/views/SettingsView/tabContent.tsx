import React, { FC, ReactNode } from 'react'
import { Tab } from 'react-bootstrap'
import { tabInfo } from './tabs/tabsList'

const TabContent: FC<{tabs: tabInfo[]}> = ({tabs}) => {

    let generatedTabs: {key: string, content: ReactNode}[] = [];

    const generateTabs = (tab?: tabInfo) => {
        if(!tab){
            return null;
        }

        for(let sub of tab.subMenus){
            generatedTabs.push({key: sub.key, content: sub.content});
            generateTabs(sub.tab);
        }
    };

    for(let tab of tabs){
        generateTabs(tab);
    }

    return (
        <div>
            {
                generatedTabs.map((g, index) => {
                    return <Tab.Pane className="w-100 mr-3" eventKey={g.key} style={{position: 'absolute'}}>
                        {g.content}
                    </Tab.Pane>
                })
            }
        </div>
    )
}

export default TabContent;