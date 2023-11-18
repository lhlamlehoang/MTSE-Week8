const cors = require('cors');
const http = require('http');

require('dotenv').config();

const { mongoConnect } = require('./services/mongo')
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const app = require('./app');

app.use(cors({
    origin: 'http://localhost:3000',
}));
const PORT = 8000;

const server = http.createServer(app);
  
async function startServer() {
    try {
        await mongoConnect();
        await loadPlanetsData();
        await loadLaunchData();
        server.listen(PORT, () => {
            console.log(`Listening on PORT: ${PORT}...`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}
startServer();
