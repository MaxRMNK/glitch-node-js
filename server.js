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
// // Вариант 2: Хранение данных о HP в localStorage
// fastify.post("/", function (req, res) {
//   // Входящая команда добавить или убавить "очки здоровья"
//   const { change } = req.body;

//   // Получение из БД записанного значения HP
//   fs.readFile(dataPath, {encoding: 'utf8'}, (err, data) => {
//     if(err) { return console.log(err) }

//     const { hitPoints } = JSON.parse(data);

//     let newHitPoints = 0;

//     if (change === 'add') {
//       newHitPoints = hitPoints + 10;
//     } else if (change === 'remove' && hitPoints >= 10) {
//       newHitPoints = hitPoints - 10;
//     }
    
//     // Запись в БД нового значения HP
//     fs.writeFile(dataPath, JSON.stringify({ hitPoints: newHitPoints }), (err) => {
//       if (err) console.log(err);

//       const params = { hitPoints: newHitPoints };

//       // Ответ
//       res.status(200).send( params );
//     });
//   });
// }); // Не работало из-за того что "потерял" эти скобки.


//------------
// // Вариант 0: Обработчик данных отправленных через форму
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
