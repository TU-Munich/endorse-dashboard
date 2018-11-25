import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideBar = styled.div`
  margin: 0px;
  padding: 0px;
  background-color: #ebedef;
`;

const NavSideMenu = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #2e353d;
  position: fixed;
  top: 0px;
  width: 220px;
  height: 100%;
  color: #e1ffff;
`;

const Logo = styled.img`
  background-color: #23282e;
  display: block;
  text-align: center;
  margin: auto; 
  padding: 10px; 
  width: 100%;
`;

const MenuList = styled.div`
`;

const NavSideMenuUL = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  line-height: 4rem;
  cursor: pointer;
  visibility: visible !important;
  
`;

const NavSideMenuLI = styled.li`
  padding-left: 0px;
  border-left: 3px solid #2e353d;
  border-bottom: 1px solid #23282e;
  display: flex;
  
  &:active {
    border-left: 3px solid #e1ffff;
    background-color: #4f5b69;
	}
	
	&:hover {
    border-left: 3px solid #e1ffff;
    background-color: #4f5b69;
    -webkit-transition: all .6s ease;
    -moz-transition: all .6s ease;
    -o-transition: all .6s ease;
    -ms-transition: all .6s ease;
    transition: all .6s ease;
	}	
`;

const ListItemA = styled(Link)`
  text-align: center;
  display: block;
  text-decoration: none;
  color: #e1ffff;
`;

const Icon = styled(FontAwesomeIcon)`
  display: inline-block;
  height: 55px;
  width: 55px;
  vertical-align: middle;
  margin-right: 15px;
  margin-left: 10px;
`;
class DashboardSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: window.localStorage['id']
        }
    }

    componentDidMount () {
        const script1 = document.createElement("script");
        script1.src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js";
        script1.async = true;
        const script2 = document.createElement("script");
        script2.src="//code.jquery.com/jquery-1.11.1.min.js";
        script2.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);
    }

    render() {
        return (
            <SideBar>
                <NavSideMenu>
                    <Icon icon="laptop" style={{width: "70px", height: "70px" }} />EndorseLogo

                    <MenuList>
                        <NavSideMenuUL id="menu-content" className="menu-content collapse out">
                            <ListItemA to="/dashboard">
                                <NavSideMenuLI>
                                    <Icon icon="info" /> Dashboard
                                </NavSideMenuLI>
                            </ListItemA>

                            <ListItemA to={"/dashboard/upload_files/" + this.state.id}>
                                <NavSideMenuLI>
                                    <Icon  icon="upload" /> Upload Files
                                </NavSideMenuLI>
                            </ListItemA>

                            <ListItemA to={"/dashboard/external_link/" + this.state.id}>
                                <NavSideMenuLI>
                                    <Icon  icon="cloud-upload-alt" /> External Link
                                </NavSideMenuLI>
                            </ListItemA>

                            <ListItemA to={"/dashboard/kibana_dashboard/" + this.state.id}>
                                <NavSideMenuLI data-toggle="collapse" data-target="#settings" className="collapsed">
                                    <Icon  icon="chart-line" /> Kibana Dashboard
                                </NavSideMenuLI>
                            </ListItemA>
                        </NavSideMenuUL>
                    </MenuList>
                </NavSideMenu>
            </SideBar>
        );
    }
}

export default DashboardSideBar;
