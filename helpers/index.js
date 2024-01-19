const getCallHelper = () => {
  return "This is a GET Call";
};

const postCallHelper = () => {
  return "This is a POST Call";
};

const putCallHelper = () => {
  return "This is a PUT Call";
};

const deleteCallHelper = () => {
  return "This is a DELETE Call";
};

const makeErrorHelper = () => {
  return "This is a Error generate call";
};

const convertCurrency = (inr, rate) => {
  return inr * rate;
};
module.exports = {
  getCallHelper,
  postCallHelper,
  putCallHelper,
  deleteCallHelper,
  makeErrorHelper,
  convertCurrency,
};
