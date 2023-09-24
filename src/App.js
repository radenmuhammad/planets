import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const url = "https://swapi.dev/api/planets/";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d.results))
  }


  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <center>
        {data.map((dataObj, index) => {
          return (
              <p>
				 {dataObj.name}<br/>
			     {dataObj.rotation_period}<br/>
			     {dataObj.diameter}<br/>
			     {dataObj.gravity}<br/>				 
			  </p>

          );
        })}
      </center>
    </div>
  );
}

export default App;