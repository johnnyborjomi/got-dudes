import React, { useState, useEffect } from "react";
import { getItem } from "../../got.service";
import { apiUrl } from "../../config";
import { Link } from "react-router-dom";

function CharacterLink(props) {
  const [character, setcharacter] = useState(null);
  const characterId = props.character.replace(apiUrl + "/characters/", "");

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const result = await getItem(props.character, abortController.signal);
      setcharacter(result);
    })();

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return <Link to={"/character/:" + characterId}>{character ? character.name : "...Loading"}</Link>;
}

export default function HousePage({ match }) {
  let houseUrl = apiUrl + "/houses/" + match.params.id;

  const [house, setHouse] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getItem(houseUrl);

      setHouse(result);
    })();
  }, [match.params.id]);

  if (!house) {
    return (
      <div>
        <Link to={"/"} className="breadcrumb">
          Home
        </Link>
        ...Loading
      </div>
    );
  } else {
    return (
      <div>
        <Link to={"/characters/1"} className="breadcrumb">
          Home
        </Link>

        <div className="house-card">
          <div className="icon">{"🏠"}</div>
          <h2 className="house-card_prop">{house.name ? house.name : "noname"}</h2>
          <div className="house-card_prop">Region: {house.region ? house.region : "n/a"}</div>
          <div className="house-card_prop">Words: {house.words ? house.words : "n/a"}</div>
          <div className="house-card_prop">
            Founder: {house.founder ? <CharacterLink character={house.founder} /> : "n/a"}
          </div>
          <div className="house-card_prop">
            Current Lord:{" "}
            {house.currentLord ? <CharacterLink character={house.currentLord} /> : "n/a"}
          </div>
        </div>
      </div>
    );
  }
}
