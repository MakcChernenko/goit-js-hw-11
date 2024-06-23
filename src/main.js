
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, renderImages } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
    });
    return;
  }

  clearGallery();
  loader.style.display = 'block';

  try {
    const images = await fetchImages(searchTerm);

    if (images.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImages(images);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
});
