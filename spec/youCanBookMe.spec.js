const { expect } = require('chai');
const KEYS = require('../.ignore/keys');
const { getAllBookings } = require('../lib/youCanBookMe');
const { calendars } = './mocks/mocks';

describe('getAllBookings', function() {
  const result = getAllBookings(calendars);
  it('should return an array of ');
});
