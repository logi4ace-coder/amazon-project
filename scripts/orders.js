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

function fillOrders(){

}