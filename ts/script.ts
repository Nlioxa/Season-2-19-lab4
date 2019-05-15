
//Перечисление доступных цветов
enum Color { Black = "Чёрный", Gray = "Серый", Pink = "Розовый" }

interface Shoes {
    dimension: number; //размер
    color: Color; //цвет
    quantity: number; //количество
}

class Product {

    constructor(
        protected id: number,
        public name: string,
        public price: number,
        public description: string,
        public inStock: number
    ) { }

    //Добавление карточки в строку
    protected static Embed(obj: any) {
        let prods = document.getElementById('rowts');
        prods.appendChild(obj);
    }

    //Инициализация карточки
    Init(): any {
        let prodCardContainer = document.createElement("div");
        prodCardContainer.setAttribute("class", "col-md-6 col-xl-4 p-1");

        let prodCard = document.createElement("div");
        prodCard.setAttribute("class", "card");

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body mh-100");
        cardBody.setAttribute("style", "height: 200px");

        let cardFooter = document.createElement("div");
        cardFooter.setAttribute("class", "card-footer");

        let prodStatusContainer = document.createElement("div");
        prodStatusContainer.setAttribute("class", "container");

        let prodStatus = document.createElement("div");
        prodStatus.setAttribute("class", "row");

        let prodName = document.createElement("h5");
        prodName.setAttribute("class", "card-title");
        prodName.innerHTML = this.name;

        let prodrice = document.createElement("div");
        prodrice.setAttribute("class", "col-6 p-0 text-primary font-weight-bold");
        prodrice.innerHTML = this.price + " грн.";

        let prodAvail = document.createElement("div");
        prodAvail.setAttribute("class", "col-6 p-0 text-right text-success");
        prodAvail.innerHTML = "Есть в наличии";
        if (this.IsAvailable()) {
            prodAvail.setAttribute("class", "col-6 p-0 text-right text-success");
            prodAvail.innerHTML = "Есть в наличии";
        } else {
            prodAvail.setAttribute("class", "col-6 p-0 text-right text-danger");
            prodAvail.innerHTML = "Нет в наличии";
        }

        let prodDescr = document.createElement("p");
        prodDescr.setAttribute("class", "card-text");
        prodDescr.innerHTML = this.description;

        let btn = document.createElement("a");
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
    }

    //Определение есть ли товар в наличии
    IsAvailable(): boolean {
        return (this.inStock > 0);
    }

    protected static AddInfo(product: any, text: string): any {
        let newInfo = document.createElement("p");
        newInfo.setAttribute("class", "card-text text-info m-0");
        newInfo.innerHTML = text;
        let prodInfo = product.firstChild.firstChild;
        if (prodInfo) {
            const last_index = prodInfo.childNodes.length - 1;
            prodInfo.insertBefore(newInfo, prodInfo.childNodes[last_index]);
        }
    }
}


//Класс со сложными особенностями
class FeltBoots extends Product {

    hasBigSizes: boolean = false; //Есть большие размеры
    colors: string[] = []; //Цвета которые есть

    constructor(
        protected id: number,
        public name: string,
        public price: number,
        public description: string,
        public inStock: number,
        public list?: Shoes[]
    ) {
        super(id, name, price, description, inStock);
        this.CalculateFlags();
        this.Init();
    }

    Init() {
        let product = super.Init();

        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.hasBigSizes) {
            let info = "Есть большие размеры";
            Product.AddInfo(product, info);
        }

        //Если есть информация о цвете, то добавляем её в карточку
        if (this.colors.length > 0) {
            let info = "Есть цвета: ";
            this.colors.forEach(color => {
                info += color + ", ";
            });
            Product.AddInfo(product, info.substring(0, info.length - 2));
        }

        Product.Embed(product);
    }

    //Вычисление сложных особенностей
    CalculateFlags() {
        if (this.list != null) {
            //Поиск больших размеров
            this.list.forEach(element => {
                if (this.hasBigSize(element)) {
                    this.hasBigSizes = true;
                    return;
                }
            })
            //Поиск доступных цветов
            this.list.forEach(shoe => {
                if (!this.hasColor(shoe.color)) {
                    this.colors.push(shoe.color);
                }
            });
        }
    }

    hasColor(color: Color) {
        if (this.colors.indexOf(color) != -1) {
            return true;
        }
        else {
            return false;
        }
    }

    hasBigSize(element: any) {
        const bigSize = 43;
        if (element.dimension > bigSize && element.quantity > 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

//Класс с группировкой
class Headphone extends Product {
    constructor(
        protected id: number,
        public name: string,
        public price: number,
        public description: string,
        public inStock: number,
        public isWireless?: boolean
    ) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    public Init() {
        let product = super.Init();

        if (this.isWireless) {
            Product.AddInfo(product, "Беспроводные");

            let hasSelector = document.getElementById('isWireless');
            if (!hasSelector) {
                document.getElementById('myTools').appendChild(
                    MakeSelector("isWireless", "CheckWireless(this.checked)", "Только беспроводные")
                );
            }
        }

        Product.Embed(product);
    }
}

class Water extends Product {
    constructor(
        protected id: number,
        public name: string,
        public price: number,
        public description: string,
        public inStock: number,
        public volume: number,
        public hasAdditives?: boolean
    ) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    public Init() {
        let product = super.Init();

        let info = "Объемом " + this.volume + " m";
        Product.AddInfo(product, info);

        if (this.hasAdditives) {
            Product.AddInfo(product, "Cо вкусовыми добавками");

            let hasSelector = document.getElementById('hasAdditives');
            if (!hasSelector) {
                document.getElementById('myTools').appendChild(
                    MakeSelector("hasAdditives", "CheckAdditives(this.checked)", "Только со вкусовыми добавками")
                );
            }
        }

        if (this.volume) {
            let hasVolumeSlider = document.getElementById('volumeSlider');
            if (!hasVolumeSlider) {
                document.getElementById('myTools').appendChild(
                    MakeSlider("volumeSlider", "onInitWater()", "Объём тары (л):", 1.3, 3.5, 0.1)
                );
            }
        }

        Product.Embed(product);
    }
}

function MakeSelector(name: string, onclick: string, text: string) {
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", name);
    checkbox.setAttribute("onclick", onclick);

    let selector = document.createElement("p");
    selector.appendChild(checkbox);
    selector.innerHTML += " " + text + "<br>";

    return selector;
}

function MakeSlider(name: string, onclick: string, text: string, min: number, max: number, step: number) {
    let slider = document.createElement("div");
    slider.setAttribute("id", name);
    slider.setAttribute("name", name);
    slider.setAttribute("onclick", onclick);

    noUiSlider.create(
        slider, {
            start: [min + step, max - step],
            connect: true,
            range: {
                'min': min,
                'max': max
            },
            step: step,
            tooltips: true,
        });

    let selector = document.createElement("p");
    selector.innerHTML += text + "<br><br><br>";
    selector.appendChild(slider);

    return selector;
}

function onInitWater() {
    if (firstTime) {
        const inputFormat = document.getElementById('volumeSlider') as noUiSlider.Instance;

        inputFormat.noUiSlider.on('update', values => {

            const hasAdditivess = (document.getElementById('hasAdditives') as HTMLInputElement).checked;

            const minValue = values[0];
            const maxValue = values[1];

            document.getElementById('rowts').innerHTML = "";

            for (let i = 0; i < this.prodList.length; i++) {
                if (prodList[i] instanceof Water) {
                    let product = prodList[i] as Water;
                    if (inRange(product.volume, minValue, maxValue)) {
                        if (hasAdditivess) {
                            if (product.hasAdditives) {
                                product.Init();
                            }
                        } else {
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

function inRange(value: number, min: number, max: number) {
    return min < value && value < max;
}

function CheckAdditives(checked: boolean) {
    // reset products list
    document.getElementById('rowts').innerHTML = "";

    this.prodList.forEach(product => {
        if (checked) {
            if (product instanceof Water) {
                let fridge = product as Water;
                if (fridge.hasAdditives) {
                    fridge.Init();
                }
            }
        } else {
            product.Init();
        }
    });
}

class Jeans extends Product {
    constructor(
        protected id: number,
        public name: string,
        public price: number,
        public description: string,
        public inStock: number,
        public size: number,
        public isRaged?: boolean,
        public color?: Color
    ) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    public Init() {
        let product = super.Init();
        Product.AddInfo(product, "Размер: " + this.size);

        if (this.color) {
            Product.AddInfo(product, "Цвет: " + this.color);
        }

        if (this.isRaged) {
            Product.AddInfo(product, "Рваные");

            let hasSelector = document.getElementById('isRaged');
            if (!hasSelector) {
                document.getElementById('myTools').appendChild(
                    MakeSelector("isRaged", "CheckRaggedness(this.checked)", "Рваные джинсы")
                );
            }
        }

        Product.Embed(product);
    }
}

function CheckRaggedness(checked: boolean) {
    document.getElementById('rowts').innerHTML = "";
    this.prodList.forEach(product => {
        if (checked) {
            if (product instanceof Jeans) {
                let jeans = product as Jeans;
                if (jeans.isRaged) {
                    jeans.Init();
                }
            }
        } else {
            product.Init();
        }
    });
}

function CheckWireless(checked: boolean) {
    document.getElementById('rowts').innerHTML = "";
    this.prodList.forEach(product => {
        if (checked) {
            if (product instanceof Headphone) {
                let headphone = product as Headphone;
                if (headphone.isWireless) {
                    headphone.Init();
                }
            }
        } else {
            product.Init();
        }
    });
}

interface BasketRecord {
    id: number; //id товара
    quantity: number; //Его количество
}

class Basket {
    private list: Map<number, number> = new Map(); //Список товаров в корзине

    constructor() { }

    //Добавить товар в корзину. Возвращает результат операции
    Add(prodIndex: number) {
        let enteredQuantity = +(<HTMLInputElement>document.getElementById('inputquantity')).value;

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
            } else {
                this.list = this.list.set(prodIndex, enteredQuantity)
            }
            //this.list[this.list.size] = {id: val, quantity: num};
            this.CalculateBasket();
            return true;
        }
    }

    //Пересчитать товары в корзине
    CalculateBasket() {
        if (this.list.size > 0) {
            let total: number = 0;
            let message: string = "В данный момент в корзине:<br>";
            for (let [key, value] of this.list.entries()) {
                message += prodList[key].name + " - " + value + "<br>";
                total += prodList[key].price * value;
            }
            message += "<br><br>На общую сумму " + total + " грн.";

            document.getElementById('myBasket').innerHTML = message;
        } else document.getElementById('myBasket').innerHTML = "В данный момент корзина пустая";
    }
}

//Действие на кнопке "добавить в корзину"
function myByBtn(val: any) {
    if (basket.Add(val)) {
        $('#buyModal').modal('hide');
    }
}

//Действие на кнопке "купить"
function AddToBasket(id: any, inStock: any) {
    console.log(inStock);
    document.getElementById('modlalBtn').setAttribute("value", id);
    document.getElementById('inputquantity').setAttribute("max", inStock);
    document.getElementById('inStock').innerText = " Всего на складе: " + inStock;
}

let firstTime: boolean = true;

//Инициализация корзины
let basket: Basket = new Basket();
//Список продуктов
let prodList: Product[] = [
    new Headphone(0, "Наушники фирмы1", 816, "Прекрасные наушники! Сама английская королева слушает жесткий металл через такие же!", 4, true),
    new FeltBoots(1, "Валенки2", 91.2, "Хороший выбор! В них тепло, хорошо. Обувь многосезонная - лето, осень, зима, весна.", 6,
        [{ dimension: 44, color: Color.Black, quantity: 2 },
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
    new FeltBoots(6, "Валенки1", 666.66, "Валенки великолепной работы слепого мастера Игната! В комплекте к валенкам идёт кокошник.", 2,
        [{ dimension: 45, color: Color.Pink, quantity: 1 },
        { dimension: 43, color: Color.Pink, quantity: 1 }
        ]),
    new Water(6, "Вода глазурована", 128, "Дуже смачна вода з купою цукру", 4, 1.45, true),
    new Water(8, "Вода шинкована", 110, "Приємна вода зі смаком шинки", 4, 1.96, true),
    new Jeans(9, "Джинси брудні", 50, "Круті ношені джинси", 3, 33, false, Color.Black),
    new Jeans(10, "Джинси чисті", 246, "Так собі нові ще й випрані джинси", 2, 32, true, Color.Pink),
    new Jeans(10, "Джинси бездоганні", 500, "Супер мега круті джинси, але рвані - це модно!", 1, 35, true, Color.Gray),
];

