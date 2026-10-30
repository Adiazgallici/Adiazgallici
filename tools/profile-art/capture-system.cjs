require('fs').mkdirSync(require('path').join(__dirname,'out'),{recursive:true});
const path=require('path');const { chromium } = require(path.join(__dirname,'../../apps/web/node_modules/playwright'));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:1000},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:3017/',{waitUntil:'networkidle'});
await p.addStyleTag({content:`.site-header{display:none!important}
 .system-section.wrap{max-width:1300px;padding:44px 48px 48px!important;border-top:0!important}
 .chain-panel{display:none!important}
 .chain-inline{display:block!important;grid-column:auto!important;margin-top:14px}
 .chain-inline p:not(.work-proof){display:none!important}
 .chain-inline .work-proof{font-size:13px;gap:8px}
 .chain-station.is-selected .chain-node{background:var(--bg)!important;box-shadow:none!important}
 .chain-station.is-selected .chain-place{color:var(--ink-dim)}
 .chain-place{color:var(--ink)!important}
 .chain-return{margin-top:28px}
 .chain-loop{margin-top:40px}`});
const s=p.locator('#lessio-stock');await s.scrollIntoViewIfNeeded();await p.locator('.chain').scrollIntoViewIfNeeded();
await p.waitForFunction(()=>document.querySelector('.chain').classList.contains('has-travelled'),null,{timeout:15000});
await p.waitForTimeout(500);await s.screenshot({path:path.join(__dirname,'out','cyber-lessio-system.png')});
await b.close();console.log('ok');})();
