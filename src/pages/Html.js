import { html } from 'swtl';

export function Html({children, title, styles = []}) {
  return html`
    <html lang="en">
      <head>
        <meta name="view-transition" content="same-origin" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
        <meta name="Description" content="swtl demo">
        <title>${title ?? ''}</title>
        <style>
          ::view-transition-old(section),
          ::view-transition-new(section) {
            animation: none;
          }
          ::view-transition-old(icon-0),
          ::view-transition-new(icon-0) {
            animation: none;
          }
          ::view-transition-old(icon-1),
          ::view-transition-new(icon-1) {
            animation: none;
          }
          ::view-transition-old(icon-2),
          ::view-transition-new(icon-2) {
            animation: none;
          }
          ::view-transition-old(icon-3),
          ::view-transition-new(icon-3) {
            animation: none;
          }
          ::view-transition-old(icon-4),
          ::view-transition-new(icon-4) {
            animation: none;
          }
          ::view-transition-old(icon-5),
          ::view-transition-new(icon-5) {
            animation: none;
          }
          ::view-transition-old(icon-6),
          ::view-transition-new(icon-6) {
            animation: none;
          }
          ::view-transition-old(icon-7),
          ::view-transition-new(icon-7) {
            animation: none;
          }
          ::view-transition-old(icon-8),
          ::view-transition-new(icon-8) {
            animation: none;
          }

          * {
            margin: 0;
            padding: 0;
            font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif 
          }

          body {
            background-color: #ececec;
          }

          header {
            height: 70px;
            width: 100%;
            background-color: white;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 4px 0px;
            margin-bottom: 80px;
          }

          header > div {
            display: flex;
            align-items: center;
            height: 100%;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }

          section {
            margin-top: 30px;
            margin-bottom: 30px;
            max-width: 600px;
            border-radius: 8px;
            background: white;
            margin-left: auto;
            margin-right: auto;
            padding: 10px;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 4px 0px;
          }

          h2 {
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .grid {
            display: grid;
            gap: 1px;
            grid-template-columns: repeat(3, 1fr);
          }

          .grid div {
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .icon svg {
            width: 50px;
            height: 50px;
          }

          .icon {
            border-radius: 8px;
          }

          .icon:hover {
            background-color: #ececec;
          }

          .big-icon {
            display: flex;
            justify-content: center;
          }

          .big-icon svg {
            width: 200px;
            height: 200px;
            margin-bottom: 40px;
          }

          h3 {
            margin-bottom: 12px;
          }

          p {
            margin-bottom: 24px;
          }

          a.back {
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            display: block;
            margin-bottom: 20px;
          }

        </style>
        ${styles}
      </head>
      <body>
        <header>
          <div>
            <h1>swtl</h1>
          </div>
        </header>

        <main>
          ${children}
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
        </script>
      </body>
    </html>
  `
}
