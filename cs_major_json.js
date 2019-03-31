let courses = [
  {
    "dept": "COMP",
    "courseNum": "112",
    "name": "introduction to data science",
    "prereq": []
  },
  {
    "dept": "COMP",
    "courseNum": "120",
    "name": "computing and society",
    "prereq": []
  },
  {
    "dept": "COMP",
    "courseNum": "123",
    "name": "core concepts in computer science",
    "prereq": []
  },
  {
    "dept": "COMP",
    "courseNum": "124",
    "name": "object-oriented programming and data structures",
    "prereq": ["COMP123"]
  },
  {
    "dept": "COMP",
    "courseNum": "127",
    "name": "object-oriented programming and abstraction",
    "prereq": ["COMP123"],
    "courseInfo": "What happens as software grows in complexity? How do we break a program into manageable pieces? How do we write readable, maintainable code? This course is an introduction to the building blocks of software design: abstraction, decomposition, and encapsulation. Using object-oriented programming in Java, we will create graphics, games, and simulations, and explore natural language processing. Topics may include: classes, objects, polymorphism, inheritance, testing, refactoring, events, closures, streams, immutability, parallel programming, and version control. The course culminates in a student-designed project. There is a required 1.5 hour laboratory section associated with this course. "
  },
  {
    "dept": "COMP",
    "courseNum": "128",
    "name": "data structures",
    "prereq": ["COMP127"],
    "courseInfo": "This course familiarizes students with the fundamental data structures in computer science. Using the Java programming language, students will study existing data structure implementations, implement their own data structures, and develop data-intensive applications. The course covers stacks, queues, lists, trees, heaps, hash tables, graphs, and the common algorithms that use these data structures. Students will also receive an introduction to basic complexity analysis (Big-O), learn the time complexity of different data structure operations, and gain experience in calculating the time complexity of programs that use data structures."
  },
  {
    "dept": "MATH",
    "courseNum": "135",
    "name": "applied multivariable calculus I",
    "prereq": []
  },
  {
    "dept": "MATH",
    "courseNum": "137",
    "name": "applied multivariable calculus II",
    "prereq": ["MATH135"]
  },
  {
    "dept": "MATH",
    "courseNum": "155",
    "name": "intro to statistical modeling",
    "prereq": []
  },
  {
    "dept": "COMP",
    "courseNum": "221",
    "name": "algorithm design and analysis",
    "prereq": ["COMP124", "MATH279"]
  },
  {
    "dept": "COMP",
    "courseNum": "225",
    "name": "software design and development",
    "prereq": ["COMP124"]
  },
  {
    "dept": "MATH",
    "courseNum": "236",
    "name": "linear algebra",
    "prereq": [["MATH279"], ["MATH137", "MATH135"]]
  },
  {
    "dept": "MATH",
    "courseNum": "237",
    "name": "applied multivariable calculus III",
    "prereq": ["MATH137"]
  },
  {
    "dept": "COMP",
    "courseNum": "240",
    "name": "computer systems organization",
    "prereq": ["COMP124"]
  },
  {
    "dept": "MATH",
    "courseNum": "253",
    "name": "statistical computing and machine learning",
    "prereq": ["MATH155"]
  },
  {
    "dept": "COMP",
    "courseNum": "261",
    "name": "theory of computation",
    "prereq": ["COMP124", "MATH279"]
  },
  {
    "dept": "MATH",
    "courseNum": "279",
    "name": "discrete mathematiCOMP",
    "prereq": []
  },
  {
    "dept": "COMP",
    "courseNum": "302",
    "name": "introduction to database management systems",
    "prereq": []
  },
  {
    "dept": "MATH",
    "courseNum": "312",
    "name": "differential equations",
    "prereq": ["MATH236", "MATH237"]
  },
  {
    "dept": "COMP",
    "courseNum": "320",
    "name": "computational biology",
    "prereq": ["COMP123"]
  },
  {
    "dept": "COMP",
    "courseNum": "346",
    "name": "internet computing",
    "prereq": ["COMP225"]
  },
  {
    "dept": "MATH",
    "courseNum": "354",
    "name": "probability",
    "prereq": [["MATH237"], ["MATH137", "MATH236"]]
  },
  {
    "dept": "MATH",
    "courseNum": "361",
    "name": "theory of computation",
    "prereq": ["COMP124", "MATH279"]
  },
  {
    "dept": "MATH",
    "courseNum": "365",
    "name": "computational linear algebra",
    "prereq": [["COMP120", "MATH236"],["COMP123", "MATH236"]]
  },
  {
    "dept": "COMP",
    "courseNum": "365",
    "name": "computational linear algebra",
    "prereq": [["COMP120", "MATH236"],["COMP123", "MATH236"]]
  },
  {
    "dept": "MATH",
    "courseNum": "377",
    "name": "real analysis",
    "prereq": ["MATH237"]
  },
  {
    "dept": "MATH",
    "courseNum": "379",
    "name": "combinatoriCOMP",
    "prereq": []
  },
  {
    "dept": "COMP",
    "courseNum": "394",
    "name": "software testing",
    "prereq": ["COMP124"]
  },
  {
    "dept": "MATH",
    "courseNum": "437",
    "name": "topiCOMP in applied math",
    "prereq": [["MATH236", "COMP120"], ["MATH236", "COMP123"],["MATH236", "COMP124"]]
  },
  {
    "dept": "COMP",
    "courseNum": "440",
    "name": "collective intelligence",
    "prereq": ["COMP124", "COMP221"]
  },
  {
    "dept": "COMP",
    "courseNum": "445",
    "name": "parallel and distributed processing",
    "prereq": ["COMP240", "COMP221"]
  },
  {
    "dept": "MATH",
    "courseNum": "453",
    "name": "survival analysis",
    "prereq": ["MATH155", "MATH354"]
  },
  {
    "dept": "COMP",
    "courseNum": "465",
    "name": "interactive computer graphiCOMP",
    "prereq": ["COMP240"]
  },
  {
    "dept": "MATH",
    "courseNum": "479",
    "name": "network science",
    "prereq": ["MATH236", "COMPM379", "COMP123"]
  },
  {
    "dept": "COMP",
    "courseNum": "479",
    "name": "network science",
    "prereq": ["MATH236", "MATH379", "COMP123"]
  },
  {
    "dept": "COMP",
    "courseNum": "484",
    "name": "introduction to artificial intelligence",
    "prereq": ["COMP221"]
  },
  {
    "dept": "COMP",
    "courseNum": "494",
    "name": "software in production",
    "prereq": []
  }
]