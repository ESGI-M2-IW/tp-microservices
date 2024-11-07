const VALID_API_KEYS = [process.env.API_KEY];

const guard = (req, res, next) => {
  const apiKey = req.header('x-api-key') || req.query.apiKey || req.body.apiKey;

  if (!VALID_API_KEYS.includes(apiKey)) {
    return res.status(403).json({ error: 'Forbidden: Invalid API key' });
  }

  next();
};

module.exports = guard;
