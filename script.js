const swiper = new Swiper('.swiper', {
   // Optional parameters
   direction: 'horizontal',
   loop: true,
   autoplay: true,
   autoplayDelay: 3000,

   // If we need pagination
   pagination: {
      el: '.swiper-pagination',
   },
});

const tariffsBtn = [
   document.querySelector('.individual-btn'),
   document.querySelector('.business-btn')
]

const tariffsItem = document.querySelectorAll('.tariffs-list__item')

const individualList = [
   {
      name: 'AR-1',
      mbit: '20',
      price: 3700
   },
   {
      name: 'AR-2',
      mbit: '30',
      price: 4800
   },
   {
      name: 'AR-3',
      mbit: '40',
      price: 6500
   },
   {
      name: 'AR MAX',
      mbit: '50',
      price: 8000
   },
]

const businessList = [
   {
      name: 'AR BUSINESS',
      mbit: '25',
      price: 9000
   },
   {
      name: 'AR BUSINESS MAX',
      mbit: '35',
      price: 12000
   }
]

tariffsBtn.forEach(item => {
   item.addEventListener('click', event => {
      document.querySelector('.tariff-btn__active').classList.remove('tariff-btn__active')
      event.target.classList.add('tariff-btn__active')

      const tariffList = document.querySelector('.tariffs-list')

      tariffList.innerText = ''
      if (event.target.classList.contains('business-btn')) {
         businessList.forEach(item => {
            tariffList.append(createTariffElement(item))
         })
      }
      else {
         individualList.forEach(item => {
            tariffList.append(createTariffElement(item))
         })
      }
   })
})

function createTariffElement(obj) {
   const li = document.createElement('li')
   li.classList.add('tariffs-list__item')

   const h3 = document.createElement('h3')
   h3.classList.add('slogan', 'reset-title')
   h3.textContent = obj.name
   li.append(h3)

   const price = document.createElement('div')
   price.classList.add('price')
   const priceSpan = document.createElement('span')
   priceSpan.innerText = obj.price
   price.append(priceSpan)
   price.insertAdjacentHTML('beforeend', 'դրամ/ամիս')
   li.append(price)

   const mbit = document.createElement('div')
   mbit.classList.add('mbit', 'ad-line')
   const mbitSpan = document.createElement('span')
   mbitSpan.textContent = obj.mbit
   mbit.append(mbitSpan)
   mbit.insertAdjacentHTML('beforeend', 'մբիթ/վ')
   li.append(mbit)

   const freeInstall = document.createElement('div')
   freeInstall.classList.add('ad-line')
   freeInstall.textContent = 'Անվճար տեղադրում'
   li.append(freeInstall)

   const freeWifi = document.createElement('div')
   freeWifi.textContent = 'Անվճար Wi-fi սարք'
   li.append(freeWifi)

   return li
}

document.querySelector('.tariffs__btn')
   .addEventListener('click', () => {
      document.querySelector('.request-modal').style.display = 'flex'
   })

document.querySelector('.pay-btn')
   .addEventListener('click', event => {
      event.preventDefault()
      document.querySelector('.pay-modal').style.display = 'flex'
   })

window.addEventListener('click', event => {
   if (event.target.classList.contains('request-modal')) {
      document.querySelector('.request-modal').style.display = 'none'
   }
   else if (event.target.classList.contains('pay-modal')) {
      document.querySelector('.pay-modal').style.display = 'none'
   }
})

const requestModalBtns = [
   document.querySelector('.request-modal__individual'),
   document.querySelector('.request-modal__business')
]

requestModalBtns.forEach(item => {
   item.addEventListener('click', event => {
      document.querySelector('.resquest-modal__btn_active').classList.remove('resquest-modal__btn_active')
      event.target.classList.add('resquest-modal__btn_active')

      const requestFormSelect = document.querySelector('.request-form__select')
      requestFormSelect.textContent = ''
      if (event.target.classList.contains('request-modal__individual')) {
         individualList.forEach(item => {
            const option = document.createElement('option')
            option.setAttribute('value', item.name)
            option.textContent = item.name
            requestFormSelect.append(option)
         })

         createTariffInclude(individualList, 'AR-1')
      }
      else {
         businessList.forEach(item => {
            const option = document.createElement('option')
            option.setAttribute('value', item.name)
            option.textContent = item.name
            requestFormSelect.append(option)
         })
         createTariffInclude(businessList, 'AR BUSINESS')
      }
   })
})

function createTariffInclude(arr, event) {
   arr.forEach(item => {
      if (Object.keys(item).find(key => item[key] === event)) {
         const tariffInclude = document.querySelector('.tariff-include')
         tariffInclude.textContent = ''

         const div1 = document.createElement('div')
         div1.textContent = `Ամսեվճար ${item.price}դրամ`
         tariffInclude.append(div1)

         const div2 = document.createElement('div')
         div2.textContent = `${item.mbit}մբիթ/վ արագություն`
         tariffInclude.append(div2)

         const div3 = document.createElement('div')
         div3.textContent = 'Անվճար տեղադրում'
         tariffInclude.append(div3)

         const div4 = document.createElement('div')
         div4.textContent = 'Անվճար Wi-fi սարք'
         tariffInclude.append(div4)

         return
      }
   })
}

const requestFormSelect = document.querySelector('.request-form__select')

requestFormSelect.addEventListener('input', event => {
   const activeBtn = document.querySelector('.resquest-modal__btn_active')

   if (activeBtn.classList.contains('request-modal__individual')) {
      createTariffInclude(individualList, event.target.value.toUpperCase())
   }
   else {
      createTariffInclude(businessList, event.target.value.toUpperCase())
   }
})