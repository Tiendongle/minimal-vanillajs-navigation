// HANDLE NAVIGATION SETUP //
const NavigationFunctions = {
  createNavigationRoot: (id = 'navigation') => {
    const mainNav = document.createElement('nav');
    mainNav.setAttribute('id', id);
    return mainNav;
  },
  createNavigationElements: (wrapper, data) => {
    if (!wrapper || !data || !Array.isArray(data)) return;
    data.map(({label, section}) => {
      const attributes = {
        id: section,
        role: 'button',
      };

      let element = document.createElement('button');
      setAttributes(element, attributes);
      element.addEventListener('click', onLocationClickHandler);
      element.innerText = label;
      wrapper.appendChild(element);
    });
  }
}
// END NAVIGATION SETUP //

// HANDLER FUNCTIONS //
function onLocationClickHandler (event) {
  activeElement.removeActive();
  activeElement.setActive(event.target);
  activeElement.activeNavSize(event.target);
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
  return data;
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
    root.style.setProperty('--activeNavSize', (clientWidth));
    root.style.setProperty('--activeNavCenter', `${offsetLeft}px`);
  }
}

// ---- INITIALIZATION ---- //
async function init () {
  const data = await getJson();

  navigation = document.querySelector('nav') || NavigationFunctions.createNavigationRoot();
  NavigationFunctions.createNavigationElements(navigation, data?.cities);
  document.body.append(navigation);
  // Set Initial Active State
  if(navigation?.children) {
    const initial = navigation?.children?.[0]; // TODO: Should be refactored to set specific city as the initial state
    activeElement.activeNavSize(initial);
    activeElement.setActive(initial);
  }
};

var root = document.documentElement;
var navigation;

(function () {
  init();
})();