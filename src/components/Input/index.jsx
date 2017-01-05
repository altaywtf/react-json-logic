// Core
import React, { Component, PropTypes } from 'react';

// Constants
const INPUT_TYPES = ['text', 'number'];

// Helpers
const isNumeric = n => typeof n === 'number';

// PropTypes
const { any, string, func } = PropTypes;
const propTypes = {
  name: string,
  onChange: func,
  value: any,
  type: string,
};

const defaultProps = {
  type: INPUT_TYPES[0],
  value: '',
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      type: isNumeric(props.value) ? 'number' : props.type,
    };
  }

  onTypeChange = (type) => {
    let { value } = this.state;

    if (type === 'number') {
      value = parseFloat(value);
    } else {
      value = value.toString();
    }

    this.setState({ type }, () => this.props.onChange(value));
  }

  onValueChange = (value) => {
    const { type } = this.state;

    if (type === 'number') {
      value = parseFloat(value);
    }

    this.setState({ value }, () => this.props.onChange(value));
  }

  render() {
    const { name } = this.props;
    const { type, value } = this.state;

    return (
      <div>
        <select
          value={type}
          onChange={e => this.onTypeChange(e.target.value)}
        >
          {INPUT_TYPES.map((inputType, index) => (
            <option
              key={index}
              value={inputType}
            >
              {inputType}
            </option>
          ))}
        </select>

        <input
          name={name}
          value={value}
          type={type}
          onChange={e => this.onValueChange(e.target.value)}
        />
      </div>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
