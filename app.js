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

// eslint-disable-next-line no-unused-vars
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
function updateElement(target, newNode, oldNode) {
  if (changed(newNode, oldNode)) {
    console.log("TYPE DIFFERENT!");
    return;
  } else if (propsDiffer(newNode, oldNode)) {
    console.log("PROPS DIFFERENT!");
    console.log({ target });
    console.log({ newNode });
    target.parentNode.insertBefore(createElement(newNode), target);
    target.remove();
    return;
  } else {
    const longerNode = Math.max(
      newNode.children.length,
      oldNode.children.length
    );
    for (let i = 0; i < longerNode; i++) {
      updateElement(
        target.children[i],
        newNode.children[i],
        oldNode.children[i]
      );
    }
  }
}

// eslint-disable-next-line no-unused-vars
function updateElementOLD(target, newNode, oldNode) {
  function compareNodes(newChild, oldChild) {
    if (changed(newChild, oldChild)) {
      console.log({ newChild, oldChild });
    }
    if (oldChild.children.length < newChild.children.length) {
      appendAddition(oldChild.children, newChild.children);
      // else look for deletion
      // else look for changed props
    } else if (oldChild.children.length > newChild.children.length) {
      removeDeletion(oldChild.children, newChild.children);
    } else {
      for (let i = 0; i < newChild.children.length; i++) {
        compareNodes(newChild.children[i], oldChild.children[i]);
      }
    }
  }

  function removeDeletion(oldChildren, newChildren) {
    for (let i = 0; i < oldChildren.length; i++) {
      if (changed(oldChildren[i], newChildren[i])) {
        if (newChildren[i] === undefined) {
          target.appendChild(createElement(newChildren[i]));
        } else {
          target.insertBefore(
            createElement(newChildren[i]),
            target.children[i]
          );
          break;
        }
      }
    }
  }

  function appendAddition(oldChildren, newChildren) {
    for (let i = 0; i < newChildren.length; i++) {
      if (changed(oldChildren[i], newChildren[i])) {
        if (oldChildren[i] === undefined) {
          target.appendChild(createElement(newChildren[i]));
        } else {
          target.insertBefore(
            createElement(newChildren[i]),
            target.children[i]
          );
          break;
        }
      }
    }
  }
  compareNodes(newNode, oldNode);
  const changes = {};
}
