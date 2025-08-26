// TELJESEN UGYANAZ MIND2!!!!

// Promise kezelés .then() használatával
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((res) => res.json())
//     .then((data) => console.log(data[0].name.common));
// };

// Promise kezelés async-await használatával
const getCountryData = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error("HTTP Error");
    const [data] = await res.json();
    return data.name.common;
  } catch (err) {
    console.log(err.message);
  }
};

console.log("FIRST");
(async function () {
  try {
    const city = await getCountryData("hungary");
    console.log(city);
  } catch (err) {
    console.log(err);
  }
  console.log("SECOND");
})();
