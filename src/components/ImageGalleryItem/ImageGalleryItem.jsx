


export default function ImageGalleryItem({ item, onClick }) {
  console.log(item.id);
  return (
    <li  className="gallery-item" onClick={onClick}>
      <img src={item.webformatURL} alt={item.tags} width={200} />
    </li>
  );
}