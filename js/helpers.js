export function query(selector, scope) {
  if (scope === null) throw 'query scope cannot be null';
  return (scope || document).querySelector(selector);
}

export function listen(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

// Deligates the event to a child (or ansector?) element.
export function delegateEvent(target, selector, type, handler, capture) {
  const dispatchEvent = (event) => {
    const targetElement = event.target;
    const potentialElements = target.querySelectorAll(selector);
    let i = potentialElements.length;

    while (i--) {
      if (potentialElements[i] === targetElement) {
        handler.call(targetElement, event);
        break;
      }
    }
  };

  listen(target, type, dispatchEvent, !!capture);
}

export const escapeForHTML = (s) =>
  s.replace(/[&<]/g, (c) => (c === '&' ? '&amp;' : '&lt;'));

// Load and display tasks from https://jsonplaceholder.typicode.com/todos when application loads - NOT COMPLITED...
export async function getTodes() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const data = await res.json();

  console.log(data);
  return data;
}
