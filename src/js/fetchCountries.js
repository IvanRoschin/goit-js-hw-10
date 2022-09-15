const BASE_URL = 'https://restcountries.com/v2/';

function fetchCountries(countryName) {
  return fetch(
    `${BASE_URL}name/${countryName}?fields=name,capital,population,flags,languages`
  ).then(response => {
    return response.json();
  });
}

export { fetchCountries };
