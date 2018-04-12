// eslint-disable-next-line no-unused-vars
function createVDOM(type, props = null, ...children) {
  return {
    type: type,
    props: props,
    children: children,
  };
}

// eslint-disable-next-line no-unused-vars
function createElement(node) {
  const element = document.createElement(node.type);
  for (let prop in node.props) {
    element[prop] = node.props[prop];
  }
  node.children.forEach((child) => {
    if (typeof child === "object") {
      const childElement = createElement(child);
      element.append(childElement);
    } else {
      element.textContent = child;
    }
  });
  return element;
}

// eslint-disable-next-line no-unused-vars
function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

// eslint-disable-next-line no-unused-vars
function updateElement(target, newNode, oldNode) {}
