import React, { Component } from 'react'
import Particles from 'react-particles-js'
import ParticlesConfig from '../../constants/ParticlesConfig'
import styled from 'styled-components'
import Contact from "../../containers/Contact/Contact";

const ParticlesCanvas = styled(Particles)`
  position: absolute; 
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgb(255, 255, 255);
  width: 100%;
  z-index: 2;
`;

const WelcomeBanner = styled.div`
  align-items: center;
  background-color: rgba(224, 224, 224, 0.5);
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  width: 100%;
  z-index: 2;
`;

const WelcomeMessage = styled.div`
  font-size: 30px;
  text-align: center;
  
  @media (max-width: 700px) {
    font-size: 20px;
  }
`;


class Splash extends Component {
  render() {
    return(
      <div className={'splash-section'}>
        <ParticlesCanvas params={ParticlesConfig} />
        <WelcomeBanner>
          <WelcomeMessage>
            <h1>Welcome to ENDOrSE</h1>
            <h3>End-User Document Search Engine</h3>
          </WelcomeMessage>
        </WelcomeBanner>
      </div>

    )
  }
}

export default Splash