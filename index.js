const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/events', (req, res) => {
  request(
    { url: 'https://www.eventbrite.com/api/v3/destination/events/?event_ids=307641342537,270774021387,315008558077,272271008917,291036727687,290036144917,322769752017,330205933837,270774984267,194078352577,338233725177,291001161307,63168789550,319115492027,343831839287,350791716467,311471147587,314215616367,335641140687,65083832495&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections&page_size=20' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
