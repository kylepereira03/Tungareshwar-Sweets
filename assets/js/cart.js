document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function addToCart(productId, productName, productPrice, productUnit) {
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, unit: productUnit, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${productName} added to cart.`);
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const card = this.closest('.card');
            const productId = card.getAttribute('data-product-id');
            const productName = card.querySelector('h4').textContent;
            const productPrice = parseFloat(card.querySelector('p').textContent.replace('₹', ''));
            const productUnit = card.querySelector('.unit').textContent;

            addToCart(productId, productName, productPrice, productUnit);
        });
    });

    updateCartCount();
});