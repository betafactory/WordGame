import React from 'react';
import './index.css';
import {
    Jumbotron,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Badge,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import Navigation from '../../component/navigation';
import Footer from "../../component/footer";

export default class Challenges extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Jumbotron className="app-header">
                    <div class="container">
                        <Navigation></Navigation>
                    </div>
                </Jumbotron>
                <div className="container">
                    <div>
                        <Breadcrumb tag="nav" listTag="div">
                            <BreadcrumbItem tag="span">Home</BreadcrumbItem>
                            <BreadcrumbItem active tag="span">Challenges</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Jumbotron>
                                <h1>Eagle</h1>
                                <p>About: </p>
                            </Jumbotron>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Jumbotron>
                                <h1>Flamingo</h1>
                                <p><b>Sub</b>: Flamingo-1, Flamingo-2, Flamingo-3, Flamingo-4, Flamingo-5, Flamingo-6, Flamingo-7, Flamingo-8, Flamingo-9</p>
                                <p>About: </p>
                            </Jumbotron>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
