import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
	createGallery,
	clearGallery,
	showLoader,
	hideLoader,
	showLoadMoreButton,
	hideLoadMoreButton,
} from './js/render-functions';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

hideLoadMoreButton();

formEl.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(evt) {
	evt.preventDefault();

	query = inputEl.value.trim();
	page = 1;
	totalHits = 0;

	clearGallery();
	hideLoadMoreButton();

	if (!query) {
		iziToast.info({ message: 'Please enter a search query.' });
		return;
	}

	try {
		showLoader();
		const data = await getImagesByQuery(query, page);
		totalHits = data.totalHits;

		if (!data.hits.length) {
			iziToast.error({
				message:
					'Sorry, there are no images matching your search query. Please try again!',
			});
			return;
		}

		createGallery(data.hits);

		const totalPages = Math.ceil(totalHits / PER_PAGE);
		if (page < totalPages) showLoadMoreButton();

		iziToast.success({ message: `Hooray! We found ${totalHits} images.` });
	} catch (err) {
		iziToast.error({ message: 'Request failed. Try again later.' });
	} finally {
		hideLoader();
		formEl.reset();
	}
}

async function onLoadMore() {
	page += 1;

	try {
		showLoader();
		const data = await getImagesByQuery(query, page);
		createGallery(data.hits);

		smoothScroll();

		const totalPages = Math.ceil(totalHits / PER_PAGE);
		if (page >= totalPages) {
			hideLoadMoreButton();
			iziToast.info({
				message: "We're sorry, but you've reached the end of search results.",
			});
		}
	} catch (err) {
		iziToast.error({ message: 'Request failed. Try again later.' });
	} finally {
		hideLoader();
	}
}

function smoothScroll() {
	const card = document.querySelector('.gallery a');
	if (!card) return;

	const { height } = card.getBoundingClientRect();
	window.scrollBy({ top: height * 2, behavior: 'smooth' });
}
