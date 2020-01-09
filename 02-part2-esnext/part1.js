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

const getUrl = (subject, id, apiUrl) => {
  if (
    !possibleSearch.includes(subject.toLowerCase()) ||
    (id && typeof id !== "number")
  ) {
    throw new Error("incorrect searching parameter");
  }
  const idQuery = id ? id : "";
  return `${apiUrl}/${subject}/${idQuery}`;
};

const convertToString = arr => arr.join(", ");

const getStory = ({
  planetNamesExample,
  favouritePlanetName,
  favouritePlanetPopulation,
  residentNames
}) =>
  `There are a lot of planets in a Star wars film.
${convertToString(planetNamesExample)} are among them.
My favourite planet is ${favouritePlanetName}.
${favouritePlanetPopulation} people permanently reside there, among which: ${convertToString(
    residentNames
  )}.`;

class furiousAndPromicing {
  constructor() {
    this.baseUrl = "https://swapi.co/api";
  }
  get(subject, id) {
    return axios.get(getUrl(subject, id, this.baseUrl));
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
  const planets = await getSWplanets();
  const planetNamesExample = planets
    .slice(0, 5)
    .reduce((accum, { name }) => [...accum, name], []);

  const FAVOURITE_PLANET_ID = 8;

  const {
    name: favouritePlanetName,
    population: favouritePlanetPopulation,
    residents
  } = await getPlanetData(FAVOURITE_PLANET_ID);
  residentNames = await Promise.all(
    residents.map(async url => await getResidentName(url))
  );

  console.log(
    getStory({
      planetNamesExample,
      favouritePlanetName,
      favouritePlanetPopulation,
      residentNames
    })
  );
};

tellMeAboutStarWars();
