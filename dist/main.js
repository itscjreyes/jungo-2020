const navigation = () => {
    const items = document.querySelectorAll('.nav button.main-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.closest('.has-children');
            if (parent.classList.contains('active')){
                parent.classList.remove('active')
            } else {
                items.forEach(i => {
                    i.closest('.has-children').classList.remove('active');
                })
                parent.classList.add('active')
            }
        })
    });

    const outsideObject = (e, clickTarget) => {
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


    // LOGIN

    $('#login-btn').on('click', function(e){
        e.preventDefault();
        $('.login-dropdown').toggleClass('active');
    });
    
    const removeLoginDropdown = () => {
        $('.login-dropdown').removeClass('active');
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

    // STICKY NAV

    const stickyNav = () => {
        $(document).scroll(function () {
          const y = $(document).scrollTop();
          const topBar = $('.top-bar').height();
          const nav = document.querySelector('.main-nav');
      
          removeLoginDropdown();
          $('.has-children').removeClass('active');
      
          if (y >= topBar) {
            nav.classList.add('sticky');
          } else {
            nav.classList.remove('sticky');
          }
        });
    }

    stickyNav()
}

navigation();