import express from 'express';

import { AVAILABLE_LOCATIONS } from './data/available-locations';
import renderLocationsPage from './views/index';
import renderLocation from './views/components/location';

const app = express();

const INTERESTING_LOCATIONS: any[] = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: any, res: any) => {
    const availableLocations = AVAILABLE_LOCATIONS.filter(
        (location) => !INTERESTING_LOCATIONS.includes(location)
    );
    res.send(renderLocationsPage(availableLocations, INTERESTING_LOCATIONS));
});

app.post('/places', (req: any, res: any) => {
    const locationId = req.body.locationId;
    const location = AVAILABLE_LOCATIONS.find((loc) => loc.id === locationId);
    INTERESTING_LOCATIONS.push(location);

    res.send(`
    TODO
  `);
});

app.delete('/places/:id', (req: any, res: any) => {
    const locationId = req.params.id;
    const locationIndex = INTERESTING_LOCATIONS.findIndex(
        (loc) => loc.id === locationId
    );
    INTERESTING_LOCATIONS.splice(locationIndex, 1);

    res.send();
});

app.listen(3000);
