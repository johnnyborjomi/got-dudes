import * as React from "react";
import { CharCard } from "../char-card/char-card";
import { Pagination } from "../pagingation/pagination";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { apiUrl } from "../../config";

export class CharList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isFetching: true,
      error: null
    };
    this.prevPage = 0;
  }

  getCharacters() {
    this.setState({ isFetching: true });
    fetch(`${apiUrl}/characters?page=${this.props.match.params.page}&pageSize=30`)
      .then(res => res.json())
      .then(result => this.setState(state => ({ data: result, isFetching: false })));
  }

  componentDidMount() {
    this.getCharacters();
  }

  componentDidUpdate() {
    if (this.props.match.params.page !== this.prevPage) {
      this.getCharacters();
      this.prevPage = this.props.match.params.page;
    }
  }

  render() {
    if (this.state.isFetching) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div>
          <div className="characters">
            {this.state.data.map((character, i) => {
              return <CharCard key={i} character={character} />;
            })}
          </div>
          <Pagination currentPage={this.props.match.params.page} />
        </div>
      );
    }
  }
}
