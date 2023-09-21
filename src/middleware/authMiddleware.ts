// src/middleware/authMiddleware.ts

import asyncHandler from 'express-async-handler';
import { Request } from 'express';
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

export const protect = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401);
  throw new Error('Not authorized');
});

export const admin = asyncHandler(async (req: Request, res, next) => {
  // @ts-ignore
  if (req.user && req.user.isAdmin) {
    return next();
  }

  res.status(401);
  throw new Error('Not authorized as Admin');
});

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
// const jwtCheck = auth({
export const checkJwt = auth({
  audience: 'http://localhost:5000/',
  issuerBaseURL: `https://dev-fe4e0mvsji0bzexh.us.auth0.com/`,
  tokenSigningAlg: 'RS256',
});
