const createElement = tagname => document.createElement(tagname)
const createElements = (object) => {
  if (typeof object === 'object'){
    var el = createElement(object.tagname)
    el.innerText = object.content
    el.appendChild(createElements(object.children || []))
    return el
  }
  if(Array.prototype.isPrototypeOf(object)){

  }
}

