import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { Nav } from 'react-bootstrap'
import { tabInfo } from '../tabs/tabsList'
import * as fa from "@fortawesome/free-solid-svg-icons";
import SubMenu from './SubMenu';

const CustomTab: FC<{tab?: tabInfo, level: number}> = ({tab, level}) => {
    return (
        <>
            {
                tab &&
                <Nav className="flex-column pt-2">
                    <Nav.Item>
                        <FontAwesomeIcon icon={tab.icon} style={{marginRight: 20}} />
                        {tab.title}
                    </Nav.Item>

                    {
                        tab.subMenus.map((sub, index) => {
                            return <div key={index} style={{paddingLeft: level*15}}>
                                <SubMenu subMenu={sub} />
                                <CustomTab tab={sub.tab} level={level+1} />
                            </div>
                        })
                    }
                </Nav>
            }
        </>
    )
}

export default CustomTab;
