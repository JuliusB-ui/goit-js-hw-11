// MARKUP TO ADD WHEN FETCHING DATA:

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
  if (inputEl.value === '') {
    Notify.failure('Please input a value');
    return;
  }
  const searchQuery = inputEl.value;
  inputEl.value = '';

  try {
    const res = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    if (res.data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${res.data.totalHits} images.`);
    }

    const requestedRes = res.data.hits.map(hit => {
      return {
        webFormat: hit.webformatURL,
        largeImage: hit.largeImageURL,
        tags: hit.tags,
        likes: hit.likes,
        views: hit.views,
        comments: hit.comments,
        downloads: hit.downloads,
      };
    });

    requestedRes.forEach(data => {
      const divEl = `<div class="photo-card">
    <img src="${data.webFormat}" alt="" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${data.likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${data.views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${data.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${data.downloads}
      </p>
    </div>
  </div>`;
      galleryDiv.insertAdjacentHTML('beforeend', divEl);
    });
  } catch {
    Notify.failure('error!' + Error);
  }
}

formEl.addEventListener('submit', handleFormSubmit);
