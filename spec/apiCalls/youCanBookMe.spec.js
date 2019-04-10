const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
const KEYS = require('../../.ignore/keys');
const {
  getAllBookings,
  filterPastInterviews,
  getYCBMBookings
} = require('../../lib/apiCalls/youCanBookMe');
const { calendarIDs, invalidCalendarIDs } = require('../mocks/mocks');
const {
  bookings,
  pastBookings,
  futureBookings,
  invalidYCBM
} = require('../mocks/youCanBookMe');

describe('getAllBookings', function() {
  this.timeout(8000);
  it('should return an array of YCBM bookings', async () => {
    const result = await getAllBookings(calendarIDs, KEYS.ycbm);
    expect(result).to.be.an('array');
    expect(result).to.be.an('array');
  });
  it('returns an empty array when passed an empty array of calendarIDs', async () => {
    const result = await getAllBookings([], KEYS.ycbm);
    expect(result).to.eql([]);
  });
  it('should handle invalid calendarIDs', async () => {
    await expect(
      getAllBookings(invalidCalendarIDs, KEYS.ycbm)
    ).to.be.rejectedWith(
      'StatusCodeError: 401 - {"message":"Profile not accesible: 9e039304-1d41-4cd2-9cc3-ee0f5ce6a13e","code":"ycbm_api_account_insufficient_permissions","type":"YcbmApiException","httpCode":401,"errors":[]}'
    );
  });
  it('should handle an invalid authentication key', async () => {
    await expect(getAllBookings(calendarIDs, 12345)).to.be.rejectedWith(
      'RequestError: Error: no auth mechanism defined'
    );
    await expect(getAllBookings(calendarIDs, invalidYCBM)).to.be.rejectedWith(
      'StatusCodeError: 404 - {"message":"Account not found","code":"ycbm_api_account_not_found","type":"YcbmApiException","httpCode":404,"errors":[]}'
    );
  });
});

describe('filterPastInterviews', function() {
  it('should return an empty array when bookings is an empty array', () => {
    const result = filterPastInterviews([]);
    expect(result).to.be.an('array');
    expect(result).to.eql([]);
  });
  it('should return an empty array when all bookings are in the past', () => {
    const result = filterPastInterviews(pastBookings);
    expect(result).to.be.an('array');
    expect(result).to.eql([]);
  });
  it('should return an array of the same length when all bookings in the future', () => {
    const result = filterPastInterviews(futureBookings);
    expect(result).to.be.an('array');
    expect(result.length).to.eql(futureBookings.length);
  });
  it('should return an array of the same length when all bookings in the future', () => {
    const result = filterPastInterviews(futureBookings);
    expect(result).to.be.an('array');
    expect(result.length).to.eql(futureBookings.length);
  });
  it('should return only the future bookings when passed a mixed array', () => {
    const result = filterPastInterviews(bookings);
    const title1 = 'Booked: John Doe jdoe@gmail.com';
    const title2 = 'Booked: John Smith smithjr@gmail.com';
    expect(result).to.be.an('array');
    expect(result.length).to.eql(2);
    expect(result[0].title).to.equal(title1);
    expect(result[1].title).to.equal(title2);
  });
});

describe('getYCBMBookings', function() {
  this.timeout(8000);
  it('should return an array of live bookings when given valid authentication', async () => {
    const liveBookings = await getYCBMBookings(KEYS.ycbm);
    expect(liveBookings).to.be.an('array');
    expect(liveBookings.length > 0).to.equal(true);
  });
  it('should give every interview an email property', async () => {
    const liveBookings = await getYCBMBookings(KEYS.ycbm);
    expect(liveBookings.every(livebooking => 'email' in livebooking)).to.equal(
      true
    );
    expect(
      liveBookings.every(livebooking => livebooking['email'].length > 0)
    ).to.equal(true);
  });
});
