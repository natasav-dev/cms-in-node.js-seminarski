const mongoose = require('mongoose');

const URLSlugs = require('mongoose-url-slugs');


const Schema  = mongoose.Schema;

//promenljiva-koja drzi nasu semu; zapravo objekat sa svojim parametrima 
//          (svako polje ima svoj type-obavezan parametar,ref-opcioni, required-opcioni(mongoose autentifikacija) i druge opcione...)

const PostSchema = new Schema({

   user: {

       type: Schema.Types.ObjectId,
       ref:'users'
   },
    category: {

        type: Schema.Types.ObjectId,
        ref: 'categories'

    },
    title:{

        type: String,
        required: true

    },
    slug: {

        type: String

    },

    status:{

        type: String,
        default: 'public'

    },

    allowComments:{

        type: Boolean,
        require: true

    },


    body:{

        type: String,
        require: true

    },


    file:{

        type: String,

    },

    date: {

        type: Date,
        default: Date.now()

    },

    comments: [{

        type: Schema.Types.ObjectId,
        ref: 'comments'


    }]


}, {usePushEach: true});

PostSchema.plugin(URLSlugs('title', {field: 'slug'}));

// definicija za export modela mongoose.model('referenca_za_ime_seme',ime_seme)
module.exports = mongoose.model('posts', PostSchema);