/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const fs = require('fs');
const path = require("path");
const dataPath = path.join(__dirname, "src/hpdb.json");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// Load and parse SEO data
// const seo = require("./src/seo.json");
// if (seo.url === "glitch-default") {
//   // seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
//   seo.url = `http://localhost:3000/`;
// }


// --------------------------------------------
/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/", function (request, reply) {
  const { hitPoints } = require("./src/hpdb.json");

  const params = {
    hitPoints: hitPoints,
    header: 'Main page',
    nextPage: '/map',
  };

  return reply.view("/src/pages/index.hbs", params);
});

fastify.get("/map", function (request, reply) {
  const { hitPoints } = require("./src/hpdb.json");

  const params = {
    hitPoints: hitPoints,
    header: 'Map',
    nextPage: '/ap',
  };

  return reply.view("/src/pages/index.hbs", params);
});

fastify.get("/ap", function (request, reply) {
  const { hitPoints } = require("./src/hpdb.json");

  const params = {
    hitPoints: hitPoints,
    header: 'Ap',
    nextPage: '/',
  };

  return reply.view("/src/pages/index.hbs", params);
});



// --------------------------------------------
/**
 * Our POST route to handle and react to form submissions
 *
 * Accepts body data indicating the user choice
 */
// function funcName(params) {
//   const currentPoints = JSON.parse(hpdb);
//   console.log('currentPoints:', currentPoints);
//   console.log('hitPoints is body:', hitPoints);
// }

fastify.post("/", function (req, res) {
  // Входящая команда добавить или убавить "очки здоровья"
  const { change } = req.body;
  // console.log('Пришел запрос req.body: ', change);

  // Получение из БД записанных значений
  fs.readFile(dataPath, {encoding: 'utf8'}, (err, data) => {
    if(err) { return console.log(err) }

    const { hitPoints } = JSON.parse(data);
    // console.log('Получено points dataPath (post): ', hitPoints);

    let newHitPoints = 0;

    if (change === 'add') {
      newHitPoints = hitPoints + 10;
    } else if (change === 'remove' && hitPoints >= 10) {
      newHitPoints = hitPoints - 10;
    }
    // console.log('newHitPoints:', newHitPoints);

    fs.writeFile(dataPath, JSON.stringify({ hitPoints: newHitPoints }), (err) => {
      if (err) console.log(err);
      // console.log('Записано newHitPoints: ', newHitPoints);

      const params = { hitPoints: newHitPoints };

      res.status(200).send( params );
    });
  });
  




  
  // const newHitPoints = hpdb;


  // console.log('Получено из DB', dataPath);
  // console.log('Получено hpdb', hpdb.hitPoints);

  // fs.writeFile(dataPath, JSON.stringify(data), (err) => {
  //   if (err) console.log(err);
  //   console.log('Записано');
  // }); 

  // params = { hitPoints: newHitPoints };

  // const newPage = reply.view("/src/pages/index.hbs", params);
  // return reply.view("/src/pages/index.hbs", params);
  // reply.send("<h2>It's Working!</h2>");

  // reply.status(200).send( params );
});

// const getCurrentUser = (req, res, next) => {
//   const { _id } = req.user; // ID пользователя, из токена

//   UserModel.findById(_id)
//     .orFail(new NotFoundError('Пользователь не найден'))
//     .then((user) => res.status(200).send(user))
//     .catch(next);
// };



//------------
// fastify.post("/", function (request, reply) {
//   const hitPoints = request.body;

//   console.log('Пришел запрос request.body', hitPoints);

//   const add = request.body.add;
//   const remove = request.body.remove;

//   params = {
//     hitPoints: 20,
//   };

//   return reply.view("/src/pages/index.hbs", params);
// });
//------------


// fastify.post("/", function (request, reply) {

//   console.log(request.body);
//   // Build the params object to pass to the template
//   let params = { seo: seo };

//   // If the user submitted a color through the form it'll be passed here in the request body
//   let color = request.body.color;

//   // If it's not empty, let's try to find the color
//   if (color) {
//     // ADD CODE FROM TODO HERE TO SAVE SUBMITTED FAVORITES

//     // Load our color data file
//     const colors = require("./src/colors.json");

//     // Take our form submission, remove whitespace, and convert to lowercase
//     color = color.toLowerCase().replace(/\s/g, "");

//     // Now we see if that color is a key in our colors object
//     if (colors[color]) {
//       // Found one!
//       params = {
//         color: colors[color],
//         colorError: null,
//         seo: seo,
//       };
//     } else {
//       // No luck! Return the user value as the error property
//       params = {
//         colorError: request.body.color,
//         seo: seo,
//       };
//     }
//   }

//   // The Handlebars template will use the parameter values to update the page with the chosen color
//   return reply.view("/src/pages/index.hbs", params);
// });

// Run the server and report out to the logs
fastify.listen(
  // { port: process.env.PORT, host: "0.0.0.0" },
  { port: 3001, host: "localhost" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
