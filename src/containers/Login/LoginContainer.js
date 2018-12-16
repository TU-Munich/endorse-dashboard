import React, {Component} from 'react';
import Login from '../../components/Login/Login'
import styled from 'styled-components';

const LoginWrapper = styled.div`
  position: relative;
  text-align: center;
  padding: 20vh;
`;

class LoginContainer extends Component {
  render() {
    return (
      <LoginWrapper className="login-wrapper">
        <Login/>
      </LoginWrapper>
    );
  }
}

export default LoginContainer;