let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");
let Pusher = require("pusher");
let bodyParser = require("body-parser");
let Multipart = require("connect-multiparty");


// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
      type User {
        id : String!
        nickname : String!
        avatar : String!
      }

      type Post {
          id: String!
          user: User!
          caption : String!
          image : String!
      }

      type Query{
        user(id: String) : User!
        post(user_id: String, post_id: String) : Post!
        posts(user_id: String) : [Post]
      }

`);

// Maps id to User object
let userslist = {

  a: {
    id: "a",
    nickname: "ivanradun",
    avatar: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/111554483/original/83d513acbc4b3716c9a474086bb633a5de3c2d74/create-social-media-avatars-in-minimalist-style.jpg"
  },

  b: {
    id: "b",
    nickname: "lovely_girl",
    avatar: "https://data.whicdn.com/images/282314648/original.jpg"
  },

  c: {
      id: "c",
      nickname: "footballFAN",
      avatar: "https://www.gmcrafts.co.uk/wp-content/uploads/2018/11/Football-Main-Product-Image.jpg"
  },

  d: {
      id: "d",
      nickname: "_aNONYMUs_",
      avatar: "https://mmj-live.s3-accelerate.amazonaws.com/assets/cover_image/baca830c-f091-11e8-ac46-0679f364d8e4.jpeg?cb=20181125100852.jpg"
  }

};

let postslist = {

  a: {
    a: {
      id: "a",
      user: userslist["a"],
      caption: "Thinking leopard",
      image: "https://people.kzoo.edu/k11kg03/CS107Web/originalLeopard.jpg"
    },

    b: {
      id: "b",
      user: userslist["a"],
      caption: "Keep calm...",
      image: "https://poster.keepcalmandposters.com/146048.png"
    },

    c: {
      id: "c",
      user: userslist["a"],
      caption: "Waiting for new Champions League games",
      image: "https://miro.medium.com/max/1000/0*FapPXXhTDYzNKmRi"
    },

    d: {
      id: "d",
      user: userslist["a"],
      caption: "Conspiricy!?",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Contrail.fourengined.arp.jpg"
      
    }
  }
};

// The root provides a resolver function for each API endpoint
let root = {

  user: function({ id }) {
    return userslist[id];
  },

  post: function({ user_id, post_id }) {
    return postslist[user_id][post_id];
  },

  posts: function({ user_id }) {
    return Object.values(postslist[user_id]);

  }
};

// Configure Pusher client
let pusher = new Pusher({
  appId: "PUSHER_APP_ID",
  key: "PUSHER_APP_KEY",
  secret: "PUSHER_APP_SECRET",
  cluster: "PUSHER_APP_CLUSTER",
  encrypted: true
});

// Create express app
let app = express();
app.use(cors());
app.use(bodyParser.json());

let multipartMiddleware = new Multipart();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);


// trigger pusher event 
pusher.trigger("posts-channel", "new-post", { 
  post 
});

return res.json({status : "Post created"});
});

    
    // Set application port
    app.listen(4000);