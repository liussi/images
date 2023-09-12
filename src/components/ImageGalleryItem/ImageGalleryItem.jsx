
export default function ImageGalleryItem({ item }) {
  return (
    <li key={item.id} className="gallery-item">
      <img src={item.webformatURL} alt={item.tags} width={200} />
    </li>
  );
}