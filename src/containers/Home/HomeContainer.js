import React, { Component } from 'react'
import styled from 'styled-components'
import Splash from '../../components/Home/Splash/Splash'
import Header from '../../components/Home/Header/Header'

const Home = styled.div`
  width: 100%;
`;

class HomeContainer extends Component {

  render() {
    return(
      <Home className={'home'}>
        <Header />
        <Splash />
      </Home>
    );
  }
}

export default HomeContainer;