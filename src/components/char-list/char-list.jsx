import React, { Fragment } from "react";
import { CharCard } from "../char-card/char-card";
import Pagination from "../pagingation/pagination";
import { API_URL } from "../../config";
import { HITS } from "../../config";
import { connect } from "react-redux";

export class CharList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isFetching: true,
      error: null,
      page: this.props.match.params.page,
      pageSize: 10
    };
    this.prevPage = 0;
  }

  getCharacters() {
    this.setState({ isFetching: true });
    const page = this.props.currentPage || this.state.page;
    fetch(`${API_URL}/characters?page=${page}&pageSize=${this.state.pageSize}`)
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

  handleSelect = ({ target: { value } }) => {
    this.setState(
      {
        pageSize: +value
      },
      this.getCharacters
    );
  };

  render() {
    const { isFetching, data, pageSize } = this.state;
    console.log(this.props);

    if (isFetching) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <Fragment>
          <div className="select">
            <label htmlFor="relultsPerPage">Results Per Page:</label>
            <select id="relultsPerPage" onChange={this.handleSelect} value={pageSize}>
              {HITS.map(hit => (
                <option key={hit.value} value={hit.value}>
                  {hit.label}
                </option>
              ))}
            </select>
          </div>
          <div className="characters">
            {data.map((character, i) => {
              return <CharCard key={i} character={character} />;
            })}
          </div>
          <Pagination />
        </Fragment>
      );
    }
  }
}
