# kva-slider

Adaptive Slider Carousel

## Install

Put the required stylesheet at the top of your markup:

```html
<link rel="stylesheet" href="dist/assets/css/kva-slider.css" />
```
Put the script at the bottom of your markup right after jQuery:

```html
<script src="dist/assets/js/kva-slider.js"></script>
```

## Usage

Use the following pattern:

```html
    <div class="kva-widget"
         data-pagination 
         data-miniature
         data-carusel 
         data-autoplay
         data-interval="3000"
         data-start="2"
    >
      <ul>
        <li>
          <img class="img-cover" src="image-1.jpg" alt="">
          <div class="slide-content full-absolute">
            <h2>Image 1</h2>
          </div>
        </li>
        <li>
          <img class="img-cover" src="image-2.jpg" alt="">
          <div class="slide-content full-absolute">
            <h2>Image 2</h2>
          </div>
        </li>
        <li>
          <img class="img-cover" src="image-3.jpg" alt="">
          <div class="slide-content full-absolute">
            <h2>Image 3</h2>
          </div>
        </li>
      </ul>
    </div>
```
After loading the page, this template will be like this:
```html
<div class="kva-widget"
     data-pagination="" 
     data-miniature="" 
     data-interval="3000" 
     data-carusel="" 
     data-autoplay="" 
     data-start="2">
    <div class="kva-slider">
      <div class="kva-slider-display">
        <ul class="kva-slider-list" style="width: 400%; left: -100%;">
          <li class="kva-slider-item" style="width: 25%;">
            <img class="img-cover" src="image-1.jpg" alt="">
            <div class="slide-content full-absolute">
              <h2>Image 1</h2>
            </div>
          </li>
          <li class="kva-slider-item" style="width: 25%;">
            <img class="img-cover"  src="image-2.jpg" alt="">
            <div class="slide-content full-absolute">
              <h2>Image 2</h2>
            </div>
          </li>
          <li class="kva-slider-item" style="width: 25%;">
            <img class="img-cover" src="image-3.jpg" alt="">
            <div class="slide-content full-absolute">
              <h2>Image 3</h2>
            </div>
          </li>
          <li class="kva-slider-item" style="width: 25%;">
            <img class="img-cover" src="image-1.jpg" alt="">
            <div class="slide-content full-absolute">
              <h2>Image 1</h2>
            </div>
          </li>
        </ul>
        <button class="kva-btn-prev">
          <span class="sr-only">Prev</span>
        </button>
        <button class="kva-btn-next">
          <span class="sr-only">Next</span>
        </button>
        <ul class="kva-pagination">
          <li class="kva-pagination-item">
            <button class="kva-pagination-btn">
              <span class="sr-only">1</span>
            </button>
          </li>
          <li class="kva-pagination-item active">
            <button class="kva-pagination-btn">
              <span class="sr-only">2</span>
            </button>
          </li>
          <li class="kva-pagination-item">
            <button class="kva-pagination-btn">
              <span class="sr-only">3</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <ul class="kva-miniature">
      <li class="kva-miniature-item">
        <button class="kva-miniature-btn" style="background-image: url(image-1.jpg)">
          <span class="sr-only">1</span>
        </button>
      </li>
      <li class="kva-miniature-item active">
        <button class="kva-miniature-btn" style="background-image: url(image-2.jpg)">
          <span class="sr-only">2</span>
        </button>
      </li>
      <li class="kva-miniature-item">
        <button class="kva-miniature-btn" style="background-image: url(image-3.jpg)">
          <span class="sr-only">3</span>
        </button>
      </li>
    </ul>
  </div>
```

## Configure

Slider customization using attributes:

Attribute          | Description                                              | Type      | Default
------------------ | -------------------------------------------------------- | --------- | --------
`data-interval`    | The number of milliseconds before showing the next slide | _integer_ | 4000
`data-start`       | Slide number (starting at 0) to be shown first           | _integer_ | 0
`data-autoplay`    | Automatic slide change                                   | _boolean_ | false
`data-carusel`     | Carousel mode                                            | _boolean_ | false
`data-pagination`  | Adds slide indicators                                    | _boolean_ | false
`data-miniature`   | Adds slide thumbnails                                    | _boolean_ | false

