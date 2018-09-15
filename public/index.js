import Barebones from '../barebones/Barebones.js';

import AppRoot from '../modules/AppRoot.js';
import Navbar from '../modules/Navbar.js';
import Jumbotron from '../modules/Jumbotron.js';
import Items from '../modules/Items.js';
import Footer from '../modules/Footer.js';

var barebones = new Barebones();

barebones.init(document.body, {
    'AppRoot': AppRoot,
    'Navbar': Navbar,
    'Jumbotron': Jumbotron,
    'Items': Items,
    'Footer': Footer,
});
