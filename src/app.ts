// src/app.ts
// @ts-nocheck

import ConnectSessionKnex from 'connect-session-knex';
import cookieParser from 'cookie-parser';
import express from 'express';
import listEndpoints from 'express-list-endpoints';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import knex from './database/db';
import indexRoutes from './routes/index';
import userRoutes from './routes/users';
// import authRoutes from './routes/auth';
import auth0Routes from './routes/auth0';
import {
  generalErrorHandler,
  notFoundHandler,
} from './middleware/errorMiddleware';
import flash from 'express-flash';
const cors = require('cors');
require('dotenv').config();

const KnexSessionStore = ConnectSessionKnex(session);

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// enforce on all endpoints
// app.use(jwtCheck);
// app.use(checkJwt);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

app.use(
  session({
    store: new KnexSessionStore({
      knex: knex,
      tablename: 'sessions',
      createtable: true,
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(passport.authenticate('session'));
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/authorized', function (req, res) {
//   res.send('Secured Resource');
// });

app.use('/api', indexRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
app.use('/', auth0Routes);

// app.use(notFoundHandler);
// app.use(generalErrorHandler);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  return res.set(err.headers).status(err.status).json({ message: err.message });
});

export default app;
