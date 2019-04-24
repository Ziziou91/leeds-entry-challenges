const includeHeaders = (body, response, resolveWithFullResponse) => {
  return { headers: response.headers, data: body };
};

module.exports = {
  includeHeaders
};
