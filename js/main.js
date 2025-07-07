"use strict";

let data_object = {};
let searchInput = document.getElementById("search");
let day = document.querySelector(".day");
let date_input = document.querySelector(".date");
let dateStr = "";
let dateStr_2="";
let dateStr_3="";
let city=document.querySelector(".city");
let degree=document.querySelector(".degree");
let icon_1=document.getElementById("icon_1");
let condition=document.querySelector(".condition");
let rain=document.querySelector(".rain")
let wind=document.querySelector(".wind")
let wind_dir=document.querySelector(".wind_dir")
let day_2=document.querySelector(".day_2");
let icon_2=document.querySelector(".icon_2");
let upper_1=document.querySelector(".upper_1");
let lower_1=document.querySelector(".lower_1");
let condition_1=document.querySelector(".condition_1");
let day_3=document.querySelector(".day_3");
let icon_3=document.querySelector(".icon_3");
let upper_2=document.querySelector(".upper_2");
let lower_2=document.querySelector(".lower_2");
let condition_2=document.querySelector(".condition_2")


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

async function fetchData(location) {
  console.log(location);
  let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a73a0450be0c445389d114131250707&q=${location}&days=3&aqi=no&alerts=no`, {
    method: "get"
  });

  if (response.ok === true) {
    let data = await response.json();
    console.log(data);
    data_object = data;
   displayData(data_object);   
  }else{
    console.log("Error while fetching data")
  }
}



function displayData(data_object){
    //day 1
    dateStr = data_object.forecast.forecastday[0].date;
    const today = new Date(dateStr);
    const dayName = days[today.getDay()];
    day.innerHTML = dayName;
    const formattedDate = `${today.getDate()} ${months[today.getMonth()]}`;
    date_input.innerHTML = formattedDate;
    city.innerHTML=data_object.location.name;
    degree.innerHTML=`${data_object.forecast.forecastday[0].day.avgtemp_c} °C`;
    let iconUrl = data_object.forecast.forecastday[0].day.condition.icon; 
    icon_1.src = "https:" + iconUrl; 
    condition.innerHTML=data_object.forecast.forecastday[0].day.condition.text;
    rain.innerHTML=`  <img src="assets/icon-umberella.png" alt=""> ${data_object.forecast.forecastday[0].day.totalprecip_mm} %`;
    wind.innerHTML=`<img src="assets/icon-wind.png" alt=""> ${data_object.current.wind_kph}Km/h`;
    wind_dir.innerHTML=`${data_object.current.wind_dir}`
    //day 2
    dateStr_2=data_object.forecast.forecastday[1].date;
    const tom = new Date(dateStr_2);
    const dayName_2 = days[tom.getDay()];
    day_2.innerHTML = dayName_2;
    icon_2.src=`https:${data_object.forecast.forecastday[1].day.condition.icon}`;
    upper_1.innerHTML=`${data_object.forecast.forecastday[1].day.maxtemp_c} °C`;
    lower_1.innerHTML=`${data_object.forecast.forecastday[1].day.mintemp_c} °C`;
    condition_1.innerHTML=data_object.forecast.forecastday[1].day.condition.text;
    //day 3
    dateStr_3=data_object.forecast.forecastday[2].date;
    const afterTom = new Date(dateStr_3);
    const dayName_3= days[afterTom.getDay()];
    day_3.innerHTML = dayName_3;
    icon_3.src=`https:${data_object.forecast.forecastday[2].day.condition.icon}`;
    upper_2.innerHTML=`${data_object.forecast.forecastday[2].day.maxtemp_c} °C`;
    lower_2.innerHTML=`${data_object.forecast.forecastday[2].day.mintemp_c} °C`;
    condition_2.innerHTML=data_object.forecast.forecastday[2].day.condition.text;


    

    
}


function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchData(`${lat},${lon}`);
      }
    );
  } 
}
getUserLocation();

searchInput.addEventListener("input",function(){
     let inputValue= searchInput.value.trim();
     console.log(inputValue);
      if (inputValue !== "") {
       fetchData(inputValue);
        }
    })

