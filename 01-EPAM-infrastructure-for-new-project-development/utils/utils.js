const PRIMARY_YEAR = 1975

const YEARS_TO_SIGN_MAPPER = [
  'Rabbit',
  'Dragon',
  'Snake',
  'Horse',
  'Goat',
  'Monkey',
  'Rooster',
  'Dog',
  'Pig',
  'Rat',
  'Ox',
  'Tiger'
]

const showResultsOutput = sign =>
  `Wow, according to the Chinese zodiac, you are the ${sign}!!!!!111`

const getSignNumber = year => (parseInt(year, 10) - PRIMARY_YEAR) % 12

module.exports = { showResultsOutput, getSignNumber }
