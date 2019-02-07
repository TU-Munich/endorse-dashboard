import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { confirmAlert } from 'react-confirm-alert';
import CrawlerService from '../../../services/CrawlerService';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import socketIOClient from "socket.io-client";
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

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

const sources = [
  'New York Times',
  'Bloomberg',
  'Washington Post',
  'Reuters',
];
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  progress:{
    marginTop : 10,
    flexGrow: 1,
  },
  linearColorPrimary: {
    backgroundColor: '#0065BD',
  },
  linearBarColorPrimary: {
    backgroundColor: '#a9cae8',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 450,
    maxWidth: 700,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});


class ExternalLink extends Component {

  constructor(props) {
    super(props);

    this.state = {
      percentage: 0,
      quotes:'',
      endpoint:"http://localhost:3002",
      loading: false,
      crawling: false,
      projectUUID: this.props.projectUUID,
      source: [],
      period:"",
      query:""
    };

  }
  handleSearchChange = (event) => {
    this.setState({ query: event.target.value });
  }
  handlePeriodChange = (event) => {
    this.setState({ period: event.target.value });
  };
  handleChangeMultiple = (event) => {
    this.setState({ source: event.target.value });
  };
  handleSubmit = (e) => { 
    console.log(this.state)
    let crawlingRequest = this.state;
    this.setState({crawling: true})


    CrawlerService.executeCrawling(crawlingRequest).then((response) => {
      let modalContent = response.status === 200 || response.status === 201 ?
        {title: 'Success', message: 'Related articles are crawling!'} :
        {title: 'Error', message: 'An error has occurred while executing search, please contact the system admin'};
      confirmAlert({
        title: modalContent.title,
        message: modalContent.message,
        buttons: [
          {
            label: 'Continue',
            // onClick: () => window.location.replace('/dashboard/crawl')
            onClick: () => this.setState({crawling: false})
          }
        ]
      });
    })
    e.preventDefault() 
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("server_response", response => this.setState({ 
      quote: response['data']
   }));
    
  }
  

  render() {
    
    if (this.state.loading) {
      return (<h2>Loading...</h2>);
    }

    const { classes } = this.props;
    const {percentage} = this.state;
    return (
      <ContainerDiv>
        <Card style={{height: "300%", padding: "10px 10px 10px"}}>
          <h1>Crawler</h1>
          <p>Collect related articles from major news websites</p>
          <form onSubmit={this.handleSubmit} onChange={this.handleSearchChange} >
          <TextField
                  label="Search"
                  //data-id={idx}
                  id="search"
                  placeholder="Enter the keyword you would like to search"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  />
          <div className={classes.root}>
            {/* Period select component */}
            <FormControl className={classes.formControl}> 
              <InputLabel htmlFor="age-simple">Period</InputLabel>
                <Select
                  value={this.state.period}
                  onChange={this.handlePeriodChange}
                >
                  <MenuItem value="Past Day">Past Day</MenuItem>
                  <MenuItem value="Past Week">Past Week</MenuItem>
                  <MenuItem value="Past Month">Past Month</MenuItem>
                </Select>
            </FormControl>
            
            {/* Sources select component */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-chip">Source</InputLabel>
              <Select
                multiple
                value={this.state.source}
                onChange={this.handleChangeMultiple}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {sources.map(source => (
                  <MenuItem key={source} value={source} >
                    {source}
                  </MenuItem>
                ))}
                
              </Select>
            </FormControl>
          </div>
        
        </form>
        <Button 
        variant="contained" 
        color="primary" 
        onClick={this.handleSubmit}
        disabled={this.state.crawling}
        >
        Search
        </Button>
        { this.state.crawling &&
          <div >
          <Paper className={classes.progress}>
            <LinearProgress 
              classes={{
                colorPrimary: classes.linearColorPrimary,
                barColorPrimary: classes.linearBarColorPrimary,
                      }}
            />
          </Paper>
          {/* Crawling......{percentage}% 
          <Progress
            percent={percentage}
            theme={{
            success: {
              symbol: '🏄‍',
              color: 'rgb(223, 105, 180)'
            },
            active: {
              symbol: '😋',
              color: '#fbc630'
            },
            default: {
              symbol: '😀',
              color: '#fbc630'
            }
          }}
          />*/
          <div style={{ textAlign: "center" }}>
            <p>
                {this.state.quotes}
            </p>
          </div>}
        </div>
        }
        </Card>
      </ContainerDiv>
      
    );
  }
}

export default withStyles(styles)(ExternalLink);
