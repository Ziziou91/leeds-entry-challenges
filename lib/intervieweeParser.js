const { getCodeWarsScore } = require('./codewars');
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

const organiseByDates = codewarsArray => {
  const dayLookup = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday'
  };
  const today = new Date().getDay();
  const endDate = moment()
    .add(6 - today, 'days')
    .startOf('day')
    .toISOString();
  const thisWeeksIVs = codewarsArray.filter(
    attendee => attendee.interview < endDate
  );
  const weekObj = Array.from(
    Object.values(dayLookup).filter((value, index) => index + 1 >= today),
    day => {
      return { [day]: { Manchester: [], Leeds: [] } };
    }
  );
  return thisWeeksIVs.reduce((week, attendee) => {
    const day = new Date(attendee.interview).getDay();
    const hours = new Date(attendee.interview).getHours();
    let minutes = new Date(attendee.interview).getMinutes();
    minutes = minutes.toString().length < 2 ? minutes + '0' : minutes;
    attendee.interview = `${hours}:${minutes} `;
    week.forEach(dayThisWeek => {
      if (dayLookup[day] in dayThisWeek) {
        dayThisWeek[dayLookup[day]][attendee.campus].push(attendee);
      }
    });
    return week;
  }, weekObj);
};

const getWeeksInterviews = async (intervieweesArr, liveBookings) => {
  const unsortedObjects = await createInterviewObjects(
    intervieweesArr,
    liveBookings
  );
  return organiseByDates(unsortedObjects);
};

module.exports = {
  getWeeksInterviews
};
