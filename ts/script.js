var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
//Перечисление доступных цветов
var Color;
(function (Color) {
    Color["Black"] = "\u0427\u0451\u0440\u043D\u044B\u0439";
    Color["Gray"] = "\u0421\u0435\u0440\u044B\u0439";
    Color["Pink"] = "\u0420\u043E\u0437\u043E\u0432\u044B\u0439";
})(Color || (Color = {}));
var Product = /** @class */ (function () {
    function Product(id, name, price, description, inStock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = inStock;
    }
    //Добавление карточки в строку
    Product.Embed = function (obj) {
        var prods = document.getElementById('rowts');
        prods.appendChild(obj);
    };
    //Инициализация карточки
    Product.prototype.Init = function () {
        var prodCardContainer = document.createElement("div");
        prodCardContainer.setAttribute("class", "col-md-6 col-xl-4 p-1");
        var prodCard = document.createElement("div");
        prodCard.setAttribute("class", "card");
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body mh-100");
        cardBody.setAttribute("style", "height: 200px");
        var cardFooter = document.createElement("div");
        cardFooter.setAttribute("class", "card-footer");
        var prodStatusContainer = document.createElement("div");
        prodStatusContainer.setAttribute("class", "container");
        var prodStatus = document.createElement("div");
        prodStatus.setAttribute("class", "row");
        var prodName = document.createElement("h5");
        prodName.setAttribute("class", "card-title");
        prodName.innerHTML = this.name;
        var prodrice = document.createElement("div");
        prodrice.setAttribute("class", "col-6 p-0 text-primary font-weight-bold");
        prodrice.innerHTML = this.price + " грн.";
        var prodAvail = document.createElement("div");
        prodAvail.setAttribute("class", "col-6 p-0 text-right text-success");
        prodAvail.innerHTML = "Есть в наличии";
        if (this.IsAvailable()) {
            prodAvail.setAttribute("class", "col-6 p-0 text-right text-success");
            prodAvail.innerHTML = "Есть в наличии";
        }
        else {
            prodAvail.setAttribute("class", "col-6 p-0 text-right text-danger");
            prodAvail.innerHTML = "Нет в наличии";
        }
        var prodDescr = document.createElement("p");
        prodDescr.setAttribute("class", "card-text");
        prodDescr.innerHTML = this.description;
        var btn = document.createElement("a");
        btn.setAttribute("id", this.id.toString());
        btn.setAttribute("href", "#buyModal");
        btn.setAttribute("class", "btn btn-primary");
        btn.setAttribute("data-toggle", "modal");
        btn.setAttribute("title", this.inStock.toString());
        btn.addEventListener("click", function () {
            AddToBasket(this.id, this.title);
        });
        btn.innerHTML = "Купить";
        prodStatus.appendChild(prodrice);
        prodStatus.appendChild(prodAvail);
        prodStatusContainer.appendChild(prodStatus);
        cardBody.appendChild(prodName);
        cardBody.appendChild(prodStatusContainer);
        cardBody.appendChild(prodDescr);
        cardFooter.appendChild(btn);
        prodCard.appendChild(cardBody);
        prodCard.appendChild(cardFooter);
        prodCardContainer.appendChild(prodCard);
        return prodCardContainer;
    };
    //Определение есть ли товар в наличии
    Product.prototype.IsAvailable = function () {
        return (this.inStock > 0);
    };
    Product.AddInfo = function (product, text) {
        var newInfo = document.createElement("p");
        newInfo.setAttribute("class", "card-text text-info m-0");
        newInfo.innerHTML = text;
        var prodInfo = product.firstChild.firstChild;
        if (prodInfo) {
            var last_index = prodInfo.childNodes.length - 1;
            prodInfo.insertBefore(newInfo, prodInfo.childNodes[last_index]);
        }
    };
    return Product;
}());
//Класс со сложными особенностями
var FeltBoots = /** @class */ (function (_super) {
    __extends(FeltBoots, _super);
    function FeltBoots(id, name, price, description, inStock, list) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.list = list;
        _this.hasBigSizes = false; //Есть большие размеры
        _this.colors = []; //Цвета которые есть
        _this.CalculateFlags();
        _this.Init();
        return _this;
    }
    FeltBoots.prototype.Init = function () {
        var product = _super.prototype.Init.call(this);
        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.hasBigSizes) {
            var info = "Есть большие размеры";
            Product.AddInfo(product, info);
        }
        //Если есть информация о цвете, то добавляем её в карточку
        if (this.colors.length > 0) {
            var info_1 = "Есть цвета: ";
            this.colors.forEach(function (color) {
                info_1 += color + ", ";
            });
            Product.AddInfo(product, info_1.substring(0, info_1.length - 2));
        }
        Product.Embed(product);
    };
    //Вычисление сложных особенностей
    FeltBoots.prototype.CalculateFlags = function () {
        var _this = this;
        if (this.list != null) {
            //Поиск больших размеров
            this.list.forEach(function (element) {
                if (_this.hasBigSize(element)) {
                    _this.hasBigSizes = true;
                    return;
                }
            });
            //Поиск доступных цветов
            this.list.forEach(function (shoe) {
                if (!_this.hasColor(shoe.color)) {
                    _this.colors.push(shoe.color);
                }
            });
        }
    };
    FeltBoots.prototype.hasColor = function (color) {
        if (this.colors.indexOf(color) != -1) {
            return true;
        }
        else {
            return false;
        }
    };
    FeltBoots.prototype.hasBigSize = function (element) {
        var bigSize = 43;
        if (element.dimension > bigSize && element.quantity > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return FeltBoots;
}(Product));
//Класс с группировкой
var Headphone = /** @class */ (function (_super) {
    __extends(Headphone, _super);
    function Headphone(id, name, price, description, inStock, isWireless) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.isWireless = isWireless;
        _this.Init();
        return _this;
    }
    Headphone.prototype.Init = function () {
        var product = _super.prototype.Init.call(this);
        if (this.isWireless) {
            Product.AddInfo(product, "Беспроводные");
            var hasSelector = document.getElementById('isWireless');
            if (!hasSelector) {
                document.getElementById('myTools').appendChild(MakeSelector("isWireless", "CheckWireless(this.checked)", "Только беспроводные"));
            }
        }
        Product.Embed(product);
    };
    return Headphone;
}(Product));
var Water = /** @class */ (function (_super) {
    __extends(Water, _super);
    function Water(id, name, price, description, inStock, volume, hasAdditives) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.volume = volume;
        _this.hasAdditives = hasAdditives;
        _this.Init();
        return _this;
    }
    Water.prototype.Init = function () {
        var product = _super.prototype.Init.call(this);
        var info = "Объемом " + this.volume + " m";
        Product.AddInfo(product, info);
        if (this.hasAdditives) {
            Product.AddInfo(product, "Cо вкусовыми добавками");
            var hasSelector = document.getElementById('hasAdditives');
            if (!hasSelector) {
                document.getElementById('myTools').appendChild(MakeSelector("hasAdditives", "CheckAdditives(this.checked)", "Только со вкусовыми добавками"));
            }
        }
        if (this.volume) {
            var hasVolumeSlider = document.getElementById('volumeSlider');
            if (!hasVolumeSlider) {
                document.getElementById('myTools').appendChild(MakeSlider("volumeSlider", "onInitWater()", "Объём тары (л):", 1.3, 3.5, 0.1));
            }
        }
        Product.Embed(product);
    };
    return Water;
}(Product));
function MakeSelector(name, onclick, text) {
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", name);
    checkbox.setAttribute("onclick", onclick);
    var selector = document.createElement("p");
    selector.appendChild(checkbox);
    selector.innerHTML += " " + text + "<br>";
    return selector;
}
function MakeSlider(name, onclick, text, min, max, step) {
    var slider = document.createElement("div");
    slider.setAttribute("id", name);
    slider.setAttribute("name", name);
    slider.setAttribute("onclick", onclick);
    noUiSlider.create(slider, {
        start: [min + step, max - step],
        connect: true,
        range: {
            'min': min,
            'max': max
        },
        step: step,
        tooltips: true
    });
    var selector = document.createElement("p");
    selector.innerHTML += text + "<br><br><br>";
    selector.appendChild(slider);
    return selector;
}
function onInitWater() {
    var _this = this;
    if (firstTime) {
        var inputFormat = document.getElementById('volumeSlider');
        inputFormat.noUiSlider.on('update', function (values) {
            var hasAdditivess = document.getElementById('hasAdditives').checked;
            var minValue = values[0];
            var maxValue = values[1];
            document.getElementById('rowts').innerHTML = "";
            for (var i = 0; i < _this.prodList.length; i++) {
                if (prodList[i] instanceof Water) {
                    var product = prodList[i];
                    if (inRange(product.volume, minValue, maxValue)) {
                        if (hasAdditivess) {
                            if (product.hasAdditives) {
                                product.Init();
                            }
                        }
                        else {
                            product.Init();
                        }
                    }
                }
            }
            console.log(values);
        });
        firstTime = false;
    }
}
function inRange(value, min, max) {
    return min < value && value < max;
}
function CheckAdditives(checked) {
    // reset products list
    document.getElementById('rowts').innerHTML = "";
    this.prodList.forEach(function (product) {
        if (checked) {
            if (product instanceof Water) {
                var fridge = product;
                if (fridge.hasAdditives) {
                    fridge.Init();
                }
            }
        }
        else {
            product.Init();
        }
    });
}
var Jeans = /** @class */ (function (_super) {
    __extends(Jeans, _super);
    function Jeans(id, name, price, description, inStock, size, isRaged, color) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.size = size;
        _this.isRaged = isRaged;
        _this.color = color;
        _this.Init();
        return _this;
    }
    Jeans.prototype.Init = function () {
        var product = _super.prototype.Init.call(this);
        Product.AddInfo(product, "Размер: " + this.size);
        if (this.color) {
            Product.AddInfo(product, "Цвет: " + this.color);
        }
        if (this.isRaged) {
            Product.AddInfo(product, "Рваные");
            var hasSelector = document.getElementById('isRaged');
            if (!hasSelector) {
                document.getElementById('myTools').appendChild(MakeSelector("isRaged", "CheckRaggedness(this.checked)", "Рваные джинсы"));
            }
        }
        Product.Embed(product);
    };
    return Jeans;
}(Product));
function CheckRaggedness(checked) {
    document.getElementById('rowts').innerHTML = "";
    this.prodList.forEach(function (product) {
        if (checked) {
            if (product instanceof Jeans) {
                var jeans = product;
                if (jeans.isRaged) {
                    jeans.Init();
                }
            }
        }
        else {
            product.Init();
        }
    });
}
function CheckWireless(checked) {
    document.getElementById('rowts').innerHTML = "";
    this.prodList.forEach(function (product) {
        if (checked) {
            if (product instanceof Headphone) {
                var headphone = product;
                if (headphone.isWireless) {
                    headphone.Init();
                }
            }
        }
        else {
            product.Init();
        }
    });
}
var Basket = /** @class */ (function () {
    function Basket() {
        this.list = new Map(); //Список товаров в корзине
    }
    //Добавить товар в корзину. Возвращает результат операции
    Basket.prototype.Add = function (prodIndex) {
        var enteredQuantity = +document.getElementById('inputquantity').value;
        //Проверка введенного количества товара. Если ввели ерунду, то выводится сообщение об ошибке. Иначе товар добавляется в корзину
        if (isNaN(enteredQuantity) || enteredQuantity == 0 || prodList[prodIndex].inStock < enteredQuantity) {
            if (prodList[prodIndex].inStock < enteredQuantity) {
                document.getElementById('modlalMessag').innerHTML = "Столько на складе нет";
            }
            else {
                document.getElementById('modlalMessag').innerHTML = "Введите целое число";
            }
            return false;
        }
        else {
            document.getElementById('modlalMessag').innerHTML = "";
            prodList[prodIndex].inStock -= enteredQuantity;
            document.getElementById(prodIndex.toString()).setAttribute("title", prodList[prodIndex].inStock.toString());
            // console.log(prodList[val].inStock);
            if (this.list.has(prodIndex)) {
                this.list = this.list.set(prodIndex, this.list.get(prodIndex) + enteredQuantity);
            }
            else {
                this.list = this.list.set(prodIndex, enteredQuantity);
            }
            //this.list[this.list.size] = {id: val, quantity: num};
            this.CalculateBasket();
            return true;
        }
    };
    //Пересчитать товары в корзине
    Basket.prototype.CalculateBasket = function () {
        var e_1, _a;
        if (this.list.size > 0) {
            var total = 0;
            var message = "В данный момент в корзине:<br>";
            try {
                for (var _b = __values(this.list.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                    message += prodList[key].name + " - " + value + "<br>";
                    total += prodList[key].price * value;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            message += "<br><br>На общую сумму " + total + " грн.";
            document.getElementById('myBasket').innerHTML = message;
        }
        else
            document.getElementById('myBasket').innerHTML = "В данный момент корзина пустая";
    };
    return Basket;
}());
//Действие на кнопке "добавить в корзину"
function myByBtn(val) {
    if (basket.Add(val)) {
        $('#buyModal').modal('hide');
    }
}
//Действие на кнопке "купить"
function AddToBasket(id, inStock) {
    console.log(inStock);
    document.getElementById('modlalBtn').setAttribute("value", id);
    document.getElementById('inputquantity').setAttribute("max", inStock);
    document.getElementById('inStock').innerText = " Всего на складе: " + inStock;
}
var firstTime = true;
//Инициализация корзины
var basket = new Basket();
//Список продуктов
var prodList = [
    new Headphone(0, "Наушники фирмы1", 816, "Прекрасные наушники! Сама английская королева слушает жесткий металл через такие же!", 4, true),
    new FeltBoots(1, "Валенки2", 91.2, "Хороший выбор! В них тепло, хорошо. Обувь многосезонная - лето, осень, зима, весна.", 6, [{ dimension: 44, color: Color.Black, quantity: 2 },
        { dimension: 43, color: Color.Black, quantity: 3 },
        { dimension: 42, color: Color.Black, quantity: 1 },
        { dimension: 41, color: Color.Black, quantity: 2 },
        { dimension: 44, color: Color.Gray, quantity: 2 },
        { dimension: 39, color: Color.Gray, quantity: 1 },
        { dimension: 45, color: Color.Gray, quantity: 1 },
        { dimension: 42, color: Color.Gray, quantity: 1 },
    ]),
    new Headphone(2, "Наушники фирмы4", 119.50, "Дёшево не значит плохо! Эти наушники стоят своих денег!", 30, false),
    new Headphone(3, "Наушники фирмы2", 144, "Это оптимальный выбор! Налетай торопись!", 15, true),
    new FeltBoots(4, "Валенки3", 65, "Валенки знаменитой российской фабрики Красный ЦинБаоЧен. Оригинальный продукт сделаный по технологиям прошлого.", 1),
    new Headphone(5, "Наушники фирмы3", 265, "Тру поклонники музыки обязательно такие имеют! А ты что? Ты не тру?!", 0),
    new FeltBoots(6, "Валенки1", 666.66, "Валенки великолепной работы слепого мастера Игната! В комплекте к валенкам идёт кокошник.", 2, [{ dimension: 45, color: Color.Pink, quantity: 1 },
        { dimension: 43, color: Color.Pink, quantity: 1 }
    ]),
    new Water(6, "Вода глазурована", 128, "Дуже смачна вода з купою цукру", 4, 1.45, true),
    new Water(8, "Вода шинкована", 110, "Приємна вода зі смаком шинки", 4, 1.96, true),
    new Jeans(9, "Джинси брудні", 50, "Круті ношені джинси", 3, 33, false, Color.Black),
    new Jeans(10, "Джинси чисті", 246, "Так собі нові ще й випрані джинси", 2, 32, true, Color.Pink),
    new Jeans(10, "Джинси бездоганні", 500, "Супер мега круті джинси, але рвані - це модно!", 1, 35, true, Color.Gray),
];
