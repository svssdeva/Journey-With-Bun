import renderLocation from './components/location.js';

export default function renderLocationsPage(suggestedLocations, availableLocations: any, interestingLocations: any) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Interesting Locations</title>
        <link rel="stylesheet" href="/main.css" />
        <link rel="icon" href="/logo.png" />
         <script src="https://unpkg.com/htmx.org@1.9.12" integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2" crossorigin="anonymous"></script>
         <script src="/main.js" defer></script>
      </head>
      <body>
        <header>
          <img src="/logo.png" alt="Stylized globe" />
          <h1>PlacePicker</h1>
          <p>
            Create your personal collection of places you would like to visit or
            you have visited.
          </p>
        </header>
        <main>
        <section id="suggested-locations-section" class="locations-category">
        <h2>Suggested Locations</h2>
        <ul class="locations" id="suggested-locations"
         hx-get="/suggested-locations" hx-trigger="every 5s">
        ${suggestedLocations.map((location: any) => renderLocation(location)).join('')}
        </ul>
        </section> 
          <section id="interesting-locations-section" class="locations-category">
            <h2>My Dream Locations</h2>
            <ul id="interesting-locations" class="locations">
              ${interestingLocations.map((location: any) => renderLocation(location, false)).join('')}
            </ul>
          </section>

          <section class="locations-category">
            <h2>Available Locations</h2>
            <ul id="available-locations" class="locations">
              ${availableLocations.map((location: any) => renderLocation(location)).join('')}
            </ul>
          </section>
        </main>
      </body>
    </html>
  `;
}
