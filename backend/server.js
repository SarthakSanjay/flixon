const express = require("express");
const mongoose = require("mongoose");
const app = express();
//
// Define the port number for the server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(`mongodb+srv://sarthaksanjaycoll21:rnolqcmzBq0zwoMF@cluster0.wrruv42.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
    // your code here
  })
  .catch((err) => console.error(err));

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);
// Sample movies data
const movies = [
  {
    title: "Breaking Bad",
    genre: "Drama",
    description:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    image: "https://c8.alamy.com/comp/2M5PGC1/breaking-bad-bryan-cranston-poster-2M5PGC1.jpg",
  },
  {
    title: "Stranger Things",
    genre: "Drama",
    description:
      "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying forces in order to get him back.",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2017%2F10%2Fstranger-things-poster-2000.jpg&q=60",
  },
  {
    title: "Game of Thrones",
    genre: "Fantasy",
    description:
      "Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    image: "https://oyster.ignimgs.com/wordpress/stg.ign.com/2019/03/GoT8_KeyArt.jpg",
  },
  
  {
    title: "The Office",
    genre: "Comedy",
    description:
      "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    image: "https://i.pinimg.com/550x/3e/1a/31/3e1a3118e2abafaa8adb7b2a3710f729.jpg",
  },
  {
    title: "Friends",
    genre: "Comedy",
    description:
      "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
    image: "https://pics.filmaffinity.com/Friends_TV_Series-875463197-large.jpg",
  },
  {
    title: "Black Mirror",
    genre: "Sci-Fi",
    description:
      "An anthology series exploring a twisted, high-tech world where humanity's greatest innovations and darkest instincts collide.",
    image: "https://www.themoviedb.org/t/p/original/dw7jYk7EdrkrHozG7F1Yg2eFJTm.jpg",
  },
  {
    title: "The Crown",
    genre: "Drama",
    description:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    image: "https://i.pinimg.com/originals/a0/af/39/a0af3940e7d0caaf9e45ed4bacc499c1.jpg",
  },
  {
    title: "Narcos",
    genre: "Drama",
    description:
      "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9c8VmtnJWKLBYzYXNe8-6-THG8KIgO8tXbQ&usqp=CAU",
  },
  {
    title: "The Mandalorian",
    genre: "Sci-Fi",
    description:
      "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    image: "https://collider.com/wp-content/uploads/2019/10/the-mandalorian-poster-pedro-pascal.jpg",
  },
  
  {
    title: "The Mandalorian",
    genre: "Sci-Fi",
    description:
      "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    image: "https://collider.com/wp-content/uploads/2019/10/the-mandalorian-poster-pedro-pascal.jpg",
  },
  // Add more movies here...
];

// Add the sample movies to the database
Movie.insertMany(movies)
  .then(() => {
    console.log("Sample movies added to database!");
  })
  .catch((err) => {
    console.error(err);
  });
app.get("/api/tvshows", (req, res) => {
  Movie.find()
    .limit(10)
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

// app.get("/tvshows", (req, res) => {
//   Movie.find()
//     .then((movies) => {
//       res.render("tvshows", { movies });
//     })
//     .catch((err) => console.error(err));
// });


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
