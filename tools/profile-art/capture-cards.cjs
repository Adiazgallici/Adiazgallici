require('fs').mkdirSync(require('path').join(__dirname,'out'),{recursive:true});
const path=require('path');const { chromium } = require(path.join(__dirname,'../../apps/web/node_modules/playwright'));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:1000},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:3017/',{waitUntil:'networkidle'});
await p.addStyleTag({content:`
 .site-header{display:none!important}
 .work-section.wrap,.map-section.wrap{max-width:1300px;padding-left:0;padding-right:0}
 .work-item{padding:44px 48px!important;border-top:0!important;gap:48px!important}
 .map-section{padding:40px 48px 48px!important;border-top:0!important}
 .map-section .section-head{margin-bottom:28px}
 .phone-frame{right:-4px!important}
`});
const items=await p.locator('li.work-item').all();
for(const it of items){const cls=await it.getAttribute('class');const slug=cls.match(/work-([\w-]+)/g).pop().replace('work-','');
 await it.scrollIntoViewIfNeeded();await p.waitForTimeout(900);
 await it.screenshot({path:path.join(__dirname,'out',`cyber-${slug}.png`)});console.log('card',slug);}
const map=p.locator('#map');await map.scrollIntoViewIfNeeded();await p.waitForTimeout(500);await map.screenshot({path:path.join(__dirname,'out','cyber-map.png')});
await b.close();})();
