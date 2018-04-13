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
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const element = document.createElement(node.type);
  for (let prop in node.props) {
    if (prop === "class") {
      element.classList.add(node.props[prop]);
    }
    element[prop] = node.props[prop];
  }
  node.children.forEach((child) => {
    if (typeof child === "object") {
      element.append(createElement(child));
    } else {
      element.appendChild(document.createTextNode(child));
    }
  });
  return element;
}

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function propsDiffer(node1, node2) {
  if (!node1.props && !node2.props) return false;
  if (!node1.props || !node2.props) return true;
  for (let prop in node1.props) {
    if (!node2.props.hasOwnProperty(prop)) return true;
    if (node2.props[prop] !== node1.props[prop]) return true;
  }
  for (let prop in node2.props) {
    if (!node1.props.hasOwnProperty(prop)) return true;
    if (node2.props[prop] !== node1.props[prop]) return true;
  }
  return false;
}
// parentNode!

// eslint-disable-next-line no-unused-vars
function updateElement(target, newNode, oldNode, parent = target.parentNode) {
  if (!oldNode) {
    parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    target.remove();
  } else if (changed(newNode, oldNode) || propsDiffer(newNode, oldNode)) {
    parent.replaceChild(createElement(newNode), target);
  } else {
    const longerNodeLength = Math.max(
      newNode.children.length,
      oldNode.children.length
    );
    for (let i = 0; i < longerNodeLength; i++) {
      updateElement(
        target.childNodes[i],
        newNode.children[i],
        oldNode.children[i],
        target
      );
    }
  }
}
