import './css/styles.css';
import countryCardTpl from './templates/country-card.hbs';
import countryListCardTpl from './templates/country-list-card.hbs';
import API from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// !VARIABLES
const DEBOUNCE_DELAY = 1500;

const refs = {
  CountryListCardContainer: document.querySelector('.country-list'),
  CountryInfoCardContainer: document.querySelector('.country-info'),
  searchForm: document.querySelector('#search-box'),
};
refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// !FUNCTIONS

//* F1 Search
function onSearch(e) {
  e.preventDefault();
  const searchQuery = document.getElementById('search-box').value.trim();

  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => (document.getElementById('search-box').value = ''));
}

//* F2 MArkup
function renderCountryCard(country) {
  const countryCardMarkup = countryCardTpl(country);
  const countryListMarkup = countryListCardTpl(country);
  console.log(country.length);

  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name'
    );
  } else if (country.length > 2 && country.length < 10) {
    refs.CountryInfoCardContainer.innerHTML = '';
    refs.CountryListCardContainer.innerHTML = countryListMarkup;
  } else if (country.length === 1) {
    refs.CountryListCardContainer.innerHTML = '';
    refs.CountryInfoCardContainer.innerHTML = countryCardMarkup;
  }
}

//* F3
function onFetchError(error) {
  Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
}
