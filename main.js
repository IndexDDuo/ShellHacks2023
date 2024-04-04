import fetch from 'node-fetch';
import express from 'express';
import bodyParser from 'body-parser';
import ejs  from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';


// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// const basket = "https://api.fbi.gov/wanted/v1/list/";

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}.`);
});

app.use(express.static("public"));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


// app.get("/@wanted", async (req, res) => {
//     // Define query parameters based on the request
//     const pageSize = req.query.pageSize || 20;
//     const page = req.query.page || 1;
//     const sortOn = req.query.sort_on || 'modified';
//     const sortOrder = req.query.sort_order || 'desc';
//     const title = req.query.title || '';
//     const fieldOffices = req.query.field_offices || '';
//     const personClassification = req.query.person_classification || '';
//     const posterClassification = req.query.poster_classification || 'default';
//     const status = req.query.status || '';
  
//     // Construct the URL with query parameters
//     const apiUrl = `https://api.fbi.gov/wanted/v1/list?pageSize=${pageSize}&page=${page}&sort_on=${sortOn}&sort_order=${sortOrder}&title=${title}&field_offices=${fieldOffices}&person_classification=${personClassification}&poster_classification=${posterClassification}&status=${status}`;
  
//     try {
//       const fetchData = await fetch(apiUrl, {
//         headers: {
//           'User-Agent': 'Your User Agent String', // Replace with your actual User-Agent
//         },
//       });
  
//       if (fetchData.ok) {
//         const gData = await fetchData.json();
//         res.json(gData);
//       } else {
//         console.error(`Error fetching data: ${fetchData.status} - ${fetchData.statusText}`);
//         res.status(fetchData.status).json({ error: 'Failed to fetch data' });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  

//   app.get("/@wanted/field_offices/:field_offices", async (req, res) => {
//     // Extract the field_offices parameter from the URL
//     const fieldOffices = req.params.field_offices;
  
//     // Construct the FBI API URL with the specified parameters
//     const apiUrl = `https://api.fbi.gov/@wanted?pageSize=20&page=1&sort_on=modified&sort_order=desc&field_offices=${fieldOffices}`;
  
//     try {
//       const fetchData = await fetch(apiUrl, {
//         headers: {
//           'User-Agent': 'Your User Agent String', // Replace with your actual User-Agent
//         },
//       });
  
//       if (fetchData.ok) {
//         const gData = await fetchData.json();
  
//         // Extract and format the names and URLs of wanted persons
//         const wantedPersons = gData.items.map((item) => ({
//           name: item.title,
//           url: item.url,
//         }));
        
//         res.json(wantedPersons);
//       } else {
//         console.error(`Error fetching data: ${fetchData.status} - ${fetchData.statusText}`);
//         res.status(fetchData.status).json({ error: 'Failed to fetch data' });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  

app.route('/search')
  .get((req, res) => {
    // Render the search form
    res.sendFile(path.join(__dirname, 'index.html'));
  })
  .post(async (req, res) => {
    const title = req.body.title;
    let fieldOffices = req.body.fieldOffices; // Store it in a variable
    fieldOffices = fieldOffices.toLowerCase().replace(/\s/g, ''); // Update the variable
    const race = req.body.race;
    const weight = req.body.weight;
    const age = req.body.age;
    console.log("Form Data city:", fieldOffices); // Use the updated variable

    // Construct the FBI API URL with the specified search parameters
    const apiUrl = `https://api.fbi.gov/@wanted?pageSize=20&page=1&sort_on=modified&sort_order=desc&title=${title}&field_offices=${fieldOffices}&weight=${weight}&age_min=${age}&age_max=${age}&race=${race}`;

    console.log("Constructed API URL:", apiUrl);
    console.log("Form Data2:", req.body.race); // Log the form data

    try {
      // Fetch data from the FBI API
      const fetchData = await fetch(apiUrl, {
        headers: {
          'User-Agent': 'Your User Agent String', // Replace with your actual User-Agent
        },
      });

      if (fetchData.ok) {
        const gData = await fetchData.json();

        // if (gData) {
        //   console.log(gData.items);
        // }

        // Check if there are search results to render
        if (gData && gData.items && gData.items.length > 0) {
          // Render the results page with search results data
          res.render('search-results', { results: gData.items });
        } else {
          // No search results found
          res.status(404).send('No search results found.');
        }
      } else {
        console.error(`Error fetching data: ${fetchData.status} - ${fetchData.statusText}`);
        res.status(fetchData.status).json({ error: 'Failed to fetch data' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

