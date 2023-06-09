interface Options {
    slidesToScroll: number
    slidesVisible: number
    loop: boolean
}

class Carousel {
    element: HTMLElement
    options: Options
    items: HTMLElement[]
    container: HTMLElement
    root: HTMLElement
    currentItem: number


    constructor(element: HTMLElement, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options)
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child: HTMLElement) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()

    }

    setStyle () {
            let ratio: number = this.items.length / this.options.slidesVisible
            this.container.style.width = (ratio * 100) + '%'
            this.items.forEach( item => {item.style.width = ((100 / this.options.slidesVisible) / ratio) + '%' })
    }


    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))


    }

    next () {
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev () {
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }

    goToItem (index: number) {
        if (index < 0 ) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || (this.items[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem)){
            index = 0
        }
        let translateX = index * -100 /  this.items.length
        this.container.style.transform = `translate3D(${translateX}%, 0, 0)`
        this.currentItem = index
        debugger
    }


    createDivWithClass(className: string): HTMLElement{
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}




document.addEventListener('DOMContentLoaded', () => {
    new Carousel(document.querySelector('.carousel-wrapper') as HTMLElement)


})

