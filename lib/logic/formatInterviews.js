const moment = require('moment');
const { createWeekString } = require('./createInterviewString');
const { createInterviewObjects } = require('./createInterviewObject');

const dayLookup = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday'
};

const getFutureDate = day => {
  return new Date(
    moment()
      .add(day - new Date().getDay(), 'days')
      .format()
  );
};

const filterGivenWeeksIVs = (week, codewarsArray) => {
  let startDate = week === 'this-week' ? new Date() : getFutureDate(8);
  let endDate = week === 'this-week' ? getFutureDate(5) : getFutureDate(12);
  const weeksIVs = codewarsArray.filter(
    attendee =>
      new Date(attendee.interview) >= startDate &&
      new Date(attendee.interview) < endDate
  );
  return [startDate, endDate, weeksIVs];
};

const organiseByDates = (codewarsArray, week, dayLookup) => {
  let [start, end, weeksIVs] = filterGivenWeeksIVs(week, codewarsArray);
  const weekObj = Array.from(
    Object.values(dayLookup).filter(
      (value, index) => index + 1 >= start.getDay()
    ),
    day => {
      return { [day]: { Manchester: [], Leeds: [] } };
    }
  );
  const sortedWeek = weeksIVs.reduce(sortDaysInWeeks, weekObj);
  return sortByDays(sortedWeek);
};

const sortDaysInWeeks = (acc, attendee) => {
  const day = new Date(attendee.interview).getDay();
  const hours = new Date(attendee.interview).getHours();
  let minutes = new Date(attendee.interview).getMinutes();
  minutes = minutes.toString().length < 2 ? minutes + '0' : minutes;
  attendee.time = `${hours}:${minutes} `;
  acc.forEach(dayThisWeek => {
    if (dayLookup[day] in dayThisWeek) {
      dayThisWeek[dayLookup[day]][attendee.campus].push(attendee);
    }
  });
  return acc;
};

const sortByDays = sortedWeek => {
  sortedWeek.forEach(dayObj => {
    for (let day in dayObj) {
      const campuses = dayObj[day];
      for (let campus in campuses) {
        if (campuses[campus].length === 0)
          campuses[campus] = 'no interviews today';
        else
          campuses[campus].sort((a, b) => {
            return (
              Number(a.time.replace(/:/, '')) - Number(b.time.replace(/:/, ''))
            );
          });
      }
    }
  });
  return sortedWeek;
};

const getWeeksInterviews = async (intervieweesArr, liveBookings, week) => {
  const unsortedObjects = await createInterviewObjects(
    intervieweesArr,
    liveBookings
  );
  const sortedObjects = organiseByDates(unsortedObjects, week, dayLookup);
  return createWeekString(sortedObjects);
};

module.exports = {
  getWeeksInterviews,
  sortByDays,
  getFutureDate,
  filterGivenWeeksIVs
};
