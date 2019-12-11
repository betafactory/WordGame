import React from 'react';
import './index.css';
import {Jumbotron, UncontrolledAlert, Button, Alert} from 'reactstrap';
import Navigation from '../../component/navigation';
import WordGuess from '../../component/wordguess';
import Footer from "../../component/footer";
import {reactLocalStorage} from 'reactjs-localstorage';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        showLoginAlert: true,
        words: 0,
        challenges: 0,
        categories: 0
    }

    componentDidMount () {
        if(reactLocalStorage.get("token", false) === false) {
            this.setState({showLoginAlert: true})
        } else {
            this.setState({showLoginAlert: false})
        }
        fetch(process.env.REACT_APP_BETAFACTORY_SERVICE_URL + "/api/general/metrics")
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    words: data["words"],
                    challenges: data["challenges"],
                    categories: data["categories"]
                })
            })
            .catch(console.log)
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
                        <Alert color="success" className="header-generic-alert">
                         We just released <b>WordGame</b> Chrome Extension. <a href="https://chrome.google.com/webstore/detail/kbjhggmokdclbgocdpjpibikmfmeoilb" target="_blank">Download Now, It's free!</a>
                        </Alert>
                    </div>
                </Jumbotron>
                <div class="container">
                    <div class="row home-row-container">
                        <div class="home-row-title">
                            Get to know the current state of our dictionary
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <Jumbotron className="home-metric-jumbotron">
                                <h1 className="display-3">{this.state.words}</h1>
                                <p>Words</p>
                            </Jumbotron>
                        </div>
                        <div className="col-md-4">
                            <Jumbotron className="home-metric-jumbotron">
                                <h1 className="display-3">{this.state.challenges}</h1>
                                <p>Challenges</p>
                            </Jumbotron>
                        </div>
                        <div className="col-md-4">
                            <Jumbotron className="home-metric-jumbotron">
                                <h1 className="display-3">{this.state.categories}</h1>
                                <p>Categories</p>
                            </Jumbotron>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row home-row-container">
                        <div class="home-row-title">
                            Enhanced progress tracker
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <Jumbotron className="progress-image-container">
                                <img class="progress-image" src="/progress.png"></img>
                            </Jumbotron>
                        </div>
                        <div className="col-md-4">
                            <Jumbotron className="progress-desc-container">
                                <h1 className="display-3">Learnings.</h1>
                                <p>Track your progress like a champ. We remember your weak spots and definitely know how to strengthen them.</p>
                            </Jumbotron>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
