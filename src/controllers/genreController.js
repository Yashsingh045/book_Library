
import prisma from "../db/db.config.js";


export const createGenre = async (req, res) => {
  try {
    const {name, url} = req.body;

    if (!name || !url) {
      return res.status(400).json({error: "All fields are mandatory"});
    }

    const newGenre = await prisma.genre.create({
      data: {
        name:name,
        url:url,
      },
    });

    return res.status(201).json(newGenre);
  } catch (error) {
    return res.status(500).json({error: error.message,message:"Failed to create genre"});
  }
}

export const getAllGenre = async(req, res)=>{
  try {
    const genres = await prisma.genre.findMany({
      include:{
        books:{
          select:{
            title:true
          }
        }
      }
    })

    if (!genres){
      return res.status(404).json({error:"Library is Empty"})
    }

    return res.status(200).json({books})

  } catch (error) {
    return res.status(500).json({error: error.message,message:"Failed to get genre"});
  }
}

export const getGenreById = async(req,res) => {
  try{
    let {id} = req.params
    id = Number(id)
    if (!id){
      return res.status(400).json({error: "id is mondatory"})
    }

    const genre = await prisma.genre.findMany(
      {where:{
        id : id
      },
        include:{
          books:{
            select:{
              title:true
            }
          }
        }
      
    }
    )

    if (!genre){
      return res.status(404).json({error:"No genre found with this id"})
    }

    return res.status(200).json(genre)
  }catch(error){
    return res.status(500).json({error: error.message,message:"Failed to get genre"})
  }
}

export const deleteGenre = async(req,res) => {
  try{
    let {id} = req.params
    id = Number(id)
    if (!id){
      return res.status(400).json({error:"Id is mondatory"})
    }

    const deletedGenre = await prisma.genre.delete({
      where:{
        id:id
      }
    })

  }catch(error){
    return res.status(500).json({error: error.message,message:"Failed to delete genre"})
  }

}


export const updateGenre = async (req,res)=>{
  try{
    let {id,name,url} = req.body
    let updatedGenre;
    id= Number(id)
    if (name){
      
      updatedGenre = await prisma.genre.update({
        where:{
          id:id
        },data:{
          name
        }
      })
    }
    if (url){
      updatedGenre = await prisma.genre.update({
        where:{
          id:id
        },data:{
          url
        }
      })
    }

    if (!updatedGenre){
      return res.status(404).json({error:"Genre not found for given Id"})
    }
    return res.status(200).json(updateGenre)
  }catch(err){
    return res.status(500).json({error:err})
  }
}