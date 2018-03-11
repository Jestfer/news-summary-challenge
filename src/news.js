// No usar arrow functions si hace falta el This, no entienden de binds sino que se definen
// al momento de crearse

getNews = function() {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(this.responseText).response.results
      
      response.forEach(element => {
        let title = element.webTitle
        // Before defining 'content', we wait for a value to be assigned to getContent(element)
        // therefore we use a promise in getContent
        let content = getContent(element)

        // let art = {
          //   title: title,
          //   content: content
          // }
          
          // Se generan las 10 <p>, una por artículo, pero no se pasa bien la info...
          // printContent(title, content);
        });
        
    }
  }

  // true (or not specified) means async
  xhttp.open("GET", "http://content.guardianapis.com/search?q=football&api-key=62f9f053-2fe0-41fc-ba6b-3daf5317d098", true)
  xhttp.send()
}

getContent = function(response) {
  let content;

  const xhttp = new XMLHttpRequest();
  
  const prom = new Promise(function(resolve, reject) {
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(this.responseText).response.content.fields.body)
      }
    }
  })
  
  xhttp.open("GET", response.apiUrl + "?show-fields=body&api-key=62f9f053-2fe0-41fc-ba6b-3daf5317d098", true)
  xhttp.send()

  // Con el arrow function, al no tener contexto de this, funciona el content en getNews
  // No funcionaría con function(content)...
  return prom.then((content) => {
    return content
  })
}

// printContent = function(title, content) {
//   title = document.createElement("P");
//   content = document.createElement("P");

//   document.getElementById("title").appendChild(title);
//   document.getElementById("content").appendChild(content);
// }

getNews()