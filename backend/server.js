const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors()); 
app.use(bodyParser.json());

app.post('/request', async (req, res) => {
  const { method, url, headers, data } = req.body;

  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data
    });
    res.json({
      status: response.status,
      headers: response.headers,
      data: response.data
    });
  } catch (error) {
    if (error.response) {
      res.json({
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      });
    } else {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
