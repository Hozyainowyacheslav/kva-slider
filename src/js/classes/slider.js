import { createElem, getAttrBoolean } from '../functions'; 

const ATTR_PAGINATION = 'data-pagination';
const ATTR_MINIATURE = 'data-miniature';
const ATTR_CARoUSEL = 'data-carousel';
const ATTR_AUTOPLAY = 'data-autoplay';
const ATTR_START = 'data-start';
const ATTR_INTERVAL = 'data-interval';
const CLASS_SLIDER = 'kva-slider';
const CLASS_SLIDER_ITEM = 'kva-slider-item';
const CLASS_DISPLAY = 'kva-slider-display';
const CLASS_LIST = 'kva-slider-list';
const CLASS_BTN_PREV = 'kva-btn-prev';
const CLASS_BTN_NEXT = 'kva-btn-next';
const CLASS_PAGINATION = 'kva-pagination';
const CLASS_PAGINATION_ITEM = 'kva-pagination-item';
const CLASS_PAGINATION_BUTTON = 'kva-pagination-btn';
const CLASS_MINIATURE = 'kva-miniature';
const CLASS_MINIATURE_ITEM = 'kva-miniature-item';
const CLASS_MINIATURE_BUTTON = 'kva-miniature-btn';
const CLASS_NO_TRANSITION = 'no-transition';
const CLASS_SR_ONLY = 'sr-only';
const CLASS_HIDDEN = 'hidden';
const CLASS_ACTIVE = 'active';

class Slider {
  constructor(el, options = null) {
    this.options = this._getOptions(el, options);
    this.iterator = this._createIterator();
    this.elements = this._build(el, this.options);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.selectSlide = this.selectSlide.bind(this);
  }

  run() {
    if (!this.elements) return;

    const { autoplay, carousel, startPosition } = this.options;
    const { slider, sliderItems, btnNext, btnPrev, paginationItems, miniatureItems } = this.elements;

    this.iterator.init(sliderItems.length, 0, startPosition);

    btnPrev.addEventListener('click', this.prevSlide);
    btnNext.addEventListener('click', this.nextSlide);

    this._addEventToItems( paginationItems, this.selectSlide );
    this._addEventToItems( miniatureItems, this.selectSlide );

    slider.addEventListener('swiped-left', this.nextSlide);
    slider.addEventListener('swiped-right', this.prevSlide);

    this._update();
    if (carousel && autoplay) this._startCarousel();
  }



  nextSlide() {
    const { carousel } = this.options;
    const iterator = this.iterator;
    const { done } = iterator.next();

    if (!done && carousel) {
      iterator.begin();
      this._updateSlider(true);
      this.nextSlide()
    } else {
      this._update();
    }
  }

  prevSlide() {
    const { carousel } = this.options;
    const iterator = this.iterator;
    const { done } = iterator.prev();

    if (!done && carousel) {
      iterator.end();
      this._updateSlider(true);
      this.prevSlide()
    } else {
      this._update();
    }
  }

  selectSlide(n) {
    const { set } = this.iterator;
    if (set(n) !== false) this._update();
  }

  _update() {
    const { carousel, hasPagination, hasMiniature } = this.options;
    this._updateSlider();
    if (hasPagination) this._updatePagination();
    if (hasMiniature) this._updateMiniaturte();
    if (!carousel) this._updateButtons();
  }

  _updateSlider(fast) {
    const { sliderList } = this.elements;
    const pos = this.iterator.get();
    if (fast) sliderList.classList.add(CLASS_NO_TRANSITION);
    sliderList.style.left = `${-100 * pos}%`;
    if (fast) {
      sliderList.offsetWidth;
      sliderList.classList.remove(CLASS_NO_TRANSITION);
    }
  }

  _updatePagination() {
    const { paginationItems } = this.elements;
    const pos = this.iterator.get();
    const editpos = pos === paginationItems.length ? 0 : pos
    for (let i = 0; i < paginationItems.length; i++) {
      paginationItems[i].classList.remove( CLASS_ACTIVE );
    }
    paginationItems[editpos].classList.add( CLASS_ACTIVE );
  }

  _updateMiniaturte() {
    const { miniatureItems } = this.elements;
    const pos = this.iterator.get();
    const editpos = pos === miniatureItems.length ? 0 : pos
    for (let i = 0; i < miniatureItems.length; i++) {
      miniatureItems[i].classList.remove( CLASS_ACTIVE );
    }
    miniatureItems[editpos].classList.add( CLASS_ACTIVE );
  }

  _updateButtons() {
    const { btnPrev, btnNext } = this.elements;
    const pos = this.iterator.get();
    const { first, last } = this.iterator.getPoints();
    btnPrev.classList.remove( CLASS_HIDDEN );
    btnNext.classList.remove( CLASS_HIDDEN );
    if (pos === first) btnPrev.classList.add( CLASS_HIDDEN );
    if (pos === last) btnNext.classList.add( CLASS_HIDDEN );
  }

  _startCarousel() {
    const { interval } = this.options;
    const { widget, slider } = this.elements;
    const fn = this.nextSlide;

    let idClear = setTimeout( function step() {
      fn();
      idClear = setTimeout(step, interval);
    }, interval);
    widget.addEventListener('click', stopCarousel, { once: true });
    slider.addEventListener('swiped-left', stopCarousel, { once: true });
    slider.addEventListener('swiped-right', stopCarousel, { once: true });

    function stopCarousel() {
      if ( idClear ) {
        clearInterval(idClear);
        idClear = null;
      }
    }
  }

  _build(el, options) {
    const widget = el;
    const { hasPagination, hasMiniature, carousel } = options;
    const ul = widget.querySelector('ul');
    const nodesLi = ul ? ul.querySelectorAll('li') : [];
    if (!ul || nodesLi.length === 0) return null;

    const sliderList = ul.cloneNode(true);
    sliderList.classList.add(CLASS_LIST);
    if (carousel) {
      sliderList.append(nodesLi[0].cloneNode(true));
    }

    const sliderDisplay = createElem({
      clas: CLASS_DISPLAY,
      inner: sliderList
    });

    const slider = createElem({
      clas: CLASS_SLIDER,
      inner: sliderDisplay
    });

    const sliderItems = [...sliderList.querySelectorAll('li')];
    sliderList.style.width = `${sliderItems.length * 100}%`;
    sliderItems.forEach(item => {
      item.style.width = `${100 / sliderItems.length}%`;
      item.classList.add(CLASS_SLIDER_ITEM);
    });

    const btnPrev = createElem({
      tag: 'button',
      clas: CLASS_BTN_PREV,
      inner: createElem({
        tag: 'span',
        clas: CLASS_SR_ONLY,
        inner: 'Prev'
      })
    });
    sliderDisplay.append(btnPrev);

    const btnNext = createElem({
      tag: 'button',
      clas: CLASS_BTN_NEXT,
      inner: createElem({
        tag: 'span',
        clas: CLASS_SR_ONLY,
        inner: 'Next'
      })
    });
    sliderDisplay.append(btnNext);

    let paginationItems = [];
    if (hasPagination) {
      const pagination = this._createListButtons( nodesLi, this._createHtmlPaginationItem, CLASS_PAGINATION );
      paginationItems = [...pagination.querySelectorAll('li')];
      sliderDisplay.append(pagination);
    }

    let miniatureItems = [];
    if (hasMiniature) {
      const miniature = this._createListButtons( nodesLi, this._createHtmlMiniatureItem, CLASS_MINIATURE );
      miniatureItems = [...miniature.querySelectorAll('li')];
      widget.append( miniature );
    }

    ul.replaceWith(slider);

    return {
      widget,
      slider,
      sliderDisplay,
      sliderList,
      sliderItems,
      paginationItems,
      miniatureItems,
      btnNext,
      btnPrev
    }

  }

  _createListButtons(arr, fnCreateLi, classUl) {
    const ul = createElem({
      tag: 'ul',
      clas: classUl
    });
    
    for (let i = 0; i < arr.length; i++) {
      const htmlLi = fnCreateLi( arr[i], i );
      ul.insertAdjacentHTML('beforeEnd', htmlLi);
    }

    return ul;
  }

  _createHtmlPaginationItem( sliderItem, i ) {
    return `
      <li class="${CLASS_PAGINATION_ITEM}">
        <button class="${CLASS_PAGINATION_BUTTON}">
          <span class="${CLASS_SR_ONLY}">${i + 1}</span>
        </button>
      </li>
    `
  }

  _createHtmlMiniatureItem( sliderItem, i ) {
    const src= sliderItem.querySelector('img').src;

    return `
      <li class="${CLASS_MINIATURE_ITEM}">
        <button class="${CLASS_MINIATURE_BUTTON}" style="background-image: url(${src})">
          <span class="${CLASS_SR_ONLY}">${i + 1}</span>
        </button>
      </li>
    `
  }

  _getOptions(el, options) {
    const optionsDefault = {
      hasButtons: false,
      hasPagination: false,
      hasMiniature: false,
      carousel: false,
      autoplay: false,
      interval: 4000,
      startPosition: 0,
    }

    const optionsUser = options ? options : this._getOptionsFromElement(el);
    if (!this._validateOptions(optionsDefault, optionsUser)) {
      throw new Error('Invalid enter options');
    }

    return {
      ...optionsDefault,
      ...optionsUser
    }
  }

  _getOptionsFromElement(el) {
    
    return {
      hasPagination: getAttrBoolean( el, ATTR_PAGINATION ),
      hasMiniature: getAttrBoolean( el, ATTR_MINIATURE ),
      carousel: getAttrBoolean( el, ATTR_CARoUSEL ),
      autoplay: getAttrBoolean( el, ATTR_AUTOPLAY),
      startPosition: +el.getAttribute( ATTR_START ),
      interval: +el.getAttribute( ATTR_INTERVAL ),
    }
  }

  _validateOptions(optionsDefault, optionsUser) {
    let res = true;
    for (const key in optionsUser) {
      if (typeof optionsUser[key] !== typeof optionsDefault[key] || isNaN(optionsUser[key])) res = false;
    }

    return res;
  }

  _addEventToItems(arr, hendler) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].addEventListener('click', function () {
        hendler(i);
      })
    }
  }

  _createIterator() {
    let first = 0;
    let length = null;
    let pos = 0;

    const next = () => {
      return (pos + 1 < first + length) 
            ? { done: true, val: ++pos } 
            : { done: false, val: pos };
    }

    const prev = () => {
      return (pos - 1 > first - 1) 
            ? { done: true, val: --pos }
            : { done: false,val: pos };
    }

    const begin = () => {
      return pos = first;
    }

    const end = () => {
      return pos = first + length - 1;
    }

    const set = (n) => {
      if ( n < first || n > length - 1 ) return false;
      pos = n;
      return pos;
    }

    const get = () => {
      return pos;
    }

    const getPoints = () => {
      return {
        first,
        last: length - 1
      }
    }

    const init = (len, fst, stPos) => {
      if ( length !== null && len < 1 ) return false;
      length = len;
      first = fst;
      if ( set(stPos) === false ) pos = fst;
      return true;
    }

    return {
      next,
      prev,
      begin,
      end,
      set,
      get,
      getPoints,
      init
    }
  }
}

export default Slider;