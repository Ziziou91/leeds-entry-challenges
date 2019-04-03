const { getCodeWarsScore } = require('../apiCalls/codewars');
const moment = require('moment');

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
    attendee =>
      attendee.interview >= getDate(0, today) && attendee.interview < endDate
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
    Object.values(dayLookup).filter((value, index) => index + 1 >= start),
    day => {
      return { [day]: { Manchester: [], Leeds: [] } };
    }
  );
  const sortedWeek = weeksIVs.reduce((acc, attendee) => {
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
  }, weekObj);
  return sortByDays(sortedWeek);
  console.log(sortedWeek);
};

const sortByDays = sortedWeek => {
  sortedWeek.forEach(dayObj => {
    for (let day in dayObj) {
      let current = dayObj[day];
      for (campus in current) {
        if (current[campus].length === 0)
          current[campus] = 'no interviews today';
        else
          current[campus].sort((a, b) => {
            return (
              Number(a.time.replace(/:/, '')) - Number(b.time.replace(/:/, ''))
            );
          });
      }
    }
  });
  return sortedWeek;
};

const createWeekString = weekObj => {
  const interviewsString = weekObj
    .map(day => {
      return (
        `--*${Object.keys(day)[0]}*--\n` +
        Object.values(day).map(createCampusString)
      );
    })
    .join('\n');
  console.log(interviewsString);
};

const createCampusString = cityObj => {
  console.log(cityObj);
  let interviews = Object.values(cityObj)
    .flat()
    .map(createInteviewString);
  const mancInterviews =
    Object.values(cityObj)[0] === 'no interviews today'
      ? 'no interviews today'
      : Object.values(cityObj)[0]
          .flat()
          .map(createInteviewString);
  const leedsInterviews =
    Object.values(cityObj)[1] === 'no interviews today'
      ? 'no interviews today'
      : Object.values(cityObj)[1];
  return `*Manchester*\n${mancInterviews}\n*Leeds*\n${leedsInterviews}`;
};

const createInteviewString = interviewObj => {
  if (interviewObj === 'no interviews today') return interviewObj;
  const interviewString = `*${interviewObj.time} ${
    interviewObj.name
  }*\nEmail: ${interviewObj.email}\nHubspot URL: ${
    interviewObj.HubspotURL
  }\nCodeWars Score: ${interviewObj['codewars score']}`;

  return 'codewars profile' in interviewObj
    ? interviewString +
        `\nCodeWars profile: ${interviewObj['codewars profile']}`
    : interviewString;
};

const getWeeksInterviews = async (intervieweesArr, liveBookings, week) => {
  const unsortedObjects = await createInterviewObjects(
    intervieweesArr,
    liveBookings
  );
  const sortedObjects = organiseByDates(unsortedObjects, week);
  return createWeekString(sortedObjects);
};

module.exports = {
  getWeeksInterviews,
  createInteviewString,
  createWeekString,
  sortByDays
};
