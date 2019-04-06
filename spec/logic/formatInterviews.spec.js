const { expect } = require('chai');
const moment = require('moment');
const {
  getFutureDate,
  filterGivenWeeksIVs
} = require('../../lib/logic/formatInterviews');
const { codewarsArray } = require('../mocks/formatInterviews');

const createInterviewTimes = (codewarsArray, daysToAdd) => {
  return codewarsArray.map(appointment => {
    appointment.interview = new Date(
      moment()
        .add(daysToAdd, 'days')
        .format()
    );
    return appointment;
  });
};

const thisWeeksInterviews = createInterviewTimes(codewarsArray, 0);
const nextWeeksInterviews = createInterviewTimes(codewarsArray, 7);

describe.only('filterGivenWeeksIVs', function() {
  it('returns the correct day', () => {
    const [startDate, endDate, weeksIVs] = filterGivenWeeksIVs(
      'next-week',
      codewarsArray
    );
    //console.log(thisWeeksInterviews);
    console.log(nextWeeksInterviews);
  });
});
