class Cart extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.render();

        this.querySelector('[data-bs-toggle="popover"]').addEventListener('click', () => {
            this.showPopoverCart();
        });

        document.body.addEventListener('click', (e) => {
            if (!e.target.closest('[data-bs-toggle="popover"]')) {
                if (this.popoverCart !== undefined) {
                    this.popoverCart.dispose();
                    this.popoverCart = undefined;
                }
            }
        });
    }

    showPopoverCart() {
        if (this.popoverCart === undefined) {
            this.popoverCart = new bootstrap.Popover(this.querySelector('[data-bs-toggle="popover"]'),
                {
                    html: true,
                    template: '<div class="popover me-5" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header bg-primary text-light"></h3><div class="popover-body"></div></div>',
                    title: 'My cart',
                    content: this.renderListCart()
                });

            this.querySelector('[data-bs-toggle="popover"]').addEventListener('inserted.bs.popover', () => {
                document.querySelector('#clean-cart')?.addEventListener('click', () => {
                    localStorage.removeItem('cart');
    
                    document.querySelector('#cart-items-count').innerText = 0;
    
                    this.popoverCart.dispose();
                    this.popoverCart = undefined;    
                });
            });

            this.popoverCart.show();
        } else {
            this.popoverCart.dispose();
            this.popoverCart = undefined;
        }
    }

    render() {
        return `<button type="button" class="btn btn-primary position-relative me-4" data-bs-toggle="popover">
                <i class="fas fa-shopping-cart"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    <span id="cart-items-count">${this.getCartCount()}</span>
                </span>
            </button>`;
    }

    getCartCount() {
        return (JSON.parse(localStorage.getItem("cart")) ?? []).length;
    }

    renderListCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

        const cartGroupBy = cart.reduce((group, product) => {
            let productFound = group.find(_product => _product.id === product.id);

            if (!productFound) {
                product.quantity = 1;
                group.push(product);
            } else {
                productFound.quantity++;
            }

            return group;
        }, []);

        if (cartGroupBy.length > 0) {
            return `<ul class="list-group list-cart">
                        ${cartGroupBy.map((product) => {
                            return `<li class="list-group-item d-flex align-items-center">
                            <div class="list-cart-img-parent me-2">
                                <img src="${product.img}" />
                            </div>
                            <span class="me-2">${product.title}</span>
                            <span class="me-2 flex-grow-1 text-end fw-bold">x${product.quantity}</span>
                            </li>`;
                        }).join('')}
                    </ul>
                    <span class="btn btn-primary mt-3 w-100" id="clean-cart">Clean cart</span>
                    `;   
        } else {
            return `<span>There are no products in the cart.</span>`;
        }
    }
}

window.customElements.define('x-cart', Cart);