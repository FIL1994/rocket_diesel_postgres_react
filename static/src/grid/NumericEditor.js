import React, { Component } from "react";
import { Input } from "semantic-ui-react";
import _ from "lodash";

const isLeftOrRight = e => [37, 39].includes(e.keyCode);

class NumericEditor extends Component {
  state = {
    value: this.props.value
  };

  componentDidMount() {
    setTimeout(() => {
      this.refs.input.focus();
      this.refs.input.setSelectionRange(0, _.toString(this.state.value).length);

      this.refs.input.addEventListener("keydown", this.onKeyDown);
    });
  }

  getValue = () => Number(this.state.value);

  onChange = e => {
    const value = e.target.value;

    if (value === ".") {
      if (this.state.value.indexOf(".") !== -1) return;
    } else if (!_.isFinite(Number(value))) return;

    this.setState({ value });
  };

  onKeyDown = e => {
    if (isLeftOrRight(e)) {
      e.stopPropagation();
    }
  };

  render() {
    return (
      <Input ref="input" value={this.state.value} onChange={this.onChange} />
    );
  }
}

export default NumericEditor;
