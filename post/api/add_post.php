<?php
header("Access-Control-Allow-Origin: *"); // Разрешить запросы с любого домена
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header('Content-Type: application/json');
$file = '../posts.json';

// Получаем данные из POST-запроса
$input = json_decode(file_get_contents('php://input'), true);
$title = $input['title'] ?? '';
$content = $input['content'] ?? '';

if (!$title || !$content) {
    http_response_code(400);
    die(json_encode(['error' => 'Нет заголовка или текста']));
}

// Читаем текущие посты
$posts = json_decode(file_get_contents($file), true) ?: [];
$newPost = [
    'id' => time(),
    'title' => $title,
    'content' => $content,
];
$posts[] = $newPost;

// Сохраняем обратно в файл
file_put_contents($file, json_encode($posts, JSON_PRETTY_PRINT));

echo json_encode($newPost);
?>
