//global
export const URL = window.location;
export const USER_NAME = URL.pathname.split("/")[1];
export const JWT_FROM_COOKIES =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJnS1h4ckFheVdlWE9VcWZOdGs2VllvdXRsRUwyIiwiZW1haWwiOiJ1dmlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjE5NTk4MjMzfQ.4hcZDKwWHDsfZ9gLPU1r8pvqPpYm1Dr9XZ5xJY_hqlc";

//api requests
export const BASE_URL = "https://dev.files.codes/api/";
export const SHARE_BASE_URL = "https://api.dev.leader.codes/permissions/";
export const LOCAL_HOST = "http://localhost:3000/uvi";
export const CREATE_NEW_FOLDER = "/createNewFolder";
export const FIND_BY_TAG = "/findByTag/";
export const GET_COUNT = "/getCount";
export const REMOVE_MULTIPLE_FILES = "/removeMultipleFiles";
export const RECOVER_MULTI_FILES = "/recovereMultiFiles";
export const SHOW_DELETED_FILES = "/showDeletedFiles";
export const UPLOAD_MULTIPLE_FILES = "/uploadMultipleFiles";
export const SAVE_MULTI_FILES_DB = "/savedMultiFilesDB";
export const SAVE_NOTES = "/saveNotes";
export const EDIT_NOTES = "/editNotes";
export const MOVE_TO = "/moveTo";
export const DOWNLOAD = "/download/";
export const MULTI_FILES_TO_ARCHIV = "/multiFilesToArchiv";
export const CREATE_PERMISSION = "/createPermission";
export const LOGIN_PATH = "https://dev.accounts.codes/files/login";
