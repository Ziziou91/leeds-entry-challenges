const request = require('request-promise');
const calendars = [
  {
    id: '9824f309-1f6a-40e2-8843-51a8cdc88632',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    title: 'Northcoders Entry Challenge: Leeds',
    description:
      'Click on any time to book your Entry Challenge at Platform, New Station Street, Leeds, LS1 4JB',
    subdomain: 'northcoders-entry-challenge-leeds',
    timeZone: null,
    status: 'ONLINE'
  },
  {
    id: '9e039304-1d41-4cd2-9cc3-ee0f5ce6a13f',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    title: 'Northcoders Entry Challenge: The Developer Pathway',
    description:
      "Click on any time to book your Entry Challenge at Federation House, Federation Street, Manchester M4 2AH.\nDon't forget to bring your laptop with you!\n",
    subdomain: 'northcoders-entry-challenge',
    timeZone: null,
    status: 'ONLINE'
  }
];

const getBookings = async (calendarID, auth) => {
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
      body => {
        return body;
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

const getAllBookings = async (calendars, auth) => {
  const bookings = await calendars.map(calendar =>
    getBookings(calendar.id, auth)
  );
  return Promise.all(bookings).then(value => value.flat());
};

const filterPastInterview = booking =>
  new Date(booking.startsAt).getTime() > new Date().getTime();

const filterPastInterviews = bookings => bookings.filter(filterPastInterview);

const getIntervieweesEmails = bookings =>
  bookings.map(
    booking => booking.title.match(/[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)[0]
  );

const getYCBMBookings = async auth => {
  try {
    const bookings = await getAllBookings(calendars, auth);
    const liveBookings = filterPastInterviews(bookings);
    return liveBookings;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllBookings,
  getYCBMBookings,
  getIntervieweesEmails
};
