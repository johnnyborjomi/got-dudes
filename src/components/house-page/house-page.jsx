import React, { useState, useEffect } from "react";
import { getItem } from "../../got.service";
import { apiUrl } from "../../config";
import { Link } from "react-router-dom";

function CurrentLordLink(props) {
  const [currLord, setCurrLord] = useState(null);
  const currLordId = props.currLord.replace(apiUrl + "/characters/", "");

  useEffect(() => {
    (async () => {
      const result = await getItem(props.currLord);

      setCurrLord(result);
    })();
  }, []);

  return <Link to={"/character/:" + currLordId}>Lord</Link>;
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
        <Link to={"/"} className="breadcrumb">
          Home
        </Link>

        <div className="house-card">
          <div className="icon">{"🏠"}</div>
          <h2 className="house-card_prop">{house.name ? house.name : "noname"}</h2>
          <div className="house-card_prop">Region: {house.region ? house.region : "n/a"}</div>
          <div className="house-card_prop">Words: {house.words ? house.words : "n/a"}</div>
          <div className="house-card_prop">Founder: {house.founder ? house.founder : "n/a"}</div>
          <div className="house-card_prop">
            Current Lord:{" "}
            {house.currentLord ? <CurrentLordLink currLord={house.currentLord} /> : "n/a"}
          </div>
        </div>
      </div>
    );
  }
}
