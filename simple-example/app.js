// Generate a random element
const getRandomString = () => {
  const x = 2147483648;
  return (
    Math.floor(Math.random() * x).toString(36) +
    Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36)
  );
};

// Hook to create styles and inject on head
const useStyles = () => {
  const styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  const sheet = styleEl.sheet;
  return function create(styleString) {
    const className = `element-${getRandomString()}`;
    const rule = styleString && styleString.length ? `.${className} { ${styleString} }` : null;
    const index = sheet.cssRules.length;
    if (rule) sheet.insertRule(rule, index);
    return className;
  };
};