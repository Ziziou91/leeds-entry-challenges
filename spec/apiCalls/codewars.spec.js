const { expect } = require('chai');
const { getCodeWarsScore } = require('../../lib/apiCalls/codewars');
const { properties, interviewObj } = require('../mocks/codewars');

describe.only('getCodeWarsScore', function() {
  it('returns an interview object', async () => {
    const interviewees = await getCodeWarsScore(properties, interviewObj);
    expect(interviewees).to.be.an('object');
  });
});
