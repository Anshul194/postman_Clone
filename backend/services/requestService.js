exports.makeRequest = async (method, url, headers, data,token) => {
  try {
    const fetch = (await import('node-fetch')).default;

    const options = {
      method: method,
      headers: headers
    };
console.log(options)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (data && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    if (method !== 'GET' && method !== 'HEAD' && data) {
      options.body = JSON.stringify(data);
    }
    console.log(data)

    const response = await fetch(url, options);
    console.log(response)

    const responseData = await response.json();
    const responseHeaders = {};

    // Copy headers to a plain object
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });
    console.log(responseData)

    return {
      status: response.status,
      headers: responseHeaders,
      data: responseData
    };
  } catch (error) {
    console.log(error.message)
    throw error;
  }
};
