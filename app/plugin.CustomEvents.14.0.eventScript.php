<?php 

$client=Core::Client()->getUserId();
sleep(4);
Core::Broadcast("user." . $client, "notification",array(
  "text" => "You have been assigned ownership of items",
));