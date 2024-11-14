// riempiamo il footer con l'anno corrente
const yearSpan = document.getElementById('current-year') // seleziono lo span
yearSpan.innerText = new Date().getFullYear() // recupero l'anno corrente e ce lo ficco

// è arrivato il momento di recuperare l'elenco dei concerti attualmente in DB
// contatteremo 'https://striveschool-api.herokuapp.com/api/agenda'
const EPITICKET_URL = 'https://striveschool-api.herokuapp.com/api/agenda'

fetch(EPITICKET_URL)
  .then((response) => {
    console.log('RESPONSE', response)
    if (response.ok) {
      // qui finiamo se la chiamata è 100% corretta e possiamo recuperare il JSON
      // dei risultati
      return response.json()
    } else {
      // qui finiamo ad esempio se l'endpoint non esiste, e in generale se la
      // Response è arrivata ma non contiene i dati per proseguire
      throw new Error('Errore nel recupero della risposta dal server')
    }
  })
  .then((arrayOfConcerts) => {
    // qui dentro finisco quando ho completato l'estrazione del JSON dalla Response!
    console.log('arrayOfConcerts', arrayOfConcerts)
    // recupero la riga nella quale innesterò le colonne per i concerti
    const row = document.getElementById('concerts-row')
    arrayOfConcerts.forEach((concert) => {
      const newCol = document.createElement('div')
      newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4')
      newCol.innerHTML = `
            <div class="card">
                <img src="https://www.adobe.com/creativecloud/photography/discover/media_15955bf89f635a586d897b5c35f7a447b495f6ed7.jpeg?width=1200&format=pjpg&optimize=medium" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${concert.name}</h5>
                    <p class="card-text">${concert.description}</p>
                    <p class="card-text">${concert.price}€ - ${
        concert.time.split('T')[0]
      }</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        `
      row.appendChild(newCol)
    })
  })
  .catch((error) => {
    console.log('ERROR', error)
  })
