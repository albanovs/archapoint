<?php

$input = json_decode(file_get_contents('php://input'), true);

// Проверяем, если данных нет
if (!isset($input['data'])) {
// Если данные не переданы, возвращаем ошибку с кодом 400
header('Content-Type: application/json');
echo json_encode(['error' => 'No data provided']);
http_response_code(400); // Устанавливаем HTTP статус 400
exit;
}

// Получаем данные
$data3 = $input['data'];
$pairs = explode(";", $data3);
$data = [];

foreach ($pairs as $pair) {
list($key, $value) = explode(":", $pair);
$data[$key] = $value;
}


// Ключ для HMAC
$secretKey = "9WOUvnCu"; // Замените на ваш секретный ключ

// Шаг 1: Сортировка параметров в естественном порядке
ksort($data, SORT_NATURAL);

// Шаг 2: Преобразование в строку UTF-8 в формате key:value;key:value
$formattedString = '';
foreach ($data as $key => $value) {
$formattedString .= "$key:$value;";
}
$formattedString = rtrim($formattedString, ';'); // Удаляем последний ";"

// Шаг 3: Генерация HMAC-кода с использованием SHA-512
$hmac = hash_hmac('sha512', $formattedString, $secretKey);

// Шаг 4: Преобразование HMAC-кода в массив байт
$binaryHmac = hex2bin($hmac);

// Шаг 5: Кодирование массива байт в Base64
$signature = base64_encode($binaryHmac);

// Шаг 6: Добавление подписи к данным
$data2['signature'] = $signature;
// Шаг 7: Преобразование данных в JSON
$json = json_encode($data2, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// Вывод результата
return $json;