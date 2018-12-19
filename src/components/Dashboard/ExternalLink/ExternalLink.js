import React, {Component} from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  background: rgba(224,224,224,0.5);	
`;

class ExternalLink extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      projectUUID: this.props.projectUUID,
      data: []
    };
  }

  render() {
    if (this.state.loading) {
      return (<h2>Loading...</h2>);
    }

    return (
      <ContainerDiv>
        <h1>External Link</h1>
      </ContainerDiv>
    );
  }
}

export default ExternalLink;
