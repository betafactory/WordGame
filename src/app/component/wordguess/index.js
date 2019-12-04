import React from 'react';
import {Button, Card, CardBody, CardTitle, FormGroup, Input, Label, Spinner} from 'reactstrap';
import {FaCheckCircle, FaExclamationCircle} from 'react-icons/fa';
import {reactLocalStorage} from 'reactjs-localstorage';
import './index.css';

export default class WordGuess extends React.Component {
    state = {
        word: "",
        challenge: "",
        definition: "",
        partOfSpeech: "",
        synonyms: [],
        examples: [],
        options: [],
        similarWords: [],
        derivations: [],
        isLoadingContextDefinition: true,
        isLoadingEvaluationResult: true,
        selectedOption: null,
        result: false,
        success: false,
        showValidateButton: false,
        showOptions: true
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setCurrentContext()
    }

    setCurrentContext() {
        let generate_url = process.env.REACT_APP_BETAFACTORY_SERVICE_URL + '/api/challenge/generate'
        if(reactLocalStorage.get("token", false) !== false) {
            generate_url = process.env.REACT_APP_BETAFACTORY_SERVICE_URL + '/api/challenge/generate?token=' + reactLocalStorage.get("token")
        }
        fetch(generate_url)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    definition: data["definition"],
                    isLoadingContextDefinition: false,
                    challenge: data["challenge"],
                    options: data["words"],
                })
            })
            .catch(console.log)
    }

    capitalize(word) {
        return word.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };

    refreshChallenge = () => {
        this.setState({isLoadingContextDefinition: true})
        this.setCurrentContext()
        this.setState({result: false, showValidateButton: false, showOptions: true})
    }

    optionSelected = (e) => {
        this.setState({selectedOption: e.currentTarget.value, showValidateButton: true})
    }

    validateOption = () => {
        let token = reactLocalStorage.get("token", false)
        let validate_endpoint = process.env.REACT_APP_BETAFACTORY_SERVICE_URL + '/api/challenge/verify?challenge=' +
            this.state.challenge + "&choice=" + this.state.selectedOption
        if(token !== false) {
            validate_endpoint = process.env.REACT_APP_BETAFACTORY_SERVICE_URL + '/api/challenge/verify?challenge=' +
                this.state.challenge + "&choice=" + this.state.selectedOption + "&token=" + token
        }
        fetch(validate_endpoint)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    success: data["success"],
                    word: data["word"],
                    partOfSpeech: data["descriptors"][0]["partOfSpeech"],
                    synonyms: data["descriptors"][0]["synonyms"],
                    examples: data["descriptors"][0]["examples"],
                    similarWords: data["descriptors"][0]["similarTo"],
                    derivations: data["descriptors"][0]["derivation"],
                    result: true,
                    showValidateButton: false,
                    showOptions: false
                })
            })
            .catch(console.log)
    }

    getResults = () => {
        return (<Card className="result-card">
            <CardBody>
                {this.state.success ?
                    (<CardTitle className="float-left">
                        <FaCheckCircle size="2em" color="green"/>
                        <p class="alert-para"> That's correct! Wohooooo!</p>
                        <div className="descriptors">
                            {this.state.partOfSpeech ? (
                                <p><b>Word</b>: {this.capitalize(this.state.word)}</p>) : null}
                            {this.state.partOfSpeech ? (
                                <p><b>Part of speech</b>: {this.capitalize(this.state.partOfSpeech)}</p>) : null}
                            {this.state.synonyms ? (
                                <p><b>Synonyms</b>: {this.capitalize(this.state.synonyms.join(", "))}</p>) : null}
                            {this.state.examples ? (
                                <p><b>Examples</b>: {this.capitalize(this.state.examples.join(", "))}</p>) : null}
                            {this.state.similarWords ? (
                                <p><b>Similar Words</b>: {this.capitalize(this.state.similarWords.join(", "))}</p>) : null}
                            {this.state.derivations ? (
                                <p><b>Derivations</b>: {this.capitalize(this.state.derivations.join(", "))}</p>) : null}
                        </div>
                    </CardTitle>) :
                    (<CardTitle className="float-left">
                        <FaExclamationCircle size="2em" color="red"/>
                        <p class="alert-para"> Oops! Correct answer is <b>{this.state.word}</b></p>
                        <div className="descriptors">
                            {this.state.partOfSpeech ? (
                                <p><b>Word</b>: {this.capitalize(this.state.word)}</p>) : null}
                            {this.state.partOfSpeech ? (
                                <p><b>Part of speech</b>: {this.capitalize(this.state.partOfSpeech)}</p>) : null}
                            {this.state.synonyms ? (
                                <p><b>Synonyms</b>: {this.capitalize(this.state.synonyms.join(", "))}</p>) : null}
                            {this.state.examples ? (
                                <p><b>Examples</b>: {this.capitalize(this.state.examples.join(", "))}</p>) : null}
                            {this.state.similarWords ? (
                                <p><b>Similar Words</b>: {this.capitalize(this.state.similarWords.join(", "))}</p>) : null}
                            {this.state.derivations ? (
                                <p><b>Derivations</b>: {this.capitalize(this.state.derivations.join(", "))}</p>) : null}
                        </div>
                    </CardTitle>)}
            </CardBody>
            <CardTitle className="card-title-custom"><Button onClick={this.refreshChallenge}
                               className="check-button btn-block">New Challenge!</Button></CardTitle>
        </Card>)
    }

    getOptions = () => {
        let options = this.state.options
        return (
            <div>
                <FormGroup tag="fieldset">
                    {options.map((option, index) =>
                    <div className="col-6 option-box">
                        <FormGroup check className="options-form">
                            <Label check>
                                <Input onChange={this.optionSelected} name="option-name" id={option.word} type="radio"
                                    value={option.word}/>{' '}
                                <label className="option-val" for={option.word}><span></span>{option.word}</label>
                            </Label>
                        </FormGroup>
                        </div>
                    )}
                </FormGroup>
            </div>);
    }

    render() {
        return (
            <div class="word-guess-container">
                <Card className="wg-card">
                    {this.state.isLoadingContextDefinition ? (
                            <Spinner style={{width: '5rem', height: '5rem'}} type="grow" color="success"/>) :
                        (<CardBody>
                            <div class="context-definition">
                                {this.state.definition}
                            </div>
                            {this.state.showOptions ?
                                (<div class="context-options">
                                    {this.getOptions()}
                                </div>) : null
                            }
                        </CardBody>)}
                    {this.state.showValidateButton ? <Button onClick={this.validateOption} color="success"
                                                             className="check-button">Validate!</Button> : null}
                </Card>
                {this.state.result ?
                    this.getResults() : null}
            </div>

        );
    }
}
