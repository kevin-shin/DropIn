let catalogue = [
  {
    dept: "COMP",
    courseNum: "112",
    name: "Introduction to Data Science",
    prereq: [],
    courseInfo:
      "This course provides an introduction to the handling, analysis, and interpretation of the big datasets now routinely being collected in science, commerce, and government. Students achieve facility with a sophisticated, technical computing environment. The course aligns with techniques being used in several courses in the natural and social sciences, statistics, and mathematics. The course is intended to be accessible to all students, regardless of background."
  },
  {
    dept: "COMP",
    courseNum: "120",
    name: "Computing and Society",
    prereq: [],
    courseInfo:
      "Topics course that introduces students to the field of computing by way of a central theme. Topics vary; offerings include Digital Humanities, Green Computing, and Social Media. Full description given in advance of registration. This course is suitable for students with little or no experience with computing, but it can serve as a starting point for the Computer Science major. Typically offered in the fall as a First Year Course. "
  },
  {
    dept: "COMP",
    courseNum: "123",
    name: "Core Concepts in Computer Science",
    prereq: [],
    courseInfo:
      "This course introduces the field of computer science, including central concepts such as the design and implementation of algorithms and programs, testing and analyzing programs, the representation of information within the computer, and the role of abstraction and metaphor in computer science. The exploration of these central ideas will draw examples from a range of application areas including multimedia processing, turtle graphics, and text processing. Course work will use the Python programming language."
  },
  // {
  //   dept: "COMP",
  //   courseNum: "124",
  //   name: "Object-oriented Programming and Data Structures",
  //   prereq: ["COMP123"],
  //   courseInfo:
  //     "This course introduces the principles of software design and development using the object-oriented paradigm (OOP) and the Java programming language. Students will learn to use data structures such as lists, trees and hash tables and they will compare the efficiency of these data structures for a particular application. Students will learn to decompose a project using OOP principles. They will work with integrated development environments (IDEs) and version control systems. Students will practice their skills by creating applications in areas such as graphics, games, simulations, and natural language processing. There is a required 1.5 hour laboratory section associated with this course. "
  // },
  {
    dept: "COMP",
    courseNum: "127",
    name: "Object-oriented Programming and Abstraction",
    prereq: ["COMP123"],
    courseInfo:
      "What happens as software grows in complexity? How do we break a program into manageable pieces? How do we write readable, maintainable code? This course is an introduction to the building blocks of software design: abstraction, decomposition, and encapsulation. Using object-oriented programming in Java, we will create graphics, games, and simulations, and explore natural language processing. Topics may include: classes, objects, polymorphism, inheritance, testing, refactoring, events, closures, streams, immutability, parallel programming, and version control. The course culminates in a student-designed project. There is a required 1.5 hour laboratory section associated with this course. "
  },
  {
    dept: "COMP",
    courseNum: "128",
    name: "Data Structures",
    prereq: ["COMP127"],
    courseInfo:
      "This course familiarizes students with the fundamental data structures in computer science. Using the Java programming language, students will study existing data structure implementations, implement their own data structures, and develop data-intensive applications. The course covers stacks, queues, lists, trees, heaps, hash tables, graphs, and the common algorithms that use these data structures. Students will also receive an introduction to basic complexity analysis (Big-O), learn the time complexity of different data structure operations, and gain experience in calculating the time complexity of programs that use data structures."
  },
  {
    dept: "MATH",
    courseNum: "135",
    name: "Applied Multivariable Calculus I",
    prereq: [],
    courseInfo:
      "This course focuses on calculus useful for applied work in the natural and social sciences. There is a strong emphasis on developing scientific computing and mathematical modeling skills. The topics include functions as models of data, differential calculus of functions of one and several variables, integration, differential equations, and estimation techniques. Applications are drawn from varied areas, including biology, chemistry, economics, and physics."
  },
  {
    dept: "MATH",
    courseNum: "137",
    name: "Applied Multivariable Calculus II",
    prereq: ["MATH135"],
    courseInfo:
      "This course focuses on calculus useful for both theoretical and applied work in the mathematical, natural, and social sciences. Topics include: partial derivatives, gradients, contour plots, constrained and unconstrained optimization, Taylor polynomials, interpretations of integrals via finite sums, the fundamental theorem of calculus, double integrals over a rectangle,and differential equations. Attention is given to both symbolic and numerical computing."
  },
  {
    dept: "COMP",
    courseNum: "154",
    name: "Digital Ethics",
    prereq: [],
    courseInfo: "This course looks at ethical questions connected with the internet as we know it today: an online environment where content is generated and shared through user activities such as blogging, media sharing, social networking, tagging, tweeting, virtual world gaming, wiki developing, and the like. We will start by considering debates over freedom of speech, privacy, surveillance, and intellectual property: issues that pre-exist the development of the Internet, but which because of it have taken on new dimensions. From here we will go on to take up some ethical questions arising from four different domains of activity on the social web: gaming, social networking, blog/wiki developing, and \"hacktivism.\" In the third part of the course, we will consider broad questions connected to the integration of the Internet with devices other than the personal computer and mobile phone and which open the prospect of a world of integrated networked systems. What are some of the impacts of such integration on our everyday ethical relations with others and on the overall quality of our lives? How does being networked affect the meaning of being human?"
  },
  {
    dept: "MATH",
    courseNum: "155",
    name: "Intro to Statistical Modeling",
    prereq: [],
    courseInfo:
      "An introductory statistics course with an emphasis on multivariate modeling. Topics include descriptive statistics, experiment and study design, probability, hypothesis testing, multivariate regression, single and multi-way analysis of variance, logistic regression."
  },
  {
    dept: "MATH",
    courseNum: "212",
    name: "Philosophy of Mathematics",
    prereq: ["MATH279"],
    courseInfo: "Why does 2 + 2 equal four? Can a diagram prove a mathematical truth? Is mathematics a social construction or do mathematical facts exist independently of our knowing them? Philosophy of mathematics considers these sorts of questions in an effort to understand the logical and philosophical foundations of mathematics. Topics include mathematical truth, mathematical reality, and mathematical justifications (knowledge). Typically we focus on the history of mathematics of the past 200 years, highlighting the way philosophical debates arise in mathematics itself and shape its future."
  },
  {
    dept: "COMP",
    courseNum: "221",
    name: "Algorithm Design and Analysis",
    prereq: ["COMP128", "MATH279"],
    courseInfo:
      "An in-depth introduction to the design and analysis of algorithms. Topics may include algorithmic paradigms and structures, including recursion, divide and conquer, dynamic programming, greedy methods, branch and bound, randomized, probabilistic, and parallel algorithms, non-determinism and NP completeness. Applications to searching and sorting, graphs and optimization, geometric algorithms, and transforms. "
  },
  {
    dept: "COMP",
    courseNum: "225",
    name: "Software Design and Development",
    prereq: ["COMP127"],
    courseInfo:
      "This course is an introduction to the problem of building software with humans and for humans. Students work in teams to design and implement a semester-long user-facing software project of their own invention. There are no limitations on topic or technology; on the contrary, students are responsible for imagining possibilities, articulating goals, and researching and selecting suitable technologies. The format resembles a studio art class, with in-class discussion guided by sharing and critiquing classmates' ongoing work. Topics include communication, division of labor, user-centered design, human-computer interaction, product management, project management, iterative development, engineering tradeoffs, separation of concerns, code readability and maintainability, refactoring, testing, and version control. Teams give a public demonstration of their working projects at the end of the semester."
  },
  {
    dept: "MATH",
    courseNum: "236",
    name: "Linear Algebra",
    prereq: [["MATH279"], ["MATH137", "MATH135"]],
    courseInfo:
      "Linear algebra is one of the pillars of mathematics, both pure and applied. Linear relations can be used to model phenomena from numerous disciplines in the mathematical sciences, physical sciences, social sciences, engineering, and computer science. This introduction to linear algebra blends mathematical computation, theory, abstraction, and application. It starts with systems of linear equations and grows into the study of matrices, vector spaces, linear independence, dimension, linear transformations, orthogonality and projections, eigenvectors, and their applications. The resulting linear algebraic framework is a flexible and powerful way to approach multidimensional problems."
  },
  {
    dept: "MATH",
    courseNum: "237",
    name: "Applied Multivariable Calculus III",
    prereq: ["MATH137"],
    courseInfo:
      "This course focuses on calculus useful for the mathematical and physical sciences. Topics include: scalar and vector-valued functions and derivatives; parameterization and integration over regions, curves, and surfaces; the divergence theorem; and Taylor series. Attention is given to both symbolic and numerical computing. Applications drawn from the natural sciences, probability, and other areas of mathematics."
  },
  {
    dept: "COMP",
    courseNum: "240",
    name: "Computer Systems Organization",
    prereq: ["COMP128"],
    courseInfo:
      "This course familiarizes the student with the internal design and organization of computers. Topics include number systems, internal data representations, microarchitectures, the functional units of a computer system, memory, processor, and input/output structures, instruction sets and assembly language, addressing techniques, system software, and concurrency and parallelism."
  },
  {
    dept: "MATH",
    courseNum: "253",
    name: "Statistical Computing and Machine Learning",
    prereq: ["MATH155"],
    courseInfo:
      "The linear and logistic modeling techniques from MATH 155 are augmented with the three foundational machine learning tasks: regression, classification, and clustering.  The course explores techniques central to these tasks, including methods of data exploration, supervised and unsupervised learning, parametric and nonparametric modeling, and model training and evaluation.  As required by the application of these sophisticated techniques, the course also introduces foundational statistical computer programming concepts."
  },
  {
    dept: "COMP",
    courseNum: "261",
    name: "Theory of Computation",
    prereq: ["COMP128", "MATH279"],
    courseInfo:
      "This course examines the theoretical foundations of computation. It explores different mathematical models that try to formalize our informal notion of an algorithm. Models include finite automata, regular expressions, grammars, and Turing machines. The course also discusses ideas about what can and cannot be computed. In addition, the course explores the basics of complexity theory, examining broad categories of problems and their algorithms, and their efficiency. The focus is on the question of P versus NP, and the NP-complete set."
  },
  {
    dept: "MATH",
    courseNum: "279",
    name: "Discrete Mathematics",
    prereq: [],
    courseInfo:
      "Discrete mathematics studies collections of distinct, separate objects and is complementary to calculus (which studies continuous phenomena). This course introduces techniques for analyzing arrangements of objects and the relationships between them. The material emphasizes problem solving and logical argumentation, rather than computation. Topics include basic counting principles, induction, logic, recurrence relations, number theory, and graph theory."
  },
  {
    dept: "COMP",
    courseNum: "302",
    name: "Introduction to Database Management Systems",
    prereq: [],
    courseInfo:
      "This course will introduce students to the design, implementation, and analysis of databases stored in database management systems (DBMS). Topics include implementation-neutral data modeling, database design, database implementation, and data analysis using relational algebra and SQL. Students will generate data models based on real-world problems, and implement a database in a state-of-the-art DBMS. Students will master complex data analysis by learning to first design database queries and then implement them in a database query language such as SQL. Advanced topics include objects in databases, indexing for improved performance, distributed databases, and data warehouses."
  },
  {
    dept: "MATH",
    courseNum: "312",
    name: "Differential Equations",
    prereq: ["MATH236", "MATH237"],
    courseInfo:
      "Introduction to the theory and application of differential equations. Solving linear and first-order systems using algebra, linear algebra, and complex numbers. Using computers to solve equations both symbolically and numerically and to visualize the solutions. Qualitative methods for nonlinear dynamical systems. Applications to diverse areas of modeling."
  },
  {
    dept: "MATH",
    courseNum: "313",
    name: "Advanced Symbolic Logic",
    prereq: ["MATH279"],
    courseInfo: "A second course in symbolic logic which extends the methods of logic. A main purpose of this course is to study logic itself-to prove things about the system of logic learned in the introductory course. This course is thus largely logic about logic. Topics include second order logic and basic set theory; soundness, consistency and completeness of first order logic; incompleteness of arithmetic; Turing computability; modal logic; and intuitionistic logic."
  },
  {
    dept: "COMP",
    courseNum: "320",
    name: "Computational Biology",
    prereq: ["COMP123"],
    courseInfo:
      "This interdisciplnary course will examine selected topics in computational biology, including basic bioinformatics, algorithms used in genomics and genome analysis, computational techniques for systems biology, and synthetic biology. Prerequisite(s): COMP 123, or permission of the instructor."
  },
  {
    dept: "COMP",
    courseNum: "340",
    name: "Digital Electronics",
    prereq: ["MATH137"],
    courseInfo: "A survey of fundamental ideas and methods used in the design and construction of digital electronic circuits such as computers. Emphasis will be on applying the theoretical aspects of digital design to the actual construction of circuits in the laboratory. Topics to be covered include basic circuit theory, transistor physics, logic families (TTL, CMOS), Boolean logic principles, combinatorial design techniques, sequential logic techniques, memory circuits and timing, and applications to microprocessor and computer design. Three lectures and one three-hour laboratory per week."
  },
  {
    dept: "COMP",
    courseNum: "342",
    name: "Operating Systems and Computer Architecture",
    prereq: ["COMP240"],
    courseInfo: "This course introduces the basic design and architecture of operating systems. Concepts to be discussed include sequential and concurrent processes, synchronization and mutual exclusion, processor scheduling, time-sharing, multitasking, parallel processing, memory management, file system design, and security. Students will learn concepts through lectures, readings, and low-level programming using the C programming language."
  },
  {
    dept: "COMP",
    courseNum: "346",
    name: "Internet Computing",
    prereq: ["COMP225"],
    courseInfo:
      "This course introduces technologies for building dynamic web applications. It will look at all stages in the web application design process, including: 1) the basic protocols and technologies underlying the web (e.g. HTTP, REST), 2) front-end web technologies, such as HTML, CSS, and Javascript, 3) and application servers that manage requests for information, update data, etc. The course will be programming-intensive, with students using web frameworks to design and implement Internet applications. The format of the course will be mainly laboratory-based sessions, where students learn components of a web application, supported by lectures and discussions. Students will research particular topics and present their findings during these discussion sessions. The course will also investigate the usability of designs from a human factors standpoint and discuss privacy and other social consequences of this technology."
  },
  {
    dept: "MATH",
    courseNum: "354",
    name: "Probability",
    prereq: [["MATH237"], ["MATH137", "MATH236"]],
    courseInfo:
      "An introduction to probability theory and application. Fundamental probability concepts include: sample spaces, combinatorics, conditional probability, independence, random variables, probability distributions, expectation, variance, moment-generating functions, and limit theorems. Special course topics vary and may include: computer simulation, stochastic processes, and statistical inference."
  },
  {
    dept: "MATH",
    courseNum: "361",
    name: "Theory of Computation",
    prereq: ["COMP128", "MATH279"],
    courseInfo:
      "This course examines the theoretical foundations of computation. It explores different mathematical models that try to formalize our informal notion of an algorithm. Models include finite automata, regular expressions, grammars, and Turing machines. The course also discusses ideas about what can and cannot be computed. In addition, the course explores the basics of complexity theory, examining broad categories of problems and their algorithms, and their efficiency. The focus is on the question of P versus NP, and the NP-complete set."
  },
  {
    dept: "MATH",
    courseNum: "365",
    name: "Computational Linear Algebra",
    prereq: [["COMP120", "MATH236"], ["COMP123", "MATH236"]],
    courseInfo:
      "A mix of applied linear algebra and numerical analysis, this course covers a central point of contact between mathematics and computer science. Many of the computational techniques important in science, commerce, and statistics are based on concepts from linear algebra, such as subspaces, projections, and matrix decompositions. The course reviews these concepts, adopts them to large scales, and applies them in the core techniques of scientific computing. These include solving systems of linear and nonlinear equations, approximation and statistical function estimation, optimization, interpolation, eigenvalue and singular value decompositions, and compression. Applications throughout the natural sciences, social sciences, statistics, and computer science."
  },
  {
    dept: "COMP",
    courseNum: "365",
    name: "Computational Linear Algebra",
    prereq: [["COMP120", "MATH236"], ["COMP123", "MATH236"]],
    courseInfo:
      "A mix of applied linear algebra and numerical analysis, this course covers a central point of contact between mathematics and computer science. Many of the computational techniques important in science, commerce, and statistics are based on concepts from linear algebra, such as subspaces, projections, and matrix decompositions. The course reviews these concepts, adopts them to large scales, and applies them in the core techniques of scientific computing. These include solving systems of linear and nonlinear equations, approximation and statistical function estimation, optimization, interpolation, eigenvalue and singular value decompositions, and compression. Applications throughout the natural sciences, social sciences, statistics, and computer science."
  },
  {
    dept: "MATH",
    courseNum: "376",
    name: "Algebraic Structures",
    prereq: ["MATH279", "MATH236"],
    courseInfo:
      "Introduction to algebraic structures, including groups, rings, fields, and vector spaces. Other topics may include geometric constructions, symmetry groups, algebraic coding theory, Burnside's counting theorem, Galois theory."
  },
  {
    dept: "MATH",
    courseNum: "377",
    name: "Real Analysis",
    prereq: ["MATH237"],
    courseInfo:
      "Basic theory for the real numbers and the notions of limit, continuity, differentiation, integration, convergence, uniform convergence, and infinite series. Additional topics may include metric and normed linear spaces, point set topology, analytic number theory, Fourier series."
  },
  {
    dept: "MATH",
    courseNum: "378",
    name: "Complex Analysis",
    prereq: ["MATH236", "MATH237"],
    courseInfo:
      "A course in the study of functions of complex numbers, a topic which touches fields as varied as number theory, applied mathematics, physics, engineering, algebraic geometry, and more. We cover: geometry and algebra of complex numbers; complex functions; differentiation and integration, including the Cauchy­Riemann equations, Cauchy's theorem, and the Cauchy integral formula; Taylor series, Laurent series, and the Residue Theorem. Throughout, we emphasize complex functions as transformations of the plane, and also make a strong connection to applications. This course is appropriate both for students with an interest and background in theoretical mathematics and proof, and students whose primary interest is the application of mathematics to other fields."
  },
  {
    dept: "MATH",
    courseNum: "379",
    name: "Combinatorics",
    prereq: ["MATH279", "MATH237"],
    courseInfo:
      "A second course in discrete mathematics that develops more advanced counting techniques. Combinatorics is the study of arrangements, patterns and configurations. Generally speaking,  we fix a set of objects and then arrange those objects into patterns satisfying special rules. Once we identify an interesting family of objects, we ask: how many are there? what are their structural properties? how can we find the “best” one(s)?  Topics are drawn from  graph theory, enumerative combinatorics, graph algorithms, and generating functions."
  },
  {
    dept: "COMP",
    courseNum: "380",
    name: "Bodies/Minds: AI Robotics",
    prereq: ["COMP221"],
    courseInfo: "This course examines two distinct aspects of work in robotics: the physical construction of the robot's \"body\" and the creation of robot control programs that form the robot's \"mind.\" It will study the strengths and weaknesses of a variety of robot sensors, including sonar, infrared, touch, GPS, and computer vision. It will also examine both reactive and deliberative approaches to robot control programs. The course will include hands-on work with multiple robots, and a semester-long course project in robotics. This course involves programming in Python; students should have a basic familiarity with Python or be prepared to learn Python during the course."
  },
  {
    dept: "COMP",
    courseNum: "394",
    name: "Software Testing",
    prereq: ["COMP128"],
    courseInfo:
      "This class intends to be a hands-on approach to software testing. Lectures may be minimal as we focus on applying the different types of software testing. The semester will start with exhaustive, unit, and functional testing, statement, branch, and condition coverage, and then move on to topics such as regression testing, penetration testing, agile testing, mutation testing, and others as it comes up. Bring a large-ish program that you have written for use in in the beginning of the course. Be prepared to interact with other students, discuss problems and solutions, and share code."
  },
  {
    dept: "MATH",
    courseNum: "394",
    name: "Correlated Data",
    prereq: ["MATH155", "MATH354"],
    courseInfo:
      "One of the most common assumptions made in Statistics is that observations are independent; however, there are many situations in which the data violate this assumption by design. In this class, we discuss advanced visualization and modeling approaches for when the data are correlated. Topics will include time series analysis, longitudinal data analysis, and spatial data analysis. Applications are drawn from across the disciplines. This course can count for the Statistics minor and the Applied Mathematics and Statistics Major as one of the intermediate or advanced courses; it counts as an applied course as well as a course with a Statistical designation."
  },
  {
    dept: "MATH",
    courseNum: "432",
    name: "Mathematical Modeling",
    prereq: [["MATH312", "COMP120"], ["MATH312", "COMP123"], ["MATH312", "COMP128"]],
    courseInfo: "Draws on the student's general background in mathematics to construct models for problems arising from such diverse areas as the physical sciences, life sciences, political science, economics, and computing. Emphasis will be on the design, analysis, accuracy, and appropriateness of a model for a given problem. Case studies will be used extensively. Specific mathematical techniques will vary with the instructor and student interest. This course counts towards the capstone requirement."
  },
  {
    dept: "MATH",
    courseNum: "437",
    name: "Topics in Applied Math",
    prereq: [
      ["MATH236", "COMP120"],
      ["MATH236", "COMP123"],
      ["MATH236", "COMP128"]
    ],
    courseInfo:
      "Topics in applied mathematics chosen from: Fourier analysis; partial differential equations; wavelets; signal processing; time-frequency analysis; stochastic processes; optimization; computational geometry; and more. Topics are examined in theoretical and applied contexts, and from analytical and computational viewpoints. This course counts toward the capstone requirement. May be repeated for credit with departmental approval."
  },
  {
    dept: "COMP",
    courseNum: "440",
    name: "Collective Intelligence",
    prereq: ["COMP221"],
    courseInfo:
      "This course introduces the theory and practice of data science applied to online communities such as Wikipedia, Facebook, and Twitter. Students will read and discuss recent academic research papers that analyze behavior on these websites and use computational simulation, machine learning, and data-mining techniques to analyze massive behavioral datasets in areas such as recommender systems, natural language processing, and tagging systems."
  },
  {
    dept: "COMP",
    courseNum: "445",
    name: "Parallel and Distributed Processing",
    prereq: ["COMP240", "COMP221"],
    courseInfo:
      "Many current computational challenges, such as Internet search, protein folding, and data mining require the use of multiple processes running in parallel, whether on a single multiprocessor machine (parallel processing) or on multiple machines connected together on a network (distributed processing). The type of processing required to solve such problems in adequate amounts of time involves dividing the program and/or problem space into parts that can run simultaneously on many processors. In this course we will explore the various computer architectures used for this purpose and the issues involved with programming parallel solutions in such environments. Students will examine several types of problems that can benefit from parallel or distributed solutions and develop their own solutions for them."
  },
  {
    dept: "MATH",
    courseNum: "454",
    name: "Bayesian Statistics",
    prereq: ["MATH155", "MATH354"],
    courseInfo:
      "Bayesian statistics, an alternative to the traditional frequentist approach taken in our other statistics courses, is playing an increasingly integral role in modern statistics.  Highlighted by Nate Silver of fivethirtyeight.com and Baseball Prospectus fame, Bayesian statistics has even reached a popular audience.  This course explores the Bayesian philosophy, the Bayesian approach to statistical analysis, Bayesian computing, as well as both sides of the frequentist versus Bayesian debate.  Topics include Bayes' Theorem, prior and posterior probability distributions, Bayesian regression, Bayesian hierarchical models, and an introduction to Markov chain Monte Carlo techniques."
  },
  {
    dept: "MATH",
    courseNum: "455",
    name: "Mathematical Statistics",
    prereq: ["MATH 354"],
    courseInfo:
      "An important course for students considering graduate work in statistics or biostatistics, this course explores the mathematics underlying modern statistical applications. Topics include: classical techniques for parameter estimation and evaluation of estimator properties, hypothesis testing, confidence intervals, and linear regression. Special topics vary and may include: tests of independence, resampling techniques, introductory Bayesian concepts, and non­parametric methods. Though not the focus of this course, concepts will be highlighted through applications in a variety of settings."
  },
  {
    dept: "COMP",
    courseNum: "465",
    name: "Interactive Computer Graphics",
    prereq: ["COMP240"],
    courseInfo:
      "This capstone course will investigate the theory and practice of computer graphics programming using C++ and OpenGL. Through hands-on projects, supported by lecture and discussion, you will learn the fundamentals of creating interactive 2D and 3D images with applications in art, design, games, movies, science, and medicine. Topics covered will include event loops, polygonal models, rendering techniques, texturing, lighting, interaction techniques, and virtual reality."
  },
  {
    dept: "MATH",
    courseNum: "471",
    name: "Topology",
    prereq: [["MATH365"], ["MATH376"], ["MATH377"]],
    courseInfo:
      "A course in both theoretical and computational mathematics. Theoretical concepts include fundamental ideas from point set topology---continuity, convergence, and connectedness---as well as selected topics from algebraic topology---the fundamental group, elementary homotopy theory, and homology. This theoretical framework provides a backbone to understand new advances in topological data analysis. Applications are chosen from diverse fields such as biological aggregations, medicine, image processing, signal processing, and sensor networks. This course counts towards the capstone requirement."
  },
  {
    dept: "MATH",
    courseNum: "476",
    name: "Representation Theory",
    prereq: ["MATH376"],
    courseInfo: "A course in matrix representations of groups, a topic which unites the powers of group theory and linear algebra. Topics include: symmetry in linear spaces, modules, group actions, characters, tensor products, and Fourier analysis on groups. Applications are chosen from: ranked data, molecular vibrations, quantum mechanics, random walks, number theory, and combinatorics. Important ideas from linear algebra are revisited from a more sophisticated point of view. These include: linear transformations, abstract vector spaces, change of basis, subspaces, direct sums, projections, and eigenvalues and eigenvectors."
  },
  {
    dept: "MATH",
    courseNum: "479",
    name: "Network Science",
    prereq: ["MATH236", "COMPM379", "COMP123"],
    courseInfo:
      'The modern Information Age has produced a wealth of data about the complex networks that tie us together. In response, the field of Network Science has arisen, bringing together mathematics, computer science, sociology, biology, economics and other fields. This course will explore the fundamental questions and the mathematical tools of Network Science. This includes: the structure of complex networks, including connectedness, centrality and "long tails"; community detection; random/strategic models for network formation; diffusion/contagion and "tipping points" on networks; and algorithms for analyzing complex networks.'
  },
  {
    dept: "COMP",
    courseNum: "479",
    name: "Network Science",
    prereq: ["MATH236", "MATH379", "COMP123"],
    courseInfo:
      'The modern Information Age has produced a wealth of data about the complex networks that tie us together. In response, the field of Network Science has arisen, bringing together mathematics, computer science, sociology, biology, economics and other fields. This course will explore the fundamental questions and the mathematical tools of Network Science. This includes: the structure of complex networks, including connectedness, centrality and "long tails"; community detection; random/strategic models for network formation; diffusion/contagion and "tipping points" on networks; and algorithms for analyzing complex networks.'
  },
  {
    dept: "COMP",
    courseNum: "484",
    name: "Introduction to Artificial Intelligence",
    prereq: ["COMP221"],
    courseInfo:
      "An introduction to the basic principles and techniques of artificial intelligence. Topics will include specific AI techniques, a range of application areas, and connections between AI and other areas of study (i.e., philosophy, psychology). Techniques may include heuristic search, automated reasoning, machine learning, deliberative planning and behavior-based agent control. Application areas include robotics, games, knowledge representation, and natural language processing. This course involves programming in Python; students should have a basic familiarity with Python or be prepared to learn Python during the course."
  },
  {
    dept: "COMP",
    courseNum: "494",
    name: "Topics Course",
    prereq: [],
    courseInfo:
      "Varies by semester. Consult the department or class schedule for current listing."
  }
];

export { catalogue };
// module.exports = catalogue;