import express, { Express, Request, Response } from 'express';

const app: Express = express();

// Define a route for the root URL
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, worlddsdsdds!');
});

// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});