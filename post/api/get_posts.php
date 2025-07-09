<?php
header("Access-Control-Allow-Origin: *"); // Разрешить запросы с любого домена
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header('Content-Type: application/json');
$file = '../posts.json';

// Если файла нет — создаём пустой массив
if (!file_exists($file)) {
    file_put_contents($file, '[]');
}

echo file_get_contents($file);
?>
