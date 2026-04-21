
let prevScrollPos = window.scrollY;
const header = document.getElementById('header');



window.addEventListener('scroll', () => {
 const currentScrollPos = window.scrollY ;

 if (currentScrollPos ===0) {
   // Scrolling up
   header.classList.remove('show-header')
 }
 else if (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 20) {
   // Scrolling up
   header.classList.add('show-header')
 } else if(prevScrollPos < currentScrollPos && currentScrollPos-prevScrollPos > 20) {
   // Scrolling down
   header.classList.remove('show-header')
 }else{

 }

 prevScrollPos = currentScrollPos;
});

