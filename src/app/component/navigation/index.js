import React from 'react';
import './index.css';
import {
    Button,
    Collapse,
    Input,
    InputGroup,
    InputGroupAddon,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarToggler
} from 'reactstrap';

import {FaCodeBranch, FaInfo, FaRoad, FaUserCircle, FaUserFriends, FaOtter, FaCheck, FaBars} from 'react-icons/fa';
import {reactLocalStorage} from 'reactjs-localstorage';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

export default class Navigation extends React.Component {
    state = {
        modal: false,
        toggle: false,
        startVerifyingOTP: false,
        identity: null,
        OTP: null,
        userLoggedIn: false,
        showIncorrectOTPMessage: false,
        collapsed: false
    }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind();
    }

    componentDidMount() {
        this.refreshUserStatus()
    }

    toggleNavbar = () => {
        let collapsed = this.state.collapsed
        this.setState({collapsed: !collapsed})
    }

    refreshUserStatus = () => {
        if(reactLocalStorage.get("token", false) === false) {
            this.setState({userLoggedIn: false})
        } else {
            this.setState({userLoggedIn: true})
        }
    }

    goToView = (name) => {
        window.location = '/' + name;
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
        this.refreshUserStatus()
    }

    logout = () => {
        reactLocalStorage.remove("token")
        this.refreshUserStatus()
        this.setState({startVerifyingOTP: false, showIncorrectOTPMessage: false})
        window.location = "/"
    }

    validateEmail = (identity) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(identity).toLowerCase());
    }

    handleIdentityChange = (e) => {
        this.setState({identity: e.target.value})
    }

    handleOTPChange = (e) => {
        this.setState({OTP: e.target.value})
    }

    getOTP = () => {
        let identity_type = "mobile"
        let operator = "91"
        if(this.validateEmail(this.state.identity)) {
            identity_type = "email"
            operator = this.state.identity.replace(/.*@/, "")
        }
        if (this.state.identity !== null) {
            fetch(process.env.REACT_APP_BETAFACTORY_SERVICE_URL + '/api/authenticate?identity=' + this.state.identity + "&type=" + identity_type + "&operator=" + operator)
                .then(res => res.json())
                .then((data) => {
                    setTimeout(() => this.setState({isButtonDisabled: false}), 5000);
                    this.setState({startVerifyingOTP: true})
                })
                .catch(console.log)
        } else {
            console.log("Incorrect Mobile")
        }
    }

    verifyOTP = () => {
        const data = new FormData();
        let identity = this.state.identity
        if(!this.validateEmail(this.state.identity)) {
            identity = "91" + identity
        }
        data.append('identity', identity)
        data.append('otp', this.state.OTP)
        fetch(process.env.REACT_APP_BETAFACTORY_SERVICE_URL + '/api/authenticate/', {
            method: "post",
            body: data
        }).then(res => res.json())
            .then((data) => {
                if(data["success"] === true) {
                    this.toggle()
                    reactLocalStorage.set('token', data["token"])
                    this.refreshUserStatus()
                    this.setState({showIncorrectOTPMessage: false   })
                } else {
                    this.setState({showIncorrectOTPMessage: true})
                }
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="navbar-block">
                <Navbar className="navbar-custom" expand="md">
                    <NavbarBrand className="navbar-app-title" href="#" onClick={() => this.goToView("")}><img class="logo" src="/logo.svg"/> word game</NavbarBrand>
                    <NavbarToggler onClick={() => this.toggleNavbar()}><FaBars color="white" size="30"></FaBars></NavbarToggler>
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.state.userLoggedIn ?
                                (<UncontrolledDropdown className="navbar-menu">
                                <DropdownToggle className="navbar-menu" caret>
                                    <FaOtter/> Howdy Webby!
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem tag="a" href="#" onClick={() => this.goToView("profile")} >Profile</DropdownItem>
                                    <DropdownItem tag="a" href="#" onClick={() => this.goToView("settings")}>Settings</DropdownItem>
                                    <DropdownItem tag="a" href="#" onClick={this.logout} >Logout</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>) :
                                (<NavItem className="float-right">
                                    <NavLink className="navbar-menu" href="#"
                                             onClick={this.toggle}><FaUserCircle/> Login</NavLink>
                                </NavItem>)}
                        </Nav>
                    </Collapse>
                </Navbar>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login to WordGame</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <Button>Identity</Button>
                            </InputGroupAddon>
                            <Input placeholder="Mobile Number (India) or Email" onChange={this.handleIdentityChange}/>
                            <InputGroupAddon addonType="append">
                                <Button color="warning" disabled={this.state.startVerifyingOTP} onClick={this.getOTP}>Get
                                    Code</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        {this.state.startVerifyingOTP ?
                            (<InputGroup className="otp-box">
                                <InputGroupAddon addonType="prepend">
                                    <Button>One Time Password</Button>
                                </InputGroupAddon>
                                <Input onChange={this.handleOTPChange}/>
                            </InputGroup>) : null
                        }
                        {this.state.showIncorrectOTPMessage ? (<p><br/>Incorrect <b>one time password</b>. Please try again.</p>) : null}
                    </ModalBody>
                    <ModalFooter>
                        {this.state.startVerifyingOTP ?
                            (<Button color="success" onClick={this.verifyOTP}>Verify</Button>) : null
                        }
                    </ModalFooter>
                </Modal>
                <Alert stack={{limit: 1}} />
            </div>
        );
    }
}
