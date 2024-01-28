import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const apiKey = "41921784-0571e350d6104826bc1422cb3";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const loader = document.getElementById("loader");
const gallery = document.getElementById("gallery");
const btnLoadMore = document.querySelector('[data-action="load-more"]');
let lightbox;
let currentPage = 1;

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  currentPage = 1;
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    await searchImages(searchTerm);
  }
});

btnLoadMore.addEventListener("click", handleLoadMore);

function handleLoadMore() {
  currentPage += 1;
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    searchImages(searchTerm, currentPage);
  }
}

async function searchImages(searchTerm, page = 1) {
  try {
    const response = await performSearch(searchTerm, page);

    if (response.data.hits.length > 0) {
      if (page === 1) {
        // Clear gallery only for the first page
        clearGallery();
      }

      displayImages(response.data.hits);
      updateLightbox();
      smoothScrollToGallery();
    } else {
      showNoResultsMessage();
      clearGallery(); // Clear gallery when no results are found
    }

    if (response.data.totalHits <= page * 40) {
      showEndMessage();
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    hideLoader();
    showErrorToast("An error occurred while fetching images. Please try again.");
  }
}

function clearGallery() {
  gallery.innerHTML = "";
}

function updateLightbox() {
  lightbox.refresh();
}

function smoothScrollToGallery() {
  gallery.scrollIntoView({ behavior: "smooth" });
}

async function performSearch(searchTerm, page) {
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    searchTerm
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  showLoader();

  try {
    const response = await axios.get(apiUrl);
    hideLoader();
    return response;
  } catch (error) {
    hideLoader();
    throw error;
  }
}

function displayImages(images) {
  const fragment = document.createDocumentFragment();

  images.forEach((image) => {
    const imageCard = createImageCard(image);
    fragment.appendChild(imageCard);
  });

  gallery.appendChild(fragment);

  if (images.length > 0) {
    btnLoadMore.style.display = "block";
  } else {
    btnLoadMore.style.display = "none";
  }
}

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function createImageCard(image) {
  const card = document.createElement("div");
  card.className = "image-card";
  card.innerHTML = `
    <a href="${image.largeImageURL}" data-lightbox="gallery">
      <img src="${image.webformatURL}" alt="${image.tags}">
    </a>
    <div class="image-details">
      <p>Likes: ${image.likes}</p>
      <p>Views: ${image.views}</p>
      <p>Comments: ${image.comments}</p>
      <p>Downloads: ${image.downloads}</p>
    </div>
  `;
  return card;
}

function showNoResultsMessage() {
  iziToast.info({
    title: "No Results",
    message: "Sorry, there are no images matching your search query. Please try again!",
  });
}

function showErrorToast(message) {
  iziToast.error({
    title: "Error",
    message: message,
  });
}

function showEndMessage() {
  iziToast.info({
    title: "End of Collection",
    message: "We're sorry, but you've reached the end of search results.",
  });

  btnLoadMore.style.display = "none";
}

function initLightbox() {
  lightbox = new SimpleLightbox(".image-card a");
}

document.addEventListener("DOMContentLoaded", initLightbox);
