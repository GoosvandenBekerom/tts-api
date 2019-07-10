const express = require('express')
const tts = require('google-tts-api')

const app = express()
const port = 3000

app.get('/:language/:query', async (req, res) => {
  let { language, query } = req.params

  if (['nl', 'en', 'ru', 'de', 'fr', 'pl'].indexOf(language) === -1) {
    language = 'nl'
  }

	if (query.length > 200) {
		query = `Vuile paaz denk je dat ik zo'n lange tekst ga voorlezen...`;
	}
  
	const url = await tts(query.replace('paaz', 'paas'), language, 1);
	
	res.send({url: url.replace('&prev=input', '')});
})

app.get('/', (req, res) => {
  res.send(`
    <h1>Goose TTS api</h1>
    <h3>Options:</h3>
    <ul>
      <li>
        <b>/[language]/[query]</b><br />
        Available languages:
        <ul>
          <li>Dutch: nl</li>
          <li>English: en</li>
          <li>Russian: ru</li>
          <li>German: de</li>
          <li>French: fr</li>
          <li>Polish: pl</li>
        </ul> 
      </li>
    </ul>
  `)
})

app.listen(port, () => console.log(`TTS api running on port ${port}!`))