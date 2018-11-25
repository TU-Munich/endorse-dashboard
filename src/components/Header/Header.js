import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { debounce } from 'lodash'


const SiteHeader = styled.header`
  background: ${props => props.scroll || props.menuOpen ? 'rgb(55, 63, 73);' : 'transparent;' }
  color: black;
  padding: 1em 0;
  position: fixed;
  width: 100%;
  z-index: 3;
  transition: all ease-in-out 700ms;
  
  &::after {
    content: '';
    clear: both;
    display: block;
  }
`;

const HeaderSection = styled.div`
  width: 95%;
  max-width: 1000px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  float: left;
  font-size: 1rem;
  margin: 0;
  text-transform: uppercase;
  font-weight: 700;
  
  & span {
    font-weight: 400;
  }
`;

const SiteNav = styled.nav`
  position: absolute;
  top: 100%;
  right: 0%;
  background: rgba(230, 230, 230, .9);
  clip-path: ${props => props.menuOpen ? 'circle(250% at top center);' : 'circle(0px at top center);'}
  width: 100%;
  transition: clip-path ease-in-out 700ms;
  
  @media (min-width: 700px) {
    height: auto;
    position: relative;
    background: transparent;
    float: right;
    width: auto;
    clip-path: initial;
  }
`;

const Menu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const MenuElement = styled.li`
  border-bottom: 1px solid rgb(180, 180, 180);
  
  @media (min-width: 700px) {
    display: inline-block;
    border: none;
  }
`;

const MenuElementContent = styled.a`
  color: black;
  display: block;
  padding: 1em 1em 1em 1em;
  text-transform: uppercase;
  text-decoration: none;
  
  &:hover, &:focus {
    background: #f0f2f4;
    color: #464655;
  }
  
  @media (min-width: 700px) {
    padding: 0;
    margin-left: 3em;
    
    &:hover, &:focus {
      background: transparent;
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
  display: inline-block;
  font-size: 1.5em;
  margin-right: 1em;
  width: 1.1em;
  text-align: right;
  color: rgb(44, 51, 58);
  
  @media (min-width: 700px) {
    display: none;
  }
`;

const MenuToggle = styled.div`
  padding: 1em;
  position: absolute;
  top: .5em;
  right: .5em;
  cursor: pointer;
  transition: all ease-in-out 500ms;
  
  @media (min-width: 700px) {
    display: none;
  }
  
  transform: ${props => props.menuOpen ? 'rotate(45deg);' : ''}
`;

const Hamburger = styled.div`
  content: '';
  display: block;
  background: black;
  height: 3px;
  width: 1.75em;
  border-radius: 3px;
  transition: all ease-in-out 500ms;
  
  &::after {
    content: '';
    display: block;
    background: black;
    height: 3px;
    width: 1.75em;
    border-radius: 3px;
    transition: all ease-in-out 500ms;
    transform: ${props => props.menuOpen ? 'rotate(90deg) translateY(0px) translateX(-3px);' : 'translateY(3px);'}
  }
  
  &::before {
    transform: ${props => props.menuOpen ? 'translateY(0px);' : 'translateY(-6px);'}
    content: '';
    display: block;
    background: black;
    height: 3px;
    width: 1.75em;
    border-radius: 3px;
    transition: all ease-in-out 500ms;
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      scroll: false
    };

    this.openMenu = this.openMenu.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  openMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  handleScroll = debounce((event) => {
    let scrollTop = window.pageYOffset

    if (scrollTop > 10) {
      this.setState({
        scroll: true
      });
    } else {
      this.setState({
        scroll: false
      });
    }
  });

  render() {
    return(
      <SiteHeader scroll={this.state.scroll} menuOpen={this.state.menuOpen}>
        <HeaderSection className={'header-section'}>
          <Logo className={'logo'}>ENDOR<span>SE</span></Logo>
          <SiteNav menuOpen={this.state.menuOpen} className={'site-nav'}>
            <Menu>
              <MenuElement><MenuElementContent href=""><Icon icon="home"/>Home</MenuElementContent></MenuElement>
              <MenuElement><MenuElementContent href=""><Icon icon="compass"/>Services & Solutions</MenuElementContent></MenuElement>
              <MenuElement><MenuElementContent href=""><Icon icon="phone"/>Contact</MenuElementContent></MenuElement>
              <MenuElement><MenuElementContent href=""><Icon icon="handshake"/>Login</MenuElementContent></MenuElement>
            </Menu>
          </SiteNav>
          <MenuToggle menuOpen={this.state.menuOpen} className={'menu-toggle'} onClick={this.openMenu}>
            <Hamburger menuOpen={this.state.menuOpen} />
          </MenuToggle>
        </HeaderSection>
      </SiteHeader>
    )
  }
}

export default Header