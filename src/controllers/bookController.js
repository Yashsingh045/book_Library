import prisma from "../db/db.config.js";


export const createBook = async (req,res)=>{
  try {
    const {title, summary, isbn, url, authorId, genres} = req.body;

    if (!title || !summary || !isbn || !url || !authorId) {
      return res.status(400).json({error: "All fields are mondatory" });
    }

    const authorExists = await prisma.author.findUnique({
      where: { id: authorId }
    });
  
    if (!authorExists) {
      return res.status(404).json({error: "Author not found" });
    }

    let genreConnections = [];
    if (genres && genres.length > 0) {
      genreConnections = await prisma.genre.findMany({
        where: { id: { in: genres } },
      });

      if (genreConnections.length !== genres.length) {
        return res.status(404).json({error: "One or more genres not found" });
      }
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        summary,
        isbn,
        url,
        author: { connect: { id: authorId } },
        genres: {
          create: genres.map((genreId) => ({
            genre: { connect: { id: genreId } },
          })),
        },
      },
    });

    res.status(201).json(newBook);
    
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
}

export const getBook = async (req,res)=>{
  let {id} = req.params
  if (!id) {
    return res.status(400).json({error: "Book ID is Mondatory"})
  }
  id = Number(id)
  const book = await prisma.book.findMany({
    where:{
      id : id
    }
  })

  if (!book){
    return res.status(400).json({error:"BookId is invalid"})
  }

  return res.status(200).json({book})
}




export const getAllBooks = async (req,res)=>{

  const books = await prisma.book.findMany()

  if (!books){
    return res.status(404).json({error:"Library is Empty"})
  }

  return res.status(200).json({books})
}