import React from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubMenuInfo } from "../tabs/tabsList";
interface Props{
    subMenu: SubMenuInfo;
}

export default class SubMenu extends React.Component<Props> {

    render() {
        const { subMenu } = this.props;
    
        return (
          <Nav className="flex-column pt-2">
            <Nav.Item>
              
              <Nav.Link eventKey={subMenu.key}>
                <FontAwesomeIcon icon={subMenu.icon} style={{marginRight: 20}} />
                {subMenu.title}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        );
      }

}