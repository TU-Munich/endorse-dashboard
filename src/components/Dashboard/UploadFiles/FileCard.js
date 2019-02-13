import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tag from "./Tag/Tag";

class FileCard extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.fileName} color={"textPrimary"} gutterBottom>
            {this.props.file.name}
          </Typography>
          <Typography className={classes.fileMeta} color="textSecondary">
            Date: {this.props.file.lastModifiedDate.toString()}
          </Typography>
          <Typography className={classes.fileMeta} color="textSecondary">
            Application Type: {this.props.file.type}
          </Typography>
        </CardContent>
        <Tag document_id={this.props.file._id} suggestions={this.props.suggestions} />
      </Card>
    )
  }
}

FileCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  card: {
    minHeight: 135,
    textAlign: 'left',
    overflow: '-webkit-paged-y',
    padding: 10
  },
  cardContent: {
    padding: 0
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