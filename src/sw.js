import { html, Router } from 'swtl';
import { Await, when } from 'swtl/await.js';
import { Html } from './pages/Html.js';
import { Spinner, spinnerStyles } from './components/Spinner.js';
import * as icons from './icons/index.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const map = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
  '4': 'E',
  '5': 'F',
  '6': 'G',
  '7': 'H',
  '8': 'I',
}

const titles = {
  '0': 'Some thing',
  '1': 'Some thing',
  '2': 'Some thing',
  '3': 'Some thing',
  '4': 'Some thing',
  '5': 'Some thing',
  '6': 'Some thing',
  '7': 'Some thing',
  '8': 'Some thing',
}

const router = new Router({
  routes: [
    {
      path: '/',
      render: ({params, query, request}) => html`
        <${Html} title="swtl" styles=${[spinnerStyles]}>
          <h2>Dashboard</h2>
          <section style="view-transition-name: section;">
            <div class="grid">
              ${Array.from({length: 9}, (_, i) => html`
                <${Await} promise=${() => sleep(rand(500,3000))}>
                  ${({pending, success}, data) => html`
                    ${when(pending, () => html`<${Spinner}/>`)}
                    ${when(success, () => html`
                      <a href="/${i}">
                        <div class="icon">
                          <${icons[map[i]]}/>
                        </div>
                      </a>
                    `)}
                  `}
                <//>
              `)}
            </div>
          </section>
        <//>
      `
    },
    {
      path: '/:id',
      render: ({params, query, request}) => html`
        <${Html} title="swtl">
          <h2>${titles[params.id]}</h2>
          <section style="view-transition-name: section;">
            <div class="big-icon">
              <${icons[map[params.id]]}/>
            </div>
            <h3>Some content</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
            <h3>Some more contents</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </section>
        <//>
      `
    }
  ],
});

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    clients.claim().then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) =>
          client.postMessage({ type: "SW_ACTIVATED" })
        );
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(router.handleRequest(event.request));
  }
});

