const { expect } = require('chai');
const KEYS = require('../../.ignore/keys');
const { getInterviewees } = require('../../lib/apiCalls/hubspot');

describe('getInterviewees', function() {
  it('returns an array of interviewees when give YCBM bookings', async () => {
    const interviewees = getInterviewees();
  });
});
