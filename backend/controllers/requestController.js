const requestService = require('../services/requestService');

exports.handleRequest = async (req, res) => {
  const { method, url, headers, data ,token} = req.body;
  console.log(method, url, headers, data,token)
  try {
    const response = await requestService.makeRequest(method, url, headers, data,token);
    res.json(response);
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
};
