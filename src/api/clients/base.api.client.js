class BaseApiClient {
  constructor(request, baseURL = '') {
    this.request = request;
    this.baseURL = baseURL;
  }

  async get(endpoint, options = {}) {
    const response = await this.request.get(this.baseURL + endpoint, options);
    return this.handleResponse(response);
  }

  async post(endpoint, data, options = {}) {
    const response = await this.request.post(this.baseURL + endpoint, {
      data,
      ...options
    });
    return this.handleResponse(response);
  }

  async put(endpoint, data, options = {}) {
    const response = await this.request.put(this.baseURL + endpoint, {
      data,
      ...options
    });
    return this.handleResponse(response);
  }

  async delete(endpoint, options = {}) {
    const response = await this.request.delete(this.baseURL + endpoint, options);
    return this.handleResponse(response);
  }

  async handleResponse(response) {
    const startTime = Date.now();
    let responseData;
    
    try {
      responseData = await response.json();
    } catch (error) {
      responseData = null;
    }
    
    const endTime = Date.now();

    return {
      status: response.status(),
      ok: response.ok(),
      data: responseData,
      headers: await response.headers(),
      url: response.url(),
      responseTime: endTime - startTime,
      rawResponse: response
    };
  }
}

module.exports = { BaseApiClient };