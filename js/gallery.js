/**
 * gallery.js
 * Interactive lightbox logic for the image gallery 
 * on the About page.
 */

// --- Lightbox Initialization ---
// Selecting all images with the 'gallery-item' class.
const images = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

// Loop through every image to add a click listener.
images.forEach(img => {
  img.addEventListener('click', () => {
    // Show the 'lightbox' overlay and set the source to the clicked image.
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;//using img.src to get the image source
  });
});

/* 
   Listeners kept OUTSIDE the loop for efficiency.
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