const request = require('request-promise');

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

module.exports = {
  getInterviewees
};

//https://api.hubapi.com/contacts/v1/contact/emails/batch/?email=testingapis@hubspot.com&email=new-email@hubspot.com&hapikey=demo
