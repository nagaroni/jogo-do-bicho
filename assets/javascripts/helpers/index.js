import { Tabs } from 'materialize/js/materialize.js';

const CONTENT_COL_CLASSES = ['col', 's12', 'm12']

const createElement = (tagname) => document.createElement(tagname)

const createTable = (caption, rows) => {
  return `<table>
            <caption>${caption}</caption>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Resultado</th>
                <th>Animal</th>
              </tr>
            </thead>
            <tbody>
              ${rows.join('')}
            </tbody>
          </table>`
}

const makeRows = ({position, result, animal}) => {
  return `<tr><td>${position}</td><td>${result}</td><td>${animal}</td></tr>`
}

const createTableLinks = (results) => {
  return Object.keys(results).map((game_type) => {
    return `<li class='tab col m3 s3'>
              <a href='#${game_type}'>${game_type}</a>
            </li>`
  })
}

const createTabsContent = (tabContainer, caption, results) => {
  let game_types = Object.keys(results)

  game_types.forEach((game_type) => {
    let div = createElement('div')
    div.classList.add(...CONTENT_COL_CLASSES)
    div.id = game_type

    let rows = Array.from(results[game_type])
      .map((gameResult) => makeRows(gameResult))

    div.innerHTML = createTable(caption, rows)

    tabContainer.appendChild(div)
  })
}

const getGameResults = () => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/results');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);

      } else {
        reject(xhr.statusText);
      }

    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  })
}

const inititalizeTabs = (navigationId) => {
  fetch('/api/results')
    .then(rs => new Response(rs.body).json())
    .then(response => {
    var { caption, results } = response
    var links = createTableLinks(results).join(' ')
    var navigation = document.getElementById(navigationId)
    navigation.innerHTML = links
    var tabs = createTabsContent(navigation.parentNode, caption, results)
    Tabs.init(navigation, { swipeable: true }, 1)
  }).catch(error => console.log(error))
}

export { getGameResults, inititalizeTabs }
