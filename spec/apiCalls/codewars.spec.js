const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
const { getCodeWarsScore } = require('../../lib/apiCalls/codewars');
const {
  hubspotContact,
  invalidCWHubspotContact,
  interviewObj
} = require('../mocks/codewars');

describe('getCodeWarsScore', function() {
  this.timeout(10000);
  it('returns an interview object when given valid arguments', async () => {
    const interviewee = await getCodeWarsScore(hubspotContact, interviewObj);
    expect(interviewee).to.be.an('object');
    expect(interviewee['codewars score']).to.be.a('number');
    expect('interview' in interviewee).to.equal(true);
  });
  it('handles inputs with an invalid codewars URL', async () => {
    await expect(
      getCodeWarsScore(invalidCWHubspotContact, interviewObj)
    ).to.be.rejectedWith(
      `StatusCodeError: 404 - {"success":false,"reason":"not found"}\n${
        invalidCWHubspotContact.codewars_username.value
      } is not a valid CodeWars URL`
    );
  });
});
