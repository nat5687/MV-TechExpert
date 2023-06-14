interface Options {
    slidesToScroll: number
    slidesVisible: number
    loop: boolean
}
interface CallBack {
    (index: number): void 
}

export class Carousel {
    element: HTMLElement
    options: Options
    items: HTMLElement[]
    container: HTMLElement
    root: HTMLElement
    currentItem: number
    moveCallBacks: CallBack[]
    isMobile: boolean


    constructor(element: HTMLElement, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options)
        let children = [].slice.call(element.children)
        this.moveCallBacks = []
        this.currentItem = 0

        // Modification du DOM
        this.root = this.createDivWithClass('carousel')
        this.isMobile = false
        this.container = this.createDivWithClass('carousel__container')
        this.root.setAttribute('tabIndex', '0')
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

        // Events
        this.moveCallBacks.forEach(cb => cb(0))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
        this.root.addEventListener('keyup', e => {
            if(e.key === 'ArrowRight' || e.key === 'Right'){
                this.next()
            } else if(e.key === 'ArrowLeft' || e.key === 'Left'){
                this.prev()
            }
        })
    }

    setStyle () {
            let ratio: number = this.items.length / this.slidesVisible
            this.container.style.width = (ratio * 100) + '%'
            this.items.forEach( item => {item.style.width = ((100 / this.slidesVisible) / ratio) + '%' })
    }


    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this, 1))
        prevButton.addEventListener('click', this.prev.bind(this, 1))
        if (this.options.loop === true){
            return
        }
        this.onMove( (index: number): void => {
            if (index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if ( (this.items[this.currentItem + this.slidesVisible] === undefined )) {
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.remove('carousel__next--hidden')

            }
        })


    }

    next (n = 1) {
        this.goToItem(this.currentItem + this.slidesToScroll * n)
    }

    prev (n = 1) {
        this.goToItem(this.currentItem - this.slidesToScroll * n)
    }

    goToItem (index: number) {
        if (index < 0 ) {
            if (this.options.loop){
                index = this.items.length - this.options.slidesVisible
            } else {
                return 
            }
        } else if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)){
            if (this.options.loop) {
                index = 0
            } else {
                return 
            }
        }
        
        let translateX = index * -100 /  this.items.length
        this.container.style.transform = `translate3D(${translateX}%, 0, 0)`
        this.currentItem = index
        this.moveCallBacks.forEach(cb => cb(index))
    }

    onMove(cb: CallBack){
        this.moveCallBacks.push(cb)

    }

    onWindowResize(){
        let mobile = window.innerWidth < 800
        if (mobile !== this.isMobile){
            this.isMobile = mobile
            this.setStyle
            this.moveCallBacks.forEach(cb => cb(this.currentItem))

        }
    }


    createDivWithClass(className: string): HTMLElement{
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    get slidesToScroll(): number{
        return (this.isMobile ? 1 :  this.options.slidesToScroll)
    }

    get slidesVisible(): number {
        return (this.isMobile ? 1 :  this.options.slidesVisible)
    }
}


