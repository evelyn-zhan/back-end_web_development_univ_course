const now = document.querySelector(".now")
const time = new Date(Date.now())
now.innerText = time.toLocaleDateString()

const button = document.querySelector(".button")
button.addEventListener("click", () => {
    const email = document.querySelector(".input-email").value
    if(email) {
        alert(`Kami akan mengirimkan notifikasi ke ${email}. Terima kasih.`)
    } else {
        alert('Email tidak boleh kosong!')
    }
})