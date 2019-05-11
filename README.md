# DropIn

Collaborators: Kevin Shin, Juliet Kelson, Saloni Daga, David Barrette

A web-application that provides a visual interface to help students and advisors plan a major, representing the courses and prerequisite logic as a directed graph. 


### Set Up
Welcome panel to choose major
Select taken courses
Animation with instructions on how to use software
Redirected to screen to begin planning: Panels for available courses, planned/taken courses, instruction bar, requirements panel 

### Usage
1. Plan a major and figure out pre-requisites visually
2. Click on a course to read description
2. Drag available courses to semester column and have Pre-requisites pop up with arrows 
3. Delete/ Mark as taken/ un-taken
4. Align graph to de-clutter
5. Gratification of planning fully when requirements fully satisfied !!
 
### Functions


### Tests
To run tests the following steps are necessary:
1. In most files in the "js" directory, there are two types of import statements.  They look like the following:

* `import {courseCatalog} from "./prereq_dictionary.js";`
* `const courseCatalog = require("./prereq_dictionary.js");`

Comment out _all_ import statements of the _first_ type and uncomment _all_ import statements of the _second_ type.

This will allow Jest to read the import statements.

2. Similarly, there are two types of export statements in the same directories:
* `export {dfs};`
* `module.exports = dfs;`

Comment out _all_ export statements of the _first_ type and uncomment _all_ export statements of the _second_ type.

This will allow Jest to read the export statements.

3. Go to the `__tests__ `directory in the terminal and run `npm run test` to run all tests.

To run a specific test, run `npm run test fileName.test.js`

### Future Work
1. Expand to incorporate other majors
2. Scrape major data from web so as to not have to manually log courses and when they are offered
3. Have plans A, B, C to compare different paths 
4. Export major plan as a pdf.
5. Dynamically reshape divs based on screen size
6. Have number of semesters change for trimester schools and J terms present for schools that offer them

### Acknowledgements 



