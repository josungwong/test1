//메인 슬라이드 
document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.indexSwiperBox', {
        direction: 'horizontal',
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        on: {
            slideChangeTransitionStart: function () {
                const activeSlide = this.slides[this.activeIndex];
                const animatedElements = activeSlide.querySelectorAll('.animate__animated');
                animatedElements.forEach(el => {
                    el.classList.remove('animate__fadeInDown', 'animate__fadeInUp');
                    void el.offsetWidth; // 리플로우 트리거
                    el.classList.add(el.classList.contains('animate__fadeInDown') ? 'animate__fadeInDown' : 'animate__fadeInUp');
                });
            }
        }
    });
});

//모바일 사이드 메뉴
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            setSearchView();
            loadPage(1);
        });
    } else {
        console.error("'searchButton' element not found");
    }

    // ... 나머지 코드 ...
});

//메인 슬라이드
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.mvSlider', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        on: {
            slideChangeTransitionStart: function () {
                const activeSlide = this.slides[this.activeIndex];
                const animatedElements = activeSlide.querySelectorAll('.animate__animated');
                animatedElements.forEach(el => {
                    const animation = el.dataset.animation;
                    el.classList.remove(animation);
                    void el.offsetWidth; // 리플로우 트리거
                    el.classList.add(animation);
                });
            }
        }
    });
});

//이벤트 배너
document.addEventListener('DOMContentLoaded', function () {
    // 기존의 Swiper 초기화 코드...

    // 이벤트 배너 Swiper
    const eBannerSwiper = new Swiper('.e-banner-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // 576px 이상일 때
            576: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            // 768px 이상일 때
            768: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            // 992px 이상일 때
            992: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // 1200px 이상일 때
            1200: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });
});

//이메일 전화 팝업
function openEmailPopup(event) {
    event.preventDefault();
    window.open('email.html', 'EmailPopup', 'width=600,height=600');
}

function handlePhoneClick(event) {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        event.preventDefault();
        alert('휴대전화기기에서만 전화 연결이 가능합니다.');
    }
}
// --------------------------------- 식당 ---------------------------------
// -----------변수-----------
let restaurantdataList = [];

// -----------API 호출-----------
const getrestaurantData = async () =>{
    const restauranturl = new URL('https://stargolf.info/API_TEST/get_tasks.php?page=1&limit=101&category=식당');
    const response = await fetch(restauranturl);
    console.log(response);
    restaurantdata = await response.json();
    restaurantList = restaurantdata.data;
    restaurantrender();
    console.log(restaurantdataList);
}
// -----------render-----------
const restaurantrender = () => {    
    let restaurantdataHTML = restaurantList.slice(restauranti+1, restauranti+3).map((data) => 
    `<div class="restaurant">
    <div class="restaurant-box col-lg-10 col-md-12 mb-6">
        <div class="restaurant-m-box col-lg-12 col-md-12">
        <img src="${data.wr_link1}" class="restaurant-img-top" alt="${data.wr_subject}">
        <h5 class="restaurant-title">${data.wr_subject.substring(0, 15)}</h5>
        </div>
    </div>    
    </div>`).join('');
    document.getElementById("restaurant-data-board").innerHTML = restaurantdataHTML;

    let restaurantdataHTML2 = restaurantList.slice(restauranti, restauranti+1).map((data) => 
        `<div class="restaurant-box2 col-lg-8 col-md-10 mb-4">
                <div class="arrow-box"><img src="./img/1.png" id="restaurant-pagenation1" onclick="moveTorestaurantPage1()" alt=""></div>
                <img src="${data.wr_link1}" class="restaurant-img-top2"  alt="${data.wr_subject}">
            <div class="restaurant-text-box">
             <h5 class="restaurant-title2">${data.wr_subject.substring(0, 50)}</h5>
             <h4 class="restaurant-text2 none2"><strong>Type:</strong> ${data.wr_1}</h4>
             <h4 class="restaurant-text2"><strong>Number:</strong> ${data.wr_3}</h4>
             <h4 class="restaurant-text2"><strong>Address:</strong> ${data.wr_6.substring(0, 30)}</h4>
             <h4 class="restaurant-text2"><strong>Time:</strong> ${data.wr_4}</h4>
             <h4 class="restaurant-text2"><strong>Menu:</strong> ${data.wr_5}</h4>
             <h4 class="restaurant-text2"><strong>평점:</strong> ${data.eb_10}</h4>
            </div>
            <div class="arrow-box2"><img src="./img/2.png" id="restaurant-pagenation2" onclick="moveTorestaurantPage2()" alt=""></div>
        </div>`).join('');
        document.getElementById("restaurant-data-board2").innerHTML = restaurantdataHTML2;
};
// -----------moveTorestaurantPage 함수-----------

let restauranti = 0;
  let moveTorestaurantPage1 = () =>{
    if(restauranti==0){
        return;
    }
    else{restauranti--}
    restaurantrender();
  }
  let moveTorestaurantPage2 = () =>{
    if(restauranti==9){
        return;
    }
    else{restauranti++}
    restaurantrender();
  }

getrestaurantData();
// --------------------------------- 여기까지 식당 ---------------------------------