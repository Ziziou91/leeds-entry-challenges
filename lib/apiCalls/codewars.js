const request = require('request-promise');

const getCodeWarsScore = async (hubspotContact, interviewObj) => {
  try {
    let interview = Object.assign({}, interviewObj);
    let username = hubspotContact.codewars_username.value.split('/').slice(-1);
    const codewarsInfo = await request(
      `https://www.codewars.com/api/v1/users/${username}`,
      { json: true },
      (err, res, body) => body
    );
    interview['codewars score'] = codewarsInfo.honor;
    interview['codewars profile'] = hubspotContact.codewars_username.value;
    return interview;
  } catch (err) {
    throw new Error(
      `${err}\n${
        hubspotContact.codewars_username.value
      } is not a valid CodeWars URL`
    );
  }
};

module.exports = {
  getCodeWarsScore
};
