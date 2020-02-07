<?php
/**
 * Created by PhpStorm.
 * User: GC29
 * Date: 2020/1/21
 * Time: 下午 04:34
 */
require_once __DIR__ . '/vendor/autoload.php';
ini_set('display_errors','1');
error_reporting(E_ALL & ~E_NOTICE);
//error_reporting(E_ALL);
date_default_timezone_set("Asia/Taipei");

/*
參閱文件: https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens

https://api.instagram.com/oauth/authorize?client_id=902925940122900&redirect_uri=https://www.momogo.pet/ig.php&scope=user_profile,user_media&response_type=code
curl -X POST https://api.instagram.com/oauth/access_token -F client_id=902925940122900 -F client_secret=ada5b7ebd065812109c4a261c7ef1c73 -F grant_type=authorization_code -F redirect_uri=https://www.momogo.pet/ig.php -F code=AQDatObchE5_uyycYoeqe5ljBnXeJLWdqwCoBdYRDcg_-ZPz1cVKXKq98tLAuvxBWxck_09KMhKkGVnDPhcQjg4sio2ksYlFSfmwkueqV_BMCX_1O8QyzoMJButhgbGpXI5ZYhIH8BUg9W9BkOHofWlzDADAc7yY8UFxwAXzUldER9XLwFDYnbiAIWPSs_ldf5FdO7P8wnJkl4NW1w7kKkFHiA85SK-G3BAuKfkw5WAhNw
{"access_token": "IGQVJVVFlSbmp2a1lENUx0Mm1aamppX2Y4QWcwMzVzZAWVJWkdYZA2E5WXZAXX28waGdkVHBYaEZAsNEQ0VkxUU3ljNVQzT21MdG1uUmtyQllYa3JRY1E2eDhsdE1fYWEwTThESE9JUmNjVUlVcmRDYldEUEN3UkQwMHlmOVk0", "user_id": 17841421703810915}
*/
$app_id = "902925940122900";
$app_secret = "ada5b7ebd065812109c4a261c7ef1c73";
$token = readToken();

function readToken()
{
    $token_json = json_decode(file_get_contents("ig_token.txt"), true);
    if(filectime("ig_token.txt") + $token_json['expires_in'] - time() < 86400)  //token過期
        $token_json = renewToken($token_json['access_token']);
    return $token_json;
}

function renewToken($access_token)
{
    $client = new GuzzleHttp\Client();
    $url = "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=$access_token";
    $response = $client->request('GET', $url);
    /*
     {
        "access_token":"{long-lived-user-access-token}",
        "token_type": "bearer",
        "expires_in": 5183944  // Number of seconds until token expires
     }
    */
    if($response->getStatusCode() == 200) {
        $data = $response->getBody();
        file_put_contents('ig_token.txt', $data);
        return json_decode($data, true);
    }

    return false;
}

function getMedias($access_token)
{
    $client = new GuzzleHttp\Client();
    $url = "https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url,timestamp,caption,username&access_token=$access_token";
    $response = $client->request('GET', $url);

    if($response->getStatusCode() == 200){
        return json_decode($response->getBody(), true);
    }
    return false;
}

$response = getMedias($token['access_token']);
$data = $response['data'];

header('Content-Type: application/json; charset=utf-8');
echo json_encode($data);