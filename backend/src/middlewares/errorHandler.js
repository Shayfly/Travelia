export default function errorHandler(err, req, res, next) {
  console.error(err); // log for debugging
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
}
