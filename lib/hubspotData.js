const request = require('request-promise');
const moment = require('moment');

const getInterviewees = async (emailArr, auth) => {
  try {
    const interviewees = await request(
      `https://api.hubapi.com/contacts/v1/contact/emails/batch/?email=${emailArr.join(
        '&email='
      )}&hapikey=${auth}`,
      { json: true },
      (err, res, body) => {
        return body;
      }
    );
    return interviewees;
  } catch (error) {
    throw new Error(error);
  }
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
    week.forEach(dayThisWeek => {
      if (dayLookup[day] in dayThisWeek) {
        dayThisWeek[dayLookup[day]][attendee.campus].push(attendee);
      }
    });
    return week;
  }, weekObj);
};

module.exports = {
  getInterviewees,
  organiseByDates
};

//https://api.hubapi.com/contacts/v1/contact/emails/batch/?email=testingapis@hubspot.com&email=new-email@hubspot.com&hapikey=demo
