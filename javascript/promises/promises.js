// OLD WAY FOR API CALL
// const req = new XMLHttpRequest();
// req.open('GET', "https://valamilyenAPI.com");
// req.send();

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${+data.population} people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(Object.values(data.currencies)[0])[0]
      } ${Object.values(Object.values(data.currencies)[0])[1]}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  //   countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].name.common);
      if (!data[0].borders) return;
      data[0].borders.forEach((neighbour) => {
        fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
          .then((response) => response.json())
          .then((neighbourData) => console.log(neighbourData[0].name.common));
      });
    })
    .catch((err) => console.log(err.message))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", () => getCountryData("croatia"));
