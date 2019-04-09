const { expect } = require('chai');
const KEYS = require('../../.ignore/keys');
const { getInterviewees } = require('../../lib/apiCalls/hubspot');
const { liveBookings, emptyEmailsBookings } = require('../mocks/hubspot');

describe('getInterviewees', function() {
  it('returns an interviewees object when give YCBM bookings', async () => {
    const interviewees = await getInterviewees(liveBookings, KEYS.hubspot);
    expect(interviewees).to.be.an('object');
    expect(interviewees).to.eql({});
  });
  it('handles an array with empty email propeties', async () => {
    const interviewees = await getInterviewees(
      emptyEmailsBookings,
      KEYS.hubspot
    );
    expect(interviewees).to.be.an('object');
    expect(interviewees).to.eql({});
  });
});
