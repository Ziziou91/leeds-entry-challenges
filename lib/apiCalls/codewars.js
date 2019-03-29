const request = require('request-promise');

const getCodeWarsScore = async (properties, interviewObj) => {
  try {
    let username = properties.codewars_username.value.split('/').slice(-1);
    const codewarsInfo = await request(
      `https://www.codewars.com/api/v1/users/${username}`,
      { json: true },
      (err, res, body) => body
    );
    interviewObj['codewars score'] = codewarsInfo.honor;
    interviewObj['codewars profile'] = properties.codewars_username.value;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCodeWarsScore
};
