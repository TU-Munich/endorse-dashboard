import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColorPalette from '../../constants/ColorPalette';

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
  width: 200px;
  height: 100%;
  color: #e1ffff;
  box-shadow: 1px 3px 4px black;
`;

const Logo = styled.h2`
  text-align: center;
  margin-top: 14px;
  margin-bottom: 13px;
`;

const MenuList = styled.div`
  border-top: 1px solid ${ColorPalette.endorse_primary_dark};
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

  render() {
    return (
      <SideBar>
        <NavSideMenu>
          <Logo>ENDOrSE</Logo>
          <MenuList>
            <NavSideMenuUL id="menu-content" className="menu-content collapse out">
              <ListItemA to={"/dashboard"}>
                <NavSideMenuLI>
                  <Icon icon="info" /> Dashboard
                </NavSideMenuLI>
              </ListItemA>
              <ListItemA to={"/dashboard/project"}>
                <NavSideMenuLI>
                  <Icon icon="info" /> Project
                </NavSideMenuLI>
              </ListItemA>

              <ListItemA to={"/dashboard/upload_files"}>
                <NavSideMenuLI>
                  <Icon  icon="upload" /> Upload Files
                </NavSideMenuLI>
              </ListItemA>

              <ListItemA to={"/dashboard/external_link"}>
                <NavSideMenuLI>
                  <Icon  icon="cloud-upload-alt" /> External Link
                </NavSideMenuLI>
              </ListItemA>

              <ListItemA to={"/dashboard/kibana_dashboard"}>
                <NavSideMenuLI >
                  <Icon  icon="chart-line" />Kibana Graphs
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
