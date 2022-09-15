import './css/styles.css';
import countryCardTpl from './templates/country-card.hbs';
import countryListCardTpl from './templates/country-list-card.hbs';
import { fetchCountries } from './js/fetchCountries.js';
import getRefs from './js/get-refs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// !VARIABLES
const DEBOUNCE_DELAY = 1500;

const refs = getRefs();

//! LISTENERS
refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// !FUNCTIONS

//* F1 Search
function onSearch(e) {
  e.preventDefault();
  const searchQuery = document.getElementById('search-box').value.trim();

  fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => (document.getElementById('search-box').value = ''));
}

//* F2 Markup
function renderCountryCard(country) {
  const countryCardMarkup = countryCardTpl(country);
  const countryListMarkup = countryListCardTpl(country);
  console.log(country.length);

  if (country.length > 10) {
    refs.countryInfoCardContainer.innerHTML = '';
    refs.countryListCardContainer.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name'
    );
  } else if (country.length > 2 && country.length < 10) {
    refs.countryInfoCardContainer.innerHTML = '';
    refs.countryListCardContainer.innerHTML = countryListMarkup;
  } else if (country.length === 1) {
    refs.countryListCardContainer.innerHTML = '';
    refs.countryInfoCardContainer.innerHTML = countryCardMarkup;
  }
}

//* F3 Error
function onFetchError(error) {
  if (response.status === 404) {
    Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
  }
}
