'use strict'
document.addEventListener('DOMContentLoaded', ()=> {
    //Открытые модального окна
    const modal = document.querySelector('.modal'),
          buttonModal = document.querySelectorAll('.header__btn');

    function openModal(el) {
        el.classList.add('active')
    };
    function closeModal(el) {
        el.classList.remove('active')
    }
    buttonModal.forEach(btn => {
        btn.addEventListener('click', ()=> {
            openModal(modal);
        });
    });

    modal.addEventListener('click', (e)=> {
        if(e.target === modal || e.target.classList.contains('modal__close')) {
            closeModal(modal)
        }
    });
    window.addEventListener('keydown', (e)=> {
        if(e.code === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal)
        }
    })
    
})