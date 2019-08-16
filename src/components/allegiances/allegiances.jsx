import React from "react";
import { apiUrl } from "../../config";
import { Link } from "react-router-dom";

function Allegiance(props) {
  let { house } = props;
  let url = house.url.replace(apiUrl, "");
  return (
    <li key={house.name}>
      <Link to={url}>{house.name}</Link>
    </li>
  );
}

export function Allegiances(props) {
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
