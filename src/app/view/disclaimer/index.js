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

export default class Disclaimer extends React.Component {
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
                            <BreadcrumbItem active tag="span">Disclaimer</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Jumbotron>
                            <h2><strong>Disclaimer</strong></h2>

<p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

<ul>
    <li>limit or exclude our or your liability for death or personal injury;</li>
    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
    <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
</ul>

<p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

<p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
                            </Jumbotron>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
