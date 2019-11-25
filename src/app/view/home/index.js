import React from 'react';
import './index.css';
import {Jumbotron, UncontrolledAlert, Button} from 'reactstrap';
import Navigation from '../../component/navigation';
import WordGuess from '../../component/wordguess';
import Footer from "../../component/footer";
import {reactLocalStorage} from 'reactjs-localstorage';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        showLoginAlert: true
    }

    componentDidMount () {
        if(reactLocalStorage.get("token", false) === false) {
            this.setState({showLoginAlert: true})
        } else {
            this.setState({showLoginAlert: false})
        }
    }

    render() {
        return (
            <div>
                {this.state.showLoginAlert ?
                    (<UncontrolledAlert color="warning" className="home-alert">
                    Please click <b>login</b> to <em>create an account</em> and start tracking your
                    progress! <b>Disclaimer</b>: We do not store any information without your consent.
                </UncontrolledAlert>) : null}
                <Jumbotron className="app-header">
                    <div class="container">
                        <Navigation></Navigation>
                        <WordGuess></WordGuess>
                    </div>
                </Jumbotron>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <Jumbotron>
                                <h1 className="display-3">250K</h1>
                                <p>Words</p>
                            </Jumbotron>
                        </div>
                        <div className="col-md-4">
                            <Jumbotron>
                                <h1 className="display-3">10</h1>
                                <p>Categories</p>
                            </Jumbotron>
                        </div>
                        <div className="col-md-4">
                            <Jumbotron>
                                <h1 className="display-3">$0</h1>
                                <p>Pricing</p>
                            </Jumbotron>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
