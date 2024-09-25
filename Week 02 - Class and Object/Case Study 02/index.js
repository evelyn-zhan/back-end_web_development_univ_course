let content = {
    "status": true,
    "title": "Memory",
    "data": "Memori adalah urutan byte yang berisi sepotong kecil informasi. Informasi ini mungkin menjadi perintah untuk mengatakan pada computar apayangharus dilakukan. Sel mungkin berisi data yang diperlukan computar untuk melakukan suatu perintah. Setiap slot mungkin berisi salah satu, dan apayangsekarang menjadi data mungkin saja kemudian menjadi perintah. Ukuran masing-masing sel, dan jumlah sel, berubah secara hebat dari computar ke computar,dan teknologi dalam pembuatan memori sudah berubah secara hebat - dari relay elektromekanik, ke tabung yang diisi dengan air raksa di mana pulsa akustikterbentuk, sampai matriks magnet permanen, ke setiap transistor, ke sirkuit terpadu dengan jutaan transistor di atas satu chip silikon.",
}

const title = document.querySelector(".title")
const paragraph = document.querySelector(".paragraph")

title.innerText = content.title
paragraph.innerText = content.data.replaceAll("computar", "komputer")

const sentenceCount = document.querySelector(".sentence-count")
sentenceCount.innerText = content.data.split(".").length - 1