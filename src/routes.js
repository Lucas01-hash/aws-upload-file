const route = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

// models
const Post = require("./models/Post");

route.get("/posts", async (req, res) => {
  const posts = await Post.find();

  return res.json(posts);
});

route.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url,
  });

  return res.json(post);
});

route.delete("/post/:id", async (req, res) => {
    // metodos falhos
//   const { id } = req.params;
//   const post = await Post.remove({ _id: id });
//   return res.send({ message: "excluido com sucesso!" });

//   const { id } = req.params;
//   const post = await Post.deleteOne({ _id: id });
//   return res.send({ message: "excluido com sucesso!" });

  const { id } = req.params;
  const post = await Post.findById({ _id: id });
  await post.remove();
  return res.send({ message: "excluido com sucesso!" });
});

module.exports = route;
