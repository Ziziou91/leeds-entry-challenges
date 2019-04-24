const { getCodeWarsScore } = require('../apiCalls/codewars');
const mancProfileID = '9824f309-1f6a-40e2-8843-51a8cdc88632';

const bookingFinder = (properties, liveBookings) => {
  return liveBookings.find(booking =>
    booking.title.includes(properties.email.value)
  );
};

const campusChecker = booking => {
  return booking.profileId === mancProfileID ? 'Leeds' : 'Manchester';
};

const createInterviewObjects = async (intervieweesArr, liveBookings) => {
  const codewarsScore = await intervieweesArr.map(async interviewee => {
    const properties = interviewee.properties;
    const booking = bookingFinder(properties, liveBookings);
    let interviewObj = {
      name: `${properties.firstname.value} ${properties.lastname.value}`,
      email: properties.email.value,
      interview: booking.startsAt,
      campus: campusChecker(booking),
      HubspotURL: `https://app.hubspot.com/sales/3489321/contact/${interviewee.vid ||
        null}`,
      'codewars score': 'No CodeWars info :('
    };
    if (properties.codewars_username)
      return getCodeWarsScore(properties, interviewObj);
    return interviewObj;
  });
  return Promise.all(codewarsScore);
};

module.exports = {
  createInterviewObjects
};
