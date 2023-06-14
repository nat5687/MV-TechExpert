import {Carousel} from './carousel.ts'

document.addEventListener('DOMContentLoaded', () => {
     const carousel = new Carousel(document.querySelector('.carousel-wrapper') as HTMLElement)
     const projects = document.querySelectorAll('.projets > .projet')
     projects.forEach((project, index)  => project.addEventListener('click', () => {
          carousel.goToItem(index)
          const carousel_project = document.querySelector(`.carousel-item${index+1}`) as HTMLElement
          debugger
          setTimeout(() => {
               carousel_project.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                    })     
          },300)
          }))
     })