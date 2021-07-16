import { galleryItems } from './app.js';

const galleryContainer = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const overlayRef = document.querySelector('.lightbox__overlay');
const closeOverlayButton = document.querySelector('[data-action="close-lightbox"]');
const lightboxPhotoContainer = document.querySelector('.lightbox__image');

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


//open/close modal
galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(event) {
    event.preventDefault();
    const isGalleryImage = event.target.classList.contains('gallery__image');
    if (!isGalleryImage) {
        return;
    }

    lightboxPhotoContainer.alt = event.target.alt;
    lightboxPhotoContainer.src = event.target.dataset.source;
    openModal();
}


overlayRef.addEventListener('click', closeModal);
closeOverlayButton.addEventListener('click', closeModal);

function closeModal () {
    if (!lightboxRef.classList.contains('is-open')) {
        return
    }
    lightboxRef.classList.toggle('is-open');
    lightboxPhotoContainer.alt = '';
    lightboxPhotoContainer.src = '';
}

function openModal() {
    if (lightboxRef.classList.contains('is-open')) {
        return
    }
    lightboxRef.classList.toggle('is-open');
}
