//dummy database

const books = [
    { //array of object-books
    ISBN: "12345Book",
    title: "Tesla",
    pubDate: "2022-09-12",
    language: "en",
    numPage:"250",
    author: [1,2],
    publications: [1],
    category: ["tech", "space", "education"]
},
{ 
    ISBN: "2233Book",
    title: "Harry Potter-The Prisoner of Askaban",
    pubDate: "1999-02-04",
    language: "en",
    numPage:"478",
    author: [6],
    publications: [4],
    category: ["Fiction", "Fantasy", "Magic"]
},
{ 
    ISBN: "7865Book",
    title: "The Alchemist",
    pubDate: "2007-10-27",
    language: "hin",
    numPage:"210",
    author: [3],
    publications: [9],
    category: ["Fiction", "Lifestyle"]
}
] 

const author = [
    {
        id: 6,
        name: "Elon Musk",
        books: ["12345Book", "SoTrueBestie", "Dr. Dil"],
    },
    {
        id: 2,
        name: "J. S. Thomas",
        books: ["12345Book"]
    },
    {
        id: 6,
        name: " JK Rowling",
        books: ["2233Book"]
    },
    {
        id: 3,
        name: " Paul Colheo",
        books: ["7865Book"]
    },
    
]

const publication = [
    {
        id: 1,
        name: "Penguin",
        books: ["12345Book"]
    },
   {
       id: 4,
       name: "Writex",
       books: ["2233Book"]
   },
   {
       id: 9,
       name: "NY Times",
       books: ["7865Book"]
   },
   {
    id: 2,
    name: "Writex2",
    books: []
}
]

//This is an external dataset, so we have to tell this file that this data set has to be exported because by default they have the security this cannot be exported in other js file

module.exports ={ books, author, publication}//whatever array of objects we want to export