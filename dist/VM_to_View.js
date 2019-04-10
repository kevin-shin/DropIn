"use strict";

var _ViewConnections = require("./ViewConnections"); //IMPORT DATA


var ViewModel;
d3.json("../Model/ViewModel_Test.json").then(function (data) {
  draw(data);
  ViewModel = data;
});

function draw(ViewModel) {
  var radius = 20;
  var displacement = radius + 20;
  var Classes = ViewModel.Classes;
  var taken = Classes.filter(function (course) {
    return course.taken === true;
  });
  var requiredNotTaken = Classes.filter(function (course) {
    return course.taken === false && course.required === true;
  });
  var available = Classes.filter(function (course) {
    return course.taken === false && course.required === false;
  }); //NOT TAKEN COURSES. Color: Red

  var svg = d3.select("body").select("#GUI").append("div").attr("id", "svgNotTaken");
  var svgGroups = svg.selectAll("notTaken").data(available).enter().append("div").attr("id", function (d) {
    return String(d.dept) + String(d.course);
  }).html(function (d) {
    return String(d.course);
  }).classed("draggable available", true); //TAKEN COURSES. Color: Green

  var svgNotTakenDivs = d3.select("body").select("#GUI").append("div").attr("id", "graph");
  var svgContainer = svgNotTakenDivs.selectAll("taken").data(taken).enter().append("div").attr("id", function (d) {
    return String(d.dept) + String(d.course);
  }).html(function (d) {
    return String(d.course);
  }).attr("class", "draggable taken inGraph"); //REQUIRED, NOT TAKEN COURSES Color: Gray

  var svgRequiredGroups = svgNotTakenDivs.selectAll("taken").data(requiredNotTaken).enter().append("div").attr("id", function (d) {
    return String(d.dept) + String(d.course);
  }).html(function (d) {
    return String(d.course);
  }).attr("class", "draggable required inGraph");
  positionPreReqs();
  positionTopBar(); //-----------     HELPER FUNCTIONS     -----------

  function positionTopBar() {
    var topCourses = $(".draggable.available");
    var length = topCourses.length;
    var width = $("#svgNotTaken").width() - 75;
    var placement = width / length;
    var i = 1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = topCourses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var course = _step.value;
        $(course).css({
          top: $("#svgNotTaken").height() / 2 - (radius + 10),
          left: i * placement - 40
        });
        i++;
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

  function positionPreReqs() {
    $("#COMP123").css({
      top: 300,
      left: 50
    });
    $("#COMP127").css({
      top: 250,
      left: 150
    });
    $("#COMP128").css({
      top: 280,
      left: 250
    });
    $("#MATH279").css({
      top: 380,
      left: 250
    });
    $("#COMP240").css({
      top: 180,
      left: 400
    });
    $("#COMP221").css({
      top: 280,
      left: 400
    });
    $("#COMP225").css({
      top: 380,
      left: 400
    });
    $("#COMP261").css({
      top: 480,
      left: 400
    });
  }
}

(0, _ViewConnections.run)();
//# sourceMappingURL=VM_to_View.js.map