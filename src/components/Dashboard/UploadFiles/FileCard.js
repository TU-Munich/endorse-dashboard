import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tag from "./Tag/Tag";

class FileCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const {classes} = this.props;
    console.log(classes);
    console.log(this.props);

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.fileName} color={"textPrimary"} gutterBottom>
            {this.props.file.name}
          </Typography>
          <Typography className={classes.fileMeta} color="textSecondary">
            Date: {Date(this.props.file.lastModifiedDate)}
          </Typography>
          <Typography className={classes.fileMeta} color="textSecondary">
            Application Type: {this.props.file.type}
          </Typography>
        </CardContent>
        <Tag />
      </Card>
    )
  }
}

FileCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  card: {
    minWidth: 275,
    minHeight: 135,
    textAlign: 'left',
    overflow: '-webkit-paged-y',
    marginBottom: 10,
  },
  cardContent: {
    paddingBottom: 0,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14
  },
  fileName: {
    fontSize: 15,
    marginBottom: 0,
    fontWeight: 600,
  },
  fileMeta: {
    fontSize: 14,
  },
};

export default withStyles(styles)(FileCard);