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
    DropdownItem } from 'reactstrap';
import { FaInfo, FaUserFriends, FaRoad, FaCodeBranch } from 'react-icons/fa';


  export default class Navigation extends React.Component {
    constructor(props) {
      super(props);
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
                </Nav>
                </Collapse>
          </Navbar>
        </div>
      );
    }
  }
