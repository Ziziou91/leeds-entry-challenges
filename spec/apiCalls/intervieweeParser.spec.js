const { expect } = require('chai');
const { sortByDays } = require('../../lib/logic/intervieweeParser');
const {
  createWeekString,
  createInteviewString
} = require('../../lib/logic/createInterviewString');
const { interviewObj, weeksInterviews } = require('../mocks/intervieweeParser');

describe('createInteriewString', function() {
  it('should return a string', () => {
    const interviewString = createInteviewString(interviewObj);
    console.log(interviewString);
    expect(interviewString).to.be.a('string');
  });
});

describe.only('createWeekString', function() {
  it('should return a string', () => {
    const weekString = createWeekString(weeksInterviews);
    console.log(weekString);
    expect(weekString).to.be.a('string');
  });
});

describe('sortByDays', function() {
  it('should return an object of sorted days', () => {
    const sortedByDays = sortByDays(weeksInterviews);
    console.log(sortedByDays);
  });
});
