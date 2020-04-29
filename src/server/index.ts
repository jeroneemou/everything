import * as fs from 'fs';
import * as express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.get('/health', (request, response) => {
  response.end('OK');
})

app.get('/', (request, response) => {
  const template = fs.readFileSync(__dirname + '/template.html', 'utf-8');

  // TODO replace content if necessary with SSR

  response.end(template);
})


app.listen(port, () => {
  console.log(`Listening on ${port}`);
})