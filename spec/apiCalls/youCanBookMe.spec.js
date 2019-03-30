const { expect } = require('chai');
const KEYS = require('../../.ignore/keys');
const { getAllBookings } = require('../../lib/apiCalls/youCanBookMe');
const { calendarIDs, invalidCalendarIDs } = require('../mocks/mocks');

describe('getAllBookings', function() {
  this.timeout(6000);
  it('should return an array of YCBM bookings', async () => {
    const result = await getAllBookings(calendarIDs, KEYS.ycbm);
    expect(result).to.be.an('array');
  });
  it('should handle invalid calendarIDs', async () => {
    const error = await getAllBookings(invalidCalendarIDs, KEYS.ycbm);
    expect(error.statusCode).to.equal(401);
  });
});
