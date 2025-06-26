document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
  
    if (['page1', 'page2'].includes(page)) {
      quantityCount();
    }
  
    if (page === 'page1') {
      fillOrders();
    }
  
    if (page === 'page2') {
      const trackingData = JSON.parse(sessionStorage.getItem('trackInfo') || 'null');
      if (trackingData) {
        renderTrackingInfo(trackingData.orderId, trackingData.productId);
      } else {
        const trackingGrid = document.querySelector('.order-tracking');
        if (trackingGrid) {
          trackingGrid.innerHTML = `<p>No tracking info found. <a href="orders.html">Return to orders</a></p>`;
        }
      }
    }
  
    document.body.addEventListener('click', (e) => {
      const buyAgainBtn = e.target.closest('.buy-again-button');
      if (buyAgainBtn) return handleBuyAgain(buyAgainBtn);
  
      const trackBtn = e.target.closest('.track-package-button');
      if (trackBtn) return handleTrackPackage(trackBtn);
    });
  });
  
  function quantityCount() {
    const cartQuantityEl = document.querySelector('.cart-quantity');
    if (!cartQuantityEl) return;
  
    const cartLS = localStorage.getItem('cart');
    if (!cartLS || cartLS === 'null') {
      cartQuantityEl.textContent = 0;
      return;
    }
  
    const cart = JSON.parse(cartLS);
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartQuantityEl.textContent = total || 0;
  }
  
  function fillOrders() {
    const ordersGrid = document.querySelector('.orders-grid');
    if (!ordersGrid) return;
  
    const ordersLS = localStorage.getItem('orders');
    const parsedOrders = ordersLS ? JSON.parse(ordersLS) : [];
  
    if (!parsedOrders.length) {
      ordersGrid.innerHTML = getNoOrdersHTML();
      return;
    }
  
    ordersGrid.innerHTML = '';
    parsedOrders.forEach(order => {
      ordersGrid.insertAdjacentHTML('afterbegin', renderOrderHTML(order));
    });
  }
  
  function renderOrderHTML(order) {
    const date = new Date(order.orderTimeMS).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const totalPrice = (order.totalCostCents / 100 * 17.72).toFixed(2);
  
    let html = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${date}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>R${totalPrice}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">`;
  
    order.products.forEach(p => {
      const arriving = new Date(p.estimatedDeliveryTimeMs).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      const productData = products.find(prod => prod.id === p.productId);
      if (!productData) return;
  
      html += `
        <div class="product-row">
          <div class="product-image-container">
            <img src="${productData.image}">
          </div>
          <div class="product-details">
            <div class="product-name">${productData.name}</div>
            <div class="product-delivery-date">Arriving on: ${arriving}</div>
            <div class="product-quantity">Quantity: ${p.quantity}</div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
          <div class="product-actions">
            <button class="track-package-button button-secondary">Track package</button>
          </div>
        </div>`;
    });
  
    html += `</div></div>`;
    return html;
  }
  
  function getNoOrdersHTML() {
    return `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; min-height: 300px; flex-direction: column; text-align: center;">
        <p>No Orders Placed Yet</p>
        <a href="amazon.html" style="margin-top: 20px; font-size: 18px; text-decoration: none; color: #FF9900;">Start Shopping</a>
      </div>`;
  }
  
  function handleBuyAgain(button) {
    const container = button.closest('.order-container');
    const row = button.closest('.product-row');
  
    const orderId = container.querySelector('.order-header-right-section div:last-child').textContent.trim();
    const order = JSON.parse(localStorage.getItem('orders')).find(o => o.id === orderId);
  
    const productName = row.querySelector('.product-name').textContent.trim();
    const product = products.find(p => p.name === productName);
    if (!product) return;
  
    const productInOrder = order.products.find(p => p.productId === product.id);
    if (!productInOrder) return;
  
    const deliveryDate = new Date(productInOrder.estimatedDeliveryTimeMs).getDate();
    addProductToCart(button, product.id, deliveryDate, productInOrder.quantity);
  }
  
  function handleTrackPackage(button) {
    const container = button.closest('.order-container');
    const row = button.closest('.product-row');
  
    const orderId = container.querySelector('.order-header-right-section div:last-child').textContent.trim();
    const order = JSON.parse(localStorage.getItem('orders')).find(o => o.id === orderId);
  
    const productName = row.querySelector('.product-name').textContent.trim();
    const product = products.find(p => p.name === productName);
    if (!product) return;
  
    sessionStorage.setItem('trackInfo', JSON.stringify({
      orderId,
      productId: product.id
    }));
  
    window.location.href = 'tracking.html';
  }
  
  function renderTrackingInfo(orderId, productId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);
    const productInOrder = order?.products.find(p => p.productId === productId);
    const product = products.find(p => p.id === productId);
    const trackingGrid = document.querySelector('.order-tracking');
    if (!order || !productInOrder || !product || !trackingGrid) return;
  
    const deliveryDate = new Date(productInOrder.estimatedDeliveryTimeMs).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric'
    });
  
    trackingGrid.innerHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
      <div class="delivery-date">Arriving on ${deliveryDate}</div>
      <div class="product-info">${product.name}</div>
      <div class="product-info">Quantity: ${productInOrder.quantity}</div>
      <img class="product-image" src="${product.image}">
      <div class="progress-labels-container">
        <div class="progress-label">Preparing</div>
        <div class="progress-label current-status">Shipped</div>
        <div class="progress-label">Delivered</div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>`;
  }
  
  function addProductToCart(_, productId, deliveryOptionId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.productId === productId);
  
    if (index !== -1) {
      cart[index].quantity += Number(quantity);
    } else {
      cart.push({ id: uniqueID(), productId, deliveryOptionId, quantity: Number(quantity) });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    quantityCount();
  }
  
  function uniqueID() {
    return crypto.randomUUID();
  }
  