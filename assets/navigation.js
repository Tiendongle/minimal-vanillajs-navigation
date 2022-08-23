// HANDLE NAVIGATION SETUP //
const NavigationFunctions = {
  createNavigationRoot: (id = 'navigation') => {
    const mainNav = document.createElement('nav');
    mainNav.setAttribute('id', id);
    return mainNav;
  },
  createNavigationElements: async (wrapper, data) => {
    if (!wrapper || !data || !Array.isArray(data)) return;
    let timezones;
    try {
      await getTimezones().then(res => timezones = res);
    } catch (err) {
      console.log(err);
    }

    data.map(({label, section}) => {
      const attributes = {
        id: section,
        role: 'button',
        'data-tz': timezones.get(section),
      };

      let element = document.createElement('button');
      setAttributes(element, attributes);
      element.addEventListener('click', onLocationClickHandler);
      element.innerText = label;
      wrapper.appendChild(element);
    });
  },
}
// END NAVIGATION SETUP //

// HANDLER FUNCTIONS //
function onLocationClickHandler (event) {
  activeElement.removeActive();
  activeElement.setActive(event.target);
  activeElement.activeNavSize(event.target);
  activeElement.setTime(event.target);
};
// END HANDLER FUNCTIONS //

// HELPER FUNCTIONS //
function setAttributes(element, attrs) {
  Object.entries(attrs)
    .forEach(([key, value]) => element.setAttribute(key, value));
}

const handleErrors = (response) => {
  if (!response.ok) throw Error(response.statusText);
  return response.json();
}
// END HELPER FUNCTIONS

const getJson = async () => {
  const data = await fetch('/assets/data/navigation.json')
    .then(handleErrors)
    .then(json => json)
    .catch(error => console.log(error));
  return await data;
}

const getTimezones = async () => {
  // Get the timezone data
  let TIMEZONE_DATA;
  await fetch('/assets/data/timezones.json')
    .then(handleErrors)
    .then(json => TIMEZONE_DATA = json.cities)
    .catch((e) => console.log(e));

  // Transform the timezone data to a dictionary
  const timezoneMap = new Map();
  TIMEZONE_DATA.map(({location, tz}) => timezoneMap.set(location, tz));

  return timezoneMap;
}


const activeElement = {
  removeActive: (element = document, className = "active", selector = ".active" ) => {
    let activeElements = element.querySelectorAll(selector);
    [...activeElements]?.map((e) => e.classList.remove(className));
  },
  setActive: (element, className = "active") => {
    element.classList.add(className);
  },
  activeNavSize: (element) => { // SET ANIMATION PROPERTIES
    const {offsetLeft, clientWidth} = element;
    root.style.setProperty('--activeNavSize', (clientWidth/10));
    root.style.setProperty('--activeNavCenter', `${offsetLeft}px`);
  },
  setTime: (element) => {
    const timeOptions = {
      hour: '2-digit',
      minute:'2-digit',
      hour12: false,
      timeZone: element?.dataset?.tz,
    };

    const currentTime = new Date(Date.now()).toLocaleString([], timeOptions);
    element.setAttribute('data-time', currentTime);
  }
}

// ---- INITIALIZATION ---- //
async function init () {
  const data = await getJson();

  navigation = document.querySelector('nav') || NavigationFunctions.createNavigationRoot();
  await NavigationFunctions.createNavigationElements(navigation, data?.cities);
  document.body.append(navigation);
  // Set Initial Active State
  if(navigation?.children) {
    const initial = navigation?.children?.[0]; // TODO: Should be refactored to set specific city as the initial state
    activeElement.activeNavSize(initial);
    activeElement.setActive(initial);
    activeElement.setTime(initial);
  }
};

var root = document.documentElement;
var navigation;

(function () {
  init();
})();