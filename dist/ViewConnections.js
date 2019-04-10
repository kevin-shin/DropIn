"use strict";

$(document).ready(function () {
  //GLOBAL VARIABLES
  var radius = 20;
  var displacement = radius + 10;
  var courses, arrows, catalog; //IMPORT DATA

  d3.json("../Model/ViewModel_Test.json").then(function (data) {
    courses = data.Classes;
    arrows = data.Connections;
  });
  d3.json("../Model/CS_major.json").then(function (data) {
    catalog = data;
  }); //SET UP JSPLUMB. instance will be the variable which controls jsPlumb draggable behavior.

  var instance = jsPlumb.getInstance({
    Connector: ["Straight"],
    DragOptions: {
      cursor: "pointer",
      zIndex: 5
    },
    PaintStyle: {
      stroke: "black",
      strokeWidth: 2
    }
  });
  /*Make courses draggable. Notice that the courses inside the top bar and the ones
    in the graph have different programs controlling their drag behavior. This is
    necessary for drag-and-drop to work with line drawing.
   */

  var availableCourses = $(".draggable.available");
  var graphCourses = $(".inGraph");
  availableCourses.draggable({
    revert: true
  });
  instance.draggable(graphCourses); //DECLARE DRAGGABLE BEHAVIOR

  $("#svgNotTaken").droppable({
    accept: '.draggable'
  });
  $("#graph").droppable({
    drop: function drop(e, ui) {
      var x = ui.helper.clone();
      ui.helper.remove();
      x.css({
        top: e.clientY - displacement,
        left: e.clientX - displacement,
        position: 'absolute'
      });
      x.addClass("inGraph");
      $("#graph").append(x);
      var courseStack = [];
      var visited = [];
      var returned = [];

      var dfs = function dfs(draggedCourse) {
        courseStack.push(draggedCourse);
        visited.push(draggedCourse);

        while (courseStack.length !== 0) {
          var v = courseStack.pop();
          returned.push(v);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = prereqDict.get(v)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var child = _step.value;

              if (!(child in visited)) {
                dfs(child);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      };

      var adjList = []; //connections to adjacency list

      var returnedToAdjList = function returnedToAdjList() {
        for (var _i = 0, _returned = returned; _i < _returned.length; _i++) {
          var course = _returned[_i];
          var prereqs = prereqDict.get(course);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = prereqs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var prereq = _step2.value;

              if (!adjList.some(function (adj) {
                return adj.source === prereq && adj.target === course;
              })) {
                adjList.push({
                  "source": prereq,
                  "target": course
                });
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }

        returned = [];
      };

      var makeConnections = function makeConnections(draggedCourse) {
        var courseStack = [];
        var visited = [];
        var returned = [];
        dfs(draggedCourse);
        returnedToAdjList();
      }; //JULIET'S ALGORITHM HERE

      /*
      Pseudocode
       let prereqs = array of courses returned by prereq algorithm
      for prereq in prereqs:
          if prereq on graph already:
              draw line from that prereq to dropped node (x)
          else:
              add node, in transparent red. Think about how you want to place it.
              draw connection between that node and this node.
              something about updating profiles.
       */


      availableCourses = $(".draggable.available");
      graphCourses = $(".inGraph");
      availableCourses.draggable({
        revert: true
      });
      instance.draggable(graphCourses);
    }
  });
  $(".draggable").bind("mousedown", function () {
    var course = findCourse(catalog, this);
    var description = course.courseInfo;
    var name = course.name;
    var title = course.dept + course.courseNum;
    $("#name").replaceWith("<p id='name'>" + title + "<br>" + name + "</p>");
    $("#courseDescription").replaceWith("<p id='courseDescription'>" + description + "</p>");
  });
  var sourceTarget = [{
    source: "COMP123",
    target: "COMP127"
  }, {
    source: "COMP127",
    target: "COMP128"
  }, {
    source: "COMP128",
    target: "COMP221"
  }, {
    source: "MATH279",
    target: "COMP221"
  }, {
    source: "COMP128",
    target: "COMP240"
  }];
  initializeConnections(sourceTarget);
  jsPlumb.fire("jsPlumbDemoLoaded", instance); //-----------     HELPER FUNCTIONS     -----------
  //Draw the connections between imported courses.

  function initializeConnections(connections) {
    connections.forEach(function (entry) {
      instance.connect({
        source: entry.source,
        target: entry.target,
        endpoint: "Blank",
        anchors: [["Perimeter", {
          shape: "Diamond",
          anchorCount: 150
        }], ["Perimeter", {
          shape: "Diamond",
          anchorCount: 150
        }]]
      });
    });
  }

  function findCourse(data, course) {
    var ID = course.id;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var object = _step3.value;

        if (object.dept + object.courseNum === ID) {
          return object;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }
});
//# sourceMappingURL=ViewConnections.js.map