// MARKUP TO ADD WHEN FETCHING DATA:

// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>;

// PAGINATION MARKUP
// <button type="button" class="load-more">Load more</button>

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { fetchData } from './pixabay-api.js';

const API_KEY = '43824714-e4d423996effa56e06012e73d';
const BASE_URL = 'https://pixabay.com/api/';
const formEl = document.querySelector('form.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const submitBtn = document.querySelector('button[type="submit"]');
const galleryDiv = document.querySelector('div.gallery');

async function handleFormSubmit(e) {
  e.preventDefault();
  const searchQuery = inputEl.value;
  const SearchValue = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

  inputEl.value = '';

  const res = await axios.get(SearchValue);

  console.log(SearchValue);
  console.log(res);
  //   const {
  //     webformatURL,
  //     largeImageURL,
  //     tags,
  //     likes,
  //     views,
  //     comments,
  //     downloads,
  //   } = res;
}

formEl.addEventListener('submit', handleFormSubmit);
