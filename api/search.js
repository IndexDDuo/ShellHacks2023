import fetch from 'node-fetch';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { title, fieldOffices, race, weight, age } = req.body;
    const formattedFieldOffices = fieldOffices.toLowerCase().replace(/\s/g, '');
    const apiUrl = `https://api.fbi.gov/@wanted?pageSize=2000&page=1&sort_on=modified&sort_order=desc&title=${title}&field_offices=${formattedFieldOffices}&weight=${weight}&age_min=${age}&age_max=${age}&race=${race}`;

    try {
      const fetchData = await fetch(apiUrl, { headers: { 'User-Agent': 'Your User Agent String' } });
      if (fetchData.ok) {
        const gData = await fetchData.json();
        if (gData && gData.items && gData.items.length > 0) {
          res.status(200).json(gData.items);
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

