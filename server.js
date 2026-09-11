const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Track when this instance started, useful for verifying rolling updates/restarts
const startedAt = new Date().toISOString();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Node.js + Express, running in a container!',
    hostname: os.hostname(), // In Kubernetes this equals the Pod name — handy for confirming load balancing across replicas
    startedAt,
    requestTime: new Date().toISOString()
  });
});

// Used by Kubernetes liveness/readiness probes and Docker HEALTHCHECK
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
