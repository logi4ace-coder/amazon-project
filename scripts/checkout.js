
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
  console.log(getLSCart);
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
    let quanityCount = 0;

    checkoutGrid.innerHTML = '';
    let parsedgetLSCart = JSON.parse(getLSCart);
    let rpod;
    const count = parsedgetLSCart.length;
    let totalprice = 0;
    parsedgetLSCart.forEach((product) => {
      //console.log(product)
      const objectArray = products.filter(value => {
        if (value.id == product.productId) {
          quanityCount += (product.quantity);
          return true;
        }

      });
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
      let productTotal = ((rpod.priceCents / 100) * 17.72) * product.quantity;
      totalprice += parseFloat(productTotal.toFixed(2));
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
                  <input hidden class="js-new-quantity-input new-quantity-input" type="number"  data-testid="new-quantity-input">
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
    //  console.log(totalprice);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const P13ship = 177.25;
    const P15ship = 88.54;
    //const shippingDisplay = document.querySelector('.payment-summary-money1');
    //let baseAmount = Number(shippingDisplay.textContent.substring(1));


    let shippingAAMOUNT = 0;
    cart.forEach(function (productInCart) {
      if (productInCart.deliveryOptionId == 15) {
        shippingAAMOUNT += P15ship;

      }
      else if (productInCart.deliveryOptionId == 13) {
        shippingAAMOUNT += P13ship;

      }
      else {
        shippingAAMOUNT += 0;
      }

    });
    console.log('i am',quanityCount);
    if(String(quanityCount)[0]=='0'){
        quanityCount= String(quanityCount).substring(1);
    }
    cartQuant.textContent = `${quanityCount} item${count !== 1 ? 's' : ''}`;

    const taxRate = 0.1;
    const subtotal = Number(totalprice) + Number(shippingAAMOUNT);
    const totalWithTax = subtotal * (1 + taxRate);

    let html2 = `<div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quanityCount}):</div>
            <div class="payment-summary-money">R${Number(totalprice).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money1">R${(shippingAAMOUNT).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money2">
            R${(Number(totalprice) + Number(shippingAAMOUNT)).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money3">R${Number((totalprice + shippingAAMOUNT) * 0.1).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money4">  R${Number(totalWithTax).toFixed(2)}
</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`;
    real.innerHTML = html2 + html;

    let deliveryOpt = document.querySelectorAll('.delivery-option-input');
    displayPop();
    updateCart();
    console.log(deliveryOpt);

    deliveryOpt.forEach(option => {

      option.addEventListener('click', function () {

        const container = this.closest('.cart-item-container');
        const deliveryDate = this.nextElementSibling?.querySelector('.delivery-option-date')?.textContent.trim();
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
        const P13ship = 177.25;
        const P15ship = 88.54;
        const shippingDisplay = document.querySelector('.payment-summary-money1');
        let baseAmount = Number(shippingDisplay.textContent.substring(1));
        let totalBeforeTax = document.querySelector('.payment-summary-money2');
        let tax = document.querySelector('.payment-summary-money3');
        let total = document.querySelector('.payment-summary-money4');
        if (!container || !deliveryDate) return;
        let shippingAAMOUNT = 0;
        cart.forEach(function (productInCart) {
          if (productInCart.deliveryOptionId == 15) {
            shippingAAMOUNT += P15ship;

          }
          else if (productInCart.deliveryOptionId == 13) {
            shippingAAMOUNT += P13ship;

          }
          else {
            shippingAAMOUNT += 0;
          }
        });
        const taxRate = 0.1;
        const subtotal = Number(totalprice) + Number(shippingAAMOUNT);
        const totalWithTax = subtotal * (1 + taxRate);
        total.textContent = 'R' + totalWithTax.toFixed(2);
        shippingDisplay.textContent = 'R' + (shippingAAMOUNT).toFixed(2);
        tax.textContent = 'R' + Number((totalprice + shippingAAMOUNT) * 0.1).toFixed(2);
        totalBeforeTax.textContent = 'R' + ((Number(totalprice) + Number(shippingAAMOUNT)).toFixed(2));
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
function displayPop() {
  let deleteCartr = document.querySelectorAll('.delete-quantity-link');
  deleteCartr.forEach((value) => {
    value.addEventListener('click', function (event) {
      event.preventDefault();
      let closeOuter = this.closest('.cart-item-container');
      console.log(closeOuter);

      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'rgba(0, 0, 0, 0.5)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '1000';

      const popupBox = document.createElement('div');
      popupBox.style.background = '#fff';
      popupBox.style.padding = '20px 30px';
      popupBox.style.borderRadius = '8px';
      popupBox.style.textAlign = 'center';
      popupBox.style.border = '1px solid rgb(255, 216, 20)'
      popupBox.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';

      const message = document.createElement('p');
      message.textContent = 'Are you sure you want to delete this item from your cart?';

      const yesBtn = document.createElement('button');
      yesBtn.textContent = 'Yes, delete';
      yesBtn.style.margin = '10px';
      yesBtn.style.padding = '10px 20px';
      yesBtn.style.backgroundColor = '#d33';
      yesBtn.style.color = 'white';
      yesBtn.style.border = 'none';
      yesBtn.style.fontWeight = '600';

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.style.margin = '10px';
      cancelBtn.style.padding = '10px 20px';
      cancelBtn.style.backgroundColor = '#e6e6e6';
      cancelBtn.style.color = '#333';
      cancelBtn.style.border = 'none';
      cancelBtn.style.fontWeight = '600';

      popupBox.appendChild(message);
      popupBox.appendChild(yesBtn);
      popupBox.appendChild(cancelBtn);
      overlay.appendChild(popupBox);
      document.body.appendChild(overlay);

      yesBtn.addEventListener('click', function () {
        //console.log("Item deleted.");
        let ls = JSON.parse(localStorage.getItem('cart'))
        let name = closeOuter.querySelector('.product-name').textContent.trim();
        const availableProduct = products.filter((value) => {
          if (value.name == name) {
            return true;
          }
        });
        console.log(availableProduct);
        let productToDelete = availableProduct[0];
        let id = productToDelete.id;
        const index = ls.findIndex(value => value.productId === id);

        ls.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(ls));
        displayCart();

        document.body.removeChild(overlay);
      });

      cancelBtn.addEventListener('click', () => {
        //console.log("Deletion canceled.");
        document.body.removeChild(overlay);
      });
    });
  })


}

function updateCart() {
  let updateCart = document.querySelectorAll('.update-quantity-link');
  updateCart.forEach((value) => {
    value.addEventListener('click', function (event) {
      //console.log(this.textContent);
      if(this.textContent.trim()== 'Update'){
        let input = document.createElement('input');
        input.type = 'number';
  
        let cloaseWrapper = this.closest('.cart-item-container');
        let currentSize = cloaseWrapper.querySelector('.product-quantity span').textContent;
  
        let amount = Number(currentSize[currentSize.indexOf('1')]);
        console.log(amount);
        cloaseWrapper.querySelector('.product-quantity span').textContent = 'Quantity: ';
        let div = document.querySelector('.product-quantity');
        div.classList.add('is-updating-quantity');
        let pcc = document.querySelector('.product-quantity input');
        pcc.hidden = false;
        pcc.value = amount;
        value.textContent = 'Save';
      }
      else{
        let parsedgetLSCart = JSON.parse((localStorage.getItem('cart')));
        let index=-1;
        let cloaseWrapper = this.closest('.cart-item-container');
      let name = cloaseWrapper.querySelector('.product-name').textContent;
        let exists = parsedgetLSCart.some((item) => {
          index++;
          return item.name === name;
      });
      
      let neewAmount = cloaseWrapper.querySelector('.js-new-quantity-input').value;
      if(neewAmount==0){
        let deleteCartr = cloaseWrapper.querySelector('.delete-quantity-link');
        deleteCartr.click();
      }
      else{
        parsedgetLSCart[index] = { id: parsedgetLSCart[index].id, productId: parsedgetLSCart[index].productId, deliveryOptionId: parsedgetLSCart[index].deliveryOptionId, quantity: neewAmount }
        localStorage.setItem('cart', JSON.stringify(parsedgetLSCart));
        displayCart();
      }
      }
       
      
    

    })
  });
}
const input = document.querySelector('input[type="number"]');
input.addEventListener('input', (event) => {
  console.log('New value:', event.target.value);
  if(event.target.value<0){
    input.value=1;
  }
});
