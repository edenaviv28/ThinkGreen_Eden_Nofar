(function() {
  //מגדיר שהקוד במצב קפדני כלומר אם משתנה לא מוגדר כפי שצריך הקוד לא יעבודד
  "use strict";

  /**
   * שתי הפונקציות הבאות הן פונקציות עזר, על מנת לצמצם בקריאה של פונקציות ולמנוע חזרתיות יצרנו שתי פונקציות שמחזירות אלמנטים על פי סלקטור ובנוסף, מצמידות לאלמנט המתאים מאזין
   */
  const select = (element, bool = false) => {
    element = element.trim()
    if (bool) {
      return [...document.querySelectorAll(element)]
    } else {
      return document.querySelector(element)
    }
  }

  
  const on = (type, element, funcListn, bool = false) => {
    let selectEl = select(element, bool)
    if (selectEl) {
      if (bool == true) {
        selectEl.forEach(e => e.addEventListener(type, funcListn))
      } else {
        selectEl.addEventListener(type, funcListn)
      }
    }
  }

  /**
   * הצמדת מאזין לפעולת גלילה
   */
  const onscroll = (element, funcListn) => {
    element.addEventListener('scroll', funcListn)
  }

  /**
   פונקציה המצמידה קלאס המייצג סטטוס פעיל במידה ולוחצים על אחד מעמודים בנאבבר 
 */
/*--------------------------------------------------------------------*/
const navbarlinksActive = (section) => {

  let navbarlinks = document.querySelectorAll('#navbar .scrollto')

  navbarlinks.forEach(navbarlink => {
    if (!navbarlink.hash) return
    if (navbarlink.hash === section) {
      navbarlink.classList.add('active')
    } else {
      navbarlink.classList.remove('active')
    }
  })
}
/**
   * מאפשר שיתרחש הפונקציה מעל גם בטעינת העמוד
   */
window.addEventListener('load', navbarlinksActive)
onscroll(document, navbarlinksActive)

 
/**
   * פונקציה זו מאפשרת מעבר לסקשיין המתאים באמצעות לחיצה על אחד מדפי הנאבבר כאשר המעבר יהיה בצורה זורמת ויתבצע לפי הגבהים בהשוואה לחלק העליון שלה האלמנט
   */
function scrollto(element) {
  const offset = document.querySelector('#header').offsetHeight;
  const elementPos = document.querySelector(element).offsetTop;
  window.scrollTo({ top: elementPos - offset, behavior: 'smooth' });
}

  /**
   *  שמציין את מצב הגלילה כשהמתמש ירד לפחות 100 פיקסל electHeaderכאשר הדף נגלל למטה נוסף קלאס ל
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    /**
   * מאפשר שיתרחש הפונקציה מעל גם בטעינת העמוד
   */
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }
  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);



  /**
   * כפתור חזרה למעלה
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /*
הפונקציה מאפשרת להוסיף או להסיר את המחלקה ה"פעילה" לכפתור חזרה למעלה על סמך כיוון הגלילה של המשתמש 
 */
  const toggleBacktotop = () => {
    let lastScrollPosition = window.scrollY;
    return function() {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > lastScrollPosition) {
        backtotop.classList.remove('active');
      } else {
        backtotop.classList.add('active');
      }
      lastScrollPosition = currentScrollPosition;
    }
  }
   /* מצב מובייל של הנאבבר
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * תפריט ניווט שנפתח במצב מובייל
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * מאפשר גלילה ולחיצה כאשר יש "תיוג #" על אחד מדפי הנאבבר  במצב של מובייל
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)


  /**
   * מצב טעינת העמוד לפני עליית הדף
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   *  אנימציה
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * התחל פעולת המונה 
   */
  new PureCounter();

})()