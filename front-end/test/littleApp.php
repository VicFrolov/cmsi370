<?php

echo "<h2> Simple Twitter API Test </h2>";

require_once('TwitterAPIExchange.php');
 
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "35929248-6VzSZMtmRokPJqmwJ3QIWSLyzxAjJCJeHVOoyShH9",
    'oauth_access_token_secret' => "oVfSUB613mtSgsfNdrg5KbLLtlHIXwSMDnmaXiKwfSh8R",
    'consumer_key' => "CO0QIryPxSTsxM5f94kzr8rby",
    'consumer_secret' => "nMuFLNd460HcJzM7xgolu3MldodNb9CmpxUr55N7ubBEAcCOQg"
);

$url = "https://api.twitter.com/1.1/search/tweets.json";

?>