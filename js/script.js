'use strict'
document.addEventListener('DOMContentLoaded', ()=> {
    //Открытые модального окна
    const modal = document.querySelector('.modal'),
          modalClose = document.querySelector('.modal__close'),  
          buttonModal = document.querySelectorAll('[data-modal]');

    function openModal(el) {
        el.classList.add('show');
        el.classList.remove('hide');
        document.body.style.overflow = 'hidden'
    };
    function closeModal(el) {
        el.classList.add('hide');
        el.classList.remove('show');
        document.body.style.overflow = '';
    }
    buttonModal.forEach(btn => {
        btn.addEventListener('click', ()=> {
            openModal(modal);
        });
    });
    modalClose.addEventListener('click', (e)=> {
        closeModal(modal)
    })
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    window.addEventListener('keydown', (e)=> {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modal)
        }
    });

    //навигация на мобилке и смена header
    const hamburger = document.querySelector('.hamburger'),
          header = document.querySelector('header');
    function openMenu() {
        header.classList.toggle('open');
    }        
    hamburger.addEventListener('click', openMenu)
    
    function changeColorHeader() {
        window.addEventListener('scroll', (e)=> {
            if(scrollY > 80) {
                header.style.background = '#fff'
            } else {
                header.style.background = ''
            }
        })
    }
    changeColorHeader();
    //выпадающие элементы
    const servicesItem = document.querySelectorAll('.services__item');


    servicesItem.forEach((item) => {
        item.addEventListener('click', (e)=> {
            if(e.target.classList.contains('services__item-box') || e.target.classList.contains('services__item-title') || e.target.classList.contains('services__item-plus') ) {
                item.classList.toggle('open')
            }            
        })
    })
    
})