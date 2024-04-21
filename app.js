let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let products = [];
let cart = [];
const targetE1 = document.querySelector(".l1");
const h = [0];

const loadSnippet = (number) => {
  fetch("./trial.html")
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
    })
    .then((htmlSnippet) => {
      targetE1.innerHTML = htmlSnippet;
    });
};

$(document).ready(function () {
  // Mouse enters
  $(document).on("mouseenter", ".item", function () {
    $(this).css({ "background-color": "#76885B", cursor: "pointer" });
    $(this).animate(
      {
        width: "+=4px",
        height: "+=2x",
        top: "-=2px",
        left: "-=2px",
      },
      "fast"
    );
  });
  // Mouse leaves
  $(document).on("mouseleave", ".item", function () {
    $(this).css({ "background-color": "white" });
    $(this).animate(
      {
        width: "-=4px",
        height: "-=4px",
        top: "+=2px",
        left: "+=2px",
      },
      "fast"
    );
  });
});

function check() {
  var log = { username: ["sudhakar"], password: ["123"] };
  var u = document.getElementById("username").value;
  var p = document.getElementById("password").value;
  alert();
  for (var i = 0; i < log.username.length; i++) {
    if (log.username[i] === u && log.password[i] === p) {
      h.push(1);
      alert("correct");

      window.open("index.html", "_self");
    } else {
      alert("enter correct username/password");
    }
  }
}
function onn() {
  return true;
}
console.log(h);

var app = angular.module("myapp", []);

app.controller("name", function ($scope) {
  $scope.name = "Login";
  $scope.check11 = function () {
    console.log(hval());
    if (hval() == 1) {
      $scope.name = "sudhakar";
    } else {
      $scope.name = "Login123";
    }
  };
});
alert(h.length);
function hval() {
  return h[h.length - 1];
}
iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  if (products.length > 0) {
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
};
listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let id_product = positionClick.parentElement.dataset.id;
    addToCart(id_product);
  }
});
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      addDataToHTML();

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};

initApp();
