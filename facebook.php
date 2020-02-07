<?php
/**
 * Created by PhpStorm.
 * User: GC29
 * Date: 2020/1/21
 * Time: 下午 02:51
 */
require_once __DIR__ . '/vendor/autoload.php';

ini_set('display_errors','1');
error_reporting(E_ALL & ~E_NOTICE);
//error_reporting(E_ALL);
date_default_timezone_set("Asia/Taipei");
use Facebook\Exceptions\FacebookResponseException;
use Facebook\Exceptions\FacebookSDKException;
$app_id = "1336150593224320";
$app_secret = "9c2e71a96a67497384445b71fd584cd4";
$access_token = file_get_contents("fb_token.txt");

/*
function renewToken($app_id, $app_secret, $access_token)
{
    $exchange_long_lived_token_url = "https://graph.facebook.com/oauth/access_token?client_id=$app_id&client_secret=$app_secret&grant_type=fb_exchange_token&fb_exchange_token=$access_token";
    $response = file_get_contents($exchange_long_lived_token_url);
}
*/

try {
    $fb = new Facebook\Facebook([
        'app_id' => $app_id,           //Replace {your-app-id} with your app ID
        'app_secret' => $app_secret,   //Replace {your-app-secret} with your app secret
        'graph_api_version' => 'v5.0',
    ]);

    // Returns a `FacebookFacebookResponse` object
    $response = $fb->get(
        '/102607404484147?fields=posts.limit(6){picture,full_picture,created_time,message,story,permalink_url}',
        $access_token
    );

    $graphNode = $response->getGraphNode();
//    echo '<pre>';
//    print_r($graphNode->asArray());
//    echo '</pre>';
//    exit;
    $data = [];
    $nodes = $graphNode->asArray();
    foreach ($nodes['posts'] as $node){
        if(isset($node['message']) && $node['full_picture']) {
            $item = [
                'picture' => $node['full_picture'],
                'message' => mb_substr($node['message'], 0, 30),
                'url' => $node['permalink_url'],
            ];
            $data[] = $item;
        }
    }
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
} catch(FacebookResponseException $e) {
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
} catch(FacebookSDKException $e) {
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}

