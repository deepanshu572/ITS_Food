console.log("done!");

function handleToggle(name, inpName) {
  console.log(name, inpName);
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

  if ($("#updatePassword").val() !== $("#reUpdatePassword").val()) {
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
      document.getElementById("offcanvasPassword"),
    );

    offcanvas.show();
    $("#btnReset").html("Verified");

    $("#btnReset").prop("disabled", false);
  }, 1500);
}

function getProduct1() {
  let getPrdHtml = "";

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
      image:
        "https://b.zmtcdn.com/data/pictures/5/22411715/8fc8b5070d266246de26f97a6f0e80e2_o2_featured_v2.jpg?output-format=webp",
      title: "Daily Needs Super Store",
      deliveryTime: "18 mins",
      distance: "900 m",
    },
    {
      id: 5,
      discount: "FLAT ₹200 OFF",
      liked: true,
      image:
        "https://b.zmtcdn.com/data/pictures/6/21466036/9b5ea50c0d48a881b2cd6f3070d7127f_o2_featured_v2.jpg",
      title: "Mega Food Plaza",
      deliveryTime: "30 mins",
      distance: "2.2 km",
    },
    {
      id: 6,
      discount: "FLAT ₹200 OFF",
      liked: true,
      image:
        "https://b.zmtcdn.com/data/pictures/chains/1/18625991/8fa1a185a369be06f27c0fc9b4adce08_featured_v2.jpg",
      title: "Mega Food Plaza",
      deliveryTime: "30 mins",
      distance: "2.2 km",
    },
    {
      id: 6,
      discount: "FLAT ₹200 OFF",
      liked: false,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
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
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
      title: "Spicy Chicken Hub",
      deliveryTime: "35 mins",
      distance: "3.5 km",
    },
    {
      id: 9,
      discount: "FLAT ₹80 OFF",
      liked: true,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
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

  products?.forEach((item) => {
    getPrdHtml += `
    <a href="restaurants.html" class="product_box">
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
        </a>`;
  });

  $("#prd1").html(getPrdHtml);
}
getProduct1();
function getProduct2() {
  let getPrdHtml = "";

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
      image:
        "https://b.zmtcdn.com/data/pictures/5/22411715/8fc8b5070d266246de26f97a6f0e80e2_o2_featured_v2.jpg?output-format=webp",
      title: "Daily Needs Super Store",
      deliveryTime: "18 mins",
      distance: "900 m",
    },
    {
      id: 5,
      discount: "FLAT ₹200 OFF",
      liked: true,
      image:
        "https://b.zmtcdn.com/data/pictures/6/21466036/9b5ea50c0d48a881b2cd6f3070d7127f_o2_featured_v2.jpg",
      title: "Mega Food Plaza",
      deliveryTime: "30 mins",
      distance: "2.2 km",
    },
    {
      id: 6,
      discount: "FLAT ₹200 OFF",
      liked: true,
      image:
        "https://b.zmtcdn.com/data/pictures/chains/1/18625991/8fa1a185a369be06f27c0fc9b4adce08_featured_v2.jpg",
      title: "Mega Food Plaza",
      deliveryTime: "30 mins",
      distance: "2.2 km",
    },
    {
      id: 6,
      discount: "FLAT ₹200 OFF",
      liked: false,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
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
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
      title: "Spicy Chicken Hub",
      deliveryTime: "35 mins",
      distance: "3.5 km",
    },
    {
      id: 9,
      discount: "FLAT ₹80 OFF",
      liked: true,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
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

  products?.forEach((item) => {
    getPrdHtml += `
    <a href="restaurants.html" class="product_box">
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
        </a>`;
  });

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
  let productContainer = "";

  restaurants.forEach((item, index) => {
    productContainer += `
  
  <a href="restaurants.html" class="product_card">

    <div class="owl-carousel owl-theme product_slider product_slider_${index}">
      
      ${item.products
        .map(
          (prd) => `
          <div class="item">
            <img src="${prd?.image}" alt="${prd?.name}">
             <div class="product_txt">${prd?.name} ${prd?.price}</div>
          </div>
         
        `,
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

  </a>
  `;
  });

  $("#prd2").html(productContainer);
}
getCarousel1();

function getRestutantShop() {
  let resturantPrdHtml = "";

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
      image:
        "https://b.zmtcdn.com/data/pictures/5/22411715/8fc8b5070d266246de26f97a6f0e80e2_o2_featured_v2.jpg?output-format=webp",
      title: "Daily Needs Super Store",
      deliveryTime: "18 mins",
      distance: "900 m",
    },
    {
      id: 5,
      discount: "FLAT ₹200 OFF",
      liked: true,
      image:
        "https://b.zmtcdn.com/data/pictures/6/21466036/9b5ea50c0d48a881b2cd6f3070d7127f_o2_featured_v2.jpg",
      title: "Mega Food Plaza",
      deliveryTime: "30 mins",
      distance: "2.2 km",
    },
    {
      id: 6,
      discount: "FLAT ₹200 OFF",
      liked: true,
      image:
        "https://b.zmtcdn.com/data/pictures/chains/1/18625991/8fa1a185a369be06f27c0fc9b4adce08_featured_v2.jpg",
      title: "Mega Food Plaza",
      deliveryTime: "30 mins",
      distance: "2.2 km",
    },
    {
      id: 6,
      discount: "FLAT ₹200 OFF",
      liked: false,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
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
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
      title: "Spicy Chicken Hub",
      deliveryTime: "35 mins",
      distance: "3.5 km",
    },
    {
      id: 9,
      discount: "FLAT ₹80 OFF",
      liked: true,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
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

  products?.forEach((item) => {
    resturantPrdHtml += `
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
  });

  $("#resturantShopProducts").html(resturantPrdHtml);
}
getRestutantShop();

function getCarousel2Resturant() {
  const restaurantBanner = [
    {
      id: 1,
      name: "Food Offer Banner",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400",
    },
    {
      id: 2,
      name: "Restaurant Promo Banner",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400",
    },
    {
      id: 3,
      name: "Pizza Special Banner",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400",
    },
    {
      id: 4,
      name: "Burger Combo Banner",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400",
    },
    {
      id: 5,
      name: "Healthy Food Banner",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1400",
    },
  ];
  let bannerContainer = `
  <div class="owl-carousel owl-theme product_slider">
`;

  restaurantBanner?.forEach((item) => {
    bannerContainer += `
    <div class="item">
      <img src="${item?.image}" alt="banner-image">
    </div>
  `;
  });

  bannerContainer += `</div>`;
  $("#shopDetailCrousel").html(bannerContainer);
}
getCarousel2Resturant();

function getRestutantProduct() {
  let resturantPrdHtml = "";
  let similarPrdHtml = "";

  const products = [
    {
      id: 1,
      name: "Veg Biryani",
      price: "135",
      rating: 3.5,
      reviews: 25,
      liked: true,
      varient: false,
      image: "../assets/image/temp/homePrd1.svg",
      description:
        "A flavorful and aromatic rice dish infused with rich spices and fresh vegetables.",
    },
    {
      id: 2,
      name: "Chicken Burger",
      price: "189",
      rating: 4.2,
      reviews: 48,
      liked: false,
      varient: false,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
      description:
        "Juicy chicken burger loaded with cheese, lettuce, and signature sauces.",
    },
    {
      id: 3,
      name: "Cheese Pizza",
      price: "299",
      rating: 4.5,
      reviews: 70,
      liked: true,
      varient: true,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      description:
        "Loaded with mozzarella cheese and baked to perfection with fresh toppings.",
    },
    {
      id: 4,
      name: "Healthy Salad",
      price: "120",
      rating: 4.0,
      reviews: 18,
      liked: false,
      varient: true,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      description:
        "Fresh and healthy salad made with organic vegetables and special dressing.",
    },
  ];

  products?.forEach((item) => {
    resturantPrdHtml += `
    
    <div class="resturant_products" >
    
      <div class="resturant_prd_left">
      
        <img  src="../assets/image/icons/success.svg" alt="" />
        
        <h4>${item?.name}</h4>
        
        <p>₹${item?.price}</p>

        <div class="prd_star">
          <i class="bi bi-star-fill"></i>
          <p>${item?.rating}</p>
          <p>(${item?.reviews})</p>
        </div>

        <div class="save_btn ${item?.liked ? "fill-select" : ""}">
          <i class="bi ${item?.liked ? "bi-bookmark-fill" : "bi-bookmark"}"></i>
          <p>${item?.liked ? "Saved" : "Save to Eatlist"}</p>
        </div>

        <div class="desc_prd">
          <p>
            ${item?.description}
            <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasProductBox" aria-controls="offcanvasProductBox">more</button>
          </p>
        </div>

      </div>

      <div class="resturant_prd_right">
      
        <img onclick='handleModalData(${JSON.stringify(item)})' data-bs-toggle="offcanvas" data-bs-target="#offcanvasProductBox" aria-controls="offcanvasProductBox" src="${item?.image}" alt="${item?.name}">

             ${
               item?.varient
                 ? `<div
                   class="btn_add_data"
                   onclick='handleModalCartData(${JSON.stringify(item)})'
                   type="button"
                   data-bs-toggle="offcanvas"
                   data-bs-target="#offcanvasProductModal"
                   aria-controls="offcanvasProductModal"
                 >
                   Add
                 </div>`
                 : ` <div
                     class="btn_add_data AddBtn"
                     id="AddBtn"
                      onclick="handleToggle(this)"
                     type="button"
                   >
                     Add
                   </div>
                   <div class="btn_add_data button_data " style="display : none;">
                     <button class="plus">-</button>
                     <input type="number" value="1" />
                     <button>+</button>
                   </div>`
             }
       

      </div>

    </div>

  `;
    similarPrdHtml += ` <div class="similar_product_box">
              <div class="similar_prd_img">
                <img src="${item?.image}" alt="">
                <button>+</button>
              </div>
              <div class="similar_prd_txt">
                <h5>${item?.name}</h5>
                 <span>
                <del>₹500</del>
              <p>₹${item?.price}</p>
              </span>
              </div>
            </div>`;
  });

  $("#resturantProduct").html(resturantPrdHtml);
  $("#recomendationPrd").html(similarPrdHtml);
}
getRestutantProduct();

function handleModalData(data) {
  console.log(data);
  let productDataHtml = "";
  productDataHtml += `  <img
          src="${data?.image}"
          alt=""
        />
        <div class="product_wrapper">
          <div class="flex_wrapper">
            <div class="resturant_prd_left">
              <img src="../assets/image/icons/success.svg" alt="" />

              <h4>${data?.name}</h4>

              <p>₹${data?.price}</p>

              <div class="prd_star">
                <i class="bi bi-star-fill"></i>
                <p>${data?.rating}</p>
                <p>(${data?.reviews})</p>
              </div>
            </div>
            <button>Add</button>
          </div>
          <p>
               ${data?.description}
          </p>
        </div>`;

  $("#ProductData").html(productDataHtml);
}

function handleModalCartData(data) {
  $("#prdName").text(data?.name);
  $("#PrdImage").attr("src", data?.image);
}

function handleToggle(el) {
  let parent = el.closest(".resturant_prd_right");

  parent.querySelector(".AddBtn").style.display = "none";
  parent.querySelector(".button_data").style.display = "flex";
}

function getOrders() {
  const orders = [
    {
      id: 1,
      restaurantName: "Food Bazaar Rajdhani",
      location: "Ratu Road, Ranchi",
      orderDate: "09 Jul 2025",
      orderTime: "2:26PM",
      totalBill: "148.16",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      items: [
        {
          name: "Chicken Biryani",
          status: "failed",
          icon: "../assets/image/icons/failed.svg",
        },
        {
          name: "Veg Biryani",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 2,
      restaurantName: "Burger Point",
      location: "Main Road, Ranchi",
      orderDate: "10 Jul 2025",
      orderTime: "1:10PM",
      totalBill: "299.00",
      status: "Pending",
      restaurantImage:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
      items: [
        {
          name: "Chicken Burger",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 3,
      restaurantName: "Pizza Hub",
      location: "Lalpur, Ranchi",
      orderDate: "11 Jul 2025",
      orderTime: "7:45PM",
      totalBill: "420.50",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1548365328-9f547fb0953b?w=500",
      items: [
        {
          name: "Cheese Pizza",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
        {
          name: "Cold Drink",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 4,
      restaurantName: "Healthy Bowl",
      location: "Kanke Road, Ranchi",
      orderDate: "12 Jul 2025",
      orderTime: "3:20PM",
      totalBill: "180.00",
      status: "Cancelled",
      restaurantImage:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      items: [
        {
          name: "Healthy Salad",
          status: "failed",
          icon: "../assets/image/icons/failed.svg",
        },
      ],
    },

    {
      id: 5,
      restaurantName: "Tandoori Nights",
      location: "Doranda, Ranchi",
      orderDate: "13 Jul 2025",
      orderTime: "9:00PM",
      totalBill: "560.99",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
      items: [
        {
          name: "Paneer Tikka",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
        {
          name: "Butter Naan",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 6,
      restaurantName: "Momo Express",
      location: "Harmu, Ranchi",
      orderDate: "14 Jul 2025",
      orderTime: "5:30PM",
      totalBill: "220.40",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500",
      items: [
        {
          name: "Chicken Momos",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 7,
      restaurantName: "Sweet Cravings",
      location: "Upper Bazar, Ranchi",
      orderDate: "15 Jul 2025",
      orderTime: "8:15PM",
      totalBill: "310.25",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
      items: [
        {
          name: "Chocolate Cake",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
        {
          name: "Ice Cream",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 8,
      restaurantName: "South Spice",
      location: "Circular Road, Ranchi",
      orderDate: "16 Jul 2025",
      orderTime: "11:50AM",
      totalBill: "275.00",
      status: "Pending",
      restaurantImage:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
      items: [
        {
          name: "Masala Dosa",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 9,
      restaurantName: "Roll Factory",
      location: "Booty More, Ranchi",
      orderDate: "17 Jul 2025",
      orderTime: "6:40PM",
      totalBill: "199.90",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
      items: [
        {
          name: "Egg Roll",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
        {
          name: "Chicken Roll",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 10,
      restaurantName: "Coffee Cafe",
      location: "Morabadi, Ranchi",
      orderDate: "18 Jul 2025",
      orderTime: "4:05PM",
      totalBill: "145.00",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
      items: [
        {
          name: "Cold Coffee",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
        {
          name: "Sandwich",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },
  ];
  let ordersHtml = "";

  orders.forEach((order) => {
    let itemsHtml = "";

    order.items.forEach((item) => {
      itemsHtml += `
      <div class="order_middle_box">
        <img src="${item.icon}" alt="">
        <p>${item.name}</p>
      </div>
    `;
    });

    ordersHtml += `
    <div onclick="location.href='orderDetails.html?id=${order?.id}'" class="order_data_item">
      
      <div class="order_top_wrap">
        <div class="order_item_img">
          <img src="${order.restaurantImage}" alt="">
        </div>

        <div class="order_item_txt">
          <h4>${order.restaurantName}</h4>
          <p>${order.location}</p>
        </div>
      </div>

      <div class="order_middle_wrap">
        ${itemsHtml}
      </div>

      <div class="order_bottom_wrap">
        <div class="order_bottom_top">
          <h5>
            Order placed on 
            <b>${order.orderDate},</b> ${order.orderTime}
          </h5>

          <p>Total Bill <b>₹${order.totalBill}</b></p>
        </div>

        <div class="order_bottom_bottom status">
          <h5>${order.status}</h5>
          <a href="">View Detail</a>
        </div>
      </div>

    </div>
  `;
  });

  $("#ordersData").html(ordersHtml);
}
getOrders();

function getOrderDetail() {
  const orders = [
    {
      id: 1,
      restaurantName: "Food Bazaar Rajdhani",
      location: "Ratu Road, Ranchi",
      orderDate: "09 Jul 2025",
      orderTime: "2:26PM",
      totalBill: "148.16",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      items: [
        {
          name: "Chicken Biryani",
          status: "failed",
          icon: "../assets/image/icons/failed.svg",
        },
        {
          name: "Veg Biryani",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 2,
      restaurantName: "Burger Point",
      location: "Main Road, Ranchi",
      orderDate: "10 Jul 2025",
      orderTime: "1:10PM",
      totalBill: "299.00",
      status: "Pending",
      restaurantImage:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
      items: [
        {
          name: "Chicken Burger",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 3,
      restaurantName: "Pizza Hub",
      location: "Lalpur, Ranchi",
      orderDate: "11 Jul 2025",
      orderTime: "7:45PM",
      totalBill: "420.50",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1548365328-9f547fb0953b?w=500",
      items: [
        {
          name: "Cheese Pizza",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
        {
          name: "Cold Drink",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 4,
      restaurantName: "Healthy Bowl",
      location: "Kanke Road, Ranchi",
      orderDate: "12 Jul 2025",
      orderTime: "3:20PM",
      totalBill: "180.00",
      status: "Cancelled",
      restaurantImage:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      items: [
        {
          name: "Healthy Salad",
          status: "failed",
          icon: "../assets/image/icons/failed.svg",
        },
      ],
    },

    {
      id: 5,
      restaurantName: "Tandoori Nights",
      location: "Doranda, Ranchi",
      orderDate: "13 Jul 2025",
      orderTime: "9:00PM",
      totalBill: "560.99",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
      items: [
        {
          name: "Paneer Tikka",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
        {
          name: "Butter Naan",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 6,
      restaurantName: "Momo Express",
      location: "Harmu, Ranchi",
      orderDate: "14 Jul 2025",
      orderTime: "5:30PM",
      totalBill: "220.40",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500",
      items: [
        {
          name: "Chicken Momos",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 7,
      restaurantName: "Sweet Cravings",
      location: "Upper Bazar, Ranchi",
      orderDate: "15 Jul 2025",
      orderTime: "8:15PM",
      totalBill: "310.25",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
      items: [
        {
          name: "Chocolate Cake",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
        {
          name: "Ice Cream",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 8,
      restaurantName: "South Spice",
      location: "Circular Road, Ranchi",
      orderDate: "16 Jul 2025",
      orderTime: "11:50AM",
      totalBill: "275.00",
      status: "Pending",
      restaurantImage:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
      items: [
        {
          name: "Masala Dosa",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 9,
      restaurantName: "Roll Factory",
      location: "Booty More, Ranchi",
      orderDate: "17 Jul 2025",
      orderTime: "6:40PM",
      totalBill: "199.90",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
      items: [
        {
          name: "Egg Roll",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
        {
          name: "Chicken Roll",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },

    {
      id: 10,
      restaurantName: "Coffee Cafe",
      location: "Morabadi, Ranchi",
      orderDate: "18 Jul 2025",
      orderTime: "4:05PM",
      totalBill: "145.00",
      status: "Delivered",
      restaurantImage:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
      items: [
        {
          name: "Cold Coffee",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
        {
          name: "Sandwich",
          status: "success",
          icon: "../assets/image/icons/success.svg",
        },
      ],
    },
  ];
  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");
  console.log(id)
  let prdDataHtml="";

  let filteredData = orders.find(
  (item) => item.id === Number(id)
);
console.log(filteredData)

$("#shopImg").attr("src", filteredData?.restaurantImage);
$("#shopName").html(filteredData?.restaurantName);
$("#shopAddress").html(filteredData?.location);

    filteredData?.items?.forEach((prd)=>{
        prdDataHtml+=` <div class="order_middle_box">
                <img src="${prd?.icon}" alt="">
                <p>${prd?.name}</p>
            </div>`
    });
  
  $("#prdData").html(prdDataHtml)

  // alert(id);

  // alert();
}
