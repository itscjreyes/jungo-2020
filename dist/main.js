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
}

navigation();