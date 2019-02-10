import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import UploadFilesIcon from '@material-ui/icons/CloudUpload';
import UploadLinksIcon from '@material-ui/icons/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";

const colors = ['#FF0000', '#008000', '#808080'];
const avatarColor = colors[Math.floor(Math.random() * colors.length)];

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectUUID: props._id,
      date: new Date(props._source.date),
      description: props._source.description,
      email: props._source.email,
      owner: props._source.owner,
      name: props._source.name
    };
  }

  setProjectUUID() {
    window.localStorage.removeItem('projectUUID');
    window.localStorage.setItem('projectUUID', this.state.projectUUID);
  }

  render() {
    const {classes} = this.props;

    const OpenDashboardLink = props => <Link to={`/dashboard/info`} {...props} />;
    const OpenUploadFileLink = props => <Link to={`/dashboard/upload_files`} {...props} />;
    const OpenCrawlURLLink = props => <Link to={`/dashboard/crawl`} {...props} />;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Project" className={classes.avatar}>
              {this.state.name ? this.state.name.substring(0, 1) : 'X'}
            </Avatar>
          }
          action={
            <Tooltip title="Save to favorites" aria-label="Save project to favorites">
              <IconButton>
                <FavoriteIcon/>
              </IconButton>
            </Tooltip>
          }
          title={this.state.name}
          subheader={this.state.date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        />
        <CardContent>
          <Typography component="p" className={classes.description}>
            {this.state.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button size="small" color="primary" className={classes.button} component={OpenDashboardLink} onClick={() => this.setProjectUUID()}>
            Open Project
          </Button>
          <Tooltip title="Upload Files" aria-label="Upload Files to project">
            <IconButton component={OpenUploadFileLink} onClick={() => this.setProjectUUID()}>
              <UploadFilesIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Crawl URL's" aria-label="Upload URL for web crawling to project">
            <IconButton component={OpenCrawlURLLink} onClick={() => this.setProjectUUID()}>
              <UploadLinksIcon/>
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  card: {
    maxWidth: 400,
    minHeight: 215,
    marginTop: 10,
    marginBottom: 10,
    position: 'relative'
  },
  actions: {
    display: 'flex',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    justifyContent: 'flex-end'
  },
  button: {
    marginRight: 'auto'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: avatarColor
  },
  description: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkitLineClamp': 3,
    '-webkitBoxOrient': 'vertical'
  },
  typography: {
    useNextVariants: true
  },
});

export default withStyles(styles)(ProjectCard);