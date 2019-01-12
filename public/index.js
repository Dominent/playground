import Barebones from '../barebones/Barebones.js';

import AppRoot from '../modules/AppRoot.js';
import Navbar from '../modules/Navbar.js';
import Jumbotron from '../modules/Jumbotron.js';
import Items from '../modules/Items.js';
import Footer from '../modules/Footer.js';
import Contacts from '../modules/Contacts.js';

var barebones = new Barebones();

barebones.init(document.body, {
    'AppRoot': AppRoot,
    'Navbar': Navbar,
    'Jumbotron': Jumbotron,
    'Items': Items,
    'Footer': Footer,
    'Contacts': Contacts
});

// new Barebones({
//      components: {
//          'app-root': AppRoot,
//          'navbar': Navbar,
//          'jumbotron': Jumbotron,
//          'items': Items,
//          'footer': Footer,
//          'contacts': Contacts
//      },
//      bootstrap: 'app-root'
// }).mount('#app');

// Principles:
// 1. Simplicity
// 2. As less external dependencies the better
// 3. Prefer the full naming, not the shorter one

// TODO(PPavlov): You do not need template, everything is modules or components
// TODO(PPavlov): Decouple solution from server
// TODO(PPavlov): Leave syntax to {[ for multiline ]} and {{ for single line }}
// TODO(PPavlov): If possible leave syntax to only {[]} for both multi and single line
// TODO(PPavlov): leave teplates to be *.html
// TODO(PPavlov): Introduce Virtual Dom

//js-on:click=""
//js-bind:title=""
//js:model=""
//js:component="app-root"

// class AppRoot extends Component {
//     template = () => TAppRoot;
// }

// {
//     template: () => TAppRoot;
// }