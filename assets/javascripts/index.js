import { getGameResults } from './helpers.js'
const createTag = (tagName) => document.createElement(tagName)
const tabNavigation = (name) => {
  let navigation = createTag('li')
  let link  = createTag('a')
  link.href = `#${name}`
  link.innerText = name
  navigation.append(link)

  return navigation
}
const createGameGrid = (type, games) => {
  let container = createTag('div')
  games.forEach(({position, result, animal} = game) => {
    let row = createTag('div')
    let positionColumn = createTag('div')
    let resultColumn = createTag('div')
    let animalColumn = createTag('div')
    row.classList.add('columns')
    row.appendChild(positionColumn)
    row.appendChild(resultColumn)
    row.appendChild(animalColumn)
    positionColumn.innerText = position
    resultColumn.innerText = result
    animalColumn.innerText = animal
    container.appendChild(row)
  })

  return container
}

const tabContent = (type, games) => {
  let contentBody = createGameGrid(type, games)
  contentBody.id = type
  contentBody.classList.add('tab-content')

  return contentBody
}

const tabs = (results) => {
  let types = Object.keys(results)
  let ul = createTag('ul')
  let container = createTag('div')
  container.appendChild(ul)
  types.map((type) => {
    ul.appendChild(tabNavigation(type))
    container.appendChild(tabContent(type, results[type]))
  })
  ul.classList.add('tab-navigation')
  container.classList.add('tabs')

  return container
}

const app = document.getElementById('app')

const parseResults = (jsonstring) => {
  let { results } = JSON.parse(jsonstring)

  let container = tabs(results)
  app.appendChild(container)
}

getGameResults('/api/results')
  .then((data) => parseResults(data))
  .catch((error) => console.log(error))

