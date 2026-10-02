# Chatapp

A historical React chat-interface exercise based on the [SitePoint ChatGPT clone tutorial](https://www.sitepoint.com/build-chatgpt-clone-react-openai-api/), bootstrapped with Create React App. It demonstrates message rendering, in-memory conversation history, reopening a conversation and clearing the session. It is learning work, not an original production AI service.

**Current behavior: local UI demo.** Replies are deterministic strings labeled as demo output. The app does not call a model provider, require an API key or produce AI answers. No current hosted demo is verified.

## Why provider calls were removed

The earlier implementation interpolated `REACT_APP_OPENAI_API_KEY` into a browser Authorization header. Create React App embeds those variables in client assets, exposing a configured key to visitors. Moving a key into a frontend `.env` file does not make it secret. The direct provider call has been removed so this tutorial can be inspected and run without that unsafe setup. This review did not retrieve credentials or audit the entire Git history.

A future live integration needs a backend that holds provider credentials, validates input, authenticates callers, limits usage and reports upstream failures. The browser should call that application API without a provider secret. That architecture is not implemented here. Follow [OpenAI's API key safety guidance](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety); if a key was ever publicly shipped, revoke/rotate it through its owner's account rather than merely deleting it from the current source. No account changes are performed by this repository.

## Run and check locally

Use Node.js/npm with the committed dependency lock. The project retains React 18 and Create React App 5 tooling; this change does not modernize those dependencies.

```sh
git clone https://github.com/benmcnulty/chatapp.git
cd chatapp
npm ci --ignore-scripts --no-audit --no-fund
npm start
```

Open <http://localhost:3000>. Enter a message, select Go, reopen it from History, or select Clear. All messages/history are held in React state and disappear on reload. No environment variables are required. The stylesheet imports a Google Font; that network request does not contain chat messages.

```sh
npm test -- --watchAll=false --runInBand
npm run build
```

The tests exercise the local UI, history/clear behavior, blank-input handling and absence of provider fetches. They do not certify full browser accessibility, responsive layout or a live API integration. The 2026-10-02 candidate passed the locked install with lifecycle scripts disabled,
both UI behavior tests and `npm run build` on Node 24 with CI mode enabled. The
existing CRA Babel/Browserslist maintenance warnings remain; dependency versions
were not upgraded. Candidate CI repeats the install/tests/build with read-only
repository permissions and has no deployment step. Build files are local
artifacts, not a deployment.

## Source and contributions

[`src/App.js`](src/App.js) owns UI state. [`src/components`](src/components) contains the message/input/history/clear views. The historical generated “learn React” test has been replaced with behavior checks. Input and history actions have accessible names/native buttons.

Keep tutorial attribution and the local-demo label visible. Any future backend should be reviewed and tested before enabling live calls; never restore a provider key to browser code. Licensed under [MIT](LICENSE), preserving the existing license and Create React App/tutorial provenance.
