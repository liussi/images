// export default function ImageGalleryItem({ imageGallary }) {
//     return (
//       <li class="gallery-item" id={imageGallary.hits[0].id}>
//         <img
//           src={imageGallary.hits[0].webformatURL}
//           alt={imageGallary.hits[0].tags}
//         />
//         <img
//           src={imageGallary.hits[1].webformatURL}
//           alt={imageGallary.hits[1].tags}
//         />
//       </li>
//     );
// }


export default function ImageGalleryItem({ imageGallery }) {
  return (
    <ul className="gallery">
      {imageGallery.hits.map(item => (
        <li key={item.id} className="gallery-item">
          <img src={item.webformatURL} alt={item.tags} width={200} />
        </li>
      ))}
    </ul>
  );
}