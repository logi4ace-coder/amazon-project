
let checkoutGrid = document.querySelector('.order-summary');
let emptySVG = `
  <div style="display: flex; justify-content: center; align-items: center; height: 100%; min-height: 300px; flex-direction: column; text-align: center;">
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="250" viewBox="0 0 100 150">
      <g transform="translate(25, 20) scale(2)">
        <path d="M3 4h2l.4 2M7 13h10l4-8H5.4"
              stroke="#555" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
              fill="none"></path>
        <circle cx="7" cy="20" r="2" fill="#555"></circle>
        <circle cx="17" cy="20" r="2" fill="#555"></circle>
      </g>

      <text x="50%" y="140" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial, sans-serif" font-size="20" font-weight="bold"
            fill="#FF9900">
        Your Cart is empty!
      </text>
    </svg>

    <a href="amazon.html" style="margin-top: 20px; font-size: 18px; text-decoration: none; color: #007BFF; font-family: Arial, sans-serif;">
      Start Shopping
    </a>
  </div>
`;
let real = document.querySelector('.checkout-grid');

function displayCart() {

    let getLSCart = (localStorage.getItem('cart'));// array of objects
    let html = '';
    let cartQuant = document.querySelector('.return-to-home-link');

    if (getLSCart == null || getLSCart == 'null' || JSON.parse(getLSCart).length == 0) {
        let div = document.createElement('div');
        div.innerHTML = emptySVG;
        document.querySelector('.checkout-grid').innerHTML = '';
        document.querySelector('.checkout-grid').append(div);
        cartQuant.textContent = "0 items";
    }
    else {
        let text21 = 'Delivery date: Tuesday, June 21';
        let text15 = 'Delivery date: Wednesday, June 15';
        let text13 = 'Delivery date: Monday, June 13';

        checkoutGrid.innerHTML = '';
        let parsedgetLSCart = JSON.parse(getLSCart);
        let rpod;
        const count = parsedgetLSCart.length;
        cartQuant.textContent = `${count} item${count !== 1 ? 's' : ''}`;
        let totalprice = 0;
        parsedgetLSCart.forEach((product) => {
            //console.log(product)
            const objectArray = products.filter(value => value.id == product.productId);
            //console.log(objectArray);
            rpod = objectArray[0];
            let deliveryText;

            if (product.deliveryOptionId == 21) {
                deliveryText = 'Delivery date: Tuesday, June 21';
            } else if (product.deliveryOptionId == 15) {
                deliveryText = 'Delivery date: Wednesday, June 15';
            } else if (product.deliveryOptionId == 13) {
                deliveryText = 'Delivery date: Monday, June 13';
            }
            totalprice += parseFloat(((rpod.priceCents / 100) * 17.72).toFixed(2));
            let hml = `<div class="cart-item-container">
            <div class="delivery-date">
             ${deliveryText}
            </div>
        
            <div class="cart-item-details-grid">
              <img class="product-image"
                src= ${rpod.image}>
        
              <div class="cart-item-details">
                <div class="product-name">
                  ${rpod.name}
                </div>
                <div class="product-price">
                  R${(Number((rpod.priceCents / 100) * 17.72).toFixed(2))}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${product.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>
        
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" ${(deliveryText == text21) ? 'checked' : " "}
                    class="delivery-option-input"
                    name="delivery-option-${rpod.id}" id="21">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" ${(deliveryText == text15) ? 'checked' : " "}
                    class="delivery-option-input"
      name="delivery-option-${rpod.id}" id="15">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      R88,54 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" ${(deliveryText == text13) ? 'checked' : " "}
                    class="delivery-option-input"
      name="delivery-option-${rpod.id}" id='13'>
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      R177,25 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

            html += hml;

        });
        //console.log(totalprice);




        let html2 = `<div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${count}):</div>
            <div class="payment-summary-money">R${Number(totalprice).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money1">R${0}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">R${Number(totalprice).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">R${Number(totalprice * 0.1).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">  R${(Number(totalprice) + Number(totalprice) * 0.1).toFixed(2)}
</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`;
        real.innerHTML = html2 + html;

        let deliveryOpt = document.querySelectorAll('.delivery-option-input');

        console.log(deliveryOpt);

        deliveryOpt.forEach(option => {

            option.addEventListener('click', function () {
                const P13ship = 177.25;
                const P15ship = 88.54;
                const shippingDisplay = document.querySelector('.payment-summary-money1');
                let baseAmount = Number(shippingDisplay.textContent.substring(1));
                const container = this.closest('.cart-item-container');
                const deliveryDate = this.nextElementSibling?.querySelector('.delivery-option-date')?.textContent.trim();

                if (!container || !deliveryDate) return;

                let extra = 0;
                if (deliveryDate === 'Wednesday, June 15') {
                    extra = P15ship;
                } else if (deliveryDate === 'Monday, June 13') {
                    extra = P13ship;
                }

                shippingDisplay.textContent = 'R' + (baseAmount + extra).toFixed(2);

                const deliveryDateElem = container.querySelector('.delivery-date');
                if (deliveryDateElem) {
                    deliveryDateElem.textContent = `Delivery date: ${deliveryDate}`;
                }

                const name = container.querySelector('.product-name')?.textContent.trim();
                const product = products.find(p => p.name === name);
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const itemIndex = cart.findIndex(item => item.productId === product?.id);
                if (itemIndex !== -1) {
                    cart[itemIndex].deliveryOptionId = Number(this.id);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            });
        });


    }

}

displayCart();

let placeOrders = document.querySelector('.place-order-button');
placeOrders.addEventListener('click', function () {
    placeOrder();
    window.location = 'orders.html';
})

function placeOrder() {

}

