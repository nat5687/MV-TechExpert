import {Carousel} from './carousel.ts'
import {changeMenuIntoMenuPage, changePageIntoMenu} from './burger.ts'

document.addEventListener('DOMContentLoaded', () => {
     const carousel = new Carousel(document.querySelector('.carousel-wrapper') as HTMLElement)
     const projects = document.querySelectorAll('.projets > .projet')
     const toTop = document.querySelector('.arrow-top') as HTMLElement
     const imgToTop = document.querySelector('.arrow-top-img') as HTMLElement
     const carousel_container = document.querySelector('.carousel__container') as HTMLElement
     const offset =  125
     projects.forEach((project, index)  => project.addEventListener('click', () => {
          carousel_container.style.transition = 'transform 0.0s'
          carousel.goToItem(index)
          const carousel_project = document.querySelector(`.carousel-item${1}`) as HTMLElement
          const relativeTop = carousel_project.getBoundingClientRect().top
          const positionX = relativeTop + document.documentElement.scrollTop
          window.scrollTo({
               top: positionX - offset,
               behavior: 'smooth'
          })
          carousel_container.style.transition = 'transform 0.3s'
          }))
          


     // _______________________________TOP ARROWW ___________________________________________________
     const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
     window.addEventListener('resize', () => {
     const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
     })
     const opacity = (document.documentElement.scrollTop*1.5) / pageHeight
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


     // const threshold = .2
     // const options = { 
     //    root: null,
     //    rootMargin: '0px',
     //    threshold 
     // }
     
     // const animation = (entries: IntersectionObserverEntry[], observer : IntersectionObserver) => {
     // entries.forEach( entry => {
     //    if(entry.intersectionRatio > threshold){
     //       entry.target.classList.remove('reveal')
     //       console.log(`${entry.target} visible`)
     //       observer.unobserve(entry.target)
           
     //    }}
     // )}
     
     // document.documentElement.classList.add('reveal-loaded')
     // const observer = new IntersectionObserver(animation, options)
     // document.querySelectorAll('.reveal').forEach( (target) => {
     // observer.observe(target)
     // })  


     
     // // _____________LINK___________________________
     document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
          e.preventDefault()

          const href = this.getAttribute('href')
          if(href !== null) {
               const target = document.querySelector(href)
               if(target instanceof HTMLElement){
                    if(isOpened){
                         window.scroll({
                         top: target.offsetTop - offset,
                         behavior: 'smooth'
                    })
                    } else {
                         changeMenuIntoMenuPage(menuburger)
                         isOpened = true
                         window.scroll({
                         top: target.offsetTop - offset,
                         behavior: 'smooth'
                    })
                    }
               }
               
          }
          
          
          })
     })

     // //    ________________SCROLL_______________________


     // let currentH1= 1
     // const h1List: NodeListOf<HTMLElement> = document.querySelectorAll('.h1')
     // let points = Array.from(h1List)
     // points.push(document.querySelector('footer') as HTMLElement)
     // const totalH1 = points.length
     // console.log(points)
     // let scroll = document.documentElement.scrollTop
     // let isScrolling = false

     // document.addEventListener("wheel", function(event) {
     //      event.preventDefault()
     //      if (isScrolling) return 
     //      isScrolling = true
     //      let delta = event.deltaY
          
     //      if (delta > 0 && currentH1 < totalH1) {
     //           currentH1++
     //           // console.log(`currentSection: ${currentH1}, delta: ${delta}`)
     //           const relativeTop = points[currentH1 - 1].getBoundingClientRect().top
     //           const positionX = relativeTop + document.documentElement.scrollTop
     //           window.scrollTo({
     //                top: positionX - offset,
     //                behavior: 'smooth'
     //           })
     //           scroll = document.documentElement.scrollTop



     //      } else if (delta < 0 && currentH1 > 1 ) {
     //           currentH1--
     //           // console.log(`currentSection: ${currentH1}, delta: ${delta}`)
     //           const relativeTop = points[currentH1 - 1].getBoundingClientRect().top
     //           const positionX = relativeTop + document.documentElement.scrollTop
     //           window.scrollTo({
     //                top: positionX - offset,
     //                behavior: 'smooth'
     //           })
     //           scroll = document.documentElement.scrollTop
               
     //      }

     //      setTimeout(() => {
     //           isScrolling = false
     //         }, 500)
     // })




     // // header
     // const headerButton : NodeListOf<HTMLElement> = document.querySelectorAll('.a')
     // headerButton.forEach( (button , index : Number ) => {
     //      button.addEventListener('click', () => {
     //           if (index === 0) {
     //                currentH1 = 2
     //           }else if(index === 1) {
     //                currentH1 = 4
     //           } else if(index === 2) {
     //                currentH1 = 5
     //           }
     //      })
     // })


     // ________________________MENU-BURGER_______________________________
     const menuburger = document.querySelector('.burger') as HTMLImageElement
    const menuWrapper = document.querySelector('.menu-wrapper')
    let isOpened = true
    

    menuWrapper?.addEventListener('click', ()  => {
        isOpened = !isOpened
        if(isOpened){
            changeMenuIntoMenuPage(menuburger)
        } else{
            changePageIntoMenu(menuburger)
        } 

        
    })
})