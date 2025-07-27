const UserCardTemplate = document.querySelector("[data-user-template]")
const UserCardcontainer = document.querySelector("[user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value
    users.forEach(user => {
        const isvisible = user.name.includes(value)
        user.element.classList.toggle("hide", !isvisible)
    })
})

fetch("data.json")
.then(res => res.json())
.then(data =>{
    users = data.map(user =>{
    const card = UserCardTemplate.content.cloneNode(true).children[0]
    const image = card.querySelector("[data-img]")
    const title = card.querySelector("[data-title]")
    const price = card.querySelector("[data-price]")
    image.src = user.image
    title.textContent = user.name
    price.textContent = user.price
    UserCardcontainer.append(card)
    return { name : user.name,image : user.image, price : user.price, element : card }
    })
})
