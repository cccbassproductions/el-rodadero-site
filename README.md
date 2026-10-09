# El Rodadero website

A static, nine-page site for the Santa Marta apartment. No build step and no install.

## Open it in Cursor

1. Download and unzip this folder.
2. In Cursor: File → Open Folder → choose `el-rodadero-site`.
3. Serve the folder locally (needed for clean URLs), e.g. `python3 -m http.server 5173`.
4. Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

## Pages

URLs omit `.html` by using a folder per page:

- `/` — Home (`index.html`)
- `/apartment/` — Rooms, beds, kitchen, views
- `/amenities/` — Every listed amenity, plus the 15th-floor roof
- `/neighborhood/` — El Rodadero, walking, day trips
- `/getting-here/` — Buses, terminal, taxi, parking, camera
- `/check-in/` — Registration, wristband, lockbox, guest access
- `/house-guide/` — Full house manual, rules, pets, checkout
- `/faq/` — FAQ
- `/gallery/` — Photos

Shared layout: `css/styles.css` and `js/site.js`.

## Photos

Put images in `photos/` using the names in `photos/README.txt`. If a file is missing, the color placeholder stays. Do not invent an address, nightly rate, Wi-Fi password, or lockbox code — those are sent after registration.

## Editing in Cursor

Ask Cursor to change copy, colors, or layout. Design tokens live in `:root` at the top of `css/styles.css`. Keep house rules worded as written.
