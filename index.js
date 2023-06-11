//BOOK MANAGEMENT SYSTEM
const express = require("express")
const bodyParser = require("body-parser")

//using database
const database = require("./database")

//initialise
const Booky = express();
Booky.use(bodyParser.urlencoded({extended: true}))       //Booky has to use body parser0 body parser allows express to read the body and then parse ot or convert it into a json object so that the machine as well as we can understand it
Booky.use(bodyParser.json())                                                         //urlencoded extended true--> means that the rquest which we are parsing will contain any kind of values
/* API 1- BOOKS
Route                /
Description          Get all books
Access               PUBLIC
Parameter            NONE
Methods              GET
*/

Booky.get("/", (req, res) => {
   return res.json({books: database.books})
});

/* API 2-BOOKS
Route                /is
Description          Get specific books based on ISBN
Access               PUBLIC
Parameter            isbn
Methods              GET
*/
 
Booky.get("/is/:isbn", (req, res) => {
    const getSpecicBook = database.books.filter(
        book => book.ISBN === req.params.isbn 
    )

    if(getSpecicBook.length === 0){
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`})
    }

    return res.json({book: getSpecicBook})
})

/* API 3- BOOKS
Route                /category
Description          Get specific books based on category
Access               PUBLIC
Parameter            cat
Methods              GET
*/

Booky.get("/category/:cat", (req, res) => {
    const getCatBook = database.books.filter(
        book => book.category.includes(req.params.cat) 
    )

    if(getCatBook.length === 0){
        return res.json({error: ` No books found for the Category ${req.params.cat}`})
    }

    return res.json({book: getCatBook})
}
)

/* API 4- BOOKS
Route                /languages
Description          Get specific books based on languages
Access               PUBLIC
Parameter            lang
Methods              GET
*/

Booky.get("/languages/:lang", (req, res) => {
    const getSpecicBook = database.books.filter(
        book => book.language === req.params.lang
    )

    if(getSpecicBook.length === 0){
        return res.json({ error: `No books found for language ${req.params.lang}`})
    }

    return res.json({book: getSpecicBook})
})

/* API 5- BOOKS
Route                /author
Description          Get specific books based on authors' id
Access               PUBLIC
Parameter            auid
Methods              GET
*/

Booky.get("/booksAuthor/:auid", (req, res) => {
    const getSpecicBook = database.books.filter(
        book => book.author.includes(parseInt(req.params.auid)) 
    )

    if(getSpecicBook.length === 0){
        return res.json({error: `No books found for author ${req.params.auid}`})
    }
    return res.json({book: getSpecicBook})

})


/* API 1- AUTHORS
Route                /author
Description          Get all authors' id
Access               PUBLIC
Parameter            none
Methods              GET
*/

Booky.get("/author", (req, res) => {
    return res.json({author: database.author})
})

/* API 2- AUTHORS
Route                /author
Description          Get specific authors based on books' isbn number
Access               PUBLIC
Parameter            isbn
Methods              GET
*/

Booky.get("/author/:isbn", (req, res) =>{
    const getSpecificAuthor = database.author.filter(
        author => author.books.includes(req.params.isbn)
    )

    if(getSpecificAuthor.length === 0){
        return res.json({ error: `No authors found for isbn ${req.params.isbn}`})
    }

    return res.json({author: getSpecificAuthor})
})


/* API 3- AUTHORS
Route                /authorid
Description          Get specific authors based on books' author's id
Access               PUBLIC
Parameter            auid
Methods              GET
*/


Booky.get("/authorid/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        author => author.id === parseInt(req.params.id)
    )

    if(getSpecificAuthor.length === 0){
        return res.json({error: `No authors found for id ${req.params.id}`})
    }

    return res.json({author: getSpecificAuthor})
})


/* API 1 - PUBLICATION
Route                /publications
Description          Get all publications
Access               PUBLIC
Parameter            NONE
Methods              GET
*/

Booky.get("/publications", (req, res) => {
    return res.json({publication: database.publication})
})

/* API 2 - PUBLICATION
Route                /publications
Description          Get specific publications based on publication id
Access               PUBLIC
Parameter            pubid
Methods              GET
*/

Booky.get("/publications/:pubid", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        pub => pub.id === parseInt(req.params.pubid)
    )

    if(getSpecificPublication.length === 0){
        return({error: ` No Publications found for publication id ${req.params.json}`})
    }

    return res.json({pub: getSpecificPublication})
})

/* API 3 - PUBLICATION
Route                /publicationsBook
Description          Get specific publications based on publication id
Access               PUBLIC
Parameter            bookid
Methods              GET
*/

Booky.get("/publicationsBook/:bookid", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        pub => pub.books.includes(req.params.bookid)
    )

    if(getSpecificPublication.length === 0){
        return res.json({error: `No publications found for ${req.params.bookid}`})
    }

    return res.json({pub: getSpecificPublication})
})

//---------------------------------------------------------------------------------------------------
//POST 
/* API 1 - Books
Route                /book/new
Description          Add new books
Access               PUBLIC
Parameter            none
Methods              POST
*/

Booky.post("/book/new", (req, res) => {
    const newBook = req.body                            //making our request through postman
    database.books.push(newBook);                          //fetching the body of our request
    return res.json({updatedBooks: database.books})
})

/* API 1 - Authors
Route                /author/new
Description          Add new author
Access               PUBLIC
Parameter            none
Methods              POST
*/

Booky.post("/author/new", (req, res) => {
    const newAuthor = req.body
    database.author.push(newAuthor)
    return res.json(database.author)
})


/* API 1 - Publications
Route                /publication/new
Description          Add new publication
Access               PUBLIC
Parameter            none
Methods              POST
*/


/*Booky.post("/publication/new", (req, res) => {
    const newPublication = req.body
    database.publication.push(newPublication)
    return res.json(database.publication)
})
*/
//if data is present in the data set, update it
//if data is not present in the data se, push it


Booky.post("/publication/new", (req, res) => {
    const newPublication = req.body
    if(database.publication.includes(parseInt(newPublication))){
        return res.json({updatedPublication: database.publication})
    }
    else{
        database.publication.push(newPublication)
        return res.json({NewPublications: database.publication})
    }
    

})

//PUT request
/* API 1 - Publications
Route                /publication/update/book 
Description          Update/add a new publication- 2 tasks- update the publication database, update the book database
Access               PUBLIC
Parameter            isbn
Methods              POST
*/

Booky.put("/publication/update/book/:isbn", (req, res) => {
    
    //Remove that book from the old publication if present
    database.publication.forEach((pub) => {
        if(pub.books.includes(req.params.isbn)){
            return pub.books.pop(req.params.isbn)
        }
    })
    
    //Update the publication database
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId) {
            return pub.books.push(req.params.isbn)
        }
    })


    //Update the books database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publications = req.body.pubId
            return
        }
    })

    return res.json(
        {
            books: database.books,
            publications: database.publication,
            message: "Successfully updated publications"
        }
    )

})

//DELETE request
/* 
Route                /book/delete/book 
Description          Delete a book
Access               PUBLIC
Parameter            isbn
Methods              DELETE
*/

Booky.delete("/book/delete/:isbn", (req, res) => {
    //Whichever book doesnot match with the isbn, send it to the updatedBookDatabase
    //and rest will be filtered out

    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN != req.params.isbn
    )
    database.books = updatedBookDatabase

    return res.json({ books: database.books})
})

/* 
Route                /book/delete/author 
Description          Delete an author from a book and vice versa
Access               PUBLIC
Parameter            isbn, authorId
Methods              DELETE
*/

Booky.delete("/book/delete/author/:isbn/:authorId", (req, res) =>{
//Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                eachAuthor => eachAuthor !== parseInt(req.params.authorId)
            )
            book.author = newAuthorList
            return
        }
    })

//Update the author database
    database.author.forEach((eachAuthor) => {
        if(eachAuthor.id === parseInt(req.params.authorId)){
            const newBookList = eachAuthor.books.filter(
                book => book !== req.params.isbn
            )
            eachAuthor.books = newBookList
            return
        }
    })
    return res.json({
        book: database.books,
        author: database.author,
        message: "Author was deleted!!"
    })
})











Booky.listen(5000, () => {
    console.log("Server is up and running")
}
)
