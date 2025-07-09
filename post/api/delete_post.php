<?php
header('Content-Type: application/json');
$file = '../posts.json';

// Получаем ID из URL (например, /api/delete_post.php?id=123)
$id = $_GET['id'] ?? 0;

if (!$id) {
    http_response_code(400);
    die(json_encode(['error' => 'Не указан ID']));
}

// Читаем и фильтруем посты
$posts = json_decode(file_get_contents($file), true) ?: [];
$posts = array_filter($posts, fn($post) => $post['id'] != $id);

// Сохраняем обратно
file_put_contents($file, json_encode(array_values($posts), JSON_PRETTY_PRINT));

echo json_encode(['success' => true]);
?>