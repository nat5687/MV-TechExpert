import {Carousel} from './carousel.ts'


document.addEventListener('DOMContentLoaded', () => {
     const carousel = new Carousel(document.querySelector('.carousel-wrapper') as HTMLElement)
     const projects = document.querySelectorAll('.projets > .projet')
     const toTop = document.querySelector('.arrow-top') as HTMLElement
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
     const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
     const opacity = Math.max(0.01, (document.documentElement.scrollTop*1.2) / pageHeight)
     toTop.style.opacity = `${opacity}`
     window.addEventListener('scroll' ,() => {
          const opacity = Math.max(0.1, (document.documentElement.scrollTop) / pageHeight)
          toTop.style.opacity = `${opacity}`

     })
     toTop?.addEventListener('click', () => {
          if (document.documentElement.scrollTop > 0) {
               document.documentElement.scrollIntoView({ behavior: 'smooth' });
           }
     })
})