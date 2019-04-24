const { getYCBMBookings } = require('./lib/apiCalls/youCanBookMe');
const { getInterviewees } = require('./lib/apiCalls/hubspot');
const { getWeeksInterviews } = require('./lib/logic/formatInterviews.js');
const KEYS = require('./.ignore/keys');

const getAttendees = async (auth, week) => {
  try {
    const liveBookings = await getYCBMBookings(auth.ycbm);

    const interviewees = await getInterviewees(liveBookings, auth.hubspot);
    console.log(liveBookings);
    const intervieweesArr = Object.values(interviewees);

    const thisWeeksInterviews = await getWeeksInterviews(
      intervieweesArr,
      liveBookings,
      week
    );
  } catch (error) {
    console.log('in error');
    console.log(error);
  }
};

//getAttendees(KEYS, 'this-week');
getAttendees(KEYS, 'next-week');
