 var selectedUser = $('meta[name="selected_user"]');
const baseURL = $('meta[name="base_url"]').attr('content');
const inbox = $('.messages-ul')
 const currentUser = $('meta[name="loggedin_user"]').attr('content')

 function toggleLoader() {
     const loader = document.querySelector('.loader');
     if (loader.classList.contains('d-none')) {
         loader.classList.remove('d-none');
     } else {
         loader.classList.add('d-none');
     }
 }
 // Fetch User data using ID from meta
 function fetchMessages(){
    let contactId = selectedUser.attr('content')
     $.ajax(
         {
             method: 'GET',
             url: baseURL + '/fetch-messages',
             data: {
                 contact_id: contactId
             },
             beforeSend: function () {
                 toggleLoader();
             },
             success : function (data) {
                 setContactInfo(data.contact);
                 //empty all current inbox before fecthing new
                 inbox.empty();
                 //append messages
                 data.messages.forEach( value => {
                     if(value.from_id == contactId){
                         inbox.append(messageTemplate(value.message, 'sent'));
                     } else{
                         inbox.append(messageTemplate(value.message, 'replies'));
                     }
                     scrollToBottom();


             })},
             error : function (xhr, status, error) {},
             complete: function (){
                 toggleLoader();
             }


         }
     )
 }

 function messageTemplate(text, className){
    return `<li class="${className}">
        <img src="${baseURL}/default/avatar.jpg" alt="" />
        <p>${text}
        </p>
    </li>`
 }
 function sendMessage(){
     let contactId = selectedUser.attr('content');
     let content = $('.message-form').serialize();
     let messageBox = $('.message-box');
     $.ajax({
            method: 'POST',
            url: baseURL + '/send-messages',
            data: content + "&contact_id=" + contactId,
            beforeSend: function (){
                let message = messageBox.val();
                inbox.append(messageTemplate(message, 'replies'));
                messageBox.val('');
                scrollToBottom();
            },
            success: function (){},
         error : function (xhr, status, error) {}

     })
 }
 function setContactInfo(contact){
     $('.contact-name').text(contact.name)
 }

 function scrollToBottom(){

    $('.messages').stop().animate({
        scrollTop: $('.messages')[0].scrollHeight
    });
 }
$(document).ready(function (){
    //Set contact ID on Meta

    $('.contact').on('click', function (){
        let contactId = $(this).data('id');
        selectedUser.attr('content', contactId);
        //hide blank wrapper
        $('.blank-wrap').addClass('d-none')

        //fetch messages
        fetchMessages();
    })
    $('.message-form').on('submit', function (e) {
        e.preventDefault();
        sendMessage();
    });
});

// Listen to live event


 window.Echo.private('message.' + currentUser).listen('SendMessageEvent', (e) => {
     if(e.from_id == selectedUser.attr('content')){
         inbox.append(messageTemplate(e.message, 'sent'));
         scrollToBottom();
     } else{
         console.log('You have a new message')
     }
 })
 window.Echo.join('online').here(users=> {

     users.forEach(user =>
     {
         let element = $(`.contact[data-id="${user.id}"]`);
         if(element.length > 0){
             element.find('.contact-status').removeClass('offline');
             element.find('.contact-status').addClass('online');
         }

     })
 })
     .joining(user => {

         let element = $(`.contact[data-id="${user.id}"]`);
         element.find('.contact-status').removeClass('offline');
          element.find('.contact-status').addClass('online');

 })
     .leaving(user => {

         let element = $(`.contact[data-id="${user.id}"]`);
         element.find('.contact-status').removeClass('online');
             element.find('.contact-status').addClass('offline');

 });
