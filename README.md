# DropIn

Collaborators: Kevin Shin, Juliet Kelson, Saloni Daga, David Barrette

A web-application that provides a visual interface to help students and advisors plan a major, representing the courses and prerequisite logic as a directed graph. 

### Set Up
In order to access the web-application directly on your computer, clone this repository using your favorite IDE or by simply typing `git clone [url]` in the terminal. Then, run the `index.html` file using your IDE. This should create a `localhost` that compiles the HTML and runs the application. All necessary libraries are included and linked from inside the repository, or accessed by a CDN.

### Main Usage/Functionality

1. Click on a course to read description.
2. Drag available courses to semester columns where pre-requisites will pop up with arrows following course logic.
3. Delete/Mark as Taken/Mark as UnTaken: Delete/ Mark as taken/un-taken selected courses.
4. Align: Align graph to center courses in semester bins.
5. Requirements Panel indicates missing requirements, and alerts user when graph consists of a full major. 

### Code Architecture

The project follows a MVC model, in which user-events trigger data-manipulations which then update the View. Our insight into the problem was to create an intermediary step between the Model and View called the "ViewModel", which translates user profile data into a convenient format which is readily drawn as a directed graph structure. To give an overview of the process, let's suppose that a user drags COMP221 from the top-status bar into the graph. Then, the following events are launched:
1. A depth-first search algorithm is run through a catalog, finding all courses that are prerequisites of COMP221, as well as their own prerequisites.
2. Each of these courses are pushed onto a Profile (if not present already), an array of objects representing courses with a status (e.g. `{course: COMP340, status: "taken"}`). The original dragged course is pushed with the dropped (x,y) coordinates of the mouse, and prerequisites are given random y values within the graph and x values left of the original (x,y). 
3. Algorithms recalculate several features from this new profile. These include information like the courses not taken (available for dragging) and which courses will fulfill which major requirements. Additionally, the profile is used to generate an array of connections between the nodes of the profile, which in our View, will represent a directed arrow from a prerequisite to a course. 
4. These model elements are drawn into the UI (courses as nodes, connections as arrows, updated requirements panel). 

In general, each user-event triggers some kind of corresponding data-manipulation, thus this pipeline enables us to simply match UI behaviors to the appropriate model algorithms. Additional work is done to make sure these data outputs are successfully able to render the view, but these methods are designed to take arbitrary ViewModels and display them on the screen, and can (and should be) reused and recalled.

### Libraries
- [jQuery/jQueryUI](https://jquery.com/)
- [jsPlumb](https://jsplumbtoolkit.com/)
- [D3.js](https://d3js.org/)
- [Tween.js](https://github.com/tweenjs/tween.js/)

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
1. Expand to incorporate other majors.
2. Scrape major data from web so as to not have to manually log courses and when they are offered.
3. Incorporate Gen-Ed/Distribution requirements. 
4. Allow user to store different plans.
5. Allow user to export major plan in a concise, tabular format.

### Known Bugs/Issues/Missing
1. CSS features were adapted and tested for a limited number of screens. Sizing and placement of HTML elements may appear different on different screens.
2. Currently, positioning algorithms do not respect whether courses cross.
3. Most UI elements are available across browsers, but may appear different.
4. Currently, positionInitialCourses() is hard-coded in terms of screen location, and based on the specific courses in the comp-major. An immediate next step in achieving Future Work Goal #1 (listed above) would be to remove instances of both hard-coding CSS (to allow for various screen widths to have consistently proportional sizing) and the reliance on course-name identification (so arbitrary courses of any major can still be meaningfully organized). 
5. Test suite incomplete–unit tests of some data manipulation algorithms should be implemented in the near future. 
6. Full major algorithm does not incorporate a check that some class is a Capstone course, as stated by the Computer Science Major rules. This may vary year by year, but a true "check" of the major should incorporate this feature as well. 

### Acknowledgements 
This project was completed as the main coursework for COMP225 (Software Design and Development), taught by Paul Cantrell in Spring 2019. We are incredibly grateful for his guidance throughout every step of the process!


