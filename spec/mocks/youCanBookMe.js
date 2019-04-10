const bookings = [
  {
    id: '14a9ec6f-aba2-4a6a-9a7e-7e052f0e0b03',
    title: 'Booked: John Doe jdoe@gmail.com',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    profileId: '9824f309-1f6a-40e2-8843-51a8cdc88632',
    createdAt: '2019-03-26T09:27:11Z',
    startsAt: '2050-03-29T10:00:00',
    endsAt: '2050-03-29T11:30:00',
    tentative: 'NOT_USED',
    timeZone: 'Europe/London',
    cancelled: false
  },
  {
    id: '673516f9-2d2e-4480-b511-4a620efe4902',
    title: 'Booked: Jane Doe Janedoe@gmail.com',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    profileId: '9824f309-1f6a-40e2-8843-51a8cdc88632',
    createdAt: '2019-03-11T19:46:15Z',
    startsAt: '2019-03-29T14:00:00',
    endsAt: '2019-03-29T15:30:00',
    tentative: 'NOT_USED',
    timeZone: 'Europe/London',
    cancelled: false
  },
  {
    id: 'd71348ee-c5ae-4715-9e96-a6a962491af4',
    title: 'Booked: John Smith smithjr@gmail.com',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    profileId: '9824f309-1f6a-40e2-8843-51a8cdc88632',
    createdAt: '2019-03-14T18:13:03Z',
    startsAt: '2050-04-03T12:00:00',
    endsAt: '2050-04-03T13:30:00',
    tentative: 'NOT_USED',
    timeZone: 'Europe/London',
    cancelled: false
  }
];

const pastBookings = [
  {
    id: '14a9ec6f-aba2-4a6a-9a7e-7e052f0e0b03',
    title: 'Booked: John Doe jdoe@gmail.com',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    profileId: '9824f309-1f6a-40e2-8843-51a8cdc88632',
    createdAt: '2019-03-26T09:27:11Z',
    startsAt: '2018-03-29T10:00:00',
    endsAt: '2018-03-29T11:30:00',
    tentative: 'NOT_USED',
    timeZone: 'Europe/London',
    cancelled: false
  },
  {
    id: '673516f9-2d2e-4480-b511-4a620efe4902',
    title: 'Booked: Jane Doe Janedoe@gmail.com',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    profileId: '9824f309-1f6a-40e2-8843-51a8cdc88632',
    createdAt: '2019-03-11T19:46:15Z',
    startsAt: '2018-03-29T14:00:00',
    endsAt: '2018-03-29T15:30:00',
    tentative: 'NOT_USED',
    timeZone: 'Europe/London',
    cancelled: false
  },
  {
    id: 'd71348ee-c5ae-4715-9e96-a6a962491af4',
    title: 'Booked: John Smith smithjr@gmail.com',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    profileId: '9824f309-1f6a-40e2-8843-51a8cdc88632',
    createdAt: '2019-03-14T18:13:03Z',
    startsAt: '2018-04-03T12:00:00',
    endsAt: '2018-04-03T13:30:00',
    tentative: 'NOT_USED',
    timeZone: 'Europe/London',
    cancelled: false
  }
];

const futureBookings = [
  {
    id: '14a9ec6f-aba2-4a6a-9a7e-7e052f0e0b03',
    title: 'Booked: John Doe jdoe@gmail.com',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    profileId: '9824f309-1f6a-40e2-8843-51a8cdc88632',
    createdAt: '2019-03-26T09:27:11Z',
    startsAt: '2050-03-29T10:00:00',
    endsAt: '2050-03-29T11:30:00',
    tentative: 'NOT_USED',
    timeZone: 'Europe/London',
    cancelled: false
  },
  {
    id: '673516f9-2d2e-4480-b511-4a620efe4902',
    title: 'Booked: Jane Doe Janedoe@gmail.com',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    profileId: '9824f309-1f6a-40e2-8843-51a8cdc88632',
    createdAt: '2019-03-11T19:46:15Z',
    startsAt: '2050-03-29T14:00:00',
    endsAt: '2050-03-29T15:30:00',
    tentative: 'NOT_USED',
    timeZone: 'Europe/London',
    cancelled: false
  },
  {
    id: 'd71348ee-c5ae-4715-9e96-a6a962491af4',
    title: 'Booked: John Smith smithjr@gmail.com',
    accountId: '83febcfd-f898-401a-bf0f-2dae1d7990e5',
    profileId: '9824f309-1f6a-40e2-8843-51a8cdc88632',
    createdAt: '2019-03-14T18:13:03Z',
    startsAt: '2050-04-03T12:00:00',
    endsAt: '2050-04-03T13:30:00',
    tentative: 'NOT_USED',
    timeZone: 'Europe/London',
    cancelled: false
  }
];

invalidYCBM = {
  username: 'incorrect@northcoders.com',
  password: 'aaaaaaaaa'
};

module.exports = {
  pastBookings,
  futureBookings,
  bookings,
  invalidYCBM
};
