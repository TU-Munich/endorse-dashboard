import React, { Component } from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  background: rgba(224,224,224,0.5);	
`;

class UploadFiles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            doctor_id: this.props.match.params.id,
            data: []
        };
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <ContainerDiv>
               <h1>Update Files</h1>
            </ContainerDiv>
        );
    }
}

export default UploadFiles;
