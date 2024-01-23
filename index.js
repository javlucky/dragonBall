const server = require('./api/src/app.js');
const { conn } = require('./api/src/db.js');

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
  });
});