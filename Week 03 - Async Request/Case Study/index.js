const show = function(data) {
    let jsonData = JSON.parse(data)
    jsonData = jsonData[0]
    document.getElementById("image").src = jsonData.download_url
    document.getElementById("author").innerText = jsonData.author
}

function load() {
    const link = "https://picsum.photos/v2/list?page=2&limit=1"
    const xhr = new XMLHttpRequest()

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
}

load()