# judasake
Software Dev team project

How to run tests (short tutorial by Kevin):

All the tests for this project will exist in a directory called __tests__. 
The convention is to name these tests with the file you're trying to test. Let's do this with a concrete example.

Notice that inside src/js/ is a function called functions.js. The idea here is that anything inside this file can be exported.

In it is a constant functions, which is an object that holds many functions. This is not the only way to do it–you might have separate functions which you export one by one, you may have some functions you want to export, some you don't, etc. Google "module.exports" and you should find a structure that suits your needs.

In this example, we'll export an object that holds functions as properties. We specify what we want to export as module.exports = ???, where ??? refers to that which you want to export. 

Now, go back to __tests__/functions.test.js. Note the top line is another declaration, this time saying const functions = require('../src/js/functions');. This tells this test function to import the things which were exported in the path file. So this object will hold "module.exports". This is great, because we know module.exports is an object which has functions. 

So let's call them! Note the structure inside the test functions. There are many, many more. Google them to find out which one you need.

Then, open terminal and cd to the __tests__ file. From there, type "npm run test". jest should automatically find the test files and run them.  

