import React from 'react';
import Card from '@material-ui/core/Card';
import './CreateProjectForm.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ProjectService from '../../../services/ProjectService'

class createProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: '',
      email: '',
      description: '',
      date: new Date()
    };
  }

  onNameChange(event) {
    this.setState({name: event.target.value});
    console.log(event.target.value)
  }

  onOwnerChange(event) {
    this.setState({owner: event.target.value});
    console.log(event.target.value)
  }

  onEmailChange(event) {
    this.setState({email: event.target.value});
    console.log(event.target.value)
  }

  onDescriptionChange(event) {
    this.setState({description: event.target.value});
    console.log(event.target.value)
  }

  onCreateButtonSubmit() {
    const project = this.state;
    console.log(project);
    console.log('Success!');
    ProjectService.createProject(project).then((response) => {
      let modalContent = response.status === 200 || response.status === 201 ?
        {title: 'Success', message: 'Project has been successfully created'} :
        {title: 'Error', message: 'An error has occurred while creating the project, please contact the system admin'};
      confirmAlert({
        title: modalContent.title,
        message: modalContent.message,
        buttons: [
          {
            label: 'Continue',
            onClick: () => window.location.replace('/projects-overview')
          }
        ]
      });
    })
  }


  render() {
    //const { classes } = this.props;
    return (
      <div className="container fluid">
        <h1>
          Create New Project
        </h1>
        <Card style={{marginTop: 40, marginBottom: 25, width: 700, padding: 20, borderRadius: '5px', margin: 'auto'}}
              className="md-block-centered">
          <form>
            <Grid container spacing={24}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="name"
                  label="Project Name"
                  placeholder="Ex: Navigation Vision Manual"
                  fullWidth
                  onInput={this.onNameChange.bind(this)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="owner"
                  label="Owner"
                  placeholder="Angela"
                  fullWidth
                  onInput={this.onOwnerChange.bind(this)}
                />
              </Grid>
            </Grid>
            <TextField
              id="email"
              label="Email"
              placeholder="angela@bmw.com"
              fullWidth
              onInput={this.onEmailChange.bind(this)}
            />
            <TextField
              id="description"
              label="Description"
              multiline
              rowsMax="4"
              placeholder="Internal survey regarding to manual inspiration"
              type="description"
              fullWidth
              onInput={this.onDescriptionChange.bind(this)}
            />
          </form>
          <div alignment="center">
            <Button
              id="submit"
              type="submit"
              color="primary"
              onClick={this.onCreateButtonSubmit.bind(this)}
            >
              Create
            </Button>
          </div>

        </Card>
      </div>
    );
  }
}

export default createProjectForm;