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
      projectName: props._source.projectName
    };
  }

  render() {
    const {classes} = this.props;

    const OpenDashboardLink = props => <Link to={`/dashboard/${this.state.projectUUID}`} {...props} />;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Project" className={classes.avatar}>
              {this.state.projectName ? this.state.projectName.substring(0, 1) : 'X'}
            </Avatar>
          }
          action={
            <Tooltip title="Save to favorites" aria-label="Save project to favorites">
              <IconButton>
                <FavoriteIcon/>
              </IconButton>
            </Tooltip>
          }
          title={this.state.projectName}
          subheader={this.state.date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        />
        <CardContent>
          <Typography component="p" className={classes.description}>
            {this.state.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button size="small" color="primary" className={classes.button} component={OpenDashboardLink}>
            Open Project
          </Button>
          <Tooltip title="Upload Files" aria-label="Upload Files to project">
            <IconButton>
              <UploadFilesIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Crawl URL's" aria-label="Upload URL for web crawling to project">
            <IconButton>
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