import './css/styles.css';
// import countryCardTpl from './templates/country-card.hbs';
// import countryListCardTpl from './templates/country-list-card.hbs';
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

  const searchQuery = e.target.value.trim();

  console.log('searchQuery', searchQuery);

  if (searchQuery === '') {
    console.log('В Инпуте только пробелы, запрос на сервер не отправлен');
    refs.countryInfoCardContainer.innerHTML = '';
    refs.countryListCardContainer.innerHTML = '';
    return;
  } else console.log('отправляем запрос на сервер');
  refs.countryInfoCardContainer.innerHTML = '';
  refs.countryListCardContainer.innerHTML = '';
  fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
  return;
}

//* F2 Markup
// (2.1).countryInfoMarkup;
function countryInfoMarkup(country) {
  return country
    .map(({ flags, name, capital, population, languages }) => {
      return `
          <div class='country-container'>

  <img class ="country-info__img" src=${flags.svg} alt="flag" width="60"></img>
  <h2 class="country-info__name">${name.official}</h2>
  </div>
  <p class="country-info__descr">
  <b>Capital:</b> <span class="country-info__value">${capital}</span>
  </p>
  <p class="country-info__descr">
  <b>Population:</b> <span class="country-info__value">${population}</span>
  </p>
    <p class="country-info__descr">
  <b>languages:</b> <span class="country-info__value">${Object.values(
    languages
  )}</span>
  </p>`;
    })
    .join('');
}

// (2.2).countryListMarkup;
function countryListMarkup(country) {
  return country
    .map(({ flags, name }) => {
      return `    <li class='country-list__item'>
<img class='country-list__img' src='${flags.svg}' alt='flag'>
<p class='country-list__text'>${name.official}</p>
    </li>
`;
    })
    .join('');
}

//* F3 RenderCountryCard
function renderCountryCard(country) {
  if (country.length > 10) {
    refs.countryInfoCardContainer.innerHTML = '';
    refs.countryListCardContainer.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name'
    );
  } else if (country.length >= 2 && country.length <= 10) {
    refs.countryInfoCardContainer.innerHTML = '';
    refs.countryListCardContainer.insertAdjacentHTML(
      'beforeend',
      countryListMarkup(country)
    );
  } else if (country.length === 1) {
    refs.countryListCardContainer.innerHTML = '';
    refs.countryInfoCardContainer.insertAdjacentHTML(
      'beforeend',
      countryInfoMarkup(country)
    );
  }
}

//* F3 Error
function onFetchError(error) {
  Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
}
