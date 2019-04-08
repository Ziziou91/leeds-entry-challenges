const request = require('request-promise');

const getInterviewees = async (liveBookings, auth) => {
  try {
    const emailArr = liveBookings.map(booking => booking.email);
    return request(
      `https://api.hubapi.com/contacts/v1/contact/emails/batch/?email=${emailArr.join(
        '&email='
      )}&hapikey=${auth}`,
      { json: true },
      (err, res, body) => body
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  getInterviewees
};
