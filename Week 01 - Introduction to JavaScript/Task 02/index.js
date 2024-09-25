const button = document.querySelector(".button");

button.addEventListener("click", () => {
    const berat = parseFloat(document.getElementById("berat").value);
    const tinggi = parseFloat(document.getElementById("tinggi").value);

    const bmi = document.querySelector(".bmi");
    const kategori = document.querySelector(".kategori");

    if(!berat || !tinggi) {
        bmi.innerText = "?";
        kategori.innerText = "?";
        alert("Berat ataupun Tinggi tidak boleh kosong!");
        return;
    }

    const nilai_bmi = berat / (tinggi * tinggi);
    bmi.innerText = nilai_bmi;

    if(nilai_bmi < 15) {
        kategori.innerText = "Berat badan sangat kurang";
    } else if(nilai_bmi <= 18.49) {
        kategori.innerText = "Berat badan kurang (underweight)";
    } else if(nilai_bmi <= 23.99) {
        kategori.innerText = "Normal";
    } else if(nilai_bmi <= 29) {
        kategori.innerText = "Kelebihan berat badan (overweight)";
    } else {
        kategori.innerText = "Obesitas";
    }
})