const getRandomString = () => {
  const x = 2147483648;
  return (
    Math.floor(Math.random() * x).toString(36) +
    Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36)
  );
};

const setAllAttrsProperties = element => attrs => {
  if (typeof attrs === 'string') {
    element.textContent = attrs;
    return element;
  }
  Object.keys(attrs).forEach(attr => element[attr] = attrs[attr]);
  return element;
};

const setChildrens = (node, childrens) => {
  if (!childrens) return node;
  if (Array.isArray(childrens)) {
    childrens.forEach(children => node.append(children));
    return node;
  }
  node.append(childrens);
  return node;
}

const createElement = (el, attrs, childrens) => {
  const element = document.createElement(el);
  if (typeof attrs === 'string') {
    element.textContent = attrs;
    return element;
  }
  const putAttrs = setAllAttrsProperties(element);
  return setChildrens(putAttrs(attrs), childrens);
};

const buildElement = (el, attrs, childrens) => {
  const element = typeof el === 'string' ? document.querySelector(el) : el;
  const node = setAllAttrsProperties(element)(attrs);
  return setChildrens(node, childrens);
};

const useStyles = () => {
  const styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  const sheet = styleEl.sheet;
  return function create(selector, styleString) {
    const [style, hoverString] = styleString.toString().split('&');

    const rule = style && style.length ? `.${selector} { ${style} }` : null;
    const ruleHover = hoverString && hoverString.length ? `.${selector}${hoverString}` : null;
    const index = sheet.cssRules.length;

    if (rule) sheet.insertRule(rule, index);
    if (hoverString) sheet.insertRule(ruleHover, index);
  };
};

const createStyledInstance = () => {
  const createStyles = useStyles();
  const DOM_ELEMENTS = ['div', 'p', 'h1', 'h2', 'h3', 'ul', 'li', 'hr', 'br', 'i'];

  const createElementWithClass = (el, className, attrs = {}) => {
    const element = document.createElement(el);
    element.classList.add(className);
    Object.keys(attrs).forEach(attr => element[attr] = attrs[attr]);
    return element;
  };

  const build = (el, styles) => {
    const className = `${el}-${getRandomString()}`;
    createStyles(className, styles);
    return createElementWithClass(el, className);
  };

  return DOM_ELEMENTS.reduce((acc, cur) => ({
    ...acc,
    [cur]: styles => build(cur, styles),
  }), {});
};