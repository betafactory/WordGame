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

export default class Privacy extends React.Component {
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
                            <BreadcrumbItem active tag="span">Privacy</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Jumbotron>
                            <h2><strong>Your Privacy</strong></h2>

<p>Please read Privacy Policy</p>

<h3><strong>Reservation of Rights</strong></h3>

<p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

<h3><strong>Removal of links from our website</strong></h3>

<p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

<p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

                            </Jumbotron>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
