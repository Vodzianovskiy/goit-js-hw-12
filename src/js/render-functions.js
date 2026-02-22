import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      img => `
      <li class="photo-card">
        <a class="gallery-link" href="${img.largeImageURL}" rel="noopener noreferrer">
          <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">Likes <span>${img.likes}</span></p>
            <p class="info-item">Views <span>${img.views}</span></p>
            <p class="info-item">Comments <span>${img.comments}</span></p>
            <p class="info-item">Downloads <span>${img.downloads}</span></p>
          </div>
        </a>
      </li>
    `
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}


export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
