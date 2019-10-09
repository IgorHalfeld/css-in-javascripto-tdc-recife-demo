function getRandomString() {
  const x = 2147483648;
  return (
    Math.floor(Math.random() * x).toString(36) +
    Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36)
  );
}

class StyleSheet {
  constructor() {
    this.sheet = null;
    this.init();
  }

  init() {
    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    this.sheet = styleEl.sheet;
  }
  create(selector, styleString) {
    console.log(styleString.toString())
    const [style, hoverString] = styleString.toString().split('&');

    const rule = `.${selector} { ${style} }`;
    const ruleHover = hoverString && hoverString.length ? `.${selector}${hoverString}` : '';
    const index = this.sheet.cssRules.length;

    this.sheet.insertRule(rule, index);
    this.sheet.insertRule(ruleHover, index);
  }
}


class Styled {
  constructor() {
    this.styleSheet = new StyleSheet();
  }

  _createElement(el, className, attrs = {}) {
    const element = document.createElement(el);
    element.classList.add(className);
    Object.keys(attrs).forEach(attr => {
      element[attr] = attrs[attr];
    });
    return element;
  }

  div(styles) {
    const className = `div-${getRandomString()}`;
    this.styleSheet.create(className, styles);

    return this._createElement('div', className);
  }
}