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

HubspotURL: `https://app.hubspot.com/sales/3489321/contact/${interviewee.vid ||
  null}`;
