let rules = {
    intro : {
        courses: ["COMP123", "COMP120"],
        required: 1
    },
    core : {
        courses: ["COMP127", "COMP128", "MATH279", "COMP221", "COMP225", "COMP240"],
        required: 6
    },
    math: {
        courses: ["MATH135", "MATH137", "MATH194", "MATH212", "MATH236", "MATH237", "MATH294",
            "MATH312", "MATH313", "MATH354", "MATH361", "MATH365", "MATH376", "MATH377", "MATH378",
            "MATH379", "MATH394", "MATH432", "MATH437", "MATH455", "MATH471", "MATH476", "MATH477", "MATH479"],
        required: 2 
    },
    elective : {
        courses:[ "COMP302", "COMP320", "COMP340", "COMP342", "COMP346", "COMP361", "COMP265", "COMP380",
            "COMP394", "COMP440", "COMP445", "COMP465", "COMP479", "COMP484", "COMP494"],
        required: 3
    }
};

export {rules}