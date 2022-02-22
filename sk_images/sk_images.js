class SkImages extends HTMLElement {
    constructor() {
        super();
        this.images;
        this.loadingImage;
        this.count = 5;
        this._tooltipText = 'Some dummy tooltip text.';

        this.attachShadow({
                mode: 'open'
            }

        );

        this.shadowRoot.innerHTML = ` <style> :host {
            width: 100%;
            text-align: center;
            display: inline-block;
        }
        #loadingImage{margin:0 auto;text-align:center}
        ul {
            margin: 0;
            padding: 20px 0 80px 0;
        }

        li {
            text-align: center;
            display: inline-block;
            list-style: none;
            position: relative;
            border: solid 12px #fff;
            background: #fff;
            box-shadow: 0 0 15px 0px #555;
            transition: all 1s ease;
            -o-transition: all 1s ease;
            -moz-transition: all 1s ease;
            -webkit-transition: all 1s ease;
            top: 50px;
        }

        li:hover {
            top: 0px;
            opacity: 0.5;
        }

        li:nth-child(odd) {
            transform: rotate(10deg);
        }

        li:nth-child(even) {
            transform: rotate(-10deg);
        }

        p {
            margin: -15px 0 0 0;
        }
            </style>`;
    }

    connectedCallback() {
        if (this.hasAttribute('count')) {
            if (parseInt(this.getAttribute('count')) > 0) {
                this.count = parseInt(this.getAttribute('count'));
            }
        }
        this.loadingImage = document.createElement('img');
        this.loadingImage.setAttribute("id", "loadingImage");
        this.loadingImage.src = './sk_images/images/loading.gif';
        this.shadowRoot.appendChild(this.loadingImage);
        this._fetchImages();
    }

    _showImages() {
        this._imageList = document.createElement('ul');
        for (var i = 0; i < this.images.length; i++) {
            var imageUrl = this.images[i].thumbnailUrl;
            if (imageUrl) {
                var listItem = document.createElement("li");
                var imageItem = document.createElement("img");
                imageItem.src = imageUrl;
                listItem.appendChild(imageItem);
                this._imageList.appendChild(listItem);
            }
        }

        this._hideLoadingImage();
        this.shadowRoot.appendChild(this._imageList);
    }

    async _fetchImages() {
        let responseData = await this._makeRequest();
        if (responseData.length > 0) {
            this.images = responseData.slice(0, this.count);
        }

        this._showImages();
    }

    async _makeRequest() {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        return await response.json();
    }

    _hideLoadingImage() {
        this.shadowRoot.removeChild(this.loadingImage);
    }
}

customElements.define('sk-images', SkImages);