// MARKUP TO ADD WHEN FETCHING DATA:

// PAGINATION MARKUP
// <button type="button" class="load-more">Load more</button>

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { fetchData } from './pixabay-api.js';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import SimpleLightbox from 'simplelightbox/src/simple-lightbox.js';

const API_KEY = '43824714-e4d423996effa56e06012e73d';
const BASE_URL = 'https://pixabay.com/api/';
const formEl = document.querySelector('form.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const submitBtn = document.querySelector('button[type="submit"]');
const galleryDiv = document.querySelector('div.gallery');
const loadBtn = document.querySelector('.load-more');

async function handleFormSubmit(e) {
  let currentPage = 1;
  e.preventDefault();
  if (inputEl.value === '') {
    Notify.failure('Please input a value');
    return;
  }

  galleryDiv.innerHTML = '';

  const searchQuery = inputEl.value;
  inputEl.value = '';

  try {
    const res = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
    );
    if (res.data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      if (!loadBtn.classList.contains('is-hidden')) {
        loadBtn.classList.add('is-hidden');
      }
      return;
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

    loadBtn.classList.remove('is-hidden');

    // const arrayRes = [];
    // arrayRes.push(...requestedRes);

    requestedRes.forEach(data => {
      const divEl = `<div class="photo-card">
      <img src="${data.webFormat}" alt="${data.tags}" loading="lazy" class="photo"/>
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

    //   const photosMarkup = createGalleryItem(arrayRes);
    //   galleryDiv.insertAdjacentHTML('beforeend', photosMarkup);

    //   function createGalleryItem(array) {
    //     return array
    //       .map(array => {
    //         return `<a class="gallery__item" href="${array.largeImage}" >
    //   <img
    //     class="gallery__image"
    //     src="${array.webFormat}"
    //     alt="${array.tags}"
    //   />
    //   <div class="info">
    //       <p class="info-item">
    //         <b>Likes</b>
    //         ${array.likes}
    //       </p>
    //       <p class="info-item">
    //         <b>Views</b> ${array.views}
    //       </p>
    //       <p class="info-item">
    //         <b>Comments</b> ${array.comments}
    //       </p>
    //       <p class="info-item">
    //         <b>Downloads</b> ${array.downloads}
    //       </p>
    //     </div>
    // </a>`;
    //       })
    //       .join('');
  } catch {
    console.error();
  }

  async function handleMore() {
    currentPage += 1;
    const res = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
    );

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
      <img src="${data.webFormat}" alt="${data.tags}" loading="lazy" class="photo"/>
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

    if (res.data.hits.length === 0) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadBtn.classList.add('is-hidden');
      return;
    }
    console.log(res);
  }

  loadBtn.addEventListener('click', handleMore);
}

formEl.addEventListener('submit', handleFormSubmit);

// const galleryHandling = new SimpleLightbox('.gallery a');

// galleryHandling.on(show.SimpleLightbox);
