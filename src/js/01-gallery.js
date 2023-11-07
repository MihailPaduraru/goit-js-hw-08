import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

const listEl = document.querySelector('.gallery');

let currentLightbox = null;

galleryItems.forEach(item => {
  const listItemEl = document.createElement('li');
  listItemEl.classList.add('gallery__item');
  listItemEl.innerHTML = `<a class="gallery__link" href="${item.original}">
    <img class="gallery__img" 
    src="${item.preview}"
    data-source="${item.original}"
    alt="${item.description}" />
  </a>`;
  listEl.append(listItemEl);
});

listEl.addEventListener('click', openImageInLightbox);

function openImageInLightbox(event) {
  const clickedOn = event.target;

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  event.preventDefault();

  const largeImageUrl = clickedOn.dataset.source;

  if (currentLightbox) {
    currentLightbox.close();
  }

  currentLightbox = new SimpleLightbox(
    `<img width="1400" height="900" src="${largeImageUrl}" />`
  );
  currentLightbox.show();
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && currentLightbox) {
    currentLightbox.close();
  }
});
