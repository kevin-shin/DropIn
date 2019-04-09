let classes = [
        {
            "dept": "COMP",
            "course": 123,
            "taken": true,
            "required": true

        },
        {
            "dept": "COMP",
            "course": 127,
            "taken": true,
            "required": true
        },
        {
            "dept": "COMP",
            "course": 128,
            "taken": true,
            "required": true
        },
        {
            "dept": "COMP",
            "course": 221,
            "taken": true,
            "required": true
        },
        {
            "dept": "COMP",
            "course": 225,
            "taken": false,
            "required": true
        },
        {
            "dept": "COMP",
            "course": 240,
            "taken": true,
            "required": true
        },
        {
            "dept": "COMP",
            "course": 261,
            "taken": false,
            "required": true
        },
        {
            "dept": "MATH",
            "course": 279,
            "taken": true,
            "required": true
        },
        {
            "dept": "COMP",
            "course": 302,
            "taken": false,
            "required": false
        },
        {
            "dept": "COMP",
            "course": 320,
            "taken": false,
            "required": false
        },
        {
            "dept": "COMP",
            "course": 346,
            "taken": false,
            "required": false
        },
        {
            "dept": "COMP",
            "dept2": "MATH",
            "course": 365,
            "taken": false,
            "required": false
        },
        {
            "dept": "COMP",
            "course": 394,
            "taken": false,
            "required": false
        },
        {
            "dept": "COMP",
            "course": 440,
            "taken": false,
            "required": false
        },
        {
            "dept": "COMP",
            "course": 445,
            "taken": false,
            "required": false
        },
        {
            "dept": "COMP",
            "course": 465,
            "taken": false,
            "required": false
        },
        {
            "dept": "COMP",
            "course": 479,
            "taken": false,
            "required": false
        },
        {
            "dept": "COMP",
            "course": 484,
            "taken": false,
            "required": false
        },
        {
            "dept": "COMP",
            "course": 494,
            "taken": false,
            "required": false
        }

    ];

let inputs = d3.select('#profileData').selectAll("courseOptions")
    .data(classes)
    .enter().append("text").lower()
    .text(function(d) {
        return  String(d.dept) + String(d.course)
    })
    .append("input")
    .attr("type","checkbox")
    .attr("name",function(d) {return String(d.dept) + String(d.course)});





$('#profileData').submit((event) => {
    event.preventDefault();
    let profileString = JSON.stringify($('#profileData').serializeArray());
    console.log(profileString);
});
