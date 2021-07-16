import { galleryItems } from './app.js';

// Refs:
const galleryContainer = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const overlayRef = document.querySelector('.lightbox__overlay');
const closeOverlayButton = document.querySelector('[data-action="close-lightbox"]');
const lightboxPhotoContainer = document.querySelector('.lightbox__image');


// Creating gallery markup:
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('afterbegin', galleryMarkup);

function createGalleryMarkup(galleryArray) {
    return galleryArray.map(({ original, preview, description }) => {
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    }).join('');
};


// Open/close modal:
galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(event) {
    event.preventDefault();

    lightboxPhotoContainer.alt = event.target.alt;
    lightboxPhotoContainer.src = event.target.dataset.source;

    openModal(event);
}

overlayRef.addEventListener('click', closeModal);
closeOverlayButton.addEventListener('click', closeModal);

function closeModal () {
    lightboxRef.classList.toggle('is-open');
    //Cleaning alt and src:
    lightboxPhotoContainer.alt = '';
    lightboxPhotoContainer.src = '';
}

function openModal(event) {
    const isGalleryImage = event.target.classList.contains('gallery__image');
    if (!isGalleryImage) {
        return;
    }
    
    lightboxRef.classList.toggle('is-open');
}
