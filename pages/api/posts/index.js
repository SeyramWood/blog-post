import dbConnect from "../../../libs/dbConnection";
import Post from "../../../models/post.model";
export default async function handler(req, res) {
  await dbConnect();
 
  if (req.method === "GET") {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    console.log(req.body);
    const post = await Post.create(req.body)
    res.status(201).json(post);
  } else {
    res
      .status(405)
      .json({ error: "METHOD not allowed, Only GET and POST are allowed" });
  }
}