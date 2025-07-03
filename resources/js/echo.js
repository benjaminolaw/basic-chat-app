import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsPort: import.meta.env.VITE_PUSHER_PORT,
    wssPort: import.meta.env.VITE_PUSHER_PORT,
    enabledTransports: ["ws", "wss"],
});

// var userId = document.querySelector('meta[name="user_id"]').getAttribute('content');
//
// window.Echo.private('chat.'+ userId).listen('NewMessage', (e) => {
//     console.log(e);
//     document.getElementById("messages").innerHTML += `<p> ${e.message}</p>`
// });
//
// window.Echo.join('online').here(users=> {
//     console.log(users);
// })
//     .joining(user => {
//     console.log(user);
// })
//     .leaving(user => {
//     console.log(user);
// });
