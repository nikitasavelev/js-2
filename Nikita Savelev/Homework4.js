////MENU////

function ItemFromMenu(price, calories) {
    this.price = price;
    this.calories = calories;
}

////Burger class////

function Burger(size, stuffing) {
    ItemFromMenu.call(this);
    this.name = new ItemFromMenu(size.price, size.calories);
    this.stuffing = new ItemFromMenu(stuffing.price, stuffing.calories);
    this.price = size.price + stuffing.price;
    this.calories = size.calories + stuffing.calories;
}

Burger.prototype = Object.create(ItemFromMenu.prototype);
Burger.prototype.constructor = Burger;

Burger.prototype.calculatePrice = function () {
    return this.price;
}

Burger.prototype.calculateCalories = function () {
    return this.calories;
}

Burger.prototype.getName = function () {
    return this.name;
}

Burger.prototype.getStuffing = function () {
    return this.stuffing;
}

////Salad class////
function Salad(name, gramms) {
    ItemFromMenu.call(this);
    this.name = name;
    this.gramms = gramms;
    this.price = (name.price / 100) * gramms;
    this.calories = (name.calories / 100) * gramms;
}

Salad.prototype = Object.create(ItemFromMenu.prototype);
Salad.prototype.constructor = Salad;

Salad.prototype.calculatePrice = function () {
    return this.price;
}

Salad.prototype.calculateCalories = function () {
    return this.calories;
}

Salad.prototype.getGramms = function () {
    return this.gramms;
}

Salad.prototype.getName = function () {
    return this.name;
}

////Drink class////
function Drink(name) {
    ItemFromMenu.call(this);
    this.name = name;
    this.price = name.price;
    this.calories = name.calories;
}

Drink.prototype = Object.create(ItemFromMenu.prototype);
Drink.prototype.constructor = Drink;

Drink.prototype.calculatePrice = function () {
    return this.price;
}

Drink.prototype.calculateCalories = function () {
    return this.calories;
}

Drink.prototype.getName = function () {
    return this.name;
}

////Order////

function Order() {
    this.splitOrder = [].slice.call(arguments);
    this.isPaid = false;
}

Order.prototype.calculateWholePrice = function () {
    var wholePrice = 0;
    for (var i = 0; i < this.splitOrder.length; i++) {
        wholePrice += this.splitOrder[i].calculatePrice();
    }
    console.log('С вас:', wholePrice, 'тугриков');
}

Order.prototype.calculateWholeCalories = function () {
    var wholeCalories = 0;
    for (var i = 0; i < this.splitOrder.length; i++) {
        wholeCalories += this.splitOrder[i].calculateCalories();
    }
    console.log('Ваш заказ содержит:', wholeCalories, 'калорий');
}

Order.prototype.payForOrder = function () {
    if (this.splitOrder.length != 0) {
        this.isPaid = true;
        Object.freeze(this);
        console.log('Заказ оплачен');
    } else {
        console.log('Нечего оплачивать, заказ пуст');
    }
}

Order.prototype.addPosition = function (position) {
    !this.isPaid ? this.splitOrder.push(position) :
        console.log('Заказ уже оплачен, добавить позицию не получится');
}

Order.prototype.removePosition = function (position) {
    if (this.splitOrder.length != 0) {
        !this.isPaid ? this.splitOrder.splice(this.splitOrder.indexOf(position), 1) :
            console.log('Заказ уже оплачен, удалить позицию не получится');
    } else {
        console.log('В заказе нет позиций');
    }
}

/*MENU*/
////Burger////
Burger.SIZE_SMALL = { name: 'Маленький', price: 50, calories: 20 };
Burger.SIZE_LARGE = { name: "Большой", price: 100, calories: 40 };

Burger.STUFFING_CHEESE = { name: "Сыр", price: 10, calories: 20 };
Burger.STUFFING_SALAD = { name: "Салат", price: 20, calories: 5 };
Burger.STUFFING_POTATO = { name: "Картофель", price: 15, calories: 10 };

////Salad////
Salad.CEASER = { name: "Цезарь", price: 100, calories: 20 };
Salad.OLIVIE = { name: "Оливье", price: 50, calories: 80 };

////Drink////
Drink.COLA = { name: "Кола", price: 50, calories: 40 };
Drink.COFFE = { name: "Кофе", price: 80, calories: 20 };

var smallBurgerWithCheese = new Burger(Burger.SIZE_SMALL, Burger.STUFFING_CHEESE);
var bigBurgerWithPotato = new Burger(Burger.SIZE_LARGE, Burger.STUFFING_POTATO);
var cocaCola = new Drink(Drink.COLA);
var coffe = new Drink(Drink.COFFE);
var olivieSalad = new Salad(Salad.OLIVIE, 250);

//Пустой заказ
var emptyOrder = new Order();
emptyOrder.removePosition(coffe);
emptyOrder.payForOrder();
emptyOrder.calculateWholePrice();
console.log('/////////')

//НеПустой заказ
var order = new Order(bigBurgerWithPotato, olivieSalad);
order.calculateWholePrice();
order.calculateWholeCalories();
order.addPosition(coffe);
order.removePosition(olivieSalad);
order.payForOrder();
order.addPosition(coffe);
order.removePosition(olivieSalad);
