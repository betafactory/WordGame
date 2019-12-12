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

export default class DataPolicy extends React.Component {
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
                <Jumbotron className="app-header-data-policy">
                    <div class="container">
                        <Navigation></Navigation>
                    </div>
                </Jumbotron>
                <div className="container">
                    <div>
                        <Breadcrumb tag="nav" listTag="div">
                            <BreadcrumbItem tag="span">Home</BreadcrumbItem>
                            <BreadcrumbItem active tag="span">Data Policy</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Jumbotron>
                                
                            </Jumbotron>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
