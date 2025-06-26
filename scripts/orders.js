
function quanityCount() {
    let getLSCart = (localStorage.getItem('cart'));// array of objects

    let quanityCount = document.querySelector('.cart-quantity');

    if (getLSCart == null || getLSCart == 'null' || JSON.parse(getLSCart).length == 0) {
        quanityCount.textContent = 0;

    }
    else {
        let parsedgetLSCart = JSON.parse(getLSCart);
        let cartQuant = 0;
        parsedgetLSCart.forEach((value) => {
            cartQuant += value.quantity;
        });
        quanityCount.textContent = cartQuant;

    }
}
quanityCount();
fillOrders();
function fillOrders() {
    let orderFromLS = localStorage.getItem('orders');
    let orderFromLSParsed = JSON.parse(orderFromLS);
    let gidContainer = document.querySelector('.orders-grid');
    if (orderFromLS == null || orderFromLSParsed.length === 0) {
        gidContainer.textContent = '';
        let svg = `
          <div style="display: flex; justify-content: center; align-items: center; height: 100%; min-height: 300px; flex-direction: column; text-align: center;">
<svg width="360" height="100" viewBox="0 0 360 100" xmlns="http://www.w3.org/2000/svg">
                    <rect class="bg" x="5" y="5" width="350" height="90" rx="12" ry="12"/>
                    <g transform="translate(20,25)">
                        <polyline class="icon" points="5,5 10,30 30,30 35,10 15,10"/>
                        <circle class="icon" cx="12" cy="35" r="3"/>
                        <circle class="icon" cx="28" cy="35" r="3"/>
                            <line class="cross" x1="15" y1="15" x2="25" y2="25"/>
                        <line class="cross" x1="25" y1="15" x2="15" y2="25"/>
                    </g>
                    <text class="text" x="80" y="50">No Orders Placed Yet</text>
                    <line class="underline" x1="80" y1="60" x2="260" y2="60"/>
                    </svg>
                      <a href="amazon.html" style="margin-top: 20px; font-size: 18px; text-decoration: none; color: #FF9900; font-family: Arial, sans-serif;">
      Start Shopping
    </a>
      </div>
`

        gidContainer.innerHTML = svg;
    }
    else {
        // console.log(products);
        console.log('orderFromLSParsed length ', orderFromLSParsed.length);

        orderFromLSParsed.forEach((value) => {

            let orderDate = new Date(value.orderTimeMS);
            let formattedDate = orderDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric'
            });
            let orderPrice = (Number((value.totalCostCents / 100) * 17.72).toFixed(2));
            let orderId = value.id;
            // prepend this <div class="order-container"> ansd append </div>
            let orderHtml = ` 
                <div class="order-container">
                    <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${formattedDate}</div>
                        </div>
                        <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>R${orderPrice}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${orderId}</div>
                    </div>
                    </div>

                    <div class="order-details-grid">`;

            value.products.forEach((product) => {
                let arrivingOn = new Date(product.estimatedDeliveryTimeMs).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
                });
                const actualProduct = products.find((fromData) => fromData.id == product.productId);

                orderHtml += `

                    <div class="product-row"> 
                        <div class="product-image-container">
                        <img src="${actualProduct.image}">
                    </div>

                    <div class="product-details">
                        <div class="product-name">${actualProduct.name}</div>
                        <div class="product-delivery-date">Arriving on: ${arrivingOn}</div>
                        <div class="product-quantity">Quantity: ${product.quantity}</div>
                        <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>

                    <div class="product-actions">
                        <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                        </a>
                    </div>
                    </div>`;
            });

            orderHtml += `</div> </div>`;

            gidContainer.insertAdjacentHTML('beforeend', orderHtml);
        });

        document.querySelectorAll('.buy-again-button').forEach((button) => {
            button.addEventListener('click', function () {
              const orderContainer = this.closest('.order-container');
              const productRow = this.closest('.product-row');
          
              const orderID = orderContainer.querySelector('.order-header-right-section .order-header-label').nextElementSibling.textContent.trim();
              const repeatedOrder = orderFromLSParsed.find(order => order.id === orderID);
          
              const productName = productRow.querySelector('.product-name').textContent.trim();
              const matchedProduct = products.find(p => p.name === productName);
          
              if (!matchedProduct) {
                console.warn('Product not found in products list.');
                return;
              }
              console.log(matchedProduct);
              const productInOrder = repeatedOrder.products.find(p => p.productId === matchedProduct.id);
              if (!productInOrder) {
                console.warn('Product not found in order.');
                return;
              }
          
              const quantity = productInOrder.quantity;
              const deliveryDate = new Date(productInOrder.estimatedDeliveryTimeMs);
              const deliveryDay = deliveryDate.getDate();
          
              addProductToCart(this, matchedProduct.id, deliveryDay, quantity);
            });
          });
          

    }


}
// add to cart gaain
function addProductToCart(element, productId, deliveryOptionId, quantity) {
    const cartLS = localStorage.getItem('cart');
    let cart = cartLS ? JSON.parse(cartLS) : [];
  
    const existingIndex = cart.findIndex(item => item.productId === productId);
  
    if (existingIndex !== -1) {
      const existingItem = cart[existingIndex];
      existingItem.quantity += Number(quantity);
    }
    else {
      cart.push({ id: uniqueID(), productId, deliveryOptionId, quantity: Number(quantity)});
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    quanityCount();
  }
  
function uniqueID() {
    return crypto.randomUUID();
}