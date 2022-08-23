# Minimal Navigation Component
---

### Summary
This project is a minimal vanilla js menu component focused on working best in Safari.
The premise of this project is to generate a menu component via JSON file, and to create some simple interaction using ES6/JS, HTML, and CSS only.

Bonus interaction to add local time to selected location was developed as well.

### Approach
The animations for this project uses the CSS `transition` properties to interprolate the animation frames. This was to avoid the use of any external libraries. (This could also be achieved with animating in javascript with `requestAnimationFrames` as well).

The javascript catches the interactions and sets the classes and information required to trigger the animations correctly. Animation was focused on using the only the performant property: `transform`. `color` and `opacity` was added sparingly as well.

CSS vars are set in Javascript and used to transtiton the elements into place.

---

### To View
This project is a basic HTML, CSS, JS based project. As this project ingests JSON files via the `fetch` API, you will serve the files via a web server of your choosing.

#### Server Setup
While NodeJS is not required, there is a simple server set up to view the project if you do have it installed.

Run `npm install` to install the dependancies
then `npm run server` to get the URL and port to open in your browser.

### Testing
This project was tested to work using Safari 14.1.2 (my Macbook's current is on on Mojave).

---

### Todo:
> These are the todos that would be planned given more time.
- Write animations to run on `requestAnimationFrames` (RAF) with easing effects
- Handle `onResize` (line does not update on browser refresh)
- Optimize for mobile
- Fix Chrome bug
  - Underline doesn't seem to be the right length in Chrome
- Refactor clock to update every minute through `requestAnimationFrame`