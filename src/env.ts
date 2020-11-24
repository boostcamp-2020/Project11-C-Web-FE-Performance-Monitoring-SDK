function isInWindow() {
  if (typeof window === 'object') {
    return true;
  } else {
    return false;
  }
}

function isInNode() {
  if (typeof global === 'object') {
    return true;
  } else {
    return false;
  }
}

console.log(isInWindow()); // true, if in browser
console.log(isInNode()); // true, if in node.js
