import "./App.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
	let url = "https://swapi.dev/api/planets/";
	let response = [];
	let arrayCombine = [];
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
	const paging = 3;
	const [data, setData] = useState([]);
	const [dataNext, setDataNext] = useState([]);
	const [dataWishList, setDataWishList] = useState([]);  
	const [pagination, setPagination] = useState([]);  
	
	const fetchInfo = async () => {
		response = await fetch(url).then((response) => response.json());
		arrayCombine = data.concat(response.results).unique();	
		setData(arrayCombine);	  
		setDataNext(response);
		loadWishList(0);
	}
	
	const loadMore = (urlSelected) => {
		url = urlSelected;
		fetchInfo();
	}
	
	const paginate = (number) =>{
		loadWishList(number);		
	}
	
	const loadWishList = (a) => {
		var time = [];
		for (var i = 0; i < localStorage.length; i++){
			var jsonObject = JSON.parse(localStorage.getItem(localStorage.key(i)));
			time[jsonObject['time']] = jsonObject['name'];
		}
		time.sort();
		var c = 0;	
		var b = a + 2;
		for (let key of Object.keys(time)){
			c ++;
			if(c >= a){
				arrayCombine.push(JSON.parse(localStorage.getItem(time[key])));
			}
			if(c > b){
				break;
			}
		}		
		console.log(arrayCombine);
		setDataWishList(arrayCombine);
		const result = [];		
		for (let i = 1; i <  Math.ceil(localStorage.length/3); i++) {
			result.push(i);
		}	
		console.log(result);	
		setPagination(result);		
	}  

	const wishList = (dataObject) => {
		dataObject['time'] = new Date().getTime();
		localStorage.setItem(dataObject.name, JSON.stringify(dataObject));
	//	loadWishList(0);	
	}

	useEffect((number) => {
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
					 <input onClick={() => wishList(dataObj)} type="button" name="WishList" value="WishList"/>
				  </p>
			  );
			})}
			{dataNext.next != null && <button onClick={() => loadMore(dataNext.next)}>Load More</button>}
			<br/>WishList: <br/>
			{dataWishList.map((dataObj, index) => {
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
          {pagination.map((number) => (
              <a onClick={(e) => {e.preventDefault();paginate(number);}} href="" className="page-link">
                &nbsp;{number}
              </a>
          ))}			
		  </center>
		</div>
	);
}

export default App;