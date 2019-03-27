const request = require('request-promise');
const {
  getYCBMBookings,
  getIntervieweesEmails
} = require('./lib/youCanBookMe');
const { getInterviewees, organiseByDates } = require('./lib/hubspotData');
const KEYS = require('./.ignore/keys');

const getCodeWarsScore = async codewarsURL => {
  let username = codewarsURL.split('/');
  username = username[username.length - 1];
  const codewarsInfo = await request(
    `https://www.codewars.com/api/v1/users/${username}`,
    { json: true },
    (err, res, body) => {
      return body;
    }
  );
  return codewarsInfo.honor;
};

const getInterviewObject = async (intervieweesArr, liveBookings) => {
  const codewarsScore = await intervieweesArr.map(async interviewee => {
    const interview = liveBookings.find(booking =>
      booking.title.includes(interviewee.properties.email.value)
    );
    const campus = interviewee.properties.interview_booking_link.value.includes(
      'leeds'
    )
      ? 'Leeds'
      : 'Manchester';
    let interviewObj = {
      name: `${interviewee.properties.firstname.value} ${
        interviewee.properties.lastname.value
      }`,
      email: interviewee.properties.email.value,
      interview: interview.startsAt,
      campus: campus,
      'codewars score': 'No CodeWars info :('
    };
    if (interviewee.properties.codewars_username) {
      let username = interviewee.properties.codewars_username.value.split('/');
      username = username[username.length - 1];
      const score = await request(
        `https://www.codewars.com/api/v1/users/${username}`,
        { json: true },
        (err, res, body) => {
          return body;
        }
      );
      interviewObj['codewars score'] = score.honor;
      interviewObj['codewars profile'] =
        interviewee.properties.codewars_username.value;
    }

    return interviewObj;
  });
  return Promise.all(codewarsScore).then(value => value);
};

const getAttendees = async auth => {
  const liveBookings = await getYCBMBookings(auth.ycbm);
  const emails = getIntervieweesEmails(liveBookings);
  const interviewees = await getInterviewees(emails, auth.hubspot);
  const intervieweesArr = Object.values(interviewees);
  const codewarsScore = await getInterviewObject(intervieweesArr, liveBookings);
  const sortedInterviews = organiseByDates(codewarsScore);
  console.log(sortedInterviews);
};

getAttendees(KEYS);
//getCodeWarsScore('fatoumi');

// const interview = liveBookings.find(booking =>
//     booking.title.includes(interviewee.properties.email.value)
//   );
// const interviewObj = {
//   name: `${interviewee.properties.firstname} ${
//     interviewee.properties.lastname
//   }`,
//   time: interview.startsAt,
//   'codewars username': '',
//   'codewars score': ''
// };
