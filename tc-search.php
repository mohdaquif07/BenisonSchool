<?php
header('Content-Type: application/json');
$admission_no = isset($_POST['admission_no']) ? trim($_POST['admission_no']) : '';
$name = isset($_POST['name']) ? trim($_POST['name']) : '';

if ($admission_no === '' || $name === '') {
    echo json_encode(['success' => false, 'message' => 'Please provide both admission number and name.']);
    exit;
}

$dir = __DIR__ . '/tc pdfs/';
if (!is_dir($dir)) {
    echo json_encode(['success' => false, 'message' => 'TC folder not found.']);
    exit;
}

$found = false;
$filename_found = '';
$files = scandir($dir);
foreach ($files as $file) {
    if (preg_match('/^(\d+)_([^.]+)\.pdf$/i', $file, $matches)) {
        $file_adm = $matches[1];
        $file_name = preg_replace('/[_\-\s]+/', '', strtolower($matches[2]));
        $input_name = preg_replace('/[_\-\s]+/', '', strtolower($name));
        if ($file_adm === $admission_no && $file_name === $input_name) {
            $filename_found = $file;
            $found = true;
            break;
        }
    }
}

if ($found) {
    $url = 'tc pdfs/' . rawurlencode($filename_found);
    echo json_encode(['success' => true, 'url' => $url]);
} else {
    echo json_encode(['success' => false, 'message' => 'No matching TC found. Please check your details.']);
} 