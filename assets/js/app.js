const init = () => {
    document.querySelector('#root').innerHTML =
        `
        <x-navbar data-title="PETSHOP" data-logo="./assets/img/logo.png"></x-navbar>
        <main class="container-fluid p-5">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4" id="products">
            </div>
        </main>
    `;

    fetch("./data/products.json").then(response => {
        return response.json();
    })
        .then(data => {
            document.querySelector('#products').innerHTML = `
            ${data.map((product) => `<div class="col"><x-card-product  data-id="${product.id}"
                                                                        data-brand="${product.brand}" 
                                                                        data-title="${product.title}" 
                                                                        data-img="${product.img}" 
                                                                        data-price="${product.price}"></x-card-product></div>`).join('')
            }`;
        });
};

document.addEventListener('DOMContentLoaded', init);