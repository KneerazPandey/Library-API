import { db } from '../src/utils/db.server';

type Author = {
    firstName: string, 
    lastName: string,
}

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}

async function seed() {
    await Promise.all(
        getAuthors().map((author) => {
            db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName,
                }
            });
        })
    );

    const author = await db.author.findFirst({
        where: {
            firstName: "Niraj"
        }
    });

    const authorId: number = author ? author.id : 1;
    
    await Promise.all(
        getBooks().map((book) => {
            db.book.create({
                data: {
                    title: book.title,
                    datePublished: new Date(),
                    isFiction: book.isFiction,
                    authorId: authorId,
                }
            })
        })
    );
}

seed();

function getAuthors() : Array<Author> {
    return [
        {
            firstName: "Niraj",
            lastName: "Pandey",
        },
        {
            firstName: "Suraj",
            lastName: "Pandey",
        },
        {
            firstName: "Parbata",
            lastName: "Pandey",
        },
        {
            firstName: "Tekendra",
            lastName: "Pandey",
        },
    ];
}


function getBooks() : Array<Book> {
    return [
        {
            title: "Hello",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "Homo Des",
            isFiction: true,
            datePublished: new Date(),
        },
        {
            title: "Harry Potter",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "Spider Man",
            isFiction: true,
            datePublished: new Date(),
        },
    ];
}