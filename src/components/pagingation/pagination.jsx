import * as React from "react";
import { Link } from "react-router-dom";
const pagesToShow = 7;

export class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  pagesRange() {
    if (this.props.currentPage <= (pagesToShow - (pagesToShow % 2)) / 2) {
      return 1;
    } else {
      return this.props.currentPage - (pagesToShow - (pagesToShow % 2)) / 2;
    }
  }

  render() {
    console.log(this.props.currentPage);
    let pages = [];
    for (let i = this.pagesRange(); i < this.pagesRange() + pagesToShow; i++) {
      pages.push(
        <Link
          to={`/characters/${i}`}
          key={i}
          className={this.props.currentPage === String(i) ? "active" : ""}
        >
          {i}
        </Link>
      );
    }
    return <div className="pagination">{pages}</div>;
  }
}
