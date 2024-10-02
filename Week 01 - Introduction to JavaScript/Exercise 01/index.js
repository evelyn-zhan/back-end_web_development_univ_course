const button = document.querySelector(".button");

button.addEventListener("click", () => {
    const nilai_uts = parseInt(document.getElementById("uts").value);
    const nilai_tugas = parseInt(document.getElementById("tugas").value);
    const nilai_uas = parseInt(document.getElementById("uas").value);

    const nilai_huruf = document.querySelector(".nilai-huruf");

    if(!nilai_uts || !nilai_tugas || !nilai_uas) {
        nilai_huruf.innerText = "?";
        alert("Nilai tidak boleh ada yang kosong!");
        return;
    }

    const nilai_akhir = (30/100 * nilai_uts) + (40/100 * nilai_tugas) + (30/100 * nilai_uas);

    if(nilai_akhir >= 80) {
        nilai_huruf.innerText = "A";
    } else if(nilai_akhir >= 70) {
        nilai_huruf.innerText = "B";
    } else if(nilai_akhir >= 60) {
        nilai_huruf.innerText = "C";
    } else if(nilai_akhir >= 40) {
        nilai_huruf.innerText = "D";
    } else {
        nilai_huruf.innerText = "E";
    }
})