import React from 'react';
import './index.css';
import {FaCodeBranch, FaInfo, FaRoad, FaUserCircle, FaUserFriends, FaOtter} from 'react-icons/fa';

export default class Footer extends React.Component {
    state = {

    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
            <footer className="footer-bs">
            <div className="row">
                <div className="col-md-3 footer-brand animated fadeInLeft">
                    <img src="/betafactory.png" height="200" width="200"/>
                </div>
                <div className="col-md-2 footer-social animated fadeInDown">
                    <h4><FaInfo/> <b>Legal</b></h4>
                    <ul>
                        <li><a href="/terms">Terms</a></li>
                        <li><a href="/privacy">Privacy</a></li>
                        <li><a href="/disclaimer">Disclaimer</a></li>
                        <li><a href="/datapolicy">Data Policy</a></li>
                    </ul>
                </div>
                <div className="col-md-2 footer-social animated fadeInDown">
                    <h4><FaInfo/> <b>Wordgame</b></h4>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a target="_blank" href="https://github.com/betafactory/WordGame/graphs/contributors">Contributors</a></li>
                        <li><a href="#">Roadmap</a></li>
                        <li><a target="_blank" href="https://github.com/betafactory/WordGame">Contribute</a></li>
                        <li><a href="#">Developers</a></li>
                        <li><a href="#">Leaderboard</a></li>
                        <li><a href="#">News</a></li>
                    </ul>
                </div>
                <div className="col-md-2 footer-social animated fadeInDown">
                    <h4><FaInfo/> <b>Resources</b></h4>
                    <ul>
                        <li><a href="#">Word Lists</a></li>
                        <li><a href="/challenges">Challenges</a></li>
                        <li><a href="#">Beta Bot</a></li>
                        <li><a href="#">Assessment Tests</a></li>
                        <li><a href="#">Counselling</a></li>
                        <li><a href="#">Success Stories</a></li>
                    </ul>
                </div>

                <div className="col-md-3 footer-ns animated fadeInRight">
                    <h4><FaInfo/> <b>Downloads</b></h4>
                    <div className="row">
                        <div className="col-md-5 chrome-web-store-icon">
                            <img src="http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Play-Store-icon.png"></img>
                        </div>
                        <div className="col-md-5 android-download-icon">
                            <a target="_blank" href="https://chrome.google.com/webstore/detail/kbjhggmokdclbgocdpjpibikmfmeoilb"><img src="https://cdn0.iconfinder.com/data/icons/applications-windows-2/24/Chrome_Webstore_application-512.png"></img></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
            </div>)
    }
}
