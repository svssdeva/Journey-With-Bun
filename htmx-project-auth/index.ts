import express from 'express';

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
        <link rel="icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/main.css" />
        <script src="https://unpkg.com/htmx.org@1.9.12" integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/htmx.org@1.9.12/dist/ext/response-targets.js"></script>
      </head>
      <body>
        <main>
          <form hx-ex="response-targets" hx-post="/login" hx-target-500="#server-errors" hx-target-422="#extra-information" hx-sync="this:replace">
            <div>
              <img src="/images/auth-icon.jpg" alt="A lock icon" />
            </div>
            <div id="server-errors"></div>
            <div class="control">
              <label for="email">Email</label>
              <input 
                hx-post="/validate" 
                hx-target="next p"
                hx-param="email"
                type="email" 
                name="email" 
                id="email" />
              <p class="error"></p>
            </div>
            <div class="control">
              <label for="password">Password</label>
              <input 
                hx-post="/validate" 
                hx-target="next p" 
                hx-param="password"
                type="password" 
                name="password" 
                id="password" />
              <p class="error"></p>
            </div>
            <div id="extra-information"></div> 
            <p>
              <button type="submit">
                Login
              </button>
            </p>
          </form>
        </main>
      </body>
    </html>
  `);
});

app.post('/validate', (req: any, res: any) => {
  if ('email' in req.body && !req.body.email.includes('@')) {
    return res.send(`
      E-Mail address is invalid.
    `);
  } else if ('email' in req.body && req.body.email.includes('@')) {
    return res.send();
  } else if ('password' in req.body && req.body.password.trim().length < 8) {
    return res.send(`
      Password must be at least 8 characters long.
    `);
  } else if ('password' in req.body && req.body.password.trim().length >= 8) {
    return res.send();
  }
  res.send();
});

app.post('/login', (req: any, res: any) => {
  const email = req.body.email;
  const password = req.body.password;

  let errors: any = {};

  if (!email || !email.includes('@')) {
    errors['email'] = 'Please enter a valid email address.';
  }

  if (!password || password.trim().length < 8) {
    errors['password'] = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    res.status(422).send(`
        <ul id="form-errors">
          ${Object.keys(errors)
        .map((key) => `<li>${errors[key]}</li>`)
        .join('')}
        </ul>
    `);
  }
  if (Math.random() > 0.5) {
    // res.setHeader('HX-Retarget', '.control');
    //res.setHeader('HX-Reswap', 'beforebegin');
    res.status(500).send(`<p class="error">A server error occurred.</p>`);
  }
  res.setHeader('HX-Redirect', '/authenticated');
  res.send();
});

app.get('/authenticated', (req: any, res: any) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Learn HTMX</title>
        <link rel="icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/main.css" />
        <script src="https://unpkg.com/htmx.org@1.9.12" integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2" crossorigin="anonymous"></script>
      </head>
      <body>
        <main>
          <h1>Authenticated!</h1>
        </main>
      </body>
    </html>
  `);
});

app.listen(3000);
