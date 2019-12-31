// {
//     let createPost = function(){
//         let newPostForm = $('#new-post-form');
//         let feedPosts = $('#feed-posts>form>textare');
//         newPostForm.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type : 'post',
//                 url : '/posts/create-Post',
//                 data : newPostForm.serialize(), //converts form data to json
//                 success : function(data){
//                     let newPost = newPostDom(data.data.post);
//                     $('#post-list-container>ul').prepend(newPost);
//                     $("textarea#postContent").val(" ");
//                     deletePost($(' .delete-post-button', newPost));
//                 },
//                 error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }


//     let newPostDom = function(post){
//         return $(`<li id="post-${post._id}">
        
//         <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        
//         <p>
//            ${post.content}<br>
//            <small>${post.user.name}</small>
//         </p>
//         <div class="post-comments">
            
//                 <form action="/comments/create" method="POST">
//                     <textarea name="content" rows="1" cols="30" placeholder="Add Comments..."></textarea>
//                     <input type="hidden" value="${post._id}" name="post">
//                     <input type="submit" value="Post Comment">
//                 </form>
//                 <div class="post-comments-list">
//                     <ul id="post-comments- ${post._id}">
                    
//                     </ul>
//                 </div>
//         </div>
//     </li>`)
//     }



//     let deletePost = function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url : $(deleteLink).prop('href'),
//                 success: function(data){
//                     $(`#post-${data.data.post_id}`).remove();
//                 },
//                 error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }
   

   

//     createPost();
// }