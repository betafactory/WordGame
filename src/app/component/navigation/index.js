import React from 'react';
import './index.css';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    InputGroup,
    InputGroupAddon} from 'reactstrap';

import { FaInfo, FaUserFriends, FaRoad, FaCodeBranch, FaUserCircle } from 'react-icons/fa';

export default class Navigation extends React.Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind()
    }

    state = {
        modal: false,
        toggle: false
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    render() {
      return (
        <div className="navbar-block">
          <Navbar className="navbar-custom" expand="md">
            <NavbarBrand className="navbar-app-title" href="#"><img class="logo" src="/logo.svg"/> word game</NavbarBrand>
            <Collapse navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink className="navbar-menu" href="#"><FaInfo /> About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="navbar-menu" href="#"><FaUserFriends /> Team</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="navbar-menu" href="#"><FaRoad /> Roadmap</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="navbar-menu" href="#"><FaCodeBranch /> Contribute</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="navbar-menu" href="#" onClick={this.toggle}><FaUserCircle /> Login</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
          </Navbar>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Login to WordGame</ModalHeader>
              <ModalBody>
                  <InputGroup>
                      <Input />
                      <InputGroupAddon addonType="append">
                          <Button>Send OTP</Button>
                      </InputGroupAddon>
                  </InputGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="success" onClick={this.toggle}>Verify</Button>{' '}
              </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
