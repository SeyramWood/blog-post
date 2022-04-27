import dbConnect from "../../../libs/dbConnection";
import Post from "../../../models/post.model";


export default async function handler(req, res) {
  await dbConnect();
const {method, body, query} = req;

  
  if (method === "GET") {
    const post = await Post.findById(query.postId);
    if (!post) {
        res.status(404).json({error:'Post not found'});
    }
    res.status(200).json({post});

  }
  
  else if (method === "PATCH") {
    const post = await Post.findById(query.postId);
    if (!post) {
        res.status(404).json({error:'Post not found'});
    }
    const updatedPost = await Post.findByIdAndUpdate(query.postId, body, {new:true})
    res.status(200).json(updatedPost);
  } 
  else if (method === "DELETE") {
    const post = await Post.findById(query.postId);
    if (!post) {
        res.status(404).json({error:'Post not found'});
    }
    const updatedPost = await Post.findByIdAndDelete(query.postId)
    res.status(200).json({msg:'Post deleted successfully'});
  } 
  
  else {
    res
      .status(405)
      .json({ error: "METHOD not allowed, Only GET and POST are allowed" });
  }
}