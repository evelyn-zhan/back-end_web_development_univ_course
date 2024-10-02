const show = function(data) {
    document.getElementById("loading").style.display = "none"
    document.getElementById("image").style.display = ""
    document.getElementById("author").style.display = ""

    let jsonData = JSON.parse(data)
    jsonData = jsonData[0]
    document.getElementById("image").src = jsonData.download_url
    document.getElementById("author").innerText = jsonData.author
}

function load() {
    const link = "https://picsum.photos/v2/list?page=2&limit=1"
    const xhr = new XMLHttpRequest()

    setTimeout(() => {
        try {
            if(!xhr) return -1

            xhr.open("GET", link)
            xhr.send()

            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    show(xhr.responseText)
                }
            }
        } catch(error) {
            console.log(error)
        }
    }, 1500)

    document.getElementById("image").style.display = "none"
    document.getElementById("author").style.display = "none"
}

load()