import Barebones from '../barebones/client/Barebones.js';

jsRequire('/barebones/client/Module.js');

jsRequire('/services/EmailService.js');
jsRequire('/services/PostService.js');

var barebones = new Barebones();

barebones
    .registerService('PostService', () => new container.PostService())
    .registerService('EmailService', () => new container.EmailService())

barebones.init(document.body);
