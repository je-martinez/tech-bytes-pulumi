import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import routes from './routes';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple Express API application',
    },
    servers: [],
  },
  apis: ['./src/routes/*.ts'], // Aquí especificamos los archivos de rutas para la documentación
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express + TypeScript!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
