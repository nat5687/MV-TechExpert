import {Carousel} from './carousel.ts'

document.addEventListener('DOMContentLoaded', () => {
     new Carousel(document.querySelector('.carousel-wrapper') as HTMLElement)
})

