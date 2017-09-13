# Imperial theme
Een html free theme herwerken to Drupal theme https://bootstrapmade.com/imperial-free-onepage-bootstrap-theme/

## Tools
Yarn als componenten manager voor de dev dependencies (gulp).  
Bower als componenten manager voor site dependencies (bootstrap, font-awesome and animate.css)

## Werkwijze
Na clone van het project in de hoofdroot met cmd ```yarn install ``` alle dev dependencies binnen halen, 
 welke dit zijn is terug te vinden in de file package.json onder 'devDependencies'.  
 In de src directory met cmd ```bower install``` alle site dependencies, welke? Zie bower.json  
   
   Terug in de hoofdroot met cmd ```yarn start``` of ```gulp``` wordt de gulpfile.js uitgevoerd deze creëert een dist 
   folder met alle file nodig voor de theme.
   
   ### Gulp
   gulp-sass = van scss naar css en comprimeren  
   gulp-uglify = js files comprimeren  
   gulp-imagemin = images comprimeren  
   gulp-sourcemaps = om een sourcemap toe te voegen aan het styles.css  
   gulp-rimraf = om de dist folder op te ruimen
   

