'use strict';



/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}




/**
 * header & go top btn active on page scroll
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/** cart & Wishlist */

function addToCart(button) {
  const name = button.getAttribute('data-name');
  const price = button.getAttribute('data-price');
  const image = button.getAttribute('data-image');
  const quantity = parseInt(button.getAttribute('data-quantity')) || 1;

  const newItem = { name, price, image, quantity };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity; 
  } else {
    cart.push(newItem); 
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity;
    cartCountElement.setAttribute('value', totalQuantity);

    cartCountElement.classList.add('bounce');
    setTimeout(() => cartCountElement.classList.remove('bounce'), 300);
  }
}

document.addEventListener('DOMContentLoaded', updateCartCount);

/** Wishlist */

function addToWishlist(button) {
  const productName = button.getAttribute('data-name');
  const productPrice = button.getAttribute('data-price');
  const productImage = button.getAttribute('data-image');
  const productQuantity = button.getAttribute('data-quantity');

  const product = {
    name: productName,
    price: productPrice,
    image: productImage,
    quantity: productQuantity
  };

  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  wishlist.push(product);

  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  alert(`${productName} added to wishlist!`); 
  updateWishlistCount();
}

function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const count = wishlist.length;

  const wishlistCountEl = document.getElementById('wishlist-count');
  if (wishlistCountEl) {
    wishlistCountEl.textContent = count;
    wishlistCountEl.setAttribute('value', count);
 
    wishlistCountEl.classList.add('bounce');
    setTimeout(() => wishlistCountEl.classList.remove('bounce'), 300);
  }
}

document.addEventListener('DOMContentLoaded', updateWishlistCount);


