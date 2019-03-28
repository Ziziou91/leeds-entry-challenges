const { getYCBMBookings } = require('./lib/youCanBookMe');
const { getInterviewees } = require('./lib/hubspotData');
const { getWeeksInterviews } = require('./lib/intervieweeParser.js');
const KEYS = require('./.ignore/keys');

const getAttendees = async auth => {
  const liveBookings = await getYCBMBookings(auth.ycbm);
  const interviewees = await getInterviewees(liveBookings, auth.hubspot);
  const intervieweesArr = Object.values(interviewees);
  const thisWeeksInterviews = await getWeeksInterviews(
    intervieweesArr,
    liveBookings
  );
  console.log(thisWeeksInterviews);
};

getAttendees(KEYS);
