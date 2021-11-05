let APIURL = "";

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "lesaphil-guaranteed.herokuapp.com":
    APIURL = "https://lesaphil-guaranteed.herokuapp.com";
}
export default APIURL;
