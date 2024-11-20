CREATE DATABASE comment_db;

CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    cust_id INT NOT NULL,
    product_id INT NOT NULL,
    comment_text VARCHAR(100) NOT NULL,
    comment_created DATETIME NOT NULL
);

INSERT INTO comments
VALUES
(1, 1, 1, 'barang telah diterima dengan baik', '2021-11-29 20:47:35'),
(2, 1, 2, 'Barang rusak', '2021-11-29 20:47:36'),
(3, 2, 3, 'Barang sangat direkomendasi', '2021-11-29 20:48:15'),
(4, 2, 4, 'Berfungsi dengan baik', '2021-11-29 20:48:16'),
(5, 1, 4, 'Tidak dapat digunakan', '2021-11-29 20:48:44'),
(6, 2, 5, 'Warna tidak sesuai pesanan', '2021-11-29 20:48:45');