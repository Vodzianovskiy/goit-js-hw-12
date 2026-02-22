import axios from 'axios';

const API_KEY = '54665036-94176af4f08ccc0fd35b37209';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
	const params = {
		key: API_KEY,
		q: query,
		image_type: 'photo',
		orientation: 'horizontal',
		safesearch: true,
		page,
		per_page: PER_PAGE,
	};

	const { data } = await axios.get(BASE_URL, { params });
	return data;
}
