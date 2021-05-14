import React from "react";
import providers from "../libs/providers.json";

export default class InputEmailSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.providers = providers;

    // console.log(this.providers);
    this.state = {
      suggestions: ["orange.fr", "outlook.fr", "gmail.com"],
      text: ""
    };
  }

  onTextChange = e => {
    const value = e.target.value;

    let suggestions = ["orange.fr", "outlook.fr", "gmail.com"]; // defaults suggestions
    if (value.length > 0 && value.indexOf("@") !== -1) {
      // getting the index of the firsts letters after @ for search in providers
      const firstLetters = value.indexOf("@") + 1;
      const regex = new RegExp(`^${value.substring(firstLetters)}`, "i");
      // matching with the best(s) provider(s)
      suggestions = this.providers.sort().filter(match => regex.test(match));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionsSelected(value) {
    const { text } = this.state;
    let { suggestions } = this.state;

    this.setState(() => ({
      text: text + value,
      suggestions: suggestions
    }));
  }

  // email suggestion render
  renderSuggestion() {
    const { suggestions } = this.state;
    // render only if not empty
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div>
        {suggestions.map(item => {
          return (
            <p onClick={() => this.suggestionsSelected(item)}>
              <u>{item}</u>
            </p>
          );
        })}
      </div>
    );
  }
  // input render
  render() {
    const { text } = this.state;
    return (
      <div>
        <input value={text} onChange={this.onTextChange} type="text" />
        {this.renderSuggestion()}
      </div>
    );
  }
}
