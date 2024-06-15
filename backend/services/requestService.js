exports.makeRequest = async (method, url, headers = {}, data = null, token = null) => {
  try {
    // Node.js built-in fetch
    const fetch = globalThis.fetch;

    const options = {
      method: method,
      headers: { ...headers }  // Copy headers to avoid mutation
    };

    // Add Authorization header if token is provided
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    // Set Content-Type header if data is provided and it is not already set
    if (data && !options.headers['Content-Type']) {
      options.headers['Content-Type'] = 'application/json';
    }

    // Add body to the request if method is not GET or HEAD
    if (method !== 'GET' && method !== 'HEAD' && data) {
      options.body = JSON.stringify(data);
    }

    // Log the request details for debugging
    console.log('Request Options:', options);
    console.log('Request Data:', data);

    const response = await fetch(url, options);

    // Log the raw response for debugging
    console.log('Raw Response:', response);

    // Extract response data
    const responseData = await response.json();
    const responseHeaders = {};

    // Convert response headers to a plain object
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    // Log the parsed response data for debugging
    console.log('Response Data:', responseData);

    return {
      status: response.status,
      headers: responseHeaders,
      data: responseData
    };
  } catch (error) {
    // Log the error message for debugging
    console.log('Error:', error.message);
    throw error;
  }
};
