import express from 'express';
const app = express();

// Enables cross-origin requests from different domains (e.g., frontend on a different port)
import cors from 'cors';
app.use(cors());

//Middleware used to log the requests that come into the server
//It can show information about the device making the request (type of device making the request, type of request, status of request, etc)
import morgan from 'morgan';
app.use(morgan('combined'));

/*
// List of allowed origins
const allowedOrigins = [
	'http://localhost:5173', // Local development
	'http://localhost:5174', // Local development
	'https://your-public-domain.com', // Your deployed frontend
];

// Setup CORS middleware
app.use(
	cors({
		origin: (origin, callback) => {
			// Allow requests with no origin (like mobile apps, curl, Postman)
			if (!origin) return callback(null, true);

			if (allowedOrigins.includes(origin)) {
				return callback(null, true);
			} else {
				return callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true, // Allow cookies/auth if you ever need it
	})
);
*/

//example get requests
app.get('/', (req, res) => {
	res.send('hello');
});
app.get('/about', (req, res) => {
	res.send('about');
});

//example of creating custom middleware
function logger(req, res, next) {
	console.log('Request method: ', req.method);
	console.log('Request URL: ', req.url);
	next(); // if this isn't in the middlware, the program will get stuck on this line
}
app.use(logger); // this function simulates morgan

// Example of sending back json to the front end
//dummy data
/*
const bookings = [
    {
        uri: '1',
        name: 'John Doe',
        start_time: '2025-05-01T14:00:00Z',
    },
    {
        uri: '2',
        name: 'Jane Smith',
        start_time: '2025-05-02T10:30:00Z',
    },
];
*/
import { bookings } from './data/dummyData.js';
app.get('/api/bookings', (req, res) => {
	res.json(bookings);
});

//This is used to retreiving a file from a backend path. Could use this to server whole html pages saved on the back end
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/api/test', (req, res) => {
	console.log(__dirname + '/assets/1.png');
	res.sendFile(__dirname + '/assets/1.png');
});

//Example of handling post request data coming from the front end
// the bodyParser dependency handels pre-processing
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true })); // this give every request a body

//Example of a post request, which is meant for receiving data from the front end
app.post('/api/registrationForm', (req, res) => {
	console.log(req.body); // Log the posted form data
	res.send('Form received!');
});

//Exampe of how to make requests to other APIs from backend using axios
// import axios from 'axios';
// app.get('/', async (req, res) => {
// 	try {
// 		const response = await axios.get('https//bored-api.appbrewery.com');
// 		const result = response.data; // axios always returns a data in the form of json
// 		res.render('index.ejs', { activity: response.data });
// 	} catch (error) {
// 		console.log("failed to make request. Here's the actual error: ", error.message);
// 		res.status(500).send('failed to fetch activity');
// 	}
// });
// const request = https.request(options, (response) => {
// 	let data = '';
// 	request.on('data', (chunk) => {
// 		data += chunk;
// 	});
// });

//Example of code that starts the server on the desired port
const port = 3000;
app.listen(port, () => {
	console.log(`server is running on port  ${port} bits.`);
});
