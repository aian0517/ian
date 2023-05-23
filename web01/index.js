const swiper2 = new Swiper('.header__swiper2', {
    loop: true,
    autoplay: {
        deplay: 2500,
        disableOnInteraction: false
    },

});
const swiper = new Swiper('.header__swiper', {
    loop: true,
    autoplay: {
        deplay: 2500,
        disableOnInteraction: false
    },
});
const interduce_one = new Swiper('.interduce__box', {
    loop: true,
    effect: 'cube',
    grabCursor: true,
    autoplay: {
        deplay: 2500,
        disableOnInteraction: false
    },
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 0,
        shadowScale: 0,
    }
})

PRODUCT.forEach(data => {
    document.querySelector('.product__container').innerHTML += `
    <div class="col-lg-6 col-sm-12 product__item mb-5">
        <h1 class="fw" style="color:var(--colorone)">${data.name}</h1>
        <div class="product__box w-100">
            <div class="swiper-wrapper">
                <div class="swiper-slide d-flex justify-content-center
                align-items-center">
                    <img src="${data.img}" class="d-block rounded-5" style="width:80%">
                </div>
                <div class="swiper-slide p-5 ">
                    <img src="${data.img2}" class="w-50">
                    <p class="fs-4">${data.text}</p>
                </div>
            </div>
        </div>
    </div>
    `
})
const product = new Swiper('.product__box', {
    loop: true,
    effect: 'flip',
    flipEffect: {
        slideShadows: true,
        limitRotation: true,
    }
})

ORDERDATA.forEach((data, index) => {
    document.querySelector('.order__box').innerHTML += `
        <div class="col-xl-6 col-sm-12 my-5">
            <div class="card flex-md-row">
                <img src="${data.img}" width="50%" class="m-md-3 d-block mx-auto">
                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                    <h2 class="card-title fw">${data.name}</h2>
                    <h1>$${data.price}</h1>
                    <div class="order__btnbox">
                        <button class="btn fw reduce" onclick="add(-1,${index})">-</button>
                        <span class="amount">${data.amount}</span>
                        <button class="btn fw add" onclick="add(1,${index})">+</button>
                    </div>
                </div>
            </div>
        </div>
        `
});
const amount = document.querySelectorAll('.amount')
const shop__body = document.querySelector('.shop__body')
function openshop() {
    shop__body.innerHTML = ''
    var sum = 0
    ORDERDATA.forEach((data, index) => {
        if (data.amount >= 1) {
            var price = data.price * data.amount
            shop__body.innerHTML += `
            <div class="card flex-row my-3 shop__item${index}">
                <div class="card-body d-flex  justify-content-around align-items-center">
                    <img src="${data.img}" width="20%" class="rounded-2 shop__img">
                    <h4 class="card-title fw mb-0">${data.name}</h4>
                    <h3 class="price mb-0">$${price}</h3>
                    <span class="amount shop__amount">${data.amount}</span>
                    <i class="bi bi-trash-fill" style="font-size:25px;cursor: pointer;" onclick="deletepud(${index})"></i>
                </div>
            </div>
        `
            sum += price
        }
        document.querySelector('.sum').innerText = `總計$${sum}`
    })
}
// else if (shop__body.innerHTML == '') {
//     shop__body.innerHTML =
//         `<h1 class="fw" style="color:var(--colortwo)">
//     您目前沒有訂購產品
//     </h1>`

// }
function add(n, index) {
    ORDERDATA[index].amount = Math.max(0, ORDERDATA[index].amount + n)
    amount[index].innerHTML = ORDERDATA[index].amount
    // shop__amount[index].innerHTML = ORDERDATA[index].amount
}
function deletepud(index) {
    const item = document.querySelector(`.shop__item${index}`)
    item.remove()
    ORDERDATA[index].amount = 0
    amount[index].innerHTML = ORDERDATA[index].amount
    openshop()
}