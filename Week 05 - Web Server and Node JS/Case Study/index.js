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
    const table = document.querySelector("#data")

    datas.forEach(data => {
        table.innerHTML += `
            <tr>
                <td><img src="${data.download_url}" alt="" width="200px" height="100px" /></td>
                <td>${data.author}</td>
            </tr>
        `
    })
}

getData()
    .then(data => showData(data))
    .catch(error => console.log(error))