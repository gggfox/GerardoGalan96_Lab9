const mongoose = require( 'mongoose' );

const bookmarksCollectionSchema = mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
});

const bookmarkCollection = mongoose.model( 'bookmarks', bookmarksCollectionSchema);

const Bookmarks = {
    createBookmark : function( newBookmark ){
        return bookmarkCollection
                    .create( newBookmark )
                    .then( createdBookmark => {
                        return createdBookmark;
                    })
                    .catch( err => {
                        return err;
                    })
    },
    getAllBookmarks : function(){
        console.log('searching db');
        return bookmarkCollection
                .find()
                .then( allBookmarks => {
                    return allBookmarks; 
                })
                .catch( err => {
                    return err;
                })
    },
    getBookmarksByTitle : function( BookmarkTitle ){
        console.log('searching db for titles');
        return bookmarkCollection
            .find({ title:BookmarkTitle })
            .then( allBookmarks => {
                return ;
            })
            .catch( err => {
                return err;
            })
    },
    deleteBookmarkById : function( BookmarkId ){
        console.log( `deleting bookmark with id = ${BookmarkId}`)
        return bookmarkCollection
            .deleteOne()
            .where('id').equals(BookmarkId)
            .then( result => {
                return result;
            })
            .catch( err => {
                return err;
            });
    },
    updateBookmark : function( id, updatedBookmark){
        console.log(updatedBookmark);
        console.log(id);
        return bookmarkCollection
        .updateOne(
            {id:id},
            {$set:updatedBookmark},
            {upsert:true}
        )
        .then(results => {
            return results;
        })
        .catch(err => {
            return err;
        });
    }
}

module.exports = { Bookmarks };