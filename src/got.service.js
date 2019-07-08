export async function getHouses({ allegiances }) {
  let houses = [];

  if (allegiances.length > 0) {
    houses = allegiances.map(getItem);
    return Promise.all(houses);
  }

  return houses;
}

export async function getItem(url) {
  return fetch(url).then(data => data.json());
}
