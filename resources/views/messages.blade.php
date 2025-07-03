<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="user_id" content="{{ auth()->user()?->id }}">
    <title>Document</title>
    @vite('resources/js/app.js')
</head>
<body>
<h1>Messages</h1>

<div id="messages">

</div>
</body>
</html>
