const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const Comment = require('../../models/Comment');
const {userAuthenticated} = require('../../helpers/authentication');


//pristup admin delu (po defaultu je layout -home, a sa locals.layout overajdujemo home layout);
// sa next parametrom pristupamo svim sledecim rutama

router.all('/*', (req, res, next)=>{

    req.app.locals.layout = 'admin';
    next();


});


router.get('/', (req, res)=>{


    const promises = [

        Post.count().exec(),
        Category.count().exec(),
        Comment.count().exec()

    ];


    Promise.all(promises).then(([postCount, categoryCount, commentCount])=>{


        res.render('admin/index', {postCount: postCount, categoryCount: categoryCount, commentCount: commentCount});


    });


    //
    // Post.count({}).then(postCount=>{
    //
    //     res.render('admin/index', {postCount: postCount});
    //
    //
    // });
    //

});

//post request za generisanje "fake" postova uz pomoc faker biblioteke
router.post('/generate-fake-posts', (req, res)=>{


    for(let i = 0; i < req.body.amount; i++){

        let post = new Post();

        //koriscene faker propertija - API metoda
        post.title = faker.name.title();
        post.status = 'public';
        post.allowComments = faker.random.boolean();
        post.body = faker.lorem.sentence();
        post.slug = faker.name.title();
        post.save(function(err){

            if (err) throw err;

        });

    }

    res.redirect('/admin/posts');

});






module.exports = router;