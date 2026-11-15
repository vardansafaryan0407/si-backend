const secret = process.env.JWT_SECRET;

if (!secret && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be set in production');
}

export const JWT_CONSTANTS = {
  // The fallback is for local development only; production refuses to start without JWT_SECRET.
  secret: secret ?? 'local-dev-only-change-me',
};
