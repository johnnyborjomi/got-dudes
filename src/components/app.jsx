import * as React from "react";
import { CharList } from "./char-list/char-list";
import { HashRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import HousePage from "./house-page/house-page";
import { CharCardByUrl } from "./char-card/char-card";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    currentPage: state.charListPageNum.charListPageNum,
    resultsPerPage: state.resultsPerPage.resultsPerPage
  };
}

const ConnectedCharList = connect(mapStateToProps)(CharList);
const RoutedConnectedCharList = withRouter(ConnectedCharList);
const ConnectedHousePage = connect(mapStateToProps)(HousePage);
const RoutedConnectedHousePage = withRouter(ConnectedHousePage);
const ConnectedCharCardByUrl = connect(mapStateToProps)(CharCardByUrl);
const RoutedConnectedCharCardByUrl = withRouter(ConnectedCharCardByUrl);

export class App extends React.Component {
  render() {
    console.log(this.props);
    const path = `/characters/${this.props.currentPage}`;

    return (
      <Router>
        <Redirect exact from="/" to="/characters" />
        <Redirect from="/characters" to={path} />

        <Route exact path="/characters/:page" component={RoutedConnectedCharList} />
        <Route path="/character/:id" component={RoutedConnectedCharCardByUrl} />
        <Route path="/houses/:id" component={RoutedConnectedHousePage} />
      </Router>
    );
  }
}

export const ConnectedApp = connect(mapStateToProps)(App);
