// temp json data
const menuJson = `[
    {"name": "Burger", "price": "$10", "link": "https://img.freepik.com/premium-photo/picture-many-different-fast-food-items-including-hamburgers-fries-cup-sauce_873925-7490.jpg?w=2000"},
    {"name": "Pizza", "price": "$15", "link": "https://img.freepik.com/free-photo/delicious-pizza-with-tomato-sauce-ingredients_1150-19907.jpg?size=626&ext=jpg"}
]`;

function createMenu() {
    const menu = JSON.parse(menuJson);
    const menuContainer = document.getElementById('menu-container');

    menu.forEach(item => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');
        
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        
        const name = document.createElement('h2');
        name.textContent = item.name;
        overlay.appendChild(name); // Append name to overlay
        
        const price = document.createElement('h2');
        price.textContent = item.price;
        overlay.appendChild(price); // Append price to overlay
        
        itemContainer.appendChild(overlay); // Append overlay to itemContainer
        
        const image = document.createElement('img');
        image.src = item.link;
        itemContainer.appendChild(image); // Append image to itemContainer

        menuContainer.appendChild(itemContainer); // Append itemContainer to menuContainer
    });
}

document.addEventListener('DOMContentLoaded', createMenu);