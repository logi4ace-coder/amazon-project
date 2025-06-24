
let productGrid = document.querySelector('.products-grid');


products.forEach((value) => {
    let productContainer = document.createElement('div');
productContainer.className = 'product-container';

let productImageContainer = document.createElement('div');
productImageContainer.className = 'product-image-container';

let productImage = document.createElement('img');
productImage.className = 'product-image';

let productTitleDiv = document.createElement('div');
productTitleDiv.classList.add('product-name', 'limit-text-to-2-lines');

let productRatingContainer = document.createElement('div');
productRatingContainer.className = 'product-rating-container';

let productRatingImge = document.createElement('img');
productRatingImge.className = 'product-rating-stars';

let productRatingCountDiv = document.createElement('div');
productRatingCountDiv.classList.add('product-rating-count', 'link-primary');

let productPriceDiv = document.createElement('div');
productPriceDiv.className = 'product-price';

let productCoutConatiner = document.createElement('div');
productCoutConatiner.className = 'product-quantity-container';

let productCountSelect = document.createElement('select');
for (let i = 1; i <= 10; i++) {
    let option = document.createElement('option');
    option.textContent = i;
    option.value = i;
    if (i == 1) {
        option.selected = true;
    }
    productCountSelect.append(option);
}

let addedToCart = document.createElement('div');
addedToCart.className = 'added-to-cart';

let addedToCartImage = document.createElement('img');
//append Added after this image 
let addToCartButton = document.createElement('button');

addToCartButton.classList.add('add-to-cart-button', 'button-primary');
addToCartButton.textContent = 'Add to Cart';
    //console.log(value);
    productImage.src = value.image;
    productImageContainer.append(productImage);
    productContainer.append(productImageContainer);

    productTitleDiv.textContent = value.name;
    productContainer.append(productTitleDiv);

    let numStar = value.rating.stars * 10;
    if (numStar == 5) {
        numStar = '0' + numStar;
    }
    productRatingImge.src = `images/ratings/rating-${numStar}.png`;
    productRatingCountDiv.textContent = '('+value.rating.count+')';
    productRatingContainer.append(productRatingImge);
    productRatingContainer.append(productRatingCountDiv);
    productContainer.append(productRatingContainer);

    let price = (Number((value.priceCents / 100)*17.72).toFixed(2));
    productPriceDiv.textContent = 'R'+(price);
    productContainer.append(productPriceDiv);

    productCoutConatiner.append(productCountSelect);
    productContainer.append(productCoutConatiner);

    addedToCartImage.src = 'images/icons/checkmark.png';
    addedToCart.append(addedToCartImage);
    addedToCart.append(addedToCart.textContent='Added');
    addedToCart.style.display='none';
    productContainer.append(addedToCart);

    productContainer.append(addToCartButton);
    productGrid.append(productContainer);

})
