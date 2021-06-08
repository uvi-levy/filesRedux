import produce from "immer";
import handler from "./reducerUtils";

const initialState = {
  data: [],
  files: [],
  filteredFilesByType: [],
  folders: [],
  isLoadFiles: true,
  isLoadFolders: true
};

const data = {
  setData(state, action) {
    state.data = action.payload;
  },
  setFiles(state, action) {
    state.files = action.payload;
    state.isLoadFiles = false;
  },
  filteredFilesByType(state, action) {
    console.log("filteredFilesByType NavBar " + JSON.stringify(state.files));
    if (state.files) {
      const img = {
        img: state.files.filter((file) => file.type && file.type.includes("image")),
      };
      const audio = {
        audio: state.files.filter((file) => file.type && file.type.includes("audio")),
      };
      const video = {
        video: state.files.filter((file) => file.type && file.type.includes("video")),
      };
      const others = {
        others: state.files.filter((file) => file.type && file.type.includes("pdf")),
      };
      let tmpFilteredFilesByType = [img, audio, video, others];
      state.filteredFilesByType = tmpFilteredFilesByType;
    }
  },
  loadFolders(state, action) {
    console.log("loadFolders");
    let myFolder = [];
    let data = state.data;
    if(data){
        if (typeof data === "object") {
          data.forEach((file) => {
            if (file.tags != "" && file.tags != "null" && file.tags) {
              const folder = file.tags.split("/");
              folder.forEach((folder) => myFolder.push(folder));
            }
          });
    
          let stringArray = myFolder.map(JSON.stringify);
          let uniqueStringArray = new Set(stringArray);
    
          let foldersArr = [];
          let folders = [{}];
    
          uniqueStringArray.forEach((str) => {
            foldersArr.push(str);
          });
          foldersArr.forEach((folder) => {
            if (folder && !folder.includes("\\") && folder != '"undefined"') {
         let clean;
              if(folder) {clean = folder.replace(/["']/g, "")}
              const filteredFiles = data.filter(
                (file) =>
                  file.tags != null && file.tags && file.tags.includes(clean)
              );
              let date = filteredFiles.reduce((r, o) =>
                o.datecreated < r.datecreated ? o : r
              );
              let size = 0;
              for (let index = 0; index < filteredFiles.length; index++) {
                size += filteredFiles[index].size * 1024;
              }
              let Folder = { name: clean, size: size, date: date.dateCreated };
    
              folders.push(Folder);
            }
          });
    
          state.folders = folders;
          state.isLoadFolders = false;
          console.log("folders===", state.folders);
        }
      }
  },
};

const reducer = produce((state, action) => {
  handler(state, action, data);
}, initialState);

export default reducer;