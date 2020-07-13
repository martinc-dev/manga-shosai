const regexConstants = require('app/constants/regex')

describe('constants/regex', () => {
  it('Matches snapshots', () => {
    const actual = regexConstants

    expect(actual).toMatchSnapshot()
  })
})
