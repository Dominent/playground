jsRequire('/barebones/client/Barebones.js');

jsRequire('/services/EmailService.js');
jsRequire('/services/PostService.js');

var barebones = new container.Barebones();

barebones
    .registerService('PostService', () => new container.PostService())
    .registerService('EmailService', () => new container.EmailService())

barebones.init(document.body);
