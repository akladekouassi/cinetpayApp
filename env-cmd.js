const REACT_APP_FAKE_LOGIN_API_URL_LOCAL = 'https://reqres.in/api/';
const REACT_APP_GITHUB_API_URL_LOCAL = ' https://api.github.com/';
module.exports = Promise.resolve({
  local_dev: {
    REACT_APP_FAKE_LOGIN_API_URL: REACT_APP_FAKE_LOGIN_API_URL_LOCAL,
    REACT_APP_GITHUB_API_URL: REACT_APP_GITHUB_API_URL_LOCAL,
    REACT_APP_CINETPAY_LOGO: 'cinetpay',
  },
});
