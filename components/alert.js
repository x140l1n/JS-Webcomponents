class Alert extends HTMLElement {
    constructor() {
        super();
                
        this.message = this.dataset.message;
        this.type = this.dataset.type ?? 'primary';
        this.timeout = this.dataset.timeoout ?? 3000;
    }

    connectedCallback() {
        this.innerHTML = this.render();  
        
        setTimeout(() => {
            this.remove();
        }, this.timeout);
    }

    render() {
        return `<div class="alert alert-${ this.type } alert-floating" role="alert">
                    ${ this.message }
                </div>`;
    }
}

window.customElements.define('x-alert', Alert);