import "./App.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

function App() {
  let url = "https://swapi.dev/api/planets/";
  let response = [];
  const [data, setData] = useState([]);
  const [dataNext, setDataNext] = useState([]);
  const fetchInfo = async () => {
	  response = await fetch(
		url
	  ).then((response) => response.json());
		var arrayCombine = data.concat(response.results).unique();	
	  console.log(response);	
	  setData(arrayCombine);	  
	  setDataNext(response);
  }
  const loadMore = (urlSelected) => {
	  url = urlSelected;
    fetchInfo();
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
				 {dataObj.terrain}<br/>				 
				 {dataObj.surface_water}<br/>				 
				 {dataObj.population}<br/>
				 Residence:
				  {dataObj.residents.map(obj => {
					return (
						<h2>link: {obj}</h2>
					);
				  })}			
				 Films:
				  {dataObj.films.map(obj => {
					return (
						<h2>link: {obj}</h2>
					);
				  })}			
				 {dataObj.created}<br/>
				 {dataObj.edited}<br/>						 
			  </p>

		  );
		})}
{dataNext.next != null && <button onClick={() => loadMore(dataNext.next)}>Load More</button>}		
      </center>
    </div>
  );
}

export default App;