const fs = require('fs');
const path = require('path');
const https = require('https');

const assets = JSON.parse(fs.readFileSync('assets_list.json', 'utf8'));

function download(urlPath) {
  return new Promise((resolve) => {
    const fullUrl = `https://www.pybotaisolutions.com${urlPath}`;
    const localPath = path.join(__dirname, 'public', urlPath.replace(/^\//, ''));
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(localPath) && fs.statSync(localPath).size > 0) {
      return resolve({ urlPath, status: 'cached' });
    }

    const file = fs.createWriteStream(localPath);
    https.get(fullUrl, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
        return resolve({ urlPath, status: 'failed', code: res.statusCode });
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve({ urlPath, status: 'ok', size: fs.statSync(localPath).size });
      });
    }).on('error', (err) => {
      if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
      resolve({ urlPath, status: 'error', error: err.message });
    });
  });
}

async function run() {
  console.log(`Starting download of ${assets.length} assets...`);
  const concurrency = 6;
  const results = [];
  for (let i = 0; i < assets.length; i += concurrency) {
    const chunk = assets.slice(i, i + concurrency);
    const chunkRes = await Promise.all(chunk.map(download));
    results.push(...chunkRes);
    console.log(`Downloaded ${results.length}/${assets.length}...`);
  }
  const failed = results.filter(r => r.status !== 'ok' && r.status !== 'cached');
  console.log(`Finished. OK/Cached: ${results.length - failed.length}, Failed: ${failed.length}`);
  if (failed.length > 0) {
    console.log('Failed assets:', failed);
  }
}

run();
