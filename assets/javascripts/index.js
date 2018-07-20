import { Tabs } from 'materialize/js/materialize.js';

const app = document.getElementById('app');

const CONTENT_COL_CLASSES = ['col', 's12']

const createTable = (caption, rows) => {
  window.rows = rows
  console.log(rows)
  return `<table>
            <thead>
              <caption>${caption}</caption>
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

const createTableLinks = (games) => {
  return Array.from(games).map((game) => {
    return `<li class='tab col s3'>
              <a href='#${game.type}'>${name.type}</a>
            </li>`
  })
}

const createTabsContent = (caption, results) => {
  let games = Object.keys(results)
  var tabContainer = document.getElementById('tabs')

  games.forEach((game) => {
    let div = document.createElement('div')
    div.classList.add(CONTENT_COL_CLASSES)
    div.id = `#${game}`

    let rows = Array.from(results[game])
      .map((gameResult) => makeRows(gameResult))

    div.innerHTML = createElement(caption, rows)

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


getGameResults()
  .then((response) => {
    var { caption, results } = JSON.parse(response)
    var links = createTableLinks(results)
    var tabs = createTabsContent(caption, results)
    document.getElementById('tab-navigation').innerHTML = links
  }).catch((error) => console.log(error))

