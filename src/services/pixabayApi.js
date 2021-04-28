import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const apiKey = '19909121-fe72a6a4c0f185ae96ac43b20';

//делаем запрос на API на получение картинок
const fetchImagesfromApi = ({
  serchQuery = '',
  currentPage = 1,
  pageSize = 12,
}) => {
  return axios
    .get(
      `/?key=${apiKey}&q=${serchQuery}&image_type=photo&page=${currentPage}&orientation=horizontal&per_page=${pageSize}`,
    )
    .then(response => response.data);
};

export default { fetchImagesfromApi };
