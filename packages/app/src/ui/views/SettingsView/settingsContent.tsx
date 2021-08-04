import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, ReactNode } from 'react'
import { Button, Navbar, Tab } from 'react-bootstrap'
import TabContent from './tabContent'
import tabsList, { tabInfo } from './tabs/tabsList'

const SettingsContent: FC<{toggle: () => void; isOpen: boolean}> = ({toggle, isOpen}) => {

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

    for(let tab of tabsList){
        generateTabs(tab);
    }

    return (
        <Tab.Content className={`content w-100 ${isOpen ? "is-open" : ""}`}>
            <Navbar
                bg="light"
                className="navbar shadow-sm p-3 mb-5 bg-white rounded"
                expand
            >
                <Button variant="outline-info" onClick={() => toggle()}>
                    <FontAwesomeIcon icon={faAlignLeft} />
                </Button>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
            </Navbar>
            
            {generatedTabs.map((g, index) => {
                return <Tab.Pane className="w-100 mr-3" eventKey={g.key}>
                    {g.content}
                </Tab.Pane>
            })}
            {/* <TabContent tabs={tabsList} /> */}
        </Tab.Content>
    )
}

export default SettingsContent
