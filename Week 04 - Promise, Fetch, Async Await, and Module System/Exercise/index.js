import { getData, showData } from "./app.js"

const data = await getData()

let id = 0
showData(data[id])

const prevButton = document.querySelector(".prev")
const nextButton = document.querySelector(".next")

prevButton.addEventListener("click", () => {
    if(id > 0) id--
    showData(data[id])
})

nextButton.addEventListener("click", () => {
    if(id < data.length - 1) id++
    showData(data[id])
})