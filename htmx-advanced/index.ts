import express from 'express';

const courseGoals: any = [];

function renderGoals(goal: any) {
    return `<li>
              <span>${goal.text}</span>
              <button
               hx-delete="/goals/${goal.id}"
                hx-target="closest li"
                >Remove</button>
            </li>`
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req: any, res: any) => {
    res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Learn HTMX</title>
      <link rel="stylesheet" href="/main.css" />
       <script src="https://unpkg.com/htmx.org@1.9.12" integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2" crossorigin="anonymous"></script>
    </head>
    <body>
      <main>
        <h1>Manage your course goals</h1>
        <section>
          <form 
            id="goal-form" 
            hx-post="/goals" 
            hx-target="#goals"
            hx-swap="beforeend"
            hx-on::after-request="this.reset()"
            hx-disabled-elt="form button">
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals" hx-swap="outerHTML" hx-confirm="Are you sure ?">
          ${courseGoals.map(
        (goal: any) => renderGoals(goal)).join('')}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post('/goals', (req: any, res: any) => {
    const goalText = req.body.goal;
    const id = new Date().getTime().toString();
    const goal = { id, text: goalText };
    courseGoals.push(goal);
    const index = courseGoals.length - 1;
    // res.redirect('/');
    res.send(renderGoals(goal));
});

app.delete('/goals/:id', (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const index = courseGoals.findIndex((goal: any) => goal.id === id);
    courseGoals.splice(index, 1);
    res.send();
});

app.listen(3000);
