# Imperial theme
Een html free theme herwerken to Drupal theme https://bootstrapmade.com/imperial-free-onepage-bootstrap-theme/

## Component base structure
Lijkt er op dat het theme met src en dist folder stucture toch niet zo simpel is of nog niet klaar 
http://www.mediacurrent.com/blog/rethinking-theme-structure-drupal-8.  
Ga voor dit project de src folder laten vallen en deze naar de hoofdroot brengen, ga dit toch verder onderzoeken.

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
   

