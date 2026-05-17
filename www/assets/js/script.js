console.log("done!");

function handleToggle(name, inpName) {
  console.log(name, inpName)
  if ($(`#${inpName}`).attr("type") == "text") {
    $(`#${inpName}`).attr("type", "password");
    $(`#${name}`).removeClass("bi bi-eye").addClass("bi bi-eye-slash");
  } else {
    $(`#${inpName}`).attr("type", "text");
    $(`#${name}`).removeClass("bi bi-eye-slash").addClass("bi bi-eye");
  }
}

function handleLogin(e) {
  e.preventDefault();

  let email = $("#email").val();
  let password = $("#password").val();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }
  let load = true;

  if (load) {
    $("#btnLogin").html("<span class='loader'></span> submitting...");
    $("#btnLogin").prop("disabled", true);
  }

  setTimeout(() => {
    load = false;

    location.href = "home.html";
    $("#btnLogin").prop("disabled", false);
  }, 1500);

  //   $.ajax({
  //     url: "",
  //     method: "POST",
  //     dataType: "json",

  //     data: {
  //       type: "handleLogin",
  //       email: email,
  //       password: password,
  //     },

  //     success: function (response) {
  //       if (response.status === "success") {
  //         console.log("Login successful!");
  //       } else {
  //         console.log(response.message || "Something went wrong");
  //       }
  //     },

  //     error: function (xhr, status, error) {
  //       console.log("AJAX Error:", error);
  //     },
  //   });
}
function handleRegister(e) {
  e.preventDefault();

  let name = $("#name").val().trim();
  let email = $("#email").val().trim();
  let password = $("#password").val().trim();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }
  let load = true;

  if (load) {
    $("#btnRegister").html("<span class='loader'></span> submitting...");
    $("#btnRegister").prop("disabled", true);
  }

  setTimeout(() => {
    load = false;

    location.href = "otp.html";
    $("#btnRegister").prop("disabled", false);
  }, 1500);

  //   $.ajax({
  //     url: "",
  //     method: "POST",
  //     dataType: "json",

  //     data: {
  //       type: "handleRegister",
  //       name,
  //       email,
  //       password,
  //     },

  //     success: function (response) {
  //       if (response.status === "success") {
  //         console.log("Login successful!");
  //       } else {
  //         console.log(response.message || "Something went wrong");
  //       }
  //     },

  //     error: function (xhr, status, error) {
  //       console.log("AJAX Error:", error);
  //     },
  //   });
}

function handleOtp(e) {
  e.preventDefault();
  let enteredOtp = "";

  $(".otp_input").each(function () {
    enteredOtp += $(this).val();
  });
  let load = true;

  if (load) {
    $("#otpBtn").html("<span class='loader'></span> verifying...");
    $("#otpBtn").prop("disabled", true);
  }

  setTimeout(() => {
    load = false;

    location.href = "home.html";
    $("#otpBtn").prop("disabled", false);
  }, 1500);

  // $.ajax({
  //     url: "",
  //     method: "POST",
  //     dataType: "json",

  //     data: {
  //       type: "handleLogin",
  //       otp: enteredOtp,
  //
  //     },

  //     success: function (response) {
  //       if (response.status === "success") {
  //         console.log("register successfull!");
  //       } else {
  //         console.log(response.message || "Something went wrong");
  //       }
  //     },

  //     error: function (xhr, status, error) {
  //       console.log("AJAX Error:", error);
  //     },
  //   });
}

let forgotBtn = document.querySelectorAll(".forgot_btn");
console.log(forgotBtn);
forgotBtn.forEach((item) => {
  item.addEventListener("click", () => {
    let data = item.querySelector(".forgot_left_txt p").innerText;

    forgotBtn?.forEach((el) => el.classList.remove("active_forgot"));
    item?.classList.add("active_forgot");
    // console.log(item);
    $("#selectedForgotType").val(data);
  });
});

function handleForgotOtp() {
  let selectedOtpType = $("#selectedForgotType").val();

  let load = true;

  if (load) {
    $("#forgotOtpBtn").html("<span class='loader'></span> Sending...");
    $("#forgotOtpBtn").prop("disabled", true);
  }

  setTimeout(() => {
    load = false;

    location.href = "forgotOtp.html";
    $("#forgotOtpBtn").prop("disabled", false);
  }, 1500);
}

function handleReSendOtp() {
  alert();
  // code...
}

function handleVerifyOtp(e) {
  e.preventDefault();
  let enteredOtp = "";

  $(".otp_input_verify").each(function () {
    enteredOtp += $(this).val();
  });
  let load = true;

  if (load) {
    $("#verifyOtpBtn").html("<span class='loader'></span> verifying...");
    $("#verifyOtpBtn").prop("disabled", true);
  }

  setTimeout(() => {
    load = false;

    location.href = "resetPassword.html";
    $("#verifyOtpBtn").prop("disabled", false);
  }, 1500);

  // $.ajax({
  //     url: "",
  //     method: "POST",
  //     dataType: "json",

  //     data: {
  //       type: "handleLogin",
  //       otp: enteredOtp,
  //
  //     },

  //     success: function (response) {
  //       if (response.status === "success") {
  //         console.log("register successfull!");
  //       } else {
  //         console.log(response.message || "Something went wrong");
  //       }
  //     },

  //     error: function (xhr, status, error) {
  //       console.log("AJAX Error:", error);
  //     },
  //   });
}
function handleUpdatePassword(e) {
  e.preventDefault();

  if($("#updatePassword").val() !== $("#reUpdatePassword").val()){

    alert("password not matched !");
    return;
  }

  let load = true;

  if (load) {
    $("#btnReset").html("<span class='loader'></span> Updating...");
    $("#btnReset").prop("disabled", true);
  }
  

  setTimeout(() => {
    load = false;

    // location.href = "home.html";
    const offcanvas = new bootstrap.Offcanvas(
    document.getElementById("offcanvasPassword")
  );

  offcanvas.show();
        $("#btnReset").html("Verified");

    $("#btnReset").prop("disabled", false);
  }, 1500);
}

function getProduct1() {
  let getPrdHtml="";

  const products = [
  {
    id: 1,
    discount: "FLAT ₹150 OFF",
    liked: true,
    image: "../assets/image/temp/homePrd1.svg",
    title: "Food Bazaar Bazaar Bazaar Bazaar Bazaar Rast...",
    deliveryTime: "36 mins",
    distance: "3 km",
  },
  {
    id: 2,
    discount: "FLAT ₹100 OFF",
    liked: false,
    image: "../assets/image/temp/homePrd2.svg",
    title: "Fresh Mart Grocery Store",
    deliveryTime: "25 mins",
    distance: "1.5 km",
  },
  {
    id: 3,
    discount: "UPTO 50% OFF",
    liked: true,
    image: "../assets/image/temp/homePrd3.svg",
    title: "Organic Veggie Hub",
    deliveryTime: "40 mins",
    distance: "4 km",
  },
  {
    id: 4,
    discount: "FREE DELIVERY",
    liked: false,
    image: "https://b.zmtcdn.com/data/pictures/5/22411715/8fc8b5070d266246de26f97a6f0e80e2_o2_featured_v2.jpg?output-format=webp",
    title: "Daily Needs Super Store",
    deliveryTime: "18 mins",
    distance: "900 m",
  },
  {
    id: 5,
    discount: "FLAT ₹200 OFF",
    liked: true,
    image: "https://b.zmtcdn.com/data/pictures/6/21466036/9b5ea50c0d48a881b2cd6f3070d7127f_o2_featured_v2.jpg",
    title: "Mega Food Plaza",
    deliveryTime: "30 mins",
    distance: "2.2 km",
  },
  {
    id: 6,
    discount: "FLAT ₹200 OFF",
    liked: true,
    image: "https://b.zmtcdn.com/data/pictures/chains/1/18625991/8fa1a185a369be06f27c0fc9b4adce08_featured_v2.jpg",
    title: "Mega Food Plaza",
    deliveryTime: "30 mins",
    distance: "2.2 km",
  },
   {
    id: 6,
    discount: "FLAT ₹200 OFF",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
    title: "Burger King Point",
    deliveryTime: "22 mins",
    distance: "1 km",
  },

  // 6 MORE ARRAY

  {
    id: 7,
    discount: "20% OFF",
    liked: true,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
    title: "Pizza Town",
    deliveryTime: "28 mins",
    distance: "2.8 km",
  },
  {
    id: 8,
    discount: "FREE DELIVERY",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
    title: "Spicy Chicken Hub",
    deliveryTime: "35 mins",
    distance: "3.5 km",
  },
  {
    id: 9,
    discount: "FLAT ₹80 OFF",
    liked: true,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
    title: "Healthy Salad Point",
    deliveryTime: "20 mins",
    distance: "1.2 km",
  },
  {
    id: 10,
    discount: "30% OFF",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500",
    title: "Coffee Cafe",
    deliveryTime: "15 mins",
    distance: "700 m",
  },
  {
    id: 11,
    discount: "BUY 1 GET 1",
    liked: true,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    title: "Italian Pizza House",
    deliveryTime: "32 mins",
    distance: "2 km",
  },
  

];

products?.forEach((item)=>{
   getPrdHtml+=`
    <div class="product_box">
          <div class="product_top_sec">
            <div class="disc_tag">
            ${item?.discount}
            </div>
            <div class="like">
              <i class="bi bi-heart-fill"></i>
            </div>
            <img src="${item?.image}" alt="" />
          </div>
          <div class="product_bottom_sec">
            <h4>${item?.title}</h4>
            <div class="bottom_last_sec">
              <img src="../assets/image/icons/current.svg" alt="" />
              <h5>${item?.deliveryTime}</h5>
              <h5>•</h5>
              <h5>${item?.distance}</h5>
            </div>
          </div>
        </div>`
})

  $("#prd1").html(getPrdHtml);
  
}
getProduct1();
function getProduct2() {
  let getPrdHtml="";

  const products = [
  {
    id: 1,
    discount: "FLAT ₹150 OFF",
    liked: true,
    image: "../assets/image/temp/homePrd1.svg",
    title: "Food Bazaar Bazaar Bazaar Bazaar Bazaar Rast...",
    deliveryTime: "36 mins",
    distance: "3 km",
  },
  {
    id: 2,
    discount: "FLAT ₹100 OFF",
    liked: false,
    image: "../assets/image/temp/homePrd2.svg",
    title: "Fresh Mart Grocery Store",
    deliveryTime: "25 mins",
    distance: "1.5 km",
  },
  {
    id: 3,
    discount: "UPTO 50% OFF",
    liked: true,
    image: "../assets/image/temp/homePrd3.svg",
    title: "Organic Veggie Hub",
    deliveryTime: "40 mins",
    distance: "4 km",
  },
  {
    id: 4,
    discount: "FREE DELIVERY",
    liked: false,
    image: "https://b.zmtcdn.com/data/pictures/5/22411715/8fc8b5070d266246de26f97a6f0e80e2_o2_featured_v2.jpg?output-format=webp",
    title: "Daily Needs Super Store",
    deliveryTime: "18 mins",
    distance: "900 m",
  },
  {
    id: 5,
    discount: "FLAT ₹200 OFF",
    liked: true,
    image: "https://b.zmtcdn.com/data/pictures/6/21466036/9b5ea50c0d48a881b2cd6f3070d7127f_o2_featured_v2.jpg",
    title: "Mega Food Plaza",
    deliveryTime: "30 mins",
    distance: "2.2 km",
  },
  {
    id: 6,
    discount: "FLAT ₹200 OFF",
    liked: true,
    image: "https://b.zmtcdn.com/data/pictures/chains/1/18625991/8fa1a185a369be06f27c0fc9b4adce08_featured_v2.jpg",
    title: "Mega Food Plaza",
    deliveryTime: "30 mins",
    distance: "2.2 km",
  },
   {
    id: 6,
    discount: "FLAT ₹200 OFF",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
    title: "Burger King Point",
    deliveryTime: "22 mins",
    distance: "1 km",
  },

  // 6 MORE ARRAY

  {
    id: 7,
    discount: "20% OFF",
    liked: true,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
    title: "Pizza Town",
    deliveryTime: "28 mins",
    distance: "2.8 km",
  },
  {
    id: 8,
    discount: "FREE DELIVERY",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
    title: "Spicy Chicken Hub",
    deliveryTime: "35 mins",
    distance: "3.5 km",
  },
  {
    id: 9,
    discount: "FLAT ₹80 OFF",
    liked: true,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
    title: "Healthy Salad Point",
    deliveryTime: "20 mins",
    distance: "1.2 km",
  },
  {
    id: 10,
    discount: "30% OFF",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500",
    title: "Coffee Cafe",
    deliveryTime: "15 mins",
    distance: "700 m",
  },
  {
    id: 11,
    discount: "BUY 1 GET 1",
    liked: true,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    title: "Italian Pizza House",
    deliveryTime: "32 mins",
    distance: "2 km",
  },
  

];

products?.forEach((item)=>{
   getPrdHtml+=`
    <div class="product_box">
          <div class="product_top_sec">
            <div class="disc_tag">
            ${item?.discount}
            </div>
            <div class="like">
              <i class="bi bi-heart-fill"></i>
            </div>
            <img src="${item?.image}" alt="" />
          </div>
          <div class="product_bottom_sec">
            <h4>${item?.title}</h4>
            <div class="bottom_last_sec">
              <img src="../assets/image/icons/current.svg" alt="" />
              <h5>${item?.deliveryTime}</h5>
              <h5>•</h5>
              <h5>${item?.distance}</h5>
            </div>
          </div>
        </div>`
})

  $("#prd2Last").html(getPrdHtml);
  
}
getProduct2();

function getCarousel1() {

const restaurants = [
  {
    id: 1,
    hotelName: "Second Wife Restaurant",
    category: "Biryani • North Indian • Mughlai",
    rating: 4.0,
    deliveryTime: "30-45 mins",
    distance: "3 km",

    products: [
      {
        name: "Chicken Dum Biryani",
        price: "₹199",
        image:
          "https://images.unsplash.com/photo-1563379091339-03246963d29c?w=500",
      },
      {
        name: "Mutton Biryani",
        price: "₹249",
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
      },
      {
        name: "Chicken Korma",
        price: "₹179",
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
      },
      {
        name: "Butter Naan Combo",
        price: "₹149",
        image:
          "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500",
      },
    ],
  },

  {
    id: 2,
    hotelName: "Burger Point",
    category: "Burger • Fast Food • Snacks",
    rating: 4.3,
    deliveryTime: "20-30 mins",
    distance: "2 km",

    products: [
      {
        name: "Cheese Burger",
        price: "₹129",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      },
      {
        name: "Double Patty Burger",
        price: "₹199",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
      },
      {
        name: "Chicken Burger",
        price: "₹159",
        image:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
      },
      {
        name: "French Fries Combo",
        price: "₹99",
        image:
          "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500",
      },
    ],
  },

  {
    id: 3,
    hotelName: "Pizza Hub",
    category: "Pizza • Italian • Cheese Burst",
    rating: 4.5,
    deliveryTime: "25-40 mins",
    distance: "4 km",

    products: [
      {
        name: "Cheese Pizza",
        price: "₹299",
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      },
      {
        name: "Farmhouse Pizza",
        price: "₹349",
        image:
          "https://images.unsplash.com/photo-1548365328-9f547fb0953b?w=500",
      },
      {
        name: "Pepperoni Pizza",
        price: "₹399",
        image:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500",
      },
      {
        name: "Veg Loaded Pizza",
        price: "₹279",
        image:
          "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500",
      },
    ],
  },
];
  let productContainer = '';

restaurants.forEach((item, index) => {
  productContainer += `
  
  <div class="product_card">

    <div class="owl-carousel owl-theme product_slider product_slider_${index}">
      
      ${item.products
        .map(
          (prd) => `
          <div class="item">
            <img src="${prd?.image}" alt="${prd?.name}">
             <div class="product_txt">${prd?.name} ${prd?.price}</div>
          </div>
         
        `
        )
        .join("")}

    </div>

    <div class="product_info">
     <div class="details">
      <img src="../assets/image/icons/current.svg" alt="" />
        <span>${item.deliveryTime}</span>
        <span>•</span>
        <span>${item.distance}</span>
      </div>
      <div class="product_head">
      <h3>${item.hotelName}</h3>
      <div class="product_rate"><i class="bi bi-star-fill"></i> ${item?.rating}</div>
      </div>

     

      <div class="offer_sec">
      <div>
         <div><img src="../assets/image/icons/crown.svg" alt="" /></div> <p>Extra 10% OFF</p>
         </div>
        <div class="line"></div>
        <div>
        <img src="../assets/image/icons/current.svg" alt="" /><p>   Flash Sale : FLAT 50% OFF</p>
        </div>
      </div>
    </div>

  </div>
  `;
});

$("#prd2").html(productContainer)
}
getCarousel1();


function getRestutantProduct() {
  let resturantPrdHtml="";

  const products = [
  {
    id: 1,
    discount: "FLAT ₹150 OFF",
    liked: true,
    image: "../assets/image/temp/homePrd1.svg",
    title: "Food Bazaar Bazaar Bazaar Bazaar Bazaar Rast...",
    deliveryTime: "36 mins",
    distance: "3 km",
  },
  {
    id: 2,
    discount: "FLAT ₹100 OFF",
    liked: false,
    image: "../assets/image/temp/homePrd2.svg",
    title: "Fresh Mart Grocery Store",
    deliveryTime: "25 mins",
    distance: "1.5 km",
  },
  {
    id: 3,
    discount: "UPTO 50% OFF",
    liked: true,
    image: "../assets/image/temp/homePrd3.svg",
    title: "Organic Veggie Hub",
    deliveryTime: "40 mins",
    distance: "4 km",
  },
  {
    id: 4,
    discount: "FREE DELIVERY",
    liked: false,
    image: "https://b.zmtcdn.com/data/pictures/5/22411715/8fc8b5070d266246de26f97a6f0e80e2_o2_featured_v2.jpg?output-format=webp",
    title: "Daily Needs Super Store",
    deliveryTime: "18 mins",
    distance: "900 m",
  },
  {
    id: 5,
    discount: "FLAT ₹200 OFF",
    liked: true,
    image: "https://b.zmtcdn.com/data/pictures/6/21466036/9b5ea50c0d48a881b2cd6f3070d7127f_o2_featured_v2.jpg",
    title: "Mega Food Plaza",
    deliveryTime: "30 mins",
    distance: "2.2 km",
  },
  {
    id: 6,
    discount: "FLAT ₹200 OFF",
    liked: true,
    image: "https://b.zmtcdn.com/data/pictures/chains/1/18625991/8fa1a185a369be06f27c0fc9b4adce08_featured_v2.jpg",
    title: "Mega Food Plaza",
    deliveryTime: "30 mins",
    distance: "2.2 km",
  },
   {
    id: 6,
    discount: "FLAT ₹200 OFF",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
    title: "Burger King Point",
    deliveryTime: "22 mins",
    distance: "1 km",
  },

  // 6 MORE ARRAY

  {
    id: 7,
    discount: "20% OFF",
    liked: true,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
    title: "Pizza Town",
    deliveryTime: "28 mins",
    distance: "2.8 km",
  },
  {
    id: 8,
    discount: "FREE DELIVERY",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
    title: "Spicy Chicken Hub",
    deliveryTime: "35 mins",
    distance: "3.5 km",
  },
  {
    id: 9,
    discount: "FLAT ₹80 OFF",
    liked: true,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
    title: "Healthy Salad Point",
    deliveryTime: "20 mins",
    distance: "1.2 km",
  },
  {
    id: 10,
    discount: "30% OFF",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500",
    title: "Coffee Cafe",
    deliveryTime: "15 mins",
    distance: "700 m",
  },
  {
    id: 11,
    discount: "BUY 1 GET 1",
    liked: true,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    title: "Italian Pizza House",
    deliveryTime: "32 mins",
    distance: "2 km",
  },
  

];

products?.forEach((item)=>{
  resturantPrdHtml+=`
       <a href="restaurantDetail.html" class="bottom_product_wrap">
                        <div class="bottom_product_img">
                            <img src="${item?.image}" alt="">
                        </div>
                        <div class="bottom_product_txt">
                            <h4>${item?.title}</h4>
                            <div class="product_star">
                                <div class="icon_star">
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>

                                </div>
                                <p>(20896)</p>
                            </div>
                            <div class="poduct_time">
                               <i class="bi bi-stopwatch-fill"></i>
                                <p>36-45 mins </p>
                            </div>
                            <p>North Indian, Kebabs, Biryani, Biryani North Indian, Kebabs, North Indian, Kebabs, North Indian, Kebabs</p>
                           <div class="product_address">
                            <p>Hinoo Chowk</p>
                            <p>•</p>
                            <p>3 km</p>
                           </div>
                        </div>
                    </a>
  `;
})

  $("#resturantProducts").html(resturantPrdHtml)
  
}
getRestutantProduct();