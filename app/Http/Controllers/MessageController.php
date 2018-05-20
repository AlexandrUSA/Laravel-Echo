<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChatMessage as Message;
use App\Events\NewMessage;

class MessageController extends Controller
{
    public function index(Request $request)
    {

        $user = $request->user();
        $message = Message::create([
            'user_id' => $user->id,
            'message' => $request->get('message')
        ]);

        event(new NewMessage($message, $user));

    }
}
