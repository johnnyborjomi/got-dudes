import * as React from "react";
import { CharList } from "./char-list/char-list";
import { HashRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import HousePage from "./house-page/house-page";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { charListPage: 1 };
  }

  render() {
    return (
      <Router>
        <Redirect from="/" to="/characters" />
        <Redirect from="/characters" to="/characters/1" />

        <Route
          path="/characters/:page"
          exact
          //todo: Lift up page state
          component={CharList}
        />
        <Route path="/character/:id" render={({ match }) => <div>{match.params.id}</div>} />
        <Route path="/houses/:id" component={HousePage} />
      </Router>
    );
  }
}
