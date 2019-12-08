import { isObject } from 'util';

export const createElem = ({
  tag = 'div',
  clas = '',
  attrs = null,
  inner = null
}) => {

  const elem = document.createElement(tag);

  if (clas) elem.classList.add(clas);

  if (isObject(attrs)) {
    for (const key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        elem.setAttribute(key, attrs[key])
      }
    }
  }

  if (inner) {
    elem.append(inner);
  }

  return elem;
}

export const getAttrBoolean = ( el, atr ) => {
  return el.hasAttribute(atr) && el.getAttribute(atr) !== 'false' ? true : false;
}