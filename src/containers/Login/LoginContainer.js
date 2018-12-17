import React, {Component} from 'react';
import Login from '../../components/Login/Login'
import styled from 'styled-components';
import Particles from "react-particles-js";
import ParticlesConfig from "../../constants/ParticlesConfig";


const ParticlesCanvas = styled(Particles)`
  position: absolute; 
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgb(255, 255, 255);
  width: 100%;
  z-index: 2;
`;

const LoginWrapper = styled.div`
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

class LoginContainer extends Component {
  render() {
    return (
      <div>
        <ParticlesCanvas params={ParticlesConfig}/>
        <LoginWrapper className="login-wrapper">
          <Login/>
        </LoginWrapper>
      </div>
    );
  }
}

export default LoginContainer;