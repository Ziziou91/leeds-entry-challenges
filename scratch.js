const result = () => {
  const dayObj = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday'
  };
  let weekObj = Array.from(Object.values(dayObj), day => {
    return { [day]: { Manchester: [], Leeds: [] } };
  });
  console.log(weekObj);
};

result();

const getFutureDate = (daysToAdd, day) => {
  let remove = day === 'start' ? moment().startOf('day') : '';
  return new Date(
    moment()
      .startOf('day')
      .add(daysToAdd - new Date(remove).getDay(), 'days')
      .format()
  );
};

const filterGivenWeeksIVs = (week, codewarsArray) => {
  let startDate =
    week === 'this-week'
      ? new Date(moment().startOf('day'))
      : getFutureDate(10, 'start');
  let endDate =
    week === 'this-week' ? getFutureDate(5, 'end') : getFutureDate(14, 'end');
  console.log(startDate, endDate);
  const weeksIVs = codewarsArray.filter(
    attendee =>
      new Date(attendee.interview) >= startDate &&
      new Date(attendee.interview) <= endDate
  );
  return [startDate, endDate, weeksIVs];
};

HubspotURL: `https://app.hubspot.com/sales/3489321/contact/${interviewee.vid ||
  null}`;
