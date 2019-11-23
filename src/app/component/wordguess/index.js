import React from 'react';
import {
    Card, CardBody,
    Spinner, FormGroup, Label, Input, Button, CardTitle } from 'reactstrap';
import { FaCheck, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './index.css';

export default class WordGuess extends React.Component {
    constructor(props) {
      super(props);
    }

    state = {
        word: "",
        definition: "",
        options: [],
        isLoadingContextDefinition: true,
        selectedOption: null,
        result: false,
        success: false
    }

    componentDidMount() {
        this.setCurrentContext()
    }

    setCurrentContext() {
        fetch('http://wordgame.service.betafactory.tech/api/wordguess/random_word')
        .then(res => res.json())
        .then((data) => {
          this.setCurrentContextDefinition(data[0].word, data.sort(() => Math.random() - 0.5))
        })
        .catch(console.log)
    }

    setCurrentContextDefinition = (word, options) => {
        fetch('http://wordgame.service.betafactory.tech/api/wordguess/definition?word=' + word)
        .then(res => res.json())
        .then((data) => {
          var text = data[0].text
          text = text.replace(/<\/?[^>]+(>|$)/g, "").toLowerCase()
          this.setState({definition: text, isLoadingContextDefinition: false, word: word, options: options})
        })
        .catch(console.log)
    }

    refreshChallenge = () => {
        this.setState({isLoadingContextDefinition: true})
        this.setCurrentContext()
        this.setState({result: false, isLoadingContextDefinition: false})
    }

    optionSelected = (e) => {
        this.setState({selectedOption: e.currentTarget.value})
    }

    validateOption = () => {
        if(this.state.selectedOption === this.state.word) {
            this.setState({success: true, result: true})
        } else {
            this.setState({success: false, result: true})
        }
    }

    getOptions = () => {
        var options = this.state.options
        return(
        <FormGroup tag="fieldset">
            {options.map((option, index) => 
            <FormGroup check>
                <Label check>
                    <Input className="option-radio" onChange={this.optionSelected} type="radio" name="radio" value={option.word} />{' '}
                    {option.word}
                </Label>
            </FormGroup>
        )}
        </FormGroup>);
    }

    render() {
      return (
        <div class="word-guess-container">
            <Card>
                <CardBody>
                <div class="context-definition">
                    {this.state.isLoadingContextDefinition ?
                    <Spinner style={{ width: '10rem', height: '10rem' }} type="grow" color="warning" />:
                     this.state.definition}
                </div>
                <div class="context-options">
                    {this.getOptions()}
                </div>
                </CardBody>
                {this.state.selectedOption ? <Button onClick={this.validateOption} color="success" className="check-button">Validate!</Button>: null}
            </Card>
            {this.state.result?
            (<Card className="result-card">
                <CardBody>
                  {this.state.success ? 
                  (<CardTitle className="float-left">
                      <FaCheckCircle size="2em" color="green"/>
                      <p class="alert-para"> That's correct! Wohooooo!</p>
                  </CardTitle>):
                  (<CardTitle className="float-left">
                      <FaExclamationCircle size="2em" color="red"/>
                      <p class="alert-para"> Oops! Correct answer is <b>{this.state.word}</b></p>
                  </CardTitle>)}
                  <CardTitle className="float-right"><Button onClick={this.refreshChallenge}>New Challenge!</Button></CardTitle>
                </CardBody>
            </Card>
            ): null}
        </div>
        
      );
    }
  }
