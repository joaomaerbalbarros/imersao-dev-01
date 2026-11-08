# Toyota Knowledge Base

First project from Alura's **Imersão Dev** program: a static page that loads a small JSON dataset of Toyota models and lets you search it.

**Live demo:** https://joaomaerbalbarros.github.io/imersao-dev-01/

## How it works

- On page load, `script.js` fetches `data.json` (7 models: Corolla, Hilux, SW4, RAV4, Yaris, Corolla Cross and Camry) and renders one card per model with its name, launch year, description and a link to the official page.
- The search runs on the button click or on Enter. It matches the term, case-insensitive, against the model's **name**, **description** and **year**. An empty search shows every model.
- Results are ranked by relevance: an exact name match comes first, then names that start with the term, then the rest in their original order.
- If nothing matches, the page shows a "no results" message.

The interface and the dataset are in Portuguese.

## Files

| File | Contents |
|---|---|
| `index.html` | page structure: header with the search field, card container and footer |
| `style.css` | layout and card styling |
| `script.js` | data loading, filtering, ranking and card rendering |
| `data.json` | the dataset (`nome`, `descricao`, `ano`, `link`, `tags`) |

## Running locally

`fetch` does not work when the page is opened straight from the file system, so serve the folder over HTTP:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Stack

HTML · CSS · JavaScript (no frameworks) · GitHub Pages
