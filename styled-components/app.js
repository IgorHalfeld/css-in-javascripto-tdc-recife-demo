// Generate a random element
const getRandomString = () => {
  const x = 2147483648;
  return (
    Math.floor(Math.random() * x).toString(36) +
    Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36)
  );
};

// Set html properties on element
const setAllAttrsProperties = element => attrs => {
  if (typeof attrs === 'string') {
    element.textContent = attrs;
    return element;
  }
  Object.keys(attrs).forEach(attr => element[attr] = attrs[attr]);
  return element;
};

// Append childrens on node
const setChildrens = (node, childrens) => {
  if (!childrens) return node;
  if (Array.isArray(childrens)) {
    childrens.forEach(children => node.append(children));
    return node;
  }
  node.append(childrens);
  return node;
}

// Create a html element
const createElement = (el, attrs, childrens) => {
  const element = document.createElement(el);
  if (typeof attrs === 'string') {
    element.textContent = attrs;
    return element;
  }
  const putAttrs = setAllAttrsProperties(element);
  return setChildrens(putAttrs(attrs), childrens);
};

// Get or attach a element on node
const buildElement = (el, attrs, childrens) => {
  const element = typeof el === 'string' ? document.querySelector(el) : el;
  const node = setAllAttrsProperties(element)(attrs);
  return setChildrens(node, childrens);
};

// Hook to create styles and inject on head
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

// Expose styled API
const createStyledInstance = () => {
  const createStyles = useStyles();
  const DOM_ELEMENTS = ['div', 'p', 'h1', 'h2', 'h3', 'ul', 'li', 'hr', 'br', 'i'];

  // Almost equal to createElement, but only for put classes
  const createElementWithClass = (el, className, attrs = {}) => {
    const element = document.createElement(el);
    element.classList.add(className);
    Object.keys(attrs).forEach(attr => element[attr] = attrs[attr]);
    return element;
  };

  // Genrate a random ID string and create styles
  const build = (el, styles) => {
    const className = `${el}-${getRandomString()}`;
    createStyles(className, styles);
    return createElementWithClass(el, className);
  };

  // Build complete API
  return DOM_ELEMENTS.reduce((acc, cur) => ({
    ...acc,
    [cur]: styles => build(cur, styles),
  }), {});
};