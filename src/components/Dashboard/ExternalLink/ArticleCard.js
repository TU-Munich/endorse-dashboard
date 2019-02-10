import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tag from "./Tag/Tag";

class ArticleCard extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.fileName} color={"textPrimary"} gutterBottom>
            Title: {this.props.file['title']}
          </Typography>
          {/* <Typography className={classes.fileMeta} color="textSecondary">
            Date: {this.props.file.lastModifiedDate.toString()}
          </Typography> */}
          <Typography className={classes.fileMeta} color="textSecondary">
            Source: {this.props.file['url']}
          </Typography>
        </CardContent>
        {/* <Tag suggestions={this.props.suggestions} /> */}
      </Card>
    )
  }
}

ArticleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  card: {
    minHeight: 135,
    textAlign: 'left',
    overflow: '-webkit-paged-y',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
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

export default withStyles(styles)(ArticleCard);