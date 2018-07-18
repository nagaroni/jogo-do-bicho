const getGameResults = (path) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest()
    request.open("GET", path)
    request.onload = () => {
      if (request.status >= 200 && request.status <= 300){
        resolve(request.response)
      }else{
        reject(request.statusText)
      }
    }
    request.onerror = () => reject(request.statusText)
    request.send()
  })
}

export { getGameResults }
