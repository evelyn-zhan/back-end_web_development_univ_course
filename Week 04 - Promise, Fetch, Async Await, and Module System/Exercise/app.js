async function getData() {
    try {
        const res = await fetch("https://picsum.photos/v2/list")
        const data = await res.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

function showData(data) {
    const author_name = document.querySelector(".author")
    author_name.innerText = data.author

    const image = document.querySelector(".image")
    image.src = data.download_url
}

export { getData, showData }