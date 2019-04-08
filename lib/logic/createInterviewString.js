const interviewMapper = interviewObj => {
  if (interviewObj === 'no interviews today') return interviewObj;
  const interviewString = `*${interviewObj.time} - ${interviewObj.name} - ${
    interviewObj.email
  }*\nHubspot URL: ${interviewObj.HubspotURL}\nCodeWars Score: ${
    interviewObj['codewars score']
  }`;

  return 'codewars profile' in interviewObj
    ? interviewString +
        `\nCodeWars profile: ${interviewObj['codewars profile']} \n`
    : `${interviewString} \n`;
};

const createInterviewString = interviews => {
  if (interviews === 'no interviews today') return interviews;
  return interviews
    .flat()
    .map(interviewMapper)
    .join('\n');
};

const createCampusString = cityObj => {
  const mancInterviews = createInterviewString(Object.values(cityObj)[0]);
  const leedsInterviews = createInterviewString(Object.values(cityObj)[1]);
  return `*Manchester*\n${mancInterviews}\n*Leeds*\n${leedsInterviews}`;
};

const createWeekString = weekObj => {
  return weekObj
    .map(day => {
      return (
        `\n--*${Object.keys(day)[0]}*--\n` +
        Object.values(day).map(createCampusString)
      );
    })
    .join('\n');
};

module.exports = {
  createWeekString,
  createInterviewString
};
