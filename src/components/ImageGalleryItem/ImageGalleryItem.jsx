


export default function ImageGalleryItem({ item, onclick }) {
  return (
    <li key={item.id} className="gallery-item" onclick={onclick}>
      <img src={item.webformatURL} alt={item.tags} width={200} />
    </li>
  );
}