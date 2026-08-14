<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Read JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// If not JSON, try $_POST
if (!$input) {
    $input = $_POST;
}

// Sanitize and validate inputs
$name = isset($input['name']) ? filter_var(trim($input['name']), FILTER_SANITIZE_STRING) : '';
$email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($input['phone']) ? filter_var(trim($input['phone']), FILTER_SANITIZE_STRING) : '';
$subject = isset($input['subject']) ? filter_var(trim($input['subject']), FILTER_SANITIZE_STRING) : '';
$service = isset($input['service']) ? filter_var(trim($input['service']), FILTER_SANITIZE_STRING) : '';
$comments = isset($input['comments']) ? filter_var(trim($input['comments']), FILTER_SANITIZE_STRING) : '';

if (empty($name) || empty($email) || empty($phone) || empty($comments)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Please fill in all required fields."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email format."]);
    exit;
}

$to = "inymartlabs@gmail.com";
$email_subject = "New Enquiry from $name - $subject";

$email_body = "You have received a new enquiry from the website popup form.\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: $phone\n";
$email_body .= "Subject: $subject\n";
$email_body .= "Service: $service\n";
$email_body .= "Comments:\n$comments\n";

$headers = "From: $email\n";
$headers .= "Reply-To: $email";

// Send email
if (mail($to, $email_subject, $email_body, $headers)) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Enquiry sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send email. Please try again later."]);
}
?>
