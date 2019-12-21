const { showResultsOutput, getSignNumber } = require('./utils')

describe('showResultsOutput', () => {
  test('should exist', () => {
    expect(typeof showResultsOutput).toBe('function')
  })

  test('should return the correct and full answer with the input string given', () => {
    expect(showResultsOutput('word')).toBe(
      'Wow, according to the Chinese zodiac, you are the word!!!!!111'
    )
  })
})

describe('getSignNumber', () => {
  test('should exist', () => {
    expect(typeof getSignNumber).toBe('function')
  })

  test('should return the correct sign number', () => {
    expect(getSignNumber('1991')).toBe(4)
  })
})
