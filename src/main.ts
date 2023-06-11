import {Carousel} from './carousel.ts'

document.addEventListener('DOMContentLoaded', () => {
     const carousel = new Carousel(document.querySelector('.carousel-wrapper') as HTMLElement)
     const projects = document.querySelectorAll('.projets > .projet')
     projects.forEach((project, index)  => project.addEventListener('click', () => {
          carousel.goToItem(index)
     }))
      })


