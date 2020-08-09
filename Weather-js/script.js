const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "45ec1d30ef0003740b67f1d1c9b9a232";
let inputVal;
let KELVIN=273;
// for enabling location
if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}

else
{
    msg.textContent=` Browser doesn't support geolocation`;
}

function setPosition(position)
{
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    getWeather(latitude,longitude);
}
// for eroor message
function showError(error)
{
    msg.textContent=` Browser doesn't support geolocation`;
}
// after getting longitude and latitude getting the data from fetch api method
function getWeather(latitude,longitude)
{
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetch(api).then(function(response)
    {
        let data=response.json();
        return data;
    })
    // setting data from the request to desired conatiners
    
    .then(data => {
          const { main, name, sys, weather } = data;
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
          weather[0]["icon"]
          }.svg`;
      
          const li = document.createElement("li");
          li.classList.add("city");
          const markup = `
          <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
          </h2>
          <div class="city-temp">${Math.round(main.temp-KELVIN)}<sup>°C</sup></div>
          <figure>
          <img class="city-icon" src="${icon}" alt="${
          weather[0]["description"]
          }">
          <figcaption>${weather[0]["description"]}</figcaption>
          </figure>
          `;
          li.innerHTML = markup;
          list.appendChild(li);
      })
          .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
          });

}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  inputVal = input.value;
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      //athens,gr
      if (inputVal.includes(",")) {
        //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        //athens
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }


  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
})