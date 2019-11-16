import React from 'react';
import './index.css';
import { Jumbotron, ListGroup, ListGroupItem } from 'reactstrap';
import Navigation from '../../component/navigation';
import WordGuess from '../../component/wordguess';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Jumbotron className="app-header">
          <div class="container">
            <Navigation></Navigation>
            <WordGuess></WordGuess>
          </div>
        </Jumbotron>
        <div class="container">
          <div class="intro-home-title">
              Have some words you need to learn?
          </div>
          <div class="intro-home-description">
              We're working on adding more features! You can help us in many ways.<br></br>Navigate to the link below!
          </div>
          <a href="http://github.com/betafactory/wordgame">http://github.com/betafactory/wordgame</a>
        </div>
      </div> 
    );
  }
}
