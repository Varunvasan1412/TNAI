<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$data = [
    "address" => "16B, Kamarajar 1st street, Near New Bus stand, Bhavani",
    "city" => "Erode",
    "contact_email" => "dev.varun1403@gmail.com",
    "contact_person" => "varun dev",
    "contact_phone" => "06380282875",
    "detailed_description" => "detailed description",
    "display_order" => "1",
    "end_date" => "2026-09-13",
    "end_time" => "23:50",
    "event_banner" => "test event banner",
    "event_brochure" => "test even brochure",
    "event_category" => "Workshop",
    "event_title" => "test",
    "organizing_chairperson" => "varun",
    "organizing_secretary" => "santhosh",
    "registration_required" => true,
    "registration_url" => "https://amoeba.space/admin",
    "short_description" => "short description",
    "start_date" => "2026-09-12",
    "start_time" => "23:50",
    "state" => "Tamil Nadu",
    "status" => "active",
    "venue" => "venue_mock"
];

try {
    $event = \App\Models\Event::create($data);
    echo "SUCCESS: " . $event->id . "\n";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
