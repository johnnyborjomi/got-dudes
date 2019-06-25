import * as React from "react";

const pagesToShow = 10;

export class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(e) {
    this.props.onPageClick(e);
  }

  render() {
    let pages = [];
    for (
      let i = this.state.currentPage;
      i < this.state.currentPage + pagesToShow;
      i++
    ) {
      pages.push(
        <span key={i} className={this.props.currentPage === i ? "active" : ""}>
          {i}
        </span>
      );
    }
    return (
      <div className="pagination" onClick={this.handlePageClick}>
        {pages}
      </div>
    );
  }
}
