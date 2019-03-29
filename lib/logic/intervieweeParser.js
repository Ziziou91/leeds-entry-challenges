const { getCodeWarsScore } = require('../apiCalls/codewars');
const moment = require('moment');

const campusChecker = interviewee =>
  interviewee.properties.interview_booking_link.value.includes('leeds')
    ? 'Leeds'
    : 'Manchester';

const interviewFinder = (liveBookings, interviewee) =>
  liveBookings.find(booking =>
    booking.title.includes(interviewee.properties.email.value)
  );

const createInterviewObjects = async (intervieweesArr, liveBookings) => {
  const codewarsScore = await intervieweesArr.map(async interviewee => {
    let interviewObj = {
      name: `${interviewee.properties.firstname.value} ${
        interviewee.properties.lastname.value
      }`,
      email: interviewee.properties.email.value,
      interview: interviewFinder(liveBookings, interviewee).startsAt,
      campus: campusChecker(interviewee),
      HubspotURL: `https://app.hubspot.com/sales/3489321/contact/${interviewee.vid ||
        null}`,
      'codewars score': 'No CodeWars info :('
    };
    if (interviewee.properties.codewars_username)
      await getCodeWarsScore(interviewee, interviewObj);
    return interviewObj;
  });
  return Promise.all(codewarsScore);
};

const getDate = (day, today) => {
  return moment()
    .add(day - today, 'days')
    .startOf('day')
    .toISOString();
};

const interviewsgivenWeek = (week, codewarsArray) => {
  const today = new Date().getDay();
  let startDate = '';
  let amountToAdd = 6;
  if (week === 'this-week') {
    startDate = today;
  } else {
    startDate = getDate(7, today);
    amountToAdd = 13;
  }
  const endDate = getDate(amountToAdd, today);
  const weeksIVs = codewarsArray.filter(
    attendee => attendee.interview > startDate && attendee.interview < endDate
  );
  return [startDate, endDate, weeksIVs];
};

const organiseByDates = (codewarsArray, week) => {
  const dayLookup = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday'
  };
  let [start, end, weeksIVs] = interviewsgivenWeek(week, codewarsArray);
  const weekObj = Array.from(
    Object.values(dayLookup).filter(
      (value, index) => index >= new Date(start).getDay()
    ),
    day => {
      return { [day]: { Manchester: [], Leeds: [] } };
    }
  );
  return weeksIVs.reduce((acc, attendee) => {
    const day = new Date(attendee.interview).getDay();
    const hours = new Date(attendee.interview).getHours();
    let minutes = new Date(attendee.interview).getMinutes();
    minutes = minutes.toString().length < 2 ? minutes + '0' : minutes;
    attendee.interview = `${hours}:${minutes} `;
    acc.forEach(dayThisWeek => {
      if (dayLookup[day] in dayThisWeek) {
        dayThisWeek[dayLookup[day]][attendee.campus].push(attendee);
      }
    });
    return acc;
  }, weekObj);
};

const getWeeksInterviews = async (intervieweesArr, liveBookings, week) => {
  const unsortedObjects = await createInterviewObjects(
    intervieweesArr,
    liveBookings
  );
  return organiseByDates(unsortedObjects, week);
};

module.exports = {
  getWeeksInterviews
};
