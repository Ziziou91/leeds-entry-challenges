const interviewObj = {
  name: 'John Smith',
  email: 'jdoe@gmail.com',
  interview: '2019-04-02T10:00:00',
  campus: 'Manchester',
  HubspotURL: 'https://app.hubspot.com/sales/3489321/contact/123543',
  'codewars score': 49,
  'codewars profile': 'https://www.codewars.com/users/jsmith',
  time: '10:00 '
};

const weeksInterviews = [
  {
    Wednesday: {
      Manchester: [
        {
          name: 'John Smith',
          email: 'jsmith@yahoo.co.uk',
          interview: '2019-04-03T16:00:00',
          campus: 'Manchester',
          HubspotURL: 'https://app.hubspot.com/sales/3489321/contact/12345',
          'codewars score': 132,
          'codewars profile': 'https://www.codewars.com/users/jsmith',
          time: '16:00 '
        },
        {
          name: 'Earlier Smith',
          email: '3smith@yahoo.co.uk',
          interview: '2019-04-03T16:00:00',
          campus: 'Manchester',
          HubspotURL: 'https://app.hubspot.com/sales/3489321/contact/12345',
          'codewars score': 132,
          'codewars profile': 'https://www.codewars.com/users/jsmith',
          time: '09:00 '
        },
        {
          name: 'Later Smith',
          email: '3smith@yahoo.co.uk',
          interview: '2019-04-03T16:00:00',
          campus: 'Manchester',
          HubspotURL: 'https://app.hubspot.com/sales/3489321/contact/12345',
          'codewars score': 132,
          'codewars profile': 'https://www.codewars.com/users/jsmith',
          time: '18:00 '
        }
      ],
      Leeds: []
    }
  },
  {
    Thursday: {
      Manchester: [
        {
          name: 'Jane Smith',
          email: 'janesmith@gmail.com',
          interview: '2019-04-04T11:30:00',
          campus: 'Manchester',
          HubspotURL: 'https://app.hubspot.com/sales/3489321/contact/123456',
          'codewars score': 18,
          'codewars profile': 'https://www.codewars.com/users/janesmith',
          time: '11:30 '
        }
      ],
      Leeds: []
    }
  },
  { Friday: { Manchester: [], Leeds: [] } }
];

module.exports = {
  interviewObj,
  weeksInterviews
};
