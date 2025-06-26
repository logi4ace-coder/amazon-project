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
        orderFromLSParsed.forEach((value)){

            let orderDate = value.orderTimeMS.toISOString.split('T')[0];
            let orderHtml = ` <div class="order-container">
          
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>August 12</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$35.06</div>
                </div>
              </div>
  
              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
              </div>
            </div>
  
            <div class="order-details-grid">
              <div class="product-image-container">
                <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
              </div>
  
              <div class="product-details">
                <div class="product-name">
                  Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>
                <div class="product-delivery-date">
                  Arriving on: August 15
                </div>
                <div class="product-quantity">
                  Quantity: 1
                </div>
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
  
              <div class="product-image-container">
                <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
              </div>
  
              <div class="product-details">
                <div class="product-name">
                  Adults Plain Cotton T-Shirt - 2 Pack
                </div>
                <div class="product-delivery-date">
                  Arriving on: August 19
                </div>
                <div class="product-quantity">
                  Quantity: 2
                </div>
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
            </div>
          </div`
        }
    }


}