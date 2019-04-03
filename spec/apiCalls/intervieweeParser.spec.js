const { expect } = require('chai');
const {
  createInteviewString,
  createWeekString,
  sortByDays
} = require('../../lib/logic/intervieweeParser');
const { interviewObj, weeksInterviews } = require('../mocks/intervieweeParser');

describe('createInteriewString', function() {
  it('should return a string', () => {
    const interviewString = createInteviewString(interviewObj);
    console.log(interviewString);
    expect(interviewString).to.be.a('string');
  });
});

describe('createWeekString', function() {
  it('should return a string', () => {
    const weekString = createWeekString(weeksInterviews);
    console.log(weekStirng);
    expect(createWeekString).to.be.a('string');
  });
});

describe.only('sortByDays', function() {
  it('should return an object of sorted days', () => {
    const sortedByDays = sortByDays(weeksInterviews);
    console.log(sortedByDays);
  });
});
