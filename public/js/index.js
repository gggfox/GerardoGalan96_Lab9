const API_TOKEN = "2abbf7c3-245b-404f-9473-ade729ed4653";

function fetchBookmarks(){

    let url = '/bookmarks';
    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
    }
    let results = document.querySelector( '.results' );

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            results.innerHTML = "";
            for ( let i = 0; i < responseJSON.length; i ++ ){
                let content =`<div> 
                                    <span> id: ${responseJSON[i].id}</span>
                                    <span>title: ${responseJSON[i].title}</span>
                                    <span>description: ${responseJSON[i].description}</span>
                                    <span>rating: ${responseJSON[i].rating}</span>  
                              </div>`;
                results.innerHTML += content;
            }
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function addBookmark(title, description, bmUrl, rating){
    let url="/bookmarks";
    
    let data = {
        title : title,
        description: description,
        url: bmUrl,
        rating : Number(rating)
    };
    
    let settings = {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    };

    let results = document.querySelector( '.results' );

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( () => {
            fetchBookmarks();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}


function watchAddBookmarkForm(){
    let bookmarksForm = document.querySelector( '.add-bookmark-form' );

    bookmarksForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let title = document.getElementById( 'bookmarkTitle' ).value;
        let description = document.getElementById( 'bookmarkDescription' ).value;
        let bmUrl = document.getElementById( 'bookmarkUrl' ).value;
        let rating = document.getElementById( 'bookmarkRating' ).value;

        if( title && description && bmUrl && rating ){
            addBookmark( title, description, bmUrl, rating );
        }else{
            let results = document.querySelector( '.results' );
            results.innerHTML = `<div> One or more fields are mising </div>`;
        }
    });
}


function deleteBookmark(id){
    console.log(id);
    let url = `/bookmark/${id}`;
    let settings = {
        method : 'DELETE',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
    };

    let results = document.querySelector( '.results' );

    fetch( url, settings )
        .then( () => {
            fetchBookmarks();
        })
        .catch( err => {
            display=
            `<div> 
                <span>${err.message}</span>
                <span>Probabily theres no bookmark with the provided id</span>
            </div>`;

            results.innerHTML = display;
        });
}

function watchDeleteBookmarkForm(){
    let bookmarksDeleteForm = document.querySelector( '.delete-bookmark-form' );

    bookmarksDeleteForm.addEventListener( 'submit', (event) => {
        event.preventDefault();
        let deleteId = document.getElementById( 'BookmarkIdToDelete');

        if(deleteId){
            deleteBookmark(deleteId.value);
        }else{
            let results = document.querySelector( '.results' );
            results.innerHTML = `<div> You need an Id to delete a Bookmark </div>`;
        }
    })
}


function updateBookmark(uId,uTitle,uDescription,uUrl,uRating){
    let url = `/bookmark/${uId}`;
    console.log(url);
    let data = {
        id : uId,
        title : uTitle,
        description: uDescription,
        url: uUrl,
        rating : Number(uRating)
    };
    
    let settings = {
        method : 'PATCH',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    };

    let results = document.querySelector( '.results' );

    fetch( url, settings )
    .then( response => {
        if( response.ok ){
            return {};
        }
        throw new Error( response.statusText );
    })
    .then( () => {
        fetchBookmarks();
    })
    .catch( err => {
        results.innerHTML = `<div> ${err.message} </div>`;
    });
}

function watchUpdateBookmarkForm(){
    let bookmarkUpdateForm = document.querySelector('.update-bookmark-form');

    bookmarkUpdateForm.addEventListener( 'submit', (event) => {
        event.preventDefault();

        let updateId = document.getElementById( 'bookmarkToUpdateId' ).value;
        let updateTitle = document.getElementById( 'bookmarkToUpdateTitle' ).value;
        let updateDescription = document.getElementById( 'bookmarkToUpdateDescription' ).value;
        let updateUrl = document.getElementById( 'bookmarkToUpdateUrl' ).value;
        let updateRating = document.getElementById( 'bookmarkToUpdateRating' ).value;


        if(updateId && (updateTitle || updateDescription || updateUrl || updateRating)){
            updateBookmark(updateId,updateTitle,updateDescription,updateUrl,updateRating);
        }else{
            let results = document.querySelector( '.results' );
            let errorMsg = 
            `<div> Either your Id is missing or theres nothing in any other field </div>`;
            results.innerHTML = errorMsg;
        }
    });
}


function getBookmarksByTitleForm( gTitle ){
    console,log(gTitle);
    let url = ` /bookmark?title=${ gTitle } `;
    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
        }
    };
    let results = document.querySelector( '.results' );

    fetch( url, settings )
    .then( response => {
        if( response.ok ){
            return response.json();
        }
        throw new Error( response.statusText );
    })
    .then( responseJSON => {
        results.innerHTML = "";
        for ( let i = 0; i < responseJSON.length; i ++ ){
            let content =`<div> 
                                <span> id: ${responseJSON[i].id}</span>
                                <span>title: ${responseJSON[i].title}</span>
                                <span>description: ${responseJSON[i].description}</span>
                                <span>rating: ${responseJSON[i].rating}</span>  
                          </div>`;
            results.innerHTML += content;
        }
    })
    .catch( err => {
        results.innerHTML = `<div> ${err.message} </div>`;
    });
}

function  watchGetBookmarksByTitleForm(){
    let getBookmarksByTitle = document.querySelector( 'get-bookmarks-form' );

    getBookmarksByTitle.addEventListener( 'submit', ( event ) => {
        event.preventDefault();

        let title = document.getElementById( ' getBookmarksByTitle ' ).value;
        console.log(title);
        if( title ){
            getBookmarksByTitleForm( title );
        }else{
            let results = document.querySelector( '.results' );
            let errorMsg = 
            `<div> You dont have a title in your query </div>`;
            results.innerHTML = errorMsg;
        }
    });
}

function init(){
    
    fetchBookmarks();
    watchAddBookmarkForm();
    watchDeleteBookmarkForm();
    watchUpdateBookmarkForm();
    watchGetBookmarksByTitleForm();
}


init();