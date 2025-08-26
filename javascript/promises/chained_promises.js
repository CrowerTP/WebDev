const getJSON = async function (url) {
  const res = await fetch(`${url}`);
  if (!res.ok) throw new Error('HTTP Error');
  const [data] = await res.json();
  return data.capital[0];
};

const get3Country = async function (c1, c2, c3) {
  try {
    const result = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(result);
    // lehet még Promise.allSettled/race/any
  } catch (err) {
    console.log(err.message);
  }
};

try {
  await get3Country('hungary', 'italy', 'france');
} catch (err) {
  console.log(err);
}
