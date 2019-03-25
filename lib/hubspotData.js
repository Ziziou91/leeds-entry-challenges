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
  const dayObj = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday'
  };
  const startDate = moment()
    .add(0, 'days')
    .startOf('day')
    .toISOString();
  const endDate = moment()
    .add(6 - new Date().getDay(), 'days')
    .startOf('day')
    .toISOString();

  const thisWeeksIVs = codewarsArray.filter(
    attendee => attendee.interview < endDate
  );

  return thisWeeksIVs.reduce((interviews, attendee) => {
    let dayString = new Date(attendee.interview);
    let day = `*${dayObj[dayString.getDay()]}*`;
    if (day in interviews) {
      if ('campus' in interviews)
        interviews[day][attendee['campus']].push(attendee);
      else interviews[day][attendee['campus']] = [attendee];
    } else {
      interviews[day] = {};
      interviews[day][attendee['campus']] = [attendee];
    }
    return interviews;
  }, []);
};

module.exports = {
  getInterviewees,
  organiseByDates
};

//https://api.hubapi.com/contacts/v1/contact/emails/batch/?email=testingapis@hubspot.com&email=new-email@hubspot.com&hapikey=demo
