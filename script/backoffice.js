// classe per la creazione dei concerti
class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.time = _time
  }
}

const EPITICKET_URL = 'https://striveschool-api.herokuapp.com/api/agenda'

// -------- PARTE FINALE DELLA LEZIONE ---------
// ora la pagina di backoffice servirà un duplice scopo:
// a) se aperta dalla navbar continuerà a creare nuovi concerti
// b) se verrà aperta a seguito della pressione di un tasto "MODIFICA" in un dettaglio, avrà nella barra degli indirizzi il concertId del concerto da modificare e di fatto non creerà un concerto nuovo ma modificherà quello con il concertId fornito

// vediamo se esiste un concertId nella barra degli indirizzi
const addressBarContent = new URLSearchParams(window.location.search)
const concertId = addressBarContent.get('concertId')

// ora, concertId può esserci o può non esserci
if (concertId) {
  // modalità modifica!
  // per prima cosa, recuperiamo i DETTAGLI del concerto da modificare
  // li utilizzeremo per pre-compilare tutti gli input field del form
  fetch(EPITICKET_URL + '/' + concertId) // una GET molto specifica!
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nel recupero dettagli per pre-popolazione form')
      }
    })
    .then((singleConcert) => {
      // utilizziamo name, description, time e price per ri-popolare il form
      document.getElementById('name').value = singleConcert.name
      document.getElementById('description').value = singleConcert.description
      document.getElementById('price').value = singleConcert.price
      document.getElementById('time').value = singleConcert.time.split('.')[0]
    })
    .catch((err) => console.log('errore', err))
} else {
  // modalità creazione!
}

// GESTIAMO L'INVIO DEL FORM PER LA CREAZIONE DI UN NUOVO EVENTO

const form = document.getElementById('concert-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  // ora recupero i valori dei 4 campi del form e ci faccio un oggetto
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const priceInput = document.getElementById('price')
  const timeInput = document.getElementById('time')
  const createdConcert = new Concert(
    nameInput.value,
    descriptionInput.value,
    priceInput.value,
    timeInput.value
  )
  console.log("CONCERTO CREATO E PRONTO PER L'INVIO", createdConcert)

  let methodToUse
  if (concertId) {
    methodToUse = 'PUT' // modifica
  } else {
    methodToUse = 'POST' // creazione
  }

  let URLToUse
  if (concertId) {
    URLToUse = EPITICKET_URL + '/' + concertId // specifico
  } else {
    URLToUse = EPITICKET_URL // generico
  }

  fetch(URLToUse, {
    method: methodToUse, // inserisco POST per CREARE una nuova risorsa
    body: JSON.stringify(createdConcert), // allego il nuovo concerto come stringa
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'xxxxxxxxx' // nell'endpoint che stiamo utilizzando non serve
    },
  })
    .then((response) => {
      if (response.ok) {
        // l'oggetto è stato salvato correttamente nel DB!
        alert('EVENTO SALVATO!')
        // svuotiamo il form!
        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
        timeInput.value = ''
      } else {
        // molto probabilmente qualcosa non va bene nel tuo oggetto
        throw new Error('Errore nel salvataggio del concerto')
      }
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
})

// OPERAZIONI DEL PERSISTENT STORAGE (interazioni con i DB)
// READ (metodo GET) -> si utilizza l'endpoint principale
// READ (metodo GET) -> si può anche utilizzare un endpoint specifico
// CREATE (metodo POST) -> si utilizza l'endpoint principale
// DELETE (metodo DELETE) -> si utilizza l'endpoint specifico
// UPDATE (metodo PUT) -> si utilizza l'endpoint specifico
