var root = document.documentElement;

function init () {
};

const activeElement = {
  removeActive: (element = document, className = "active", selector = ".active" ) => {
    let activeElements = element.querySelectorAll(selector);
    [...activeElements]?.map((e) => e.classList.remove(className));
  },
  setActive: (element, className = "active") => {
    element.classList.add(className);
  }
}

function onLocationClickHandler () {
  activeNavSize(this.event.target);
  activeElement.removeActive();
  activeElement.setActive(this.event.target);
};

const activeNavSize = (element) => {
  const {offsetLeft, clientWidth} = element;
  root.style.setProperty('--activeNavSize', (clientWidth)/10);
  root.style.setProperty('--activeNavCenter', `${offsetLeft}px`);
}

(function () {
  let navigation = document.querySelector('nav');
  // let navigationElements = navigation?.children;
})();