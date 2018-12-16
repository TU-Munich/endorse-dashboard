import React, { Component } from 'react'
import styled from 'styled-components'
import Splash from '../../components/Home/Splash/Splash'
import Header from '../../components/Home/Header/Header'

const HomeContainer = styled.div`
  width: 100%;
`;

class Home extends Component {

  render() {
    return(
      <HomeContainer className={'home'}>
        <Header />
        <Splash />
      </HomeContainer>
    );
  }
}

export default Home;