const request = require('request-promise');
const calendarIDs = [
  '9824f309-1f6a-40e2-8843-51a8cdc88632',
  '9e039304-1d41-4cd2-9cc3-ee0f5ce6a13f'
];

const getBookings = (calendarID, auth) => {
  try {
    return request(
      `https://api.youcanbook.me/v1/${
        auth.username
      }/profiles/${calendarID}/bookings`,
      {
        auth: {
          user: auth.username,
          pass: auth.password,
          sendImmediately: false
        },
        json: true
      },
      body => body
    );
  } catch (error) {
    throw new Error(error);
  }
};

const getAllBookings = async (calendarIDs, auth) => {
  const bookings = await calendarIDs.map(calendarID =>
    getBookings(calendarID, auth)
  );
  return Promise.all(bookings)
    .then(value => {
      return value.flat();
    })
    .catch(error => {
      return error;
    });
};

const filterPastInterview = booking =>
  new Date(booking.startsAt).getTime() > new Date().getTime();

const filterPastInterviews = bookings => bookings.filter(filterPastInterview);

const getIntervieweesEmails = bookings =>
  bookings.map(booking => {
    booking.email = booking.title.match(
      /[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
    )[0];
    return booking;
  });

const getYCBMBookings = async auth => {
  try {
    const bookings = await getAllBookings(calendarIDs, auth);
    let liveBookings = filterPastInterviews(bookings);
    liveBookings = getIntervieweesEmails(liveBookings);
    return liveBookings;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllBookings,
  getYCBMBookings,
  getIntervieweesEmails,
  filterPastInterviews
};
