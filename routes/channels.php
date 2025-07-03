<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('message.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});


Broadcast::channel('chat.{id}', function ($user, $id) {
    return true;
});

Broadcast::channel('online', function ($user) {
    return $user->toArray();
});
