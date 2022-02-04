  function stopExecution(e) {
        e.preventDefault();
        return;
    }
    function showMore(event) {
      event.target.classList.add('all')
    }

  function dateFormatter(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`

  }

  function printList(list, num) {
    var info = document.querySelector('.my-input');
    let listElements = '';
    var count = 0;
    console.log(list);
    list.forEach(function (element, i) {
      if(element.title == '' || element.title==null) return;
      element.created_at = new Date(element.created_at);
      count++;
      listElements += `
    <tr>
    	<th>${count}.</th><td class="title"><div class="ellipsis" onclick="showMore(event)">${element.title}</div></td><td>${dateFormatter(element.created_at)}</td><td class="author">@${element.author}</td><td>${element.points}</td>
      <td><a href="${element.url}"  target="_blank" class "link"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.8284 
          12L16.2426 13.4142L19.071 10.5858C20.6331 9.02365 20.6331 6.49099 19.071 4.9289C17.509 3.3668 14.9763 3.3668 13.4142 4.9289L10.5858 7.75732L12 
          9.17154L14.8284 6.34311C15.6095 5.56206 16.8758 5.56206 17.6568 6.34311C18.4379 7.12416 18.4379 8.39049 17.6568 9.17154L14.8284 12Z" fill="currentColor" />
          <path d="M12 14.8285L13.4142 16.2427L10.5858 19.0711C9.02372 20.6332 6.49106 20.6332 4.92896 19.0711C3.36686 17.509 3.36686 14.9764 4.92896 13.4143L7.75739 
          10.5858L9.1716 12L6.34317 14.8285C5.56212 15.6095 5.56212 16.8758 6.34317 17.6569C7.12422 18.4379 8.39055 18.4379 9.1716 17.6569L12 14.8285Z" fill="currentColor" />
          <path d="M14.8285 10.5857C15.219 10.1952 15.219 9.56199 14.8285 9.17147C14.4379 8.78094 13.8048 8.78094 13.4142 9.17147L9.1716 13.4141C8.78107 13.8046 8.78107 14.4378 
          9.1716 14.8283C9.56212 15.2188 10.1953 15.2188 10.5858 14.8283L14.8285 10.5857Z" fill="currentColor" /></svg></a></td>
    </tr>
	`;
    });
    if (count == 0){
      document.querySelector('.results').innerHTML = 'No hay Resultados con títulos validos'
    }
    else {
    document.querySelector('.my-table').innerHTML = `<tr><td></td><th>Title</th><th>Date</th><th>Author</th><th>Points</th><th>URL</th></tr>${listElements}`;
    info.value = '';
    }
  }

  async function getDataFromApi(query) {
    
    var url = 'https://hn.algolia.com/api/v1/search?query=' + query;

    var miRespuesta = await fetch(url, { method: 'GET' }).then(function (response) {
      return response.json();
    });

    if (miRespuesta.hits == '') {
      document.querySelector('.my-table').innerHTML = '';
      document.querySelector('.results').innerHTML = 'No hay resultados';
    }
    else {
      document.querySelector('.results').innerHTML = `Hay un total de ${miRespuesta.nbHits} resultados de <span class = "blue">${query}</span>`;
      printList(miRespuesta.hits, miRespuesta.nbHits);
    }
    removeSpinner();
  }

  function loadSpinner() {
    document.querySelector('.spinner-case').classList.remove('remove');
  }

  function removeSpinner() {
    document.querySelector('.spinner-case').classList.add('remove');
  }

  function showNews() {
    loadSpinner();
    var info = document.querySelector('.my-input');
    document.querySelector('.my-table').innerHTML = '';
    document.querySelector('.results').innerHTML = '';
    getDataFromApi(info.value);
  
  }
  // Función para poder realizar la búsqueda onsubmit y que coja el StopExecution de forma limpia.
  function submitSearch(event) {
    showNews();
    return stopExecution(event);
  }
  getDataFromApi('Angular');