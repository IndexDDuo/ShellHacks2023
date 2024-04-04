import fetch from 'node-fetch';
import express from 'express';
import bodyParser from 'body-parser';
import ejs  from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';


// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.static("public"));;

const PORT = 3001;
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// const basket = "https://api.fbi.gov/wanted/v1/list/";

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}.`);
});

app.use(express.static("public"));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));



app.route('/search')
  .get((req, res) => {
    // Render the search form
    res.sendFile(path.join(__dirname, 'index.html'));
  })
  .post(async (req, res) => {
    res.send('Search results will be displayed here');
    
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  