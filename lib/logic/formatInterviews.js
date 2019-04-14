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

const getFutureDate = (daysToAdd, day) => {
  let remove = day === 'start' ? new Date(moment().startOf('day')) : new Date();
  return new Date(
    moment()
      .add(daysToAdd - remove.getDay(), 'days')
      .format()
  );
};

const filterGivenWeeksIVs = (week, codewarsArray) => {
  let startDate =
    week === 'this-week'
      ? new Date(moment().startOf('day'))
      : getFutureDate(8, 'start');
  let endDate =
    week === 'this-week' ? getFutureDate(6, 'end') : getFutureDate(13, 'end');
  const weeksIVs = codewarsArray.filter(
    attendee =>
      new Date(attendee.interview) >= startDate &&
      new Date(attendee.interview) <= endDate
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
  console.log(unsortedObjects);
  const sortedObjects = organiseByDates(unsortedObjects, week, dayLookup);
  return createWeekString(sortedObjects);
};

module.exports = {
  getWeeksInterviews,
  sortByDays,
  getFutureDate,
  filterGivenWeeksIVs,
  createInterviewObjects
};
