import React, { Component } from 'react'
import './style.css'
import DocumentService from '../../../../services/DocumentService'
const ReactTags = require('react-tag-autocomplete');

const KeyCodes = {
  tab: 9,
  enter: 13,
};

const delimiters = [KeyCodes.tab, KeyCodes.enter];

class Tag extends Component {
  constructor (props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: this.props.suggestions
    };

    this.handleAddition = this.handleAddition.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete (i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags }, () => {
      this.updateTags().then((response) => {
        console.log(response);
        console.log("updated!");
      })
    })
  }

  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags }, () => {
      this.updateTags().then((response) => {
        console.log(response);
        console.log("updated!");
      })
    });
  }

  updateTags() {
    let body = [];
    this.state.tags.forEach((tag) => {body.push({"tag": tag.name})});
    let payload = {"tags": body};
    return DocumentService.updateDocument(this.props.document_id, payload);
  }

  render () {
    if (!this.props.document_id) {
      return
    }

    return (
      <ReactTags
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        handleDelete={this.handleDelete}
        handleAddition={this.handleAddition}
        delimiters={delimiters}
        allowNew={true}/>
    )
  }
}

export default Tag