


export default function ImageGalleryItem({ item, onClick }) {
  return (
    <li  className="gallery-item" onClick={onClick}>
      <img src={item.webformatURL} alt={item.tags} width={200} />
    </li>
  );
}