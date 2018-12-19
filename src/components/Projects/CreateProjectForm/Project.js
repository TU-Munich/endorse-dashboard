import React, {Component} from 'react';
import styled from 'styled-components';
//import Card from '@material-ui/core/Card';
import ProjectForm from "./CreateProjectForm";
//import Form from "./Form"; //Will research on formik later


const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  margin: 1px; 
   
  text-align: center;
  margin-top:20px;
  max-width: 90%;	
`;

class Project extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      files: []
    };
  }

  render() {
    if (this.state.loading) {
      return (<h2>Loading...</h2>);
    }

    return (
      <div>
        <ContainerDiv>
          <ProjectForm/>
        </ContainerDiv>
        {/* <ContainerDiv> //For project overview
        </ContainerDiv> */}

      </div>
    );
  }
}

export default Project;
