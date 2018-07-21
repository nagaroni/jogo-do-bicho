import M from 'materialize/js/materialize.js';

const app = document.getElementById('app');

const CONTENT_COL_CLASSES = ['col', 's12', 'm12']

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

const createElement = (tagname) => document.createElement(tagname)

const createTabsContent = (caption, results) => {
  let game_types = Object.keys(results)
  var tabContainer = document.getElementById('tabs')

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


getGameResults()
  .then((response) => {
    var { caption, results } = JSON.parse(response)
    var links = createTableLinks(results).join(' ')
    var ul = document.getElementById('tab-navigation')
    ul.innerHTML = links
    var tabs = createTabsContent(caption, results)
    M.Tabs.init(ul, { swipeable: true }, 1)
  }).catch((error) => console.log(error))

