(()=>{var M=Object.freeze,k=Object.defineProperty;var R=(e,t)=>M(k(e,"raw",{value:M(t||e.slice())}));var N=Symbol("component"),$=Symbol("async");var T="TEXT",L="COMPONENT",m="NONE",O="PROP",w="CHILDREN",y="SET_PROP",b="PROP_VAL";function*s(e,...t){if(!t.length)yield*e;else if(!t.some(l=>typeof l=="function"))yield*e.reduce((l,r,i)=>[...l,r,...t.length>i?[t[i]]:[]],[]);else{let l=T,r=m,i=m,a=[];for(let n=0;n<e.length;n++){let f="",h={kind:N,properties:[],children:[],fn:void 0};for(let o=0;o<e[n].length;o++){let c=e[n][o];if(l===T)c==="<"&&!e[n][o+1]&&typeof t[n]=="function"?(l=L,h.fn=t[n],a.push(h)):f+=c;else if(l===L)if(r===O){let d=a[a.length-1],g=d?.properties[d.properties.length-1];if(i===y){let p="";for(;e[n][o]!=="="&&e[n][o]!=="/"&&e[n][o]!==">"&&e[n][o]!=='"'&&e[n][o]!=="'"&&e[n][o]!==" "&&p!=="...";)p+=e[n][o],o++;if(e[n][o]==="=")i=b;else if(e[n][o]==="/"&&r===O){r=m,i=m;let u=a.pop();a.length||(f="",yield u)}else e[n][o]===">"&&r===O&&(r=w,i=m);p==="..."?d.properties.push(...Object.entries(t[n]).map(([u,q])=>({name:u,value:q}))):p&&d.properties.push({name:p,value:!0})}else if(i===b){if(e[n][o]==='"'||e[n][o]==="'"){let p=e[n][o];if(!e[n][o+1])g.value=t[n],i=y;else{let u="";for(o++;e[n][o]!==p;)u+=e[n][o],o++;g.value=u||"",i=y}}else if(e[n][o-1]){let p="";for(;e[n][o]!==" "&&e[n][o]!=="/"&&e[n][o]!==">";)p+=e[n][o],o++;if(g.value=p||"",i=y,e[n][o]==="/"){let u=a.pop();a.length||(yield u)}}else if(g.value=t[n-1],i=y,e[n][o]===">")i=m,r=w;else if(e[n][o]==="/"){let p=a.pop();a.length||(yield p)}}}else if(r===w){let d=a[a.length-1];if(e[n][o+1]==="/"&&e[n][o+2]==="/"){f&&(d.children.push(f),f=""),o+=3;let g=a.pop();a.length||(l=T,r=m,yield g)}else e[n][o]==="<"&&!e[n][o+1]&&typeof t[n]=="function"?(f&&(d.children.push(f),f=""),r=O,i=y,h.fn=t[n],a.push(h)):e[n][o+1]?f+=e[n][o]:f&&(f+=e[n][o],d.children.push(f))}else if(c===">")r=w;else if(c===" ")r=O,i=y;else if(c==="/"&&e[n][o+1]===">"){l=T,r=m;let d=a.pop();a.length||(f="",yield d),o++}else f+=c;else f+=c}r===w&&t.length>n&&a[a.length-1].children.push(t[n]),f&&r!==w&&(yield f),a.length>1&&h.fn&&a[a.length-2].children.push(h),t.length>n&&l!==L&&(yield t[n])}}}function S({task:e,children:t}){return{task:e,template:t.find(l=>typeof l=="function")}}S.kind=$;var v=(e,t)=>e?t():"";function Y(e){return typeof e.getReader=="function"}async function*I(e){let t=e.getReader(),l=new TextDecoder("utf-8");try{for(;;){let{done:r,value:i}=await t.read();if(r)return;yield l.decode(i)}}finally{t.releaseLock()}}async function*W(e){if(Y(e))for await(let t of I(e))yield t;else for await(let t of e)yield t}async function*_(e,t){if(typeof e=="string")yield e;else if(Array.isArray(e))yield*E(e,t);else if(typeof e.then=="function"){let l=await e;yield*_(l,t)}else if(e instanceof Response&&e.body)yield*W(e.body);else if(e[Symbol.asyncIterator]||e[Symbol.iterator])yield*E(e,t);else if(e?.fn?.kind===$){let{task:l,template:r}=e.fn({...e.properties.reduce((a,n)=>({...a,[n.name]:n.value}),{}),children:e.children}),i=t.length;t.push(l().then(a=>({id:i,template:r({state:"success",data:a})})).catch(a=>({id:i,template:r({state:"error",error:a})}))),yield*E(s`<pending-task style="display: contents;" data-id="${i.toString()}">${r({state:"pending"})}</pending-task>`,t)}else e.kind===N?yield*E(await e.fn({...e.properties.reduce((l,r)=>({...l,[r.name]:r.value}),{}),children:e.children}),t):yield e.toString()}async function*E(e,t){for await(let l of e)yield*_(l,t)}var A;async function*x(e){let t=[];for(yield*E(e,t),t=t.map(l=>{let r=l.then(i=>(t.splice(t.indexOf(r),1),i));return r});t.length>0;){let l=await Promise.race(t),{id:r,template:i}=l;yield*x(s(A||(A=R([`
      <template data-id="`,'">',`</template>
      <script>
        {
          let toReplace = document.querySelector('pending-task[data-id="`,`"]');
          const template = document.querySelector('template[data-id="`,`"]').content.cloneNode(true);
          toReplace.replaceWith(template);
        }
      <\/script>
    `])),r.toString(),i,r.toString(),r.toString()))}}var P=class{constructor({routes:t,fallback:l,baseHref:r=""}){this.fallback={render:l,params:{}},this.routes=t.map(i=>({...i,urlPattern:new URLPattern({pathname:`${r}${i.path}`,search:"*",hash:"*"})}))}async handleRequest(t){let l=new URL(t.url),r;for(let a of this.routes){let n=a.urlPattern.exec(l);if(n){r={render:a.render,params:n?.pathname?.groups??{}};break}}let i=r?.render??this?.fallback?.render;if(i){let a=Object.fromEntries(new URLSearchParams(t.url.search)),n=x(i({query:a,params:r?.params,request:t})),f=new TextEncoder,h=new ReadableStream({async pull(o){let{value:c,done:d}=await n.next();d?o.close():o.enqueue(f.encode(c))}});return new Response(h,{status:200,headers:{"Content-Type":"text/html","Transfer-Encoding":"chunked"}})}}};var D;function C({children:e,title:t,styles:l=[]}){return s(D||(D=R([`
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
        <meta name="Description" content="swtl demo">
        <title>`,`</title>
        <style>
        </style>
        `,`
      </head>
      <body>
        <header>
          <h1>swtl</h1>
        </header>

        <main>
          `,`
        </main>
        <footer>
          footer
        </footer>
        <script>
          let refreshing;
          async function handleUpdate() {
            // check to see if there is a current active service worker
            const oldSw = (await navigator.serviceWorker.getRegistration())?.active?.state;

            navigator.serviceWorker.addEventListener('controllerchange', async () => {
              if (refreshing) return;

              // when the controllerchange event has fired, we get the new service worker
              const newSw = (await navigator.serviceWorker.getRegistration())?.active?.state;

              // if there was already an old activated service worker, and a new activating service worker, do the reload
              if (oldSw === 'activated' && newSw === 'activating') {
                refreshing = true;
                window.location.reload();
              }
            });
          }

          handleUpdate();
        <\/script>
      </body>
    </html>
  `])),t??"",l,e)}var B=new P({routes:[{path:"/",render:({params:e,query:t,request:l})=>s`
        <${C} title="swtl">
          Home
        <//>
      `},{path:"/out-of-order",render:({params:e,query:t,request:l})=>s`
        <${C} title="out of order">
          <ul>
            <li>
              <${S} task=${()=>new Promise(r=>setTimeout(()=>r({foo:"foo"}),3e3))}>
                ${({state:r,data:i})=>s`
                  ${v(r==="pending",()=>s`[PENDING] slow`)}
                  ${v(r==="success",()=>s`[RESOLVED] slow ${i.foo}`)}
                `}
              <//>
            </li>
            <li>
              <${S} task=${()=>new Promise(r=>setTimeout(()=>r({bar:"bar"}),1500))}>
                ${({state:r,data:i})=>s`
                  ${v(r==="pending",()=>s`[PENDING] fast`)}
                  ${v(r==="success",()=>s`[RESOLVED] fast ${i.bar}`)}
                `}
              <//>
            </li>
          </ul>
        <//>
      `}]});self.addEventListener("install",()=>{self.skipWaiting()});self.addEventListener("activate",e=>{e.waitUntil(clients.claim().then(()=>{self.clients.matchAll().then(t=>{t.forEach(l=>l.postMessage({type:"SW_ACTIVATED"}))})}))});self.addEventListener("fetch",e=>{e.request.mode==="navigate"&&e.respondWith(B.handleRequest(e.request))});})();
//# sourceMappingURL=sw.js.map
