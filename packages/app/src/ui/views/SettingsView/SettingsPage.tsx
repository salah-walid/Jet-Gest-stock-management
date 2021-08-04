import React, { Component } from 'react'
import { Tab} from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import SettingsContent from './settingsContent';
import SideBar from './sideBar/SideBar';

interface Props extends RouteComponentProps<{selected: string}>{}
interface State{
    isOpen: boolean;
    isMobile: boolean;
}

export default class SettingsPage extends Component<Props, State> {

    private previousWidth: number = -1;

    constructor(props: Props) {
        super(props);
    
        // Moblie first
        this.state = {
          isOpen: false,
          isMobile: true
        };
    
    }

    updateWidth() {
        const width = window.innerWidth;
        const widthLimit = 576;
        const isMobile = width <= widthLimit;
        const wasMobile = this.previousWidth <= widthLimit;
    
        if (isMobile !== wasMobile) {
          this.setState({
            isOpen: !isMobile
          });
        }
    
        this.previousWidth = width;
    }

    componentDidMount() {
        this.updateWidth();
        window.addEventListener("resize", this.updateWidth.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth.bind(this));
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render(){
        return (
            <Tab.Container defaultActiveKey={this.props.match.params.selected}>
                <div className="settingsPage">
                    <SideBar toggle={this.toggle} isOpen={this.state.isOpen}/>
                    <SettingsContent isOpen={this.state.isOpen} toggle={this.toggle} />
                </div>
            </Tab.Container>
        );
    }

}
