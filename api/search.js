import fetch from 'node-fetch';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { title, fieldOffices, race, weight, age } = req.body;
    const formattedFieldOffices = fieldOffices.toLowerCase().replace(/\s/g, '');
    const apiUrl = `https://api.fbi.gov/@wanted?pageSize=991&page=1&sort_on=modified&sort_order=desc&title=${title}&field_offices=${formattedFieldOffices}&weight=${weight}&age_min=${age}&age_max=${age}&race=${race}`;

    try {
      const fetchData = await fetch(apiUrl, { headers: { 'User-Agent': 'Your User Agent String' } });
      if (fetchData.ok) {
        const gData = await fetchData.json();
        if (gData && gData.items && gData.items.length > 0) {
           // Start building the HTML response
           let htmlResponse = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>FBI Most Wanted Search Results</title>
            <style>
               body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
            color: #333;
            }

            h1 {
                text-align: center;
                background-color: #007bff;
                color: #fff;
                padding: 30px 20px;
                margin-bottom: 40px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .img-small {
                max-width: 100px;
                display: block;
                margin: 20px auto;
            }

            .grid-container {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-gap: 20px;
                padding: 20px;
            }

            .grid-item {
                background-color: #fff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                padding: 15px;
                text-align: center;
                border: 1px solid #ddd;
            }

            .grid-item a {
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
            }

            .grid-item p {
                margin-top: 10px;
                color: #555;
            }

            @media (max-width: 768px) {
                .grid-container {
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                }
            }
            </style>
          </head>
          <body>
          <h1>FBI Most Wanted Search Results</h1>
          <div class="grid-container">`;

           
 
           // Manually constructing HTML string similar to the EJS template
           gData.items.forEach(item => {
             htmlResponse += `
               <div class="grid-item">
                 <img src="${item.images[0].original}" class="img-small">
                 <a href="${item.url}">${item.title}</a>
                 <p>${item.description}</p>
               </div>
             `;
           });
 
           htmlResponse += '</div></body></html>';
 
           res.setHeader('Content-Type', 'text/html');
           res.status(200).send(htmlResponse);
        } else {
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
  } else {
    // Handle non-POST requests or show an error message
    res.status(405).send('Method Not Allowed');
  }
};

