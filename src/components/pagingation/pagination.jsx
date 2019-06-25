import * as React from "react";

const pagesToShow = 7;

export class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(e) {
    this.props.onPageClick(e);
  }

  pagesRange() {
    if (this.props.currentPage <= (pagesToShow - (pagesToShow % 2)) / 2) {
      return 1;
    } else {
      return this.props.currentPage - (pagesToShow - (pagesToShow % 2)) / 2;
    }
  }

  render() {
    let pages = [];
    for (let i = this.pagesRange(); i < this.pagesRange() + pagesToShow; i++) {
      pages.push(
        <span
          key={Math.random() * i}
          className={this.props.currentPage === i ? "active" : ""}
        >
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
