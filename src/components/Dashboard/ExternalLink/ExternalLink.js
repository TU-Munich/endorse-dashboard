import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  margin: 50px; 
   
  text-align: center;
  margin-top:20px;
  max-width: 90%;	
`;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];



class ExternalLink extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      projectUUID: this.props.projectUUID,
      links: [{link:""}],
      name: []
    };

  }
  handleChange = (e) => {
    let className = "link"
      let links = [...this.state.links]
      //let index = e.target.id
      links[e.target.id][className] = e.target.value
      this.setState({ links }, () => console.log(this.state.links))
   
  }
  // handleChange = event => {
  //   this.setState({ name: event.target.value });
  // };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      name: value,
    });
  };
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
    const { classes } = this.props;
    
    return (
      <ContainerDiv>
        <Card style={{height: "300%", padding: "10px 10px 10px"}}>
          <h1>External Link</h1>
          <p>Please paste the links you want to analysis</p>
          <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
          <div>
          <TextField
                  label="Search Bar"
                  //data-id={idx}
                  id="query"
                  placeholder="Ex:bitcoin trend"
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  />
          <FormControl >
          <InputLabel htmlFor="select-multiple-checkbox"></InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </div>
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
