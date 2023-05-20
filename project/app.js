const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Blog = require('./models/blog');
const { result } = require('lodash');
const { application } = require('express');
const blogRoutes = require('./routes/blogRoutes');

//expree app
const app = express();

//Mongoose.It is an Object Document Mapping library

//connect to mongodbß
const dbui = 'mongodb+srv://maya:test3$@nodetuts.ugdrw6w.mongodb.net/?retryWrites=true&w=majority';
//async method hence waits
mongoose.connect(dbui)
.then((result) => app.listen(3020,() => {
  console.log('Code is running on port 3020')
}))
.catch((err) => console.log(err));

//register view engine.allows for dynamic page content
app.set('view engine','ejs');

//middleware and static file
app.use(express.static(('public')));
//middleware for post request.accepting form data
app.use(express.urlencoded({extended:true}));
//middleware and logger
app.use(morgan('dev'));

//mongo and mongoose sandbox routes
app.get('/app-blog',(req,res) => {
const blog = new Blog({
    title : 'new blog2',
    snippet : 'about my new blogs',
    body : 'more about my new blogs for the week'
});
blog.save().then((result) => {res.send(result)}).catch((err) => console.log(err));
});

/*returns documents
app.get('/all-blogs',(req,res) => {
Blog.find().then((result) => res.send(result)).catch((err) => console.log(err));
});*/

/*find particular document by id
app.get('/single-blog',(req,res) => {
  Blog.findById('645054cbf2c59590fce101da').then((result) => res.send(result)).catch((err) => console.log(err));
})*/

//middleware is code that runs between getting a request and a response


//routes
app.get('/',(req,res) => {
    //sets header and statuscode
//res.send('<p>I am working with express</p>');
//res.sendFile('./views/index.html',{root: __dirname});

//next is used as a parameter and is call to break out the use function

/* sample or dummy document for testing,static
const blogs = [
  {title: 'Yoshi finds eggs', snippet: 'Lorem ipsium dolor sit amet consectetur'},
  {title: 'Mari finds stars', snippet: 'Lorem ipsium dolor sit amet consectetur'},
  {title: 'How to defeat bowser', snippet: 'Lorem ipsium dolor sit amet consectetur'}
 ];
  //render a view
  res.render('eindix',{title: 'Home',blogs});*/
  res.redirect('/blog')
  
});

//redirect
app.get('/about-us',(req,res) => {
    res.redirect('/about');
});

//blog routes
//app.use('/blogs',blo)
app.use(blogRoutes);

//404 page
//would fire for every url regardless.and when there is no match.doesnt know that is an errror page hence statuscode must be changed
app.use((req,res) => {
   // res.status(404).sendFile('./views/404.html', { root: __dirname })
   res.status(404).render('404',{title: 'Error Page'});
})
