const { expect } = require('chai');
const moment = require('moment');
const {
  getFutureDate,
  filterGivenWeeksIVs,
  createWeekString,
  createInteviewString
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

describe('filterGivenWeeksIVs', function() {
  it('returns an array including date objects and an array of interviews', () => {
    const [startDate, endDate, weeksIVs] = filterGivenWeeksIVs(
      'next-week',
      codewarsArray
    );
    expect(Object.prototype.toString.call(startDate)).to.equal('[object Date]');
    expect(Object.prototype.toString.call(endDate)).to.equal('[object Date]');
    expect(weeksIVs).to.be.an('array');
  });
  it('correctly filters out interviews not in the correct week', () => {
    const noInterviewsThisWeek = filterGivenWeeksIVs(
      'this-week',
      nextWeeksInterviews
    );
    const noInterviewsNextWeek = filterGivenWeeksIVs(
      'next-week',
      thisWeeksInterviews
    );
    expect(noInterviewsNextWeek[2].length).to.equal(0);
    expect(noInterviewsThisWeek[2].length).to.equal(0);
  });
});
