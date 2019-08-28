import React from "react";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";

function Allegiance(props) {
  let { house } = props;
  let url = house.url.split("/api")[1];
  return (
    <li key={house.name}>
      <Link to={url}>{house.name}</Link>
    </li>
  );
}

export function Allegiances(props) {
  let { houseNames, isFetching } = props;
  if (isFetching)
    return (
      <div className="char-card_prop">
        <ul>
          Allegiances: <li>Loading...</li>
        </ul>{" "}
      </div>
    );

  if (houseNames.length > 0) {
    return (
      <div className="char-card_prop">
        <ul>
          Allegiances:{" "}
          {isFetching
            ? "Loading..."
            : houseNames.map((house, i) => <Allegiance house={house} key={i} />)}
        </ul>
      </div>
    );
  }
  return "";
}
