const { expect } = require('chai');
const {
  getFutureDate,
  filterGivenWeeksIVs
} = require('../../lib/logic/formatInterviews');
const { codewarsArray } = require('../mocks/formatInterviews');

describe.only('filterGivenWeeksIVs', function() {
  it('returns the correct day', () => {
    const date = filterGivenWeeksIVs('next-week', codewarsArray);
    //console.log(date);
  });
});
