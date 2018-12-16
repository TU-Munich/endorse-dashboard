import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const HeaderDiv = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  background: #23282e;
  height: 59px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const Dropdown = styled.li`
  display: block;
  text-decoration: none; 
  position: absolute; 
  right: 0px;
  
  &:hover {
    cursor: pointer;
    & > .dropdown-content {
      visibility: visible;
    }
  }
`;

const DropdownToggle = styled.a`
  text-align: center;
  display: block;
  text-decoration: none;  
  color: #e1ffff;
  padding: 20px;
`;

const DropdownMenu = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  line-height: 2rem;
  cursor: pointer;
  visibility: hidden;
  display: block;
  right: 0px;
  position: absolute;
  margin-top: 0;
  border: 1px solid rgba(0,0,0,.15);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: #fff;
  -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
`;

const DropdownListItem = styled.li`
  width: 190px;
  margin-left: 0px;
  text-decoration: none;  
  padding: 12px; 
    
  &:hover {
    background-color: #f0f0f0;
    -webkit-transition: all .6s ease;
    -moz-transition: all .6s ease;
    -o-transition: all .6s ease;
    -ms-transition: all .6s ease;
    transition: all .6s ease;
  }	
`;

const StyledLink = styled(Link)`
  text-decoration: none;  
  color: black;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 55px;
  height: 45px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 6px;
  margin-right: 6px;
`;

const UserGreeting = styled.h1`
  margin: auto 230px;
  font-size: 16px;
  color: white;
`;

class DashboardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: window.localStorage['id'],
      username: window.localStorage['username']
    }
  }

  render() {
    return (
      <HeaderDiv>
        <UserGreeting>Welcome, {this.state.username}</UserGreeting>
        <Dropdown>
          <DropdownToggle className="dropbtn">Menu</DropdownToggle>
          <DropdownMenu className="dropdown-content">
            <StyledLink to={"/dashboard/info"}>
              <DropdownListItem>
                <Icon icon="user"/>Account
              </DropdownListItem>
            </StyledLink>

            <StyledLink to="/dashboard/logout">
              <DropdownListItem>
                <Icon icon="sign-out-alt"/>Logout
              </DropdownListItem>
            </StyledLink>
          </DropdownMenu>
        </Dropdown>
      </HeaderDiv>
    );
  }
}

export default DashboardHeader;