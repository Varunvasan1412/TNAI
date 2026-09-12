<?php

namespace App\Jobs;

use App\Modules\Chatbot\Models\ChatSession;
use App\Events\ChatSessionLogout;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessOfflineLogout implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $session;

    public function __construct(ChatSession $session)
    {
        $this->session = $session;
    }

    public function handle()
    {
        $this->session->update([
            'status' => 'closed',
            'is_user_online' => false
        ]);

        broadcast(new ChatSessionLogout($this->session));
    }
}
