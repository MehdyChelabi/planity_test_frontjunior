import React from "react";
import providers from "../libs/providers.json";
import "./InputEmailSuggest.css";
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
      // manage case with no suggestion or when user only tap @ for only having most populars providers
      if (suggestions.length === 0 || suggestions.length === providers.length) {
        suggestions = ["orange.fr", "outlook.fr", "gmail.com"];
      }
      // no suggestion if email valid
      if (this.validateEmail(value)) {
        suggestions = [];
      }
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionsSelected(value) {
    const { text } = this.state;
    let { suggestions } = this.state;
    // save the substring before the @ for not concat with the user enter (eg ...@(out)outlook.fr)
    let indiceSubStr = text.indexOf("@") + 1;
    let saveText = text.substring(0, indiceSubStr);
    // no suggestion if email valid
    if (this.validateEmail(saveText + value)) {
      suggestions = [];
    }
    this.setState(() => ({
      text: saveText + value,
      suggestions: suggestions
    }));
  }

  // check if it's a valid email with regular expression
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // thanks to stackoverflow
    return re.test(String(email).toLowerCase());
  }

  // email suggestion render
  renderSuggestion() {
    const { suggestions } = this.state;
    // render only if not empty
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className="suggestions">
        {suggestions.map(mail => {
          return (
            <span
              onClick={() => this.suggestionsSelected(mail)}
              key={mail.toString()}
            >
              <span className="mailSuggest">{mail}</span>
            </span>
          );
        })}
      </div>
    );
  }
  // input render
  render() {
    const { text } = this.state;
    return (
      <div className="emailBlock">
        <input
          value={text}
          onChange={this.onTextChange}
          type="Email"
          placeholder="Adresse email"
        />
        {this.renderSuggestion()}
      </div>
    );
  }
}
