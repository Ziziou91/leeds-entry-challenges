const request = require('request-promise');

const getCodeWarsScore = async (properties, interviewObj) => {
  try {
    let interview = Object.assign({}, interviewObj);
    let username = properties.codewars_username.value.split('/').slice(-1);
    const codewarsInfo = await request(
      `https://www.codewars.com/api/v1/users/${username}`,
      { json: true },
      (err, res, body) => body
    );
    interview['codewars score'] = codewarsInfo.honor;
    interview['codewars profile'] = properties.codewars_username.value;
    return interview;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCodeWarsScore
};
