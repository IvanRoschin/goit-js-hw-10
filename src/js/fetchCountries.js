import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v2/';

function fetchCountries(countryName) {
  return fetch(
    `${BASE_URL}name/${countryName}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.status !== 200) {
      Notiflix.Notify.failure(`❌ Fetc не сработал, ошибка API сервера`);
    }
    return response.json();
  });
}

export { fetchCountries };
