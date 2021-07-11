import localKeys from "./local";
import serverKeys from "./server";

const isDev =
  window.location.href.includes("dev.") ||
  window.location.href.includes("localhost:");
console.log("isDev", isDev);

const keys = isDev ? localKeys : serverKeys;

export default keys;
