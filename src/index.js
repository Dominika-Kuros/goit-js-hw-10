import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', debounce(() => fetchCountries(searchBox.value.trim())
    .then(data => {
        renderCountry(data);
    })
    .catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
    }), DEBOUNCE_DELAY));


renderCountry = (data) => {
    if (data.length > 10) {
        console.log(data);
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        renderMarkup(data);
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
   
    }
    if (data.length <= 10 && data.length >= 2) {
       const markupCountry = data.map(country => {
                return `<li> <div class="list-item"<img class="list-image" src="${country.flags.svg}" width="70" height="30">
            <p class="list-title">${country.name.official}</p>
            </div>
            </li>`;
            })
            .join('');
        countryList.innerHTML = markupCountry;
        countryInfo.innerHTML = '';
       
    }

    else 
        (data.length === 1) 
            const markupCountry = data.map(country => {
               return `<div class="country-card">
        <div class="card-item">
          <img class="card-image" src="${
            country.flags.svg
          }" width="70" height="50">
          <p class="card-title">${country.name.common}</p>
        </div>
          <p class="card-text"><b>Capital:</b> ${country.capital[0]}</p>
          <p class="card-text"><b>Population:</b> ${country.population}</p>
          <p class="card-text"><b>Languages:</b> ${Object.values(
            country.languages
          )}</p>
      </div>`;
      })
                .join('');
    countryList.innerHTML = markupCountry;
        countryInfo.innerHTML = '';
           }
        





