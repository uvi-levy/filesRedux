import React, { useEffect, useState } from "react";
import $ from "jquery";

import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";

// import './App.css';


function App() {

  const history = useHistory();

  let url = window.location;
  let userName = url.pathname.split("/")[1];

  const [jwtFromCookie, setJwtFromCookie] = useState("");
  const [data, setData] = useState([]); //save
  const [files, setFiles] = useState([{}]); //save
  const [filterdFiles, setFilterdFiles] = useState([{}]);
  const [next, setNext] = useState(false);
  const [noFiles, setNoFiles] = useState(false);

  useEffect(()=>{
    let tmpJwtFromCookie;
    if (window.location == "http://localhost:3000/uvi") {
      tmpJwtFromCookie =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJnS1h4ckFheVdlWE9VcWZOdGs2VllvdXRsRUwyIiwiZW1haWwiOiJ1dmlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjE5NTk4MjMzfQ.4hcZDKwWHDsfZ9gLPU1r8pvqPpYm1Dr9XZ5xJY_hqlc";
    } else {
      tmpJwtFromCookie = document.cookie
        ? document.cookie
            .split(";")
            .filter((s) => s.includes("jwt"))[0]
            .split("=")
            .pop()
        : null;}
        setJwtFromCookie(tmpJwtFromCookie)
  }, [])

  useEffect(() => {
    console.log("files==" + files);
    if (history) history.push("/" + userName); 
  }, [files, history])

  useEffect(() => {
    console.log(jwtFromCookie);
    if (jwtFromCookie) loadFiles()
  }, [jwtFromCookie])

  const loadFiles = () => {
    console.log("load");
    $.ajax({
      type: "GET",
      url: "https://files.codes/api/" + localStorage.getItem("userName"),
      headers: { authorization: jwtFromCookie },
      error: (err) => {
        if (err.status == 401) {
          window.location = "https://accounts.codes/files/login";
        }
      },
      success: (data) => {
        console.log("*data.length*", data, typeof data);
        if (data.length > 0) {
          setData( data );
          var validFiles = data.filter(
            (file) => file.name && file.size && file.dateCreated
          );
          setNext(true);
          setFiles(validFiles)
      
        } else {
          setNext(true);
          setData("no-files")
          
        }
      },
    });
  }

  return (
    <Router>
      <div className="App">
        
      </div>
    </Router>
  );
}

export default App;
