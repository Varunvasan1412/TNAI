<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OfflineTicketReceivedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $userMessage;

    public function __construct($userMessage)
    {
        $this->userMessage = $userMessage;
    }

    public function build()
    {
        return $this->subject('Support Ticket Received')
                    ->view('emails.chatbot.offline_ticket_received');
    }
}
