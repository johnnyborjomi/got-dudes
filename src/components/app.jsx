import * as React from "react";
import { CharList } from "./char-list/char-list";
import { HashRouter as Router, Route, Link } from "react-router-dom";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { charListPage: 1 };
  }

  render() {
    return (
      <Router>
        <Link to={"/"}>Home</Link>
        <Route
          path="/"
          exact
          //todo: Lift up page state
          render={() => <CharList page={this.state.charListPage} />}
        />
      </Router>
    );
  }
}
