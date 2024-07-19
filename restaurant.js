// -----------변수-----------
let restaurantdataList = [];

// https://stargolf.info/API_TEST/get_tasks.php?page=[%ED%8E%98%EC%9D%B4%EC%A7%80%EB%B2%88%ED%98%B8]&limit=[pageValue]&category=[wr_1%EA%B0%92]&search=[%EA%B2%80%EC%83%89%EC%96%B4]
// -----------API 호출-----------
const getrestaurantData = async () =>{
    const url = new URL('https://stargolf.info/API_TEST/get_tasks.php?page=1&limit=101&category=식당');
    const response = await fetch(url);
    console.log(response);
    restaurantdata = await response.json();
    restaurantList = restaurantdata.data;


    restaurantrender();
    console.log(restaurantdataList);
}


// -----------render-----------
const restaurantrender = () => {    
    let restaurantdataHTML = restaurantList.slice(restauranti+1, restauranti+3).map((data) => 
    `<div class="restaurant col ">
    <div class="restaurant-box">
        <img src="${data.wr_link1}" class="restaurant-img-top" alt="${data.wr_subject}">
        <h5 class="restaurant-title">${data.wr_subject.substring(0, 15)}</h5>
        <p class="restaurant-text"><strong>Type:</strong> ${data.wr_1}</p>
        <p class="restaurant-text"><strong>Number:</strong> ${data.wr_3}</p>
        <p class="restaurant-text"><strong>Address:</strong> ${data.wr_6.substring(0, 20)}...</p>
    </div>    
    </div>`).join('');
    document.getElementById("restaurant-data-board").innerHTML = restaurantdataHTML;



    let restaurantdataHTML3 = restaurantList.slice(restauranti+3, restauranti+5).map((data) => 
      `<div class="restaurant col">
      <div class="restaurant-box">
          <img src="${data.wr_link1}" class="restaurant-img-top" alt="${data.wr_subject}">
          <h5 class="restaurant-title">${data.wr_subject.substring(0, 15)}</h5>
          <p class="restaurant-text"><strong>Type:</strong> ${data.wr_1}</p>
          <p class="restaurant-text"><strong>Number:</strong> ${data.wr_3}</p>
          <p class="restaurant-text"><strong>Address:</strong> ${data.wr_6.substring(0, 20)}...</p>
      </div>    
      </div>`).join('');
      document.getElementById("restaurant-data-board3").innerHTML = restaurantdataHTML3;



    let restaurantdataHTML2 = restaurantList.slice(restauranti, restauranti+1).map((data) => 
        `<div class="restaurant">
        <div class="restaurant-box2">
            <img src="./images/1.png" id="restaurant-pagenation1" onclick="moveTorestaurantPage1()" alt="">
            <img src="${data.wr_link1}" class="restaurant-img-top2"  alt="${data.wr_subject}">
            <div class="restaurant-text-box">
            <h5 class="restaurant-title2">${data.wr_subject.substring(0, 45)}</h5>
            <h4 class="restaurant-text2"><strong>Type:</strong> ${data.wr_1}</h4>
            <h4 class="restaurant-text2"><strong>Number:</strong> ${data.wr_3}</h4>
            <h4 class="restaurant-text2"><strong>Address:</strong> ${data.wr_6.substring(0, 30)}</h4>
            <h4 class="restaurant-text2"><strong>Time:</strong> ${data.wr_4}</h4>
            <h4 class="restaurant-text2"><strong>Menu:</strong> ${data.wr_5}</h4>
            <h3 class="restaurant-text2 none">${data.wr_content}</h3>
            </div>
            <img src="./images/2.png" id="restaurant-pagenation2" onclick="moveTorestaurantPage2()" alt="">
        </div>    
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