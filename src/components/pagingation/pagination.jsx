import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeCharListPage } from "../../actions/actionCreator";

const pagesToShow = 7;

class Pagination extends React.Component {
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

  handleClick = ({ currentTarget }) => {
    console.log(currentTarget.dataset.key);
    changeCharListPage(currentTarget.dataset.key);
  };

  render() {
    const { currentPage, dispatch } = this.props;

    console.log(currentPage);
    let pages = [];
    for (let i = this.pagesRange(); i < this.pagesRange() + pagesToShow; i++) {
      pages.push(
        <div
          key={i}
          onClick={event => {
            console.log(event.currentTarget.dataset.key);
            dispatch(changeCharListPage(event.currentTarget.dataset.key));
          }}
          data-key={i}
        >
          <Link to={`/characters/${i}`} className={currentPage == i ? "active" : ""}>
            {i}
          </Link>
        </div>
      );
    }
    return <div className="pagination">{pages}</div>;
  }
}

function mapStateToProps(state) {
  return { currentPage: state.charListPageNum.charListPageNum };
}

export default connect(mapStateToProps)(Pagination);
