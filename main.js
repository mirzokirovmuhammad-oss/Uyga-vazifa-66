const inp = document.querySelector('.inp')
const list = document.querySelector('.list')
const btn2 = document.querySelector('.btn2')

const nameInput = document.querySelector('.filter_name')
const inputs = document.querySelectorAll('.inp2')

const API = 'https://69b91cb2e69653ffe6a68da7.mockapi.io/School'

let globalData = []


async function getData() {
    let response = await fetch(API)
    let data = await response.json()

    globalData = data
    render(data)
}
getData()


function render(data) {
    list.innerHTML = ""

    data.forEach(item => {
        list.innerHTML += `
        <div class='card'>
            <h2>${item.name}</h2>
            <img src="${item.avatar}" width="150"/>
            <p>Inch: ${item.inch}</p>
            <p>Memory: ${item.memory}</p>
            <p>Ssd: ${item.ssd}</p>
            <p>Gpu: ${item.gpu}</p>
            <p>Cycle: ${item.cycle}</p>
            <p>Price: ${item.price}</p>

            <button onclick="editContact('${item.id}','${item.name}','${item.avatar}','${item.inch}','${item.memory}','${item.ssd}','${item.gpu}','${item.cycle}','${item.price}')">Edit</button>
            <button onclick="deleteContact('${item.id}')">Delete</button>
        </div>
        `
    })
}


inp.addEventListener('input', () => {
    let filtered = globalData.filter(item =>
        item.name.toLowerCase().includes(inp.value.toLowerCase())
    )
    render(filtered)
})


async function deleteContact(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" })
    getData()
}


async function editContact(id, name, avatar, inch, memory, ssd, gpu, cycle, price) {
    name = prompt("Name", name)
    avatar = prompt("Avatar", avatar)
    inch = prompt("Inch", inch)
    memory = prompt("Memory", memory)
    ssd = prompt("Ssd", ssd)
    gpu = prompt("Gpu", gpu)
    cycle = prompt("Cycle", cycle)
    price = prompt("Price", price)

    if (!name || !avatar || !inch || !memory || !ssd || !gpu || !cycle || !price) return

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, avatar, inch, memory, ssd, gpu, cycle, price })
    })

    getData()
}


btn2.addEventListener("click", addData)

async function addData() {
    const name = nameInput.value
    const [avatar, inch, memory, ssd, gpu, cycle, price] =
        [...inputs].map(inp => inp.value)

    if (!name || !avatar || !inch || !memory || !ssd || !gpu || !cycle || !price) {
        alert("Hamma inputni toldiring!")
        return
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name,
            avatar,
            inch,
            memory,
            ssd,
            gpu,
            cycle,
            price
        }),
    })

    nameInput.value = ""
    inputs.forEach(inp => inp.value = "")

    getData()
}