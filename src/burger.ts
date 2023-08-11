
export const changePageIntoMenu = (menuburger: HTMLImageElement) => {
    menuburger.src = '../public/svgs/menu-closed.svg'
    menuburger.classList.add('closed')
    menuburger.classList.remove('opened')

    const body = document.querySelector('body')
    body?.classList.add('u-no-scroll')

    const bigMenu = document.querySelector('.big-menu')
    bigMenu?.classList.remove('hidden')
    bigMenu?.classList.add('responsive-menu')

}

export const changeMenuIntoMenuPage = (menuburger: HTMLImageElement) => {
    menuburger.src = '../public/svgs/menu.svg'
    menuburger.classList.add('opened')
    menuburger.classList.remove('closed')

    const body = document.querySelector('body')
    body?.classList.remove('u-no-scroll')

    const bigMenu = document.querySelector('.big-menu')
    bigMenu?.classList.add('hidden')
    bigMenu?.classList.remove('responsive-menu')

}
