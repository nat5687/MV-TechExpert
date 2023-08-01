import {Carousel} from './carousel.ts'

document.addEventListener('DOMContentLoaded', () => {
     const carousel = new Carousel(document.querySelector('.carousel-wrapper') as HTMLElement)
     const projects = document.querySelectorAll('.projets > .projet')
     const toTop = document.querySelector('.arrow-top') as HTMLElement
     const imgToTop = document.querySelector('.arrow-top-img') as HTMLElement
     const carousel_container = document.querySelector('.carousel__container') as HTMLElement
     projects.forEach((project, index)  => project.addEventListener('click', () => {
          carousel_container.style.transition = 'transform 0.0s'
          carousel.goToItem(index)
          const carousel_project = document.querySelector(`.carousel-item${1}`) as HTMLElement
          carousel_project.scrollIntoView({
               behavior: 'smooth',
               block: 'start'
               })
          carousel_container.style.transition = 'transform 0.3s'
          }))
          


     // _______________________________TOP ARROWW ___________________________________________________
     const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
     const opacity = (document.documentElement.scrollTop*1.5) / pageHeight
     toTop.style.opacity = `${opacity}`
     window.addEventListener('scroll' ,() => {
          const opacity = Math.max(0.1, (document.documentElement.scrollTop) / pageHeight)
          toTop.style.opacity = `${opacity}`

     })
     toTop?.addEventListener('click', () => {
          if (document.documentElement.scrollTop > 0) {
               document.documentElement.scrollIntoView({ behavior: 'smooth' });
               currentH1 = 1
           }
     })

     toTop.addEventListener('mouseenter' , () => {

          imgToTop.classList.add('animate')
          setTimeout(() => {
               imgToTop.classList.remove('animate')
               imgToTop.classList.add('animate-end')
               
          }, 500)
          setTimeout(() => {
               imgToTop.classList.remove('animate-end')
               
          }, 800)

          
     })
     // ____________________FORM______________________
     const form = document.querySelector(".form")as HTMLFormElement
     // const sendbutton  = document.gte
     form.addEventListener('submit' , () => {

          setTimeout(() => {

               form?.reset()
          }, 500)
     })


     // __________________ANIMATION___________________


     const threshold = .35 
     const options = { 
        root: null,
        rootMargin: '0px',
        threshold 
     }
     
     const animation = (entries: IntersectionObserverEntry[], observer : IntersectionObserver) => {
     entries.forEach( entry => {
        if(entry.intersectionRatio > threshold){
           entry.target.classList.remove('reveal')
           console.log(`${entry.target} visible`)
           observer.unobserve(entry.target)
           
        }}
     )}
     
     document.documentElement.classList.add('reveal-loaded')
     const observer = new IntersectionObserver(animation, options)
     const targets = document.querySelectorAll('.reveal').forEach( (target) => {
     observer.observe(target)
     })  


     
     // _____________LINK___________________________
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault()
            
            const target = document.querySelector(this.getAttribute('href'));
            const offsetTop = 70 // Ajustez cette valeur en fonction de l'espacement souhaité entre le titre et le haut de la fenêtre du navigateur
      
            window.scroll({
              top: target.offsetTop - offsetTop,
              behavior: 'smooth'
            })
          })
        })

     //    ________________SCROLL_______________________

     let currentH1= 1
     const points: NodeListOf<HTMLElement>  = document.querySelectorAll('.h1')
     const totalH1 = points.length
     let scroll = document.documentElement.scrollTop

     document.addEventListener("wheel", function(event) {
          let delta = event.deltaY
          const offset =  125
          
          if (delta > 0 && currentH1 < totalH1) {
               currentH1++
               console.log(`currentSection: ${currentH1}, delta: ${delta}`)
               const relativeTop = points[currentH1 - 1].getBoundingClientRect().top
               const positionX = relativeTop + document.documentElement.scrollTop
               window.scrollTo({
                    top: positionX - offset,
                    behavior: 'smooth'
               })
               scroll = document.documentElement.scrollTop
               event.preventDefault();


          } else if (delta < 0 && currentH1 > 1 ) {
               currentH1--
               console.log(`currentSection: ${currentH1}, delta: ${delta}`)
               const relativeTop = points[currentH1 - 1].getBoundingClientRect().top
               const positionX = relativeTop + document.documentElement.scrollTop
               window.scrollTo({
                    top: positionX - offset,
                    behavior: 'smooth'
               })
               scroll = document.documentElement.scrollTop
               event.preventDefault();
          }
     })
})