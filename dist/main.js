function navigation(){
    manageWidth();
    if ($('body').hasClass('desktop')) {
        desktopNav();
    }
    if ($('body').hasClass('mobile')) {
        mobileNav();
    }
    mobileSetup();
    loginFn();
    stickyNav();
};

function desktopNav(){
    const items = document.querySelectorAll('.nav button.main-item');
    items.forEach(function (item) {
        item.addEventListener('click', function () {
            var parent = item.closest('.has-children');
            if (parent.classList.contains('active')) {
                parent.classList.remove('active');
            } else {
                items.forEach(function (i) {
                    i.closest('.has-children').classList.remove('active');
                });
                parent.classList.add('active');
            }
        });
    });

    function outsideObject(e, clickTarget){
        if (e.target.id != clickTarget.attr('id') && !clickTarget.has(e.target).length) {
            const mainItems = document.querySelectorAll('.has-children');
            mainItems.forEach(item => {
                item.classList.remove('active');
            })
        }
    }

    $('body').mouseup(function(e) {
        const hasChildren = $('.has-children');
        outsideObject(e, hasChildren);
    });
}

function loginFn(){
    $('#login-btn').on('click', function(e){
        e.preventDefault();
        $('.login-dropdown').toggleClass('active');
        $('ul.nav').toggleClass('dropdown-active');
    });
    
    function removeLoginDropdown(){
        $('.login-dropdown').removeClass('active');
        $('ul.nav').removeClass('dropdown-active');
    }
    
    $("body").mouseup(function (e) {
        var subject = $(".login-dropdown-wrapper");
    
        if (e.target.id != subject.attr('id') && !subject.has(e.target).length) {
        removeLoginDropdown();
        }
    });

    const loginInput = $('.login-dropdown #url');

    $('.login-dropdown form').on('submit', function(e){
        e.preventDefault();

        const loginSubdomain = loginInput.val();
        const loginRedirect = 'https://' + loginSubdomain + '.webhr.co';

        if (loginSubdomain == "") {
            loginInput.addClass('error');
        } else {
            window.location.href = loginRedirect;
        }
    });

    loginInput.on('input', function(){
        loginInput.removeClass('error');
    });
}

function stickyNav(){
    $(document).scroll(function () {
        const y = $(document).scrollTop();
        const topBar = $('.top-bar').height();
        const nav = document.querySelector('body .main-nav');
    
        $('.login-dropdown').removeClass('active');
        $('.has-children').removeClass('active');
    
        if (!$('body').hasClass('mobile')) {
            if (y >= topBar) {
                nav.classList.add('sticky');
            } else {
                nav.classList.remove('sticky');
            }
        }
    });
}

function manageWidth(){
    const setMobileClass = () => {
        const body = document.querySelector('body');
    
        if (window.innerWidth < 1030) {
            body.classList.add('mobile');
            body.classList.remove('desktop');
        } else {
            body.classList.add('desktop');
            body.classList.remove('mobile');
        }
    }

    window.onload = setMobileClass();
    window.addEventListener('resize', setMobileClass);
};

function mobileSetup(){
    $(window).on('resize', function(){
		if ($('body').hasClass('mobile')){
			$('.top-bar-content').appendTo('.main-nav nav');
		} else {
			$('.top-bar-content').appendTo('.top-bar .container');
		}
	}).resize();
};


function mobileNav(){
    const trigger = document.querySelector('.mobile-trigger');
    const nav = document.querySelector('header.navigation nav');

    trigger.addEventListener('click', () => {
        trigger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    $('.main-item').on('click', function(e){
        const parent = $(e.target).parent();
        if (parent.hasClass('active')) {
            parent.removeClass('active');
            parent.find('.sub-nav').slideUp();
        } else {
            $('.has-children').removeClass('active');
            $('.sub-nav').slideUp();
            parent.addClass('active');
            parent.find('.sub-nav').slideDown();
        }
    });
}

document.addEventListener("DOMContentLoaded", navigation());

function staticBar(){
    var staticBarBtn = document.querySelectorAll('button.close-static-bar');

    function staticBarBtnClick(e){
    e.preventDefault();
    var target = e.target.closest('button');
    var storageItem = 'static-bar-' + target.id;
    localStorage.setItem(storageItem, 'closed');
    var parentBar = target.closest('button').parentNode.parentNode;
    parentBar.style.display = 'none';
    }

    var covidBarStatus = localStorage.getItem('static-bar-covid-bar');

    if (covidBarStatus == 'closed') {
    document.querySelector('.static-bar[data-id="covid-bar"]').style.display = 'none';
    }

    var cookieBarStatus = localStorage.getItem('static-bar-cookie-bar');

    if (cookieBarStatus == 'closed') {
    document.querySelector('.static-bar[data-id="cookie-bar"]').style.display = 'none';
    }

    staticBarBtn.forEach(function(btn){
    btn.addEventListener('click', staticBarBtnClick);
    })
}

document.addEventListener("DOMContentLoaded", staticBar());