
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
    productRatingCountDiv.textContent = '(' + value.rating.count + ')';
    productRatingContainer.append(productRatingImge);
    productRatingContainer.append(productRatingCountDiv);
    productContainer.append(productRatingContainer);

    let price = (Number((value.priceCents / 100) * 17.72).toFixed(2));
    productPriceDiv.textContent = 'R' + (price);
    productContainer.append(productPriceDiv);

    productCoutConatiner.append(productCountSelect);
    productContainer.append(productCoutConatiner);

    addedToCartImage.src = 'images/icons/checkmark.png';

    addedToCart.textContent = 'Added';
    
    addedToCart.prepend(addedToCartImage);

    addedToCart.style.display = 'none';
    productContainer.append(addedToCart);

    addToCartButton.addEventListener('click', function () {
        addedToCart.style.display = 'block';

        addedToCart.classList.add('is-visible');
        addToCartButton.disabled=true;
        addToCartButton
        setTimeout(() => {
            
            addedToCart.style.display = 'none';
            addToCartButton.disabled=false;

        }, 1000);
        addProductToCart(this, value.id);
    });
    productContainer.append(addToCartButton);
    productGrid.append(productContainer);

})
function addProductToCart(element, productId) {
    //console.log(element);
    let getLSCart = (localStorage.getItem('cart'));// array of objects
    let closest = element.previousElementSibling.previousElementSibling;

    // console.log(closest);
    let cart = [];
    let amount = closest.querySelector('select').value;
    console.log(amount);

    if (getLSCart == null || getLSCart == 'null' || JSON.parse(getLSCart).length == 0) {
        cart.push({ id: uniqueID(), productId: productId, deliveryOptionId: 21, quantity: Number(amount) });
        // console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart));

    }
    else {
        let parsedgetLSCart = JSON.parse(getLSCart);
        let index = -1;
        let exists = parsedgetLSCart.some((item) => {
            index++;
            console.log('item productid:', item.productId, 'productId:', productId);
            return item.productId === productId;
        });
        console.log(';index', index);
        console.log(exists);
        if (exists == true) {
            parsedgetLSCart[index] = { id: parsedgetLSCart[index].id, productId: productId, deliveryOptionId: parsedgetLSCart[index].deliveryOptionId, quantity: Number((Number(amount) + Number((parsedgetLSCart.find((item) => item.productId == productId).quantity)))) }

        }
        else {
            parsedgetLSCart.push({ id: uniqueID(), productId: productId, deliveryOptionId: 21, quantity: Number(amount) });

        }

        //console.log(cart);
        localStorage.setItem('cart', JSON.stringify(parsedgetLSCart));

    }
    closest.querySelector('select').value=1;
    quanityCount();

}
function uniqueID() {
    return crypto.randomUUID();
}

function quanityCount() {
    let getLSCart = (localStorage.getItem('cart'));// array of objects

    let quanityCount = document.querySelector('.cart-quantity');

    if (getLSCart == null || getLSCart == 'null' || JSON.parse(getLSCart).length == 0) {
        quanityCount.textContent = 0;

    }
    else {
        let parsedgetLSCart = JSON.parse(getLSCart);
        let cartQuant=0;
        parsedgetLSCart.forEach((value)=>{
            cartQuant+=value.quantity;
        });
        quanityCount.textContent = cartQuant;

    }
}
quanityCount();
/*
1
: 
{id: "257987ca-1005-4be7-839e-9c7658175626", productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",…}
deliveryOptionId: "6e2dd65a-6665-4f24-bcdc-f2ecdbc6e156"
id: "257987ca-1005-4be7-839e-9c7658175626"
productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d"
quantity: 8 */