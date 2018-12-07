import React, { Component } from 'react'
import styled from 'styled-components'
import Splash from '../../components/Splash/Splash'
import Header from '../../components/Header/Header'



const HomeContainer = styled.div`
  width: 100%;
 
`;
const newContainer = styled.div`
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