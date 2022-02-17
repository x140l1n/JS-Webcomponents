class CardProduct extends HTMLElement {
    constructor() {
        super();

        this.id = this.dataset.id;
        this.brand = this.dataset.brand;
        this.img = this.dataset.img;
        this.title = this.dataset.title;
        this.price = this.dataset.price;
    }

    connectedCallback() {
        this.innerHTML = this.render();

        this.querySelector(".add-cart").addEventListener('click', (e) => {
            let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

            cart.push({
                id: this.id,
                brand: this.brand,
                img: this.img,
                title: this.title,
                price: this.price
            });

            document.querySelector('#cart-items-count').innerText = cart.length;

            localStorage.setItem('cart', JSON.stringify(cart));

            document.querySelector("#root").innerHTML += "<x-alert data-message='Product added'></x-alert>"; 
        });
    }

    render() {
        return `<div class="card h-100">
                    <div style="height: 200px; 
                                background-image: url('${this.img}'); 
                                background-repeat: no-repeat;
                                background-size: 200px auto;
                                background-position: center"
                        class="border-bottom">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${this.brand + " - " + this.title}</h5>
                        <p class="card-text text-secondary fs-4">${this.price} €</p>
                        <button class="btn btn-primary w-100 mt-auto add-cart" data-id>Add cart</button>
                    </div>
                </div>`;
    }
}

window.customElements.define('x-card-product', CardProduct);