var dataArray = [2,4,6,3]
var svg = d3.select("body").append("svg")
    .attr("height",750)
    .attr("width",1500);

draw();
drawEdges()''


    //circle constructor
    function Circle(cx, cy, radius, prereqs ){
        this.radius = radius;
        this.cx = cx;
        this.cy = cy;
        this.prereqs = prereqs;
        this.getCX = function(){return this.cx;}
        this.getCY = function(){return this.cy;}
        this.getRadius = function(){return this.radius;}
        this.getPrereqs = function(){return this.prereqs;}

    }

    const circ1 = new Circle(50,200,30, []);
    const circ2 = new Circle(100,200,30, ["circ1"]);
    const circ3 = new Circle(150,200,30, ["circ2","circ1"]);
    const circ4 = new Circle(200,200,30, ["circ1","circ3", "circ2"]);
    const circ5 = new Circle(250,200,30, ["circ4","circ3","circ2","circ1"]);

    var classArray = [circ1, circ2, circ3, circ4, circ5];
    // svg.selectAll("circle").data(classArray)
    //     .enter()
    //     .append("circle")
    //     .attr("cx",function(d){return d.getCX;})
    //     .attr("cy",function(d){return d.getCY;})
    //     .attr("r",function(d){return d.getRadius})
    //     .attr("fill","white")
    //     .attr("stroke",function(i) {
    //         switch(i){
    //             case (i%3 == 1):
    //                 return "blue";
    //             case (i%3 == 2):
    //                 return "red";
    //             case (i%3 == 3):
    //                 return "green";
    //         }
    //     });



//Practice adding objects to the SVG object
function draw() {
    svg.selectAll('circle').data(dataArray)
        .enter()
        .append('circle')
        .attr("cx", function (d, i) {
            return i * 70;
        })
        .attr("cy", '300')
        .attr("stroke", function (i) {
            switch (i) {
                case 1:
                    return "red";
                case 2:
                    return "magenta";
                case 3:
                    return "cyan";
                case 4:
                    return "purple";
                case 5:
                    return "green";
                case 6:
                    return "orange";
            }
        })
        .attr("fill", "white")
        .attr("r", function (d, i) {
            return 10 * d;
        })
        .style("Prereqs", ["123","240","200"]);
}

//MAYBE THROW AWAY
function drawEdges(){
    d3.select("svg").selectAll("circle").append("line")//might need .enter() to make multiple for each circle
        .attr("x1",function(d){return d.get("cx")})
        .attr("y1",function(d){return d.get("yx")})
        .attr("x1",function(d){return d.get("cx")})
        .attr("x1",function(d){return d.get("yx")})
}




