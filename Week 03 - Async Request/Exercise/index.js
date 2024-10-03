let table = document.querySelector(".table")

table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Username</th><th>E-mail</th><th>City</th></tr>"

function showData(datas) {
    // for(let i = 0; i < data.length; i++) {
    //     const {id, name, username, email, address} = data[i]
    //     table.innerHTML += `<tr><td>${id}</td><td>${name}</td><td>${username}</td><td>${email}</td><td>${address.city}</td></tr>`
    // }
    datas.forEach(data => {
        const {id, name, username, email, address, website, company} = data
        table.innerHTML += `<tr><td><a class="id_number" href="http://${website}" title="${company.name}" target="_blank">${id}</a></td><td>${name}</td><td>${username}</td><td>${email}</td><td>${address.city}</td></tr>`
    })
}

function loadData() {
    const link = "https://jsonplaceholder.typicode.com/users"
    const xhr = new XMLHttpRequest()

    try {
        if(!xhr) return -1

        xhr.open("GET", link)
        xhr.send()

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                const res = JSON.parse(xhr.responseText)
                console.log(res)
                showData(res)
            }
        }
    } catch(error) {
        console.log(error)
    }
}

loadData()