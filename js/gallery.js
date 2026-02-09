/**
 * gallery.js
 * Interactive lightbox logic for the image gallery 
 * on the About page.
 */

// --- Lightbox Initialization ---
const images = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

// Add a click event to every image in the gallery
images.forEach(img => {
  img.addEventListener('click', () => {
    // Show the lightbox and set the image source
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

/* 
   We keep these listeners OUTSIDE the loop.
   This is more efficient because we only need ONE listener for the close button,
   not one for every single image.
*/

// Close the lightbox when the 'X' button is clicked
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Close the lightbox if the user clicks anywhere on the dark background
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});