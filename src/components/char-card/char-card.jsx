import * as React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { apiUrl } from "../../config";
import { getHouses } from "../../got.service";
import { getItem } from "../../got.service";

function Allegiance(props) {
  let { house } = props;
  let url = house.url.replace(apiUrl, "");
  return (
    <li key={house.name}>
      <Link to={url}>{house.name}</Link>
    </li>
  );
}

function Allegiances(props) {
  let { houseNames, isFetching } = props;

  if (houseNames.length > 0) {
    return (
      <div className="char-card_prop">
        Allegiances:{" "}
        <ul className="char-card_prop">
          {isFetching
            ? "Loading..."
            : houseNames.map((house, i) => <Allegiance house={house} key={i} />)}
        </ul>
      </div>
    );
  }
  return "";
}

function Titles(props) {
  if (props.titles == undefined || props.titles[0] == "") return "";
  let titles = props.titles.map(title => {
    return <li key={title}>{title}</li>;
  });
  return <ul>Titles: {titles}</ul>;
}

function CharProps(props) {
  const { charProps, houseNames, isHouseFetching } = props;

  return (
    <div className="char-card">
      <div className="icon">{charProps.gender === "Male" ? "🙎🏻‍♂️" : "🙎🏻‍♀️"}</div>
      <h2 className="char-card_prop">{charProps.name ? charProps.name : "noname"}</h2>
      <div className="char-card_prop">Born: {charProps.born ? charProps.born : "n/a"}</div>
      <div className="char-card_prop">Died: {charProps.died ? charProps.died : "n/a"}</div>
      <div className="char-card_prop">Gender: {charProps.gender ? charProps.gender : "n/a"}</div>
      <Titles titles={charProps.titles} />
      <Allegiances houseNames={houseNames} isFetching={isHouseFetching} />
      <Route path="/allegiances" render={() => <h1>Allegiance</h1>} />
    </div>
  );
}

export class CharCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houseNames: [],
      isHouseFetching: true
    };
  }

  componentDidMount() {
    getHouses(this.props.character).then(houseNames => {
      this.setState({ houseNames: houseNames, isHouseFetching: false });
    });
  }

  render() {
    let charProps = this.props.character;
    let houseNames = this.state.houseNames;

    return (
      <CharProps
        charProps={charProps}
        houseNames={houseNames}
        isHouseFetching={this.state.isHouseFetching}
      />
    );
  }
}

export class CharCardByUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {},
      houseNames: [],
      isHouseFetching: true
    };
  }

  componentDidMount() {
    console.log(this.props.match);
    getItem(apiUrl + "/characters/" + this.props.match.params.id.replace(":", "")).then(char => {
      getHouses(char).then(houseNames => {
        this.setState({ houseNames: houseNames, isHouseFetching: false, char: char });
      });
    });
  }

  render() {
    let charProps = this.state.char;
    let houseNames = this.state.houseNames;

    return (
      <div>
        <Link to={"/characters/1"}>Home</Link>
        <CharProps
          charProps={charProps}
          houseNames={houseNames}
          isHouseFetching={this.state.isHouseFetching}
        />
      </div>
    );
  }
}
