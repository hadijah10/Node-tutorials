const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

    router.get('/blog', blogController.blog_index);
    router.get('/about',blogController.blog_about);
    
    
    router.get('/blogs/create',blogController.blog_create_get);
    
    router.post('/blogs',blogController.blog_create_post);
    
    //route parameters are variable parts of a route that may change value
     router.get('/blogs/:id',blogController.blog_details);
    
    router.delete('/blogs/:id',blogController.blog_delete_post)
    
    module.exports = router; 