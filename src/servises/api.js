import { toast } from 'react-toastify';

export default async function fetchImages({
  setStatus,
  imageName,
  currentPage,
  perPage,
}) {
  try {
    const KEY = '38529296-de6c3fac31b2614a8135b6c10';
    const response = await fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );

    if (!response.ok) {
      throw new Error(
        `There was an error fetching images for the query: ${imageName}`
      );
    }

    const data = await response.json();
    const hits = data.hits;
    const totalHits = data.totalHits;
    return { hits, totalHits };
  } catch (error) {
    console.error(error);
    setStatus('rejected');
    toast.error(`Error: ${error.message}`);
  }
}
