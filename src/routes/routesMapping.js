// src/routesMapping.js
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import routes from './routes';

const routesMapping = [
  { path: routes.HOME, component: Home },
  { path: routes.ABOUT, component: About },
  { path: routes.PROJECTS, component: Projects },
  { path: routes.CONTACT, component: Contact },
];

export default routesMapping;