const isDev = window.location.href.includes("dev.");

 export default {
  LOGIN_PATH: isDev
    ? "https://dev.accounts.codes/files/login"
    : "https://accounts.codes/files/login",
  BASE_URL: isDev ? "https://dev.files.codes/api/" : "https://files.codes/api/",
  JWT: isDev ? "devJwt" : "jwt",
};
