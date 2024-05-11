import axios from 'axios';

// SAMPLE URL BASIS:
// https://pixabay.com/api/?
// key = 43824714 - e4d423996effa56e06012e73d
// &
// q=descriptive
// &
// --image_type=photo
// &
// --orientation=horizontal
// &
// --safesearch=true

// -- MEANS DEFAULT

// NEED TO GET BELOW DATAS:
// webformatURL;
// largeImageURL;
// tags;
// likes;
// views;
// comments;
// downloads;

export async function fetchData() {
  const res = await axios.get(`${BASE_URL}?key=${API_KEY}`);
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = res;
}
