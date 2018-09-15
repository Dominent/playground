import Barebones from '../barebones/Barebones.js';

import AppRoot from '../modules/AppRoot.js';
import Navbar from '../modules/Navbar.js';

// jsRequire('/barebones/client/Module.js');

// jsRequire('/services/EmailService.js');
// jsRequire('/services/PostService.js');

var barebones = new Barebones();

// barebones
//     .registerService('PostService', () => new container.PostService())
//     .registerService('EmailService', () => new container.EmailService())

barebones.init(document.body, {
    'AppRoot': AppRoot,
    'Navbar': Navbar,
});
