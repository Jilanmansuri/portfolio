import http from 'http';

const PORT = process.env.PORT || 5001;
const BASE_URL = `http://localhost:${PORT}`;

function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TestAgent/1.0',
    'Accept-Language': 'en-US,en;q=0.9',
  };

  options.headers = { ...defaultHeaders, ...options.headers };

  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        let json = null;
        try {
          if (body) {
            json = JSON.parse(body);
          }
        } catch (e) {
          console.error('Failed to parse body:', body);
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: json
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING VISITOR SYSTEM INTEGRATION TESTS ---');

  try {
    // 1. Verify /api/visitor/stats fails without authentication
    console.log('\n[Test 1] Fetching stats without password...');
    const statsNoAuth = await request('/api/visitor/stats', { method: 'GET' });
    console.log(`Status: ${statsNoAuth.status}`);
    console.log(`Data:`, statsNoAuth.data);
    if (statsNoAuth.status !== 401) {
      throw new Error(`Expected status 401, got ${statsNoAuth.status}`);
    }
    console.log('Result: PASS (Unauthorized correctly blocked)');

    // 2. Fetch baseline stats
    console.log('\n[Test 2] Fetching baseline stats with admin password...');
    const initialStats = await request('/api/visitor/stats', {
      method: 'GET',
      headers: { 'x-admin-password': 'Jilan@123' }
    });
    console.log(`Status: ${initialStats.status}`);
    console.log(`Data:`, initialStats.data);
    if (initialStats.status !== 200) {
      throw new Error(`Expected status 200, got ${initialStats.status}`);
    }
    const initialUnique = initialStats.data.uniqueVisitors;
    const initialTotal = initialStats.data.totalVisits;
    console.log(`Baseline Unique: ${initialUnique}, Total: ${initialTotal}`);
    console.log('Result: PASS');

    // 3. Track a visitor
    console.log('\n[Test 3] Simulating first visit /api/visitor/track...');
    const track1 = await request('/api/visitor/track', { method: 'POST' });
    console.log(`Status: ${track1.status}`);
    console.log(`Data:`, track1.data);
    if (track1.status !== 200 || !track1.data.success) {
      throw new Error(`Tracking failed`);
    }
    console.log('Result: PASS');

    // 4. Verify stats updated
    console.log('\n[Test 4] Verifying stats update...');
    const statsAfter1 = await request('/api/visitor/stats', {
      method: 'GET',
      headers: { 'x-admin-password': 'Jilan@123' }
    });
    console.log(`Status: ${statsAfter1.status}`);
    console.log(`Data:`, statsAfter1.data);
    
    // Calculate difference
    const diffUnique1 = statsAfter1.data.uniqueVisitors - initialUnique;
    const diffTotal1 = statsAfter1.data.totalVisits - initialTotal;
    console.log(`Change -> Unique: +${diffUnique1}, Total: +${diffTotal1}`);
    
    if (diffTotal1 !== 1) {
      throw new Error(`Expected total visit count to increase by 1, but got +${diffTotal1}`);
    }
    console.log('Result: PASS');

    // 5. Track again with exact same parameters (refresh)
    console.log('\n[Test 5] Simulating page refresh (same visitor)...');
    const track2 = await request('/api/visitor/track', { method: 'POST' });
    console.log(`Status: ${track2.status}`);
    console.log(`Data:`, track2.data);
    if (track2.status !== 200) {
      throw new Error(`Refreshed tracking failed`);
    }
    console.log('Result: PASS');

    // 6. Verify stats update after refresh
    console.log('\n[Test 6] Verifying stats update after refresh...');
    const statsAfter2 = await request('/api/visitor/stats', {
      method: 'GET',
      headers: { 'x-admin-password': 'Jilan@123' }
    });
    console.log(`Status: ${statsAfter2.status}`);
    console.log(`Data:`, statsAfter2.data);
    
    const diffUnique2 = statsAfter2.data.uniqueVisitors - statsAfter1.data.uniqueVisitors;
    const diffTotal2 = statsAfter2.data.totalVisits - statsAfter1.data.totalVisits;
    console.log(`Change -> Unique: +${diffUnique2}, Total: +${diffTotal2}`);
    
    if (diffUnique2 !== 0) {
      throw new Error(`Expected unique visitors count to stay the same on refresh, but got +${diffUnique2}`);
    }
    if (diffTotal2 !== 1) {
      throw new Error(`Expected total visits count to increase by 1 on refresh, but got +${diffTotal2}`);
    }
    console.log('Result: PASS');

    // 7. Track with different User Agent (simulating different visitor)
    console.log('\n[Test 7] Simulating new unique visitor (different User-Agent)...');
    const trackNew = await request('/api/visitor/track', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) TestAgent/2.0'
      }
    });
    console.log(`Status: ${trackNew.status}`);
    console.log(`Data:`, trackNew.data);
    if (trackNew.status !== 200) {
      throw new Error(`New visitor tracking failed`);
    }
    console.log('Result: PASS');

    // 8. Verify stats update after new unique visitor
    console.log('\n[Test 8] Verifying stats update after new unique visitor...');
    const statsAfterNew = await request('/api/visitor/stats', {
      method: 'GET',
      headers: { 'x-admin-password': 'Jilan@123' }
    });
    console.log(`Status: ${statsAfterNew.status}`);
    console.log(`Data:`, statsAfterNew.data);

    const diffUniqueNew = statsAfterNew.data.uniqueVisitors - statsAfter2.data.uniqueVisitors;
    const diffTotalNew = statsAfterNew.data.totalVisits - statsAfter2.data.totalVisits;
    console.log(`Change -> Unique: +${diffUniqueNew}, Total: +${diffTotalNew}`);
    
    if (diffUniqueNew !== 1) {
      throw new Error(`Expected unique visitors count to increase by 1, but got +${diffUniqueNew}`);
    }
    if (diffTotalNew !== 1) {
      throw new Error(`Expected total visits count to increase by 1, but got +${diffTotalNew}`);
    }
    console.log('Result: PASS');

    console.log('\n--- ALL VISITOR TRACKING INTEGRATION TESTS PASSED SUCCESSFULLY! ---');
  } catch (error) {
    console.error('\n[TEST FAILURE]:', error.message);
    process.exit(1);
  }
}

runTests();
