import React, { Component } from 'react'
import './style.css'
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
      tags: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Pears" }
      ],
      suggestions: [
        { id: 3, name: "Bananas" },
        { id: 4, name: "Mangos" },
        { id: 5, name: "Lemons" },
        { id: 6, name: "Apricots" }
      ]
    };

    this.handleAddition = this.handleAddition.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete (i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags })
  }

  handleAddition (tag) {
    console.log(tag);
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags })
  }

  render () {
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