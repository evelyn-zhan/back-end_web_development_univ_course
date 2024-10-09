async function getData() {
    try {
        const res = await fetch("https://picsum.photos/v2/list")
        const data = await res.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

function showData(datas) {
    const table = document.querySelector(".table")

    datas.forEach(data => {
        table.innerHTML += `
            <tr>
                <td><img src="${data.download_url}" class="image"></td>
                <td>${data.author}</td>
            </tr>
        `
    })
}

export { getData, showData }