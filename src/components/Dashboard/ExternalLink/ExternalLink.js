import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  margin: 50px; 
   
  text-align: center;
  margin-top:20px;
  max-width: 90%;	
`;



class ExternalLink extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      projectUUID: this.props.projectUUID,
      links: [{link:""}]
    };

  }
  handleChange = (e) => {
    let className = "link"
      let links = [...this.state.links]
      //let index = e.target.id
      links[e.target.id][className] = e.target.value
      this.setState({ links }, () => console.log(this.state.links))
   
  }
  moreLinks = (e) => {
      this.setState((prevState) => ({
        links: [...prevState.links,{link:""}],
      }));
    }
  handleSubmit = (e) => { 
    console.log(this.state.links)
    e.preventDefault() }

  render() {
    let links = this.state.links
    if (this.state.loading) {
      return (<h2>Loading...</h2>);
    }

    return (
      <ContainerDiv>
        <Card style={{height: "300%", padding: "10px 10px 10px"}}>
          <h1>External Link</h1>
          <p>Please paste the links you want to analysis</p>
          <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
          {
          links.map((val, idx)=> {
            let linkId = `Link${idx+1}`
            return (
              <div key={idx}>
                <TextField
                  label={linkId}
                  data-id={idx}
                  id={String(idx)}
                  //id={linkId}
                  placeholder="https://bloomberg.com/search/"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  />
              </div>
            )})
          }
        <Button 
        variant="contained"  
        onClick={this.moreLinks}
        >
        More
        </Button>
        <Button 
        variant="contained" 
        color="primary" 
        onClick={this.handleSubmit}
        >
        Submit
        </Button>
        </form>
        </Card>
          

      </ContainerDiv>
    );
  }
}

export default ExternalLink;
