const fs0=require('fs');for(const d of ['frames','out'])fs0.mkdirSync(require('path').join(__dirname,d),{recursive:true});
const path=require('path');const { chromium } = require(path.join(__dirname,'../../apps/web/node_modules/playwright'));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:600},deviceScaleFactor:1});
await p.goto('file://'+path.join(__dirname,'src/cyber-banner.html'));await p.waitForLoadState('networkidle');await p.evaluate(()=>window.ready);
const el=p.locator('#art');
for(let t=50;t>=0;t--){await p.evaluate(t=>window.frame(t),t);await el.screenshot({path:path.join(__dirname,'frames',`f${String(50-t).padStart(2,'0')}.png`)});}
await b.close();console.log('frames done');})();
