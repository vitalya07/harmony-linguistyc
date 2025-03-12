'use strict'
document.addEventListener('DOMContentLoaded', ()=> {
    //Открытые модального окна
    const modal = document.querySelector('.modal'),  
          buttonModal = document.querySelectorAll('[data-modal]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'
    };
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    buttonModal.forEach(btn => {
        btn.addEventListener('click', ()=> {
            openModal();
        });
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__close')) {
            closeModal();
        }
    });
    window.addEventListener('keydown', (e)=> {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
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
    });
    //Отпоавка формы
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        bindPostData(form)
    });
    const message = {
        loading: 'icons/spinner.svg',
        success: 'data sent successfully',
        error: 'error'
    };

    const postData = async (url, data)=> {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: data
        });

       return await res.json();

    };

    function bindPostData(form) {
        form.addEventListener('submit', (e)=> {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto; 
                width: 20px;
                height: 20px;  
            `;
            form.append(statusMessage);                          
            const formData = new FormData(form);    
            
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            postData('mail.php', JSON.stringify(object))
            .then(() => {
                showThanksModal(message.success);                
                statusMessage.remove();
            }).catch(()=> {
                showThanksModal(message.error);
            }).finally(()=> {
                form.reset();
            });          
        });
    };
    
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('exit');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close"></div>
                <h2 class="modal__title">${message}</h2>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=> {
            thanksModal.remove();            
            prevModalDialog.classList.add('active');    
            prevModalDialog.classList.remove('exit');       
            closeModal();
        }, 2000)
    };
    
})