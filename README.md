# tiqqun AI

TODO

- [X] update component management
  - I believe that making this a single state object with a string key will simplify the process of switching from component to component. It will also clarify which state objects are data and which are for opening components.
	- [ ] the modals can perhaps be moved to their own components?
- [ ] news search
  - src/components/News/NewsSearch.js

## assets

- css
- img

## data

json files containing saved data used for the app.

- countries.json: an array containing an object for each country with its name and two-letter country code
- news (dir): each article retrieved from newsapi.org, saved as a json file
- quotes.json: random IC quotes

## utils

serverside functions (i.e., run with node from the command line):

- fetchNews() submits an API request to the newsdata.io API and saves the results to the news folder.
- readNews() reads every json file in data/news and returns them an array.

