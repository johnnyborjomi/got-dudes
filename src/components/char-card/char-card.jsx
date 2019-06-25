import * as React from "react";

function Allegiances(props) {
  let { houseNames, isFetching } = props;
  if (houseNames.length > 0) {
    let charProps = (
      <div className="char-card_prop">
        Allegiances:{" "}
        {isFetching
          ? "Loading..."
          : houseNames.map(houseName => {
              return (
                <li key={houseName}>
                  <a href="#">{houseName.name}</a>
                </li>
              );
            })}
      </div>
    );
    return (
      <div className="char-card_prop">
        <ul>{charProps}</ul>
      </div>
    );
  }
  return "";
}

function Titles(props) {
  if (props.titles[0] == "") return "";
  let titles = props.titles.map(title => {
    return <li key={title}>{title}</li>;
  });
  return <ul>Titles: {titles}</ul>;
}

export class CharCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houseNames: [],
      isHouseFetching: true
    };
  }

  async getHouses() {
    let allegiances = this.props.character.allegiances;
    let houses = [];

    if (allegiances.length > 0) {
      houses = this.props.character.allegiances.map(async allegiance => {
        return await fetch(allegiance).then(data => data.json());
      });
      return Promise.all(houses);
    }

    return houses;
  }

  componentDidMount() {
    this.getHouses().then(houseNames => {
      this.setState({ houseNames: houseNames, isHouseFetching: false });
    });
  }

  render() {
    let charProps = this.props.character;
    let houseNames = this.state.houseNames;

    return (
      <div className="char-card">
        <div className="icon">{charProps.gender === "Male" ? "🙎🏻‍♂️" : "🙎🏻‍♀️"}</div>
        <h2 className="char-card_prop">
          {charProps.name ? charProps.name : "noname"}
        </h2>
        <div className="char-card_prop">
          Born: {charProps.born ? charProps.born : "n/a"}
        </div>
        <div className="char-card_prop">
          Died: {charProps.died ? charProps.died : "n/a"}
        </div>
        <div className="char-card_prop">
          Gender: {charProps.gender ? charProps.gender : "n/a"}
        </div>
        <Titles titles={charProps.titles} />
        <Allegiances
          houseNames={houseNames}
          isFetching={this.state.isHouseFetching}
        />
      </div>
    );
  }
}
