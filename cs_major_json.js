let courses = [
  {
    "dept": "CS",
    "courseNum": "112",
    "name": "introduction to data science",
    "prereq": []
  },
  {
    "dept": "CS",
    "courseNum": "120",
    "name": "computing and society",
    "prereq": []
  },
  {
    "dept": "CS",
    "courseNum": "123",
    "name": "core concepts in computer science",
    "prereq": []
  },
  {
    "dept": "CS",
    "courseNum": "124",
    "name": "object-oriented programming and data structures",
    "prereq": ["CS123"]
  },
  {
    "dept": "M",
    "courseNum": "135",
    "name": "applied multivariable calculus I",
    "prereq": []
  },
  {
    "dept": "M",
    "courseNum": "137",
    "name": "applied multivariable calculus II",
    "prereq": ["M135"]
  },
  {
    "dept": "M",
    "courseNum": "155",
    "name": "intro to statistical modeling",
    "prereq": []
  },
  {
    "dept": "CS",
    "courseNum": "221",
    "name": "algorithm design and analysis",
    "prereq": ["CS124", "M279"]
  },
  {
    "dept": "CS",
    "courseNum": "225",
    "name": "software design and development",
    "prereq": ["CS124"]
  },
  {
    "dept": "M",
    "courseNum": "236",
    "name": "linear algebra",
    "prereq": [["M279"], ["M137", "M135"]]
  },
  {
    "dept": "M",
    "courseNum": "237",
    "name": "applied multivariable calculus III",
    "prereq": ["M137"]
  },
  {
    "dept": "CS",
    "courseNum": "240",
    "name": "computer systems organization",
    "prereq": ["CS124"]
  },
  {
    "dept": "M",
    "courseNum": "253",
    "name": "statistical computing and machine learning",
    "prereq": ["M155"]
  },
  {
    "dept": "CS",
    "courseNum": "261",
    "name": "theory of computation",
    "prereq": ["CS124", "M279"]
  },
  {
    "dept": "M",
    "courseNum": "279",
    "name": "discrete mathematics",
    "prereq": []
  },
  {
    "dept": "CS",
    "courseNum": "302",
    "name": "introduction to database management systems",
    "prereq": []
  },
  {
    "dept": "M",
    "courseNum": "312",
    "name": "differential equations",
    "prereq": ["M236", "M237"]
  },
  {
    "dept": "CS",
    "courseNum": "320",
    "name": "computational biology",
    "prereq": ["CS123"]
  },
  {
    "dept": "CS",
    "courseNum": "346",
    "name": "internet computing",
    "prereq": ["CS225"]
  },
  {
    "dept": "M",
    "courseNum": "354",
    "name": "probability",
    "prereq": [["M237"], ["M137", "M236"]]
  },
  {
    "dept": "M",
    "courseNum": "361",
    "name": "theory of computation",
    "prereq": ["CS124", "M279"]
  },
  {
    "dept": "M",
    "courseNum": "365",
    "name": "computational linear algebra",
    "prereq": [["CS120"], ["CS123", "M236"]]
  },
  {
    "dept": "CS",
    "courseNum": "365",
    "name": "computational linear algebra",
    "prereq": [["CS120"], ["CS123", "M236"]]
  },
  {
    "dept": "M",
    "courseNum": "377",
    "name": "real analysis",
    "prereq": ["M237"]
  },
  {
    "dept": "M",
    "courseNum": "379",
    "name": "combinatorics",
    "prereq": []
  },
  {
    "dept": "CS",
    "courseNum": "394",
    "name": "software testing",
    "prereq": ["CS124"]
  },
  {
    "dept": "M",
    "courseNum": "437",
    "name": "topics in applied math",
    "prereq": [["M236", "CS120"], ["M236", "CS123"],["M236", "CS124"]]
  },
  {
    "dept": "CS",
    "courseNum": "440",
    "name": "collective intelligence",
    "prereq": ["CS124", "CS221"]
  },
  {
    "dept": "CS",
    "courseNum": "445",
    "name": "parallel and distributed processing",
    "prereq": ["CS240", "CS221"]
  },
  {
    "dept": "M",
    "courseNum": "453",
    "name": "survival analysis",
    "prereq": ["M155", "M354"]
  },
  {
    "dept": "CS",
    "courseNum": "465",
    "name": "interactive computer graphics",
    "prereq": ["CS240"]
  },
  {
    "dept": "M",
    "courseNum": "479",
    "name": "network science",
    "prereq": ["M236", "CSM379", "CS123"]
  },
  {
    "dept": "CS",
    "courseNum": "479",
    "name": "network science",
    "prereq": ["M236", "M379", "CS123"]
  },
  {
    "dept": "CS",
    "courseNum": "484",
    "name": "introduction to artificial intelligence",
    "prereq": ["CS221"]
  },
  {
    "dept": "CS",
    "courseNum": "494",
    "name": "software in production",
    "prereq": []
  }
]