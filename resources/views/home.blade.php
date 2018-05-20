@extends('layouts.app')

@section('content')

<style>
 #chat {
     min-height: 100px;
     list-style-type: none;
     margin: 0;
     padding: 0;
 }
 i {
     display: inline-block;
     margin-right: 15px;
     font-weight: bold;
 }

 small {
     display: block;
     margin-top: -15px;
     min-height: 20px;
     text-align: center;
 }
 p {
     text-align: center;
 }
</style>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <p class="card-header">Добро пожаловать в чат!</p>
                <div class="card-body">
                    <small id="info-panel"></small>
                    <ul id="chat">
                        {{--Сообщения чата--}}
                    </ul>
                    <form id="chat-form">
                        <input type="text"
                               id="chat-input"
                               class="form-control">
                        <hr>
                        <button type="submit"
                                class="btn btn-block btn-danger">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
