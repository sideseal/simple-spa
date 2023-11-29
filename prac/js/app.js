function h(tag, attrs, ...children) {
  const element = document.createElement(tag);
  for (const key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
  children.forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child)
    } else {
      element.appendChild(document.createTextNode(cchild));
    }
  });
  return element;
}

const div = (...args) => h("div", ...args);
const span = (...args) => h("span", ...args);
const p = (...args) => h("p", ...args);

const app = document.querySelector('#app');

function PageHome() {
app.innerHTML = `<div class="main">
<div class="card">
  <h1>Counter <span class="count-view">0</span></h1>
  <div class="button-box">
    <button class="btn" id="increase">Increase</button>
    <button class="btn" id="decrease">Decrease</button>
  </div>
</div>
</div>
`;

let count = 0;
const countView = document.querySelector('.count-view');
const increaseBtn = document.querySelector('#increase');
const decreaseBtn = document.querySelector('#decrease');

increaseBtn.addEventListener('click', () => {
  count++;
  countView.textContent = count;
})
increaseBtn.addEventListener('click', () => {
  count--;
  countView.textContent = count;
})
}

function PageAbout() {
  const main = div({ class: "main" },
  div({class: "card" },
  h1({}, "About SPA"),
  p({}, "Lorem"))
  );
app.replaceChildren(main);
}
function PageContact() {
app.innerHTML = `
<div>
  Contact
</div>
`
}

const routes = {
'index.html': {
  title: 'Home',
  component: PageHome
},
'about.html': {
  title: 'About',
  component: PageAbout
}
}

function handleLink() {
const links = document.querySelectorAll('.navbar a');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    window.history.pushState(null, null, href);
    routes[href].component();
    // if (href === 'index.html') {
    //   window.history.pushState(null, null, href);
    //   PageHome();
    // } else if (href === 'about.html') {
    //   window.history.pushState(null, null, href);
    //   PageAbout();
    // }
  })
})
}
handleLink();
const path = window.location.pathname.replace('/', '');
routes[path].component();