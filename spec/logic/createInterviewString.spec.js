const { expect } = require('chai');

describe('createInteriewString', function() {
  it('should return a string', () => {
    const interviewString = createInterviewString(createInterviewObjects);
    console.log(interviewString);
    expect(interviewString).to.be.a('string');
  });
});
