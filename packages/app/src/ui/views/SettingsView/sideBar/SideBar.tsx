import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import tabsList from "../tabs/tabsList";
import CustomTab from "./Tab";

interface Props{
    isOpen: boolean;
    toggle: () => void;
}

export default class SideBar extends React.Component<Props> {

    render() {
        return (
          <div className={`sidebar ${this.props.isOpen ? "is-open" : ""}`}>
            <div className="sidebar-header">
              <Button
                variant="link"
                onClick={this.props.toggle}
                style={{ color: "#fff" }}
                className="mt-4"
              >
                <FontAwesomeIcon icon={fa.faTimes} pull="right" size="xs" />
              </Button>
              <h3>Paramètres</h3>
            </div>
    
            <Nav className="flex-column pt-2">
              <p className="ml-3">Jet Gest</p>

              {tabsList.map((tab, index) => {
                  return (
                    <div key={index}>
                      <CustomTab tab={tab} level={1}/>
                    </div>
                  )
              })}       
            </Nav>
          </div>
        );
      }

}