import React from 'react';
import Card from '@material-ui/core/Card';
import './createProjectForm.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ApiService from '../../../../services/ApiService'
import config from '../../../../config'

let endorseNLPService = new ApiService(config.nlpServiceBaseUrl, 'application/json', '', '', '');

class createProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      owner: '',
      email: '',
      description: '',
      date: new Date()
    };
  }

  //Should use arrow function for binding. So now is not bind yet due to error


  onProjectNameChange(event) {
    this.setState({projectName: event.target.value})
    console.log(event.target.value)
  }

  onOwnerChange(event) {
    this.setState({owner: event.target.value})
    console.log(event.target.value)
  }

  onEmailChange(event) {
    this.setState({email: event.target.value})
    console.log(event.target.value)
  }

  onDescriptionChange(event) {
    this.setState({description: event.target.value})
    console.log(event.target.value)
  }

  onCreateButtonSubmit() {
    const project = this.state;
    console.log(project);
    console.log('Success!');
    endorseNLPService.post('/generic/projects-index/project', project).then((response) => {
      let modal = response.default_status === 200 ?
        '' :
        ''
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
                  id="projectName"
                  label="Project Name"
                  placeholder="Ex: Navigation Vision Manual"
                  fullWidth
                  onInput={this.onProjectNameChange.bind(this)}
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