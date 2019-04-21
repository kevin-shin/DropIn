let ViewModel = {
  Classes: [
  {
    dept: "COMP",
    course: 123,
    taken: true,
    
  },
  {
    dept: "COMP",
    course: 127,
    taken: true,
     
  },
  {
    dept: "COMP",
    course: 128,
    taken: true,
     
  },
  {
    dept: "COMP",
    course: 221,
    taken: true,
     
  },
  {
    dept: "COMP",
    course: 225,
    taken: false,
     
  },
  {
    dept: "COMP",
    course: 240,
    taken: true,
     
  },
  {
    dept: "COMP",
    course: 261,
    taken: false,
     
  },
  {
    dept: "MATH",
    course: 279,
    taken: true,
     
  },
  {
    dept: "COMP",
    course: 302,
    taken: false,
      
  },
  {
    dept: "COMP",
    course: 320,
    taken: false,
      
  },
  {
    dept: "COMP",
    course: 346,
    taken: false,
      
  },
  {
    dept: "COMP",
    dept2: "MATH",
    course: 365,
    taken: false,
      
  },
  {
    dept: "COMP",
    course: 394,
    taken: false,
      
  },
  {
    dept: "COMP",
    course: 440,
    taken: false,
      
  },
  {
    dept: "COMP",
    course: 445,
    taken: false,
      
  },
  {
    dept: "COMP",
    course: 465,
    taken: false,
      
  },
  {
    dept: "COMP",
    course: 479,
    taken: false,
      
  },
  {
    dept: "COMP",
    course: 484,
    taken: false,
      
  },
  {
    dept: "COMP",
    course: 494,
    taken: false,
      
  }
],
  Connections: [
    {
      source: "COMP123",
      target: "COMP127"
    },
    {
      source: "COMP127",
      target: "COMP128"
    },
    {
      source: "COMP128",
      target: "COMP221"
    },
    {
      source: "MATH279",
      target: "COMP221"
    },
    {
      source: "COMP128",
      target: "COMP240"
    }
  ]
};

//export { ViewModel }