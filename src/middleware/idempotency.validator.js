/**
 * Autonomous GitHub Issue Resolution Agent Generated Code
 * Issue #1: Implement OAuth token revocation handler
 */
const inMemoryCache = new Map();

function validateIdempotency(req, res, next) {
  const key = req.headers['idempotency-key'];
  if (!key) {
    return res.status(400).json({ error: 'Missing required Idempotency-Key header' });
  }

  if (inMemoryCache.has(key)) {
    const cached = inMemoryCache.get(key);
    return res.status(cached.status).json(cached.body);
  }

  // Intercept send to cache response
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      inMemoryCache.set(key, { status: res.statusCode, body });
    }
    return originalJson(body);
  };

  next();
}

module.exports = { validateIdempotency };
