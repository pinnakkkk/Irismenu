// temp json data
const menuJson = `[
  {"name": "Sushi Platter", "price": "$25", "link": "https://thetablecompany.in/cdn/shop/products/Screenshot2020-06-25at6.37.35PM_1000x1000.png?v=1593090644"},
  {"name": "Tacos", "price": "$12", "link": "https://danosseasoning.com/wp-content/uploads/2022/03/Beef-Tacos-1024x767.jpg"},
  {"name": "Ramen", "price": "$14", "link": "https://peasandcrayons.com/wp-content/uploads/2021/05/veggie-ramen-soup-recipe-4.jpg"},
  {"name": "Pasta Carbonara", "price": "$18", "link": "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-verticalTwoByThree735-v2.jpg"},
  {"name": "Paella", "price": "$22", "link": "https://images.immediate.co.uk/production/volatile/sites/30/2018/06/Oven-paella-5d16b06.jpg?resize=768,574"},
  {"name": "Falafel Wrap", "price": "$10", "link": "https://images.lecker.de/falafel-wraps-rezept/1x1,id=9ebe6a7c,b=lecker,w=1600,h=,ca=12.42,0,87.58,100,rm=sk.jpeg"},
  {"name": "Dim Sum", "price": "$20", "link": "https://www.opentable.co.uk/blog/wp-content/uploads/sites/110/2024/02/d04ebc87c387e831c4fc34d94d51a2b0-e1707400365116.jpg"},
  {"name": "Ceviche", "price": "$18", "link": "https://www.feastingathome.com/wp-content/uploads/2015/04/Ceviche-Recipe.jpg"},
  {"name": "Peking Duck", "price": "$35", "link": "https://s3.us-east-1.amazonaws.com/assets.mapleleaffarms.com/content/_1200x545_crop_center_85_none/Whole-Peking-Duck_2021-10-11-202645_crbx.jpg"},
  {"name": "Greek Salad", "price": "$12", "link": "https://www.wellplated.com/wp-content/uploads/2022/05/Greek-Salad-Recipe-Easy.jpg"}
  ]`;

function createMenu() {
  const menu = JSON.parse(menuJson);
  const menuContainer = document.getElementById("menu-container");

  menu.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const name = document.createElement("h2");
    name.textContent = item.name;
    overlay.appendChild(name); // Append name to overlay

    const price = document.createElement("h2");
    price.textContent = item.price;
    overlay.appendChild(price); // Append price to overlay

    itemContainer.appendChild(overlay); // Append overlay to itemContainer

    const image = document.createElement("img");
    image.src = item.link;
    itemContainer.appendChild(image); // Append image to itemContainer

    overlay.addEventListener("mouseover", () => {
      overlay.style.opacity = 1;
      itemContainer.style.height = 200 + "px";
    });

    overlay.addEventListener("mouseout", () => {
      overlay.style.opacity = 0;
      itemContainer.style.height = 150 + "px";
    });
    menuContainer.appendChild(itemContainer); // Append itemContainer to menuContainer
  });
}

function scrollMenu(direction) {
  const menuContainer = document.querySelector(".menu-container");
  const scrollAmount = direction === "up" ? -100 : 100; // Adjust the amount to scroll
  menuContainer.scrollBy({ top: scrollAmount, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", createMenu);
