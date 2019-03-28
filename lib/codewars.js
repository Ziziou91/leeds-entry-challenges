const request = require('request-promise');

const getCodeWarsScore = async (interviewee, interviewObj) => {
  let username = interviewee.properties.codewars_username.value
    .split('/')
    .slice(-1);
  const codewarsInfo = await request(
    `https://www.codewars.com/api/v1/users/${username}`,
    { json: true },
    (err, res, body) => {
      return body;
    }
  );
  interviewObj['codewars score'] = codewarsInfo.honor;
  interviewObj['codewars profile'] =
    interviewee.properties.codewars_username.value;
};

module.exports = {
  getCodeWarsScore
};
