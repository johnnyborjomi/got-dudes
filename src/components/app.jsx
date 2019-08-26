import * as React from "react";
import { CharList } from "./char-list/char-list";
import { HashRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import HousePage from "./house-page/house-page";
import { CharCardByUrl } from "./char-card/char-card";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { currentPage: state.charListPageNum.charListPageNum };
}

const ConnectedCharList = connect(mapStateToProps)(CharList);
const RoutedConnectedCharList = withRouter(ConnectedCharList);

export class App extends React.Component {
  render() {
    const path = `/characters/${this.props.charListPageNum}`;

    return (
      <Router>
        <Redirect exact from="/" to="/characters" />
        <Redirect from="/characters" to={path} />

        <Route exact path="/characters/:page" component={RoutedConnectedCharList} />
        <Route path="/character/:id" component={CharCardByUrl} />
        <Route path="/houses/:id" component={HousePage} />
      </Router>
    );
  }
}
