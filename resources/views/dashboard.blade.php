@extends('layouts.app')

@section('content')

    <div id="frame">

        @include('layouts.sidebar')

        <div class="content">
            <div class="blank-wrap">
                <div class="inner-blank-wrap">Select a contact to message!</div>
            </div>
            <div class="loader d-none">
                <div class="loader-inner">
                    <l-square
                        size="35"
                        stroke="5"
                        stroke-length="0.25"
                        bg-opacity="0.1"
                        speed="1.2"
                        color="#27ae60"
                    ></l-square>
                </div>
            </div>
            <div class="contact-profile">
                <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                <p class="contact-name"></p>
                <div class="social-media">

                </div>
            </div>
            <div class="messages">
                <ul class="messages-ul">
{{--                    <x-message class="sent" text="Hello"></x-message>--}}
{{--                    <x-message class="replies" text="Hi!"></x-message>--}}
                </ul>
            </div>
            <div class="message-input">
                <form action="" method="post" class="message-form">
                    @csrf
                    <div class="wrap">
                        <input type="text" name="message" placeholder="Write your message..."  class="message-box"/>
                        <button type="submit" class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>

@endsection

@section('scripts')
    @vite('resources/js/app.js')
    @vite('resources/js/message.js')
@endsection

