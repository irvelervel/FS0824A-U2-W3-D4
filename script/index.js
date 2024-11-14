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
  })
  .catch((error) => {
    console.log('ERROR', error)
  })
