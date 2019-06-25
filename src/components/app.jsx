import * as React from "react";
import { CharCard } from "./char-card/char-card";
import { Pagination } from "./pagingation/pagination";

const apiUrl = "https://www.anapioficeandfire.com/api";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isFetching: true,
      error: null,
      page: 1
    };
    this.prevPage = 1;
    this.onPageClick = this.onPageClick.bind(this);
  }

  getCharacters() {
    this.setState({ isFetching: true });
    fetch(`${apiUrl}/characters?page=${this.state.page}&pageSize=30`)
      .then(res => res.json())
      .then(result =>
        this.setState(state => ({ data: result, isFetching: false }))
      );
  }

  componentDidMount() {
    this.getCharacters();
  }

  componentDidUpdate() {
    if (this.state.page !== this.prevPage) {
      this.getCharacters();
      this.prevPage = this.state.page;
    }
  }

  onPageClick(e) {
    e.persist();
    this.setState(state => ({ page: Number(e.target.innerText) }));
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
          <Pagination
            currentPage={this.state.page}
            onPageClick={this.onPageClick}
          />
        </div>
      );
    }
  }
}
