import React, { Fragment } from "react";
import { CharCard } from "../char-card/char-card";
import Pagination from "../pagingation/pagination";
import { API_URL } from "../../config";
import { HITS } from "../../config";
import { changeResultsPerPage } from "../../actions/actionCreator";

export class CharList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isFetching: true,
      error: null
    };
    this.prevPage = 0;
    this.prevItemsPerPage = 0;
  }

  getCharacters() {
    this.setState({ isFetching: true });
    const { currentPage, resultsPerPage } = this.props;
    fetch(`${API_URL}/characters?page=${currentPage}&pageSize=${resultsPerPage}`)
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

    if (this.prevItemsPerPage !== this.props.resultsPerPage) {
      this.getCharacters();
      this.prevItemsPerPage = this.props.resultsPerPage;
    }
  }

  handleSelect = ({ target: { value } }) => {
    this.props.dispatch(changeResultsPerPage(value));
  };

  render() {
    console.log(this.prevPage);
    const { isFetching, data } = this.state;
    const { resultsPerPage } = this.props;

    if (isFetching) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <Fragment>
          <div className="select">
            <label htmlFor="relultsPerPage">Results Per Page:</label>
            <select id="relultsPerPage" onChange={this.handleSelect} value={resultsPerPage}>
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
