import React, { useState, useEffect, Fragment } from "react";
import { getItem } from "../../got.service";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";

function CharacterLink(props) {
  const [character, setcharacter] = useState(null);
  const characterId = props.character.replace(API_URL + "/characters/", "");

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

export default function HousePage(props) {
  const match = props.match;
  let houseUrl = API_URL + "/houses/" + match.params.id;

  const [house, setHouse] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getItem(houseUrl);

      setHouse(result);
    })();
  }, [match.params.id]);

  if (!house) {
    return (
      <Fragment>
        <Link to={`/characters/${props.currentPage}`} className="breadcrumb">
          Home
        </Link>
        ...Loading
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Link to={`/characters/${props.currentPage}`} className="breadcrumb">
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
      </Fragment>
    );
  }
}
