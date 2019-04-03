const { getCodeWarsScore } = require('../apiCalls/codewars');

const campusChecker = properties =>
  properties.interview_booking_link.value.includes('leeds')
    ? 'Leeds'
    : 'Manchester';

const createInterviewObjects = async (intervieweesArr, liveBookings) => {
  const codewarsScore = await intervieweesArr.map(async interviewee => {
    const properties = interviewee.properties;
    let interviewObj = {
      name: `${properties.firstname.value} ${properties.lastname.value}`,
      email: properties.email.value,
      interview: liveBookings.find(booking =>
        booking.title.includes(properties.email.value)
      ).startsAt,
      campus: campusChecker(properties),
      HubspotURL: `https://app.hubspot.com/sales/3489321/contact/${interviewee.vid ||
        null}`,
      'codewars score': 'No CodeWars info :('
    };
    if (properties.codewars_username)
      await getCodeWarsScore(properties, interviewObj);
    return interviewObj;
  });
  return Promise.all(codewarsScore);
};

module.exports = {
  createInterviewObjects
};
