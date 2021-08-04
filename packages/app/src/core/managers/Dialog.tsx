import { Component } from "react";
import { Button,Modal } from 'react-bootstrap'
import DialogData from "../models/dialogData";

interface State{
    title: any;
    body: any;
    showHide: boolean;
    needConfirmation: boolean;
}

export default class Dialog extends Component<{}, State>{

    public complete(value: DialogData | PromiseLike<DialogData>){};
    public fail(reason?: any){};
    
    constructor(props: any){
        super(props);

        this.state = {
            title: "",
            body: "",
            showHide: false,
            needConfirmation: false,
        }
        
    }

    hideDialog(confirmed: boolean){
        this.complete({confirmed: confirmed});
        this.setState({
            showHide: false
        });
    }

    showDialog(title: any, body: any, needConfirmation: boolean) : Promise<DialogData> {
        let completer = new Promise<DialogData>((s, f) => {
            this.complete = s;
            this.fail = f;
        })
        this.setState({
            title: title,
            body: body,
            showHide: true,
            needConfirmation: needConfirmation,
        })
        return completer;
    }

    render(){
        return (
            <Modal centered={true} show={this.state.showHide}>
                <Modal.Header onClick={() => this.hideDialog(false)}>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {this.state.body}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="white" onClick={() => this.hideDialog(false)}>
                        Fermer
                    </Button>
                    {
                        this.state.needConfirmation
                        ? <Button variant="primary" onClick={() => this.hideDialog(true)}>
                            Ok
                        </Button>
                        : <></>
                    }
                </Modal.Footer>
            </Modal>
    )
    }
}