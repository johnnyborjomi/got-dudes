import * as React from "react";

const apiUrl = "https://www.anapioficeandfire.com/api";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isFetching: true,
      error: null
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}/characters?page=1&pageSize=10`)
      .then(res => res.json())
      .then(result => this.setState({ data: result, isFetching: false }));
  }

  render() {
    if (this.state.isFetching) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div>
          {this.state.data.map(character => {
            for (let prop in character) {
              console.log(prop);
              if (character[prop] != false) {
                return (
                  <div>
                    <span>{prop}:</span>
                    <span>{character[prop]}</span>
                  </div>
                );
              }
            }
          })}
        </div>
      );
    }
  }
}
