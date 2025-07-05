class PerformanceHelper {
  static logPerformance(testName, responseTime, endpoint = '') {
    const timestamp = new Date().toISOString();
    const status = this.getPerformanceStatus(responseTime);
    
    console.log(`[${timestamp}] ${testName} - ${endpoint}`);
    console.log(`Response time: ${responseTime}ms ${status.emoji}`);
    console.log(`Status: ${status.message}`);
  }

  static getPerformanceStatus(responseTime) {
    if (responseTime < 200) {
      return { emoji: '🚀', message: 'Excellent' };
    } else if (responseTime < 500) {
      return { emoji: '✅', message: 'Good' };
    } else if (responseTime < 1000) {
      return { emoji: '⚠️', message: 'Acceptable' };
    } else {
      return { emoji: '🐌', message: 'Slow' };
    }
  }

  static async measureMultipleRequests(requests) {
    const results = [];
    
    for (const request of requests) {
      const startTime = Date.now();
      const response = await request();
      const endTime = Date.now();
      
      results.push({
        response,
        responseTime: endTime - startTime,
        timestamp: new Date().toISOString()
      });
    }
    
    return results;
  }
}

module.exports = { PerformanceHelper };