class Navbar extends HTMLElement {
    constructor() {
        super();
                
        this.title = this.dataset.title;
        this.logo = this.dataset.logo;
    }

    connectedCallback() {
        this.innerHTML = this.render();    
    }

    render() {
        return `<nav class="navbar navbar-expand-md navbar-dark sticky-top bg-primary px-3">
            <div class="container-fluid">
                <a class="navbar-brand fs-3 order-1 order-md-1" href="./index.html">
                    ${this.title}                
                    <img src="${this.logo}" width="40"/>
                </a>
                <div class="collapse navbar-collapse order-3 order-md-2" id="navbarMain">
                </div>
                <div class="order-2 order-md-3">
                    <x-cart></x-cart>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain"
                        aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </nav>`;
    }
}

window.customElements.define('x-navbar', Navbar);