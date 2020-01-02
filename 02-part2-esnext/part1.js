// Promisify XMLHTTPRequest inside a class with methods: get, post, put, delete. Methods might be used by reference. For example: `[‘http://google.com’].map(Http.get)`.
// Use async/await syntax.
// Play around with, for example SWAPI, to make couple of nested requests (request based on previous request).

const axios = require("axios");

const possibleSearch = [
  "starships",
  "planets",
  "people",
  "films",
  "vehicles",
  "species"
];

class furiousAndPromicing {
  constructor() {
    this.baseUrl = "https://swapi.co/api";
  }
  get(subject, id) {
    if (
      !possibleSearch.includes(subject.toLowerCase()) ||
      (id && typeof id !== "number")
    ) {
      throw new Error("incorrect searching parameter");
    }
    const idQuery = id ? id : "";
    return axios.get(`${this.baseUrl}/${subject}/${idQuery}`);
  }

  post(something) {
    return axios.post(this.baseUrl, something);
  }

  patch(subject, id, newKey, newValue) {
    return axios.patch(`${this.baseUrl}/${subject}/${id}`, {
      [newKey]: newValue
    });
  }

  delete(subject, id) {
    return axios.delete(`${this.baseUrl}/${subject}/${id}`);
  }
}

const myTrial = new furiousAndPromicing();

const getSWplanets = () =>
  myTrial
    .get("planets")
    .then(response => response.data.results)
    .catch(console.log);

const getPlanetData = id =>
  myTrial.get("planets", id).then(response => response.data);

const getResidentName = url =>
  axios.get(url).then(response => response.data.name);

const tellMeAboutStarWars = async () => {
  let favouritePlanetName;
  let favouritePlanetPopulation;
  let residentNames = [];
  const planets = await getSWplanets();
  const planetNamesExample = planets
    .slice(0, 5)
    .reduce((accum, { name }) => [...accum, name], []);

  const FAVOURITE_PLANET_ID = 8;

  await getPlanetData(FAVOURITE_PLANET_ID).then(async data => {
    favouritePlanetName = data.name;
    favouritePlanetPopulation = data.population;
    const residentsURL = data.residents;
    residentNames = await Promise.all(
      residentsURL.map(async url => await getResidentName(url))
    ); // looks like I made it too complex :) Is it possible to simplify this?
  });

  console.log(
    `There are a lot of planets in a Star wars film.
${planetNamesExample.join(", ")} are among them.
My favourite planet is ${favouritePlanetName}.
${favouritePlanetPopulation} people permanently reside there, among which: ${residentNames.join(
      ", "
    )}.`
  );
};

tellMeAboutStarWars();
