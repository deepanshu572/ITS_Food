const apiUrl = "http://localhost/ITS_Food_Backend/app/api/";
const imageUrl = "http://localhost/ITS_Food_Backend/admin/";
const userId = localStorage.getItem("userId");
console.log("done!");
// $(document).ready(function () {
//   $(".product_slider").owlCarousel({
//     loop: true,
//     margin: 10,
//     nav: false,
//     dots: true,
//     autoplay: true,
//     // autoplayTimeout: 5500,

//     responsive: {
//       0: {
//         items: 1,
//       },
//       768: {
//         items: 1,
//       },
//       1024: {
//         items: 1,
//       },
//     },
//   });
// });

$(document).ready(function () {
  // check owl exists
  if ($.fn.owlCarousel) {
    $(".product_slider").each(function () {
      // destroy if already initialized
      if ($(this).hasClass("owl-loaded")) {
        $(this).trigger("destroy.owl.carousel");
        $(this).removeClass("owl-loaded");
        $(this).find(".owl-stage-outer").children().unwrap();
      }

      // init carousel
      $(this).owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5500,
        autoplayHoverPause: true,
        smartSpeed: 600,

        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 1,
          },
          1024: {
            items: 1,
          },
        },
      });
    });
  } else {
    console.log("Owl Carousel file not loaded");
  }
});

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

  let phone = $("#mob").val();
  let password = $("#password").val();

  if (!phone || !password) {
    alert("Please fill all fields");
    return;
  }
  let load = true;

  if (load) {
    $("#btnLogin").html("<span class='loader'></span> submitting...");
    $("#btnLogin").prop("disabled", true);
  }

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "json",
    data: {
      type: "handleLogin",
      phone,
      password,
    },

    success: function (response) {
      if (response.status === "success") {
        console.log("Login successfully!");
        load = false;

        localStorage.setItem("userId", response?.data?.id);

        location.href = "welcome.html";
        $("#btnLogin").prop("disabled", false);
      } else {
        alert(response.message || "Something went wrong");
        $("#btnLogin").prop("disabled", false);
        $("#btnLogin").html("Login");
      }
    },

    error: function (xhr, status, error) {
      console.log("AJAX Error:", error);
      $("#btnLogin").prop("disabled", false);
      $("#btnLogin").html("Login");
    },
  });
}
function handleRegister(e) {
  e.preventDefault();

  let name = $("#name").val().trim();
  let email = $("#email").val().trim();
  let password = $("#password").val().trim();
  let phone = $("#mob").val().trim();

  if (!name || !password) {
    alert("Please fill all fields");
    return;
  }
  let load = true;

  if (load) {
    $("#btnRegister").html("<span class='loader'></span> Submitting...");
    $("#btnRegister").prop("disabled", true);
  }

  $.ajax({
    url: "http://localhost/ITS_Food_Backend/app/api/",
    method: "POST",
    dataType: "json",

    data: {
      type: "handleRegister",
      name,
      phone,
      email: email || "",
      password,
    },

    success: function (response) {
      if (response.status === "success") {
        load = false;

        $("#btnRegister").prop("disabled", false);

        location.href = "otp.html";
        localStorage.setItem("name", name);
        localStorage.setItem("phone", phone);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        console.log(response.message || "Something went wrong");
        alert(response.message);
      }
    },

    error: function (xhr, status, error) {
      console.log("AJAX Error:", error);
    },
  });
}

function generateOTP(num) {
  let digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < num; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function sendOtpRegister() {
  let number = localStorage.getItem("phone");
  $("#num").html(number);
  let otp = generateOTP(6);
  localStorage.setItem("otp", otp);
}

function handleOtpRegister(e) {
  e.preventDefault();
  let enteredOtp = "";
  let Otp = localStorage.getItem("otp");

  let load = true;

  if (load) {
    $("#otpBtn").html("<span class='loader'></span> verifying...");
    $("#otpBtn").prop("disabled", true);
  }

  $(".otp_input").each(function () {
    enteredOtp += $(this).val();
  });

  if (enteredOtp.includes(Otp)) {
    let name = localStorage.getItem("name");
    let phone = localStorage.getItem("phone");
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");

    $.ajax({
      url: "http://localhost/ITS_Food_Backend/app/api/",
      method: "POST",
      dataType: "json",

      data: {
        type: "handleOtpRegister",
        name,
        phone,
        email,
        password,
      },

      success: function (response) {
        if (response.status === "success") {
          console.log("register successfully!");
          localStorage.clear();
          localStorage.setItem("userId", response?.userId);
        } else {
          console.log(response.message || "Something went wrong");
        }
      },

      error: function (xhr, status, error) {
        console.log("AJAX Error:", error);
      },
    });
    load = false;

    location.href = "welcome.html";
    $("#otpBtn").prop("disabled", false);
  } else {
    load = false;
    $("#otpBtn").html("Verify Otp");
    $("#otpBtn").prop("disabled", false);
    alert("not matched your otp : " + Otp);
  }
}

let forgotBtn = document.querySelectorAll(".forgot_btn");
forgotBtn.forEach((item) => {
  item.addEventListener("click", () => {
    let data = item.querySelector(".forgot_left_txt p").innerText;

    forgotBtn?.forEach((el) => el.classList.remove("active_forgot"));
    item?.classList.add("active_forgot");
    localStorage.setItem("selectedService", data);

    // console.log(item);
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

function getVerificationData() {
  let requiredHtml = "";

  let selectedService = localStorage.getItem("selectedService");
  // if(selectedService)

  if (selectedService == "email") {
    requiredHtml += `  <div class="form_inp">
              <label for="email">Email Address</label>
              <div class="inp">
              <input type="text" id="email" placeholder="Enter email">
              </div>
            </div>`;
    $("#service").text("email");
  } else if (selectedService == "number") {
    requiredHtml += `    <div class="form_inp">
              <label for="mobLogin">Mobile no</label>
              <div class="inp">
              <input type="tel" id="mob" maxlength="10" placeholder="Enter number">
              </div>
            </div>`;
    $("#service").text("number");
  } else {
    console.log("something wents wrong ! on localstorage  ");
  }

  $("#requiredInp").html(requiredHtml);
}
function handleVerification() {
  let selectedService = localStorage.getItem("selectedService");

  if (selectedService == "email") {
    let email = $("#email").val();
    $("#btnVerify").html("<span class='loader'></span> submitting...");
    $("#btnVerify").prop("disabled", true);
    $.ajax({
      url: apiUrl,
      method: "POST",
      dataType: "JSON",
      data: {
        type: "verifyEmail",
        email,
      },
      success: function (response) {
        if (response.status == "success") {
          console.log(response);
          // alert(response.message);
          localStorage.setItem("data", response.email);
          location.href = "resetPassword.html";
        } else {
          alert(response.message);
          $("#btnVerify").prop("disabled", false);
          $("#btnVerify").html("Continue");
        }
      },
      error: function (xhr, status, error) {
        console.log("AJAX Error:", error);
        $("#btnVerify").prop("disabled", false);
        $("#btnVerify").html("Login");
      },
    });
  } else if (selectedService == "number") {
    let number = $("#mob").val();
    $("#btnVerify").html("<span class='loader'></span> submitting...");
    $("#btnVerify").prop("disabled", true);
    $.ajax({
      url: apiUrl,
      method: "POST",
      dataType: "JSON",
      data: {
        type: "verifyNumber",
        number,
      },
      success: function (response) {
        if (response.status == "success") {
          console.log(response);
          localStorage.setItem("data", response.phone);
          location.href = "resetPassword.html";
        } else {
          alert(response.message);
          $("#btnVerify").prop("disabled", false);
          $("#btnVerify").html("Continue");
        }
      },
      error: function (xhr, status, error) {
        console.log("AJAX Error:", error);
        $("#btnVerify").prop("disabled", false);
        $("#btnVerify").html("Continue");
      },
    });
  } else {
    console.log("something wents wrong !");
  }
}

function handleUpdatePassword(e) {
  e.preventDefault();

  if ($("#updatePassword").val() !== $("#reUpdatePassword").val()) {
    alert("password not matched !");
    return;
  }
  let password = $("#updatePassword").val();

  $("#btnReset").html("<span class='loader'></span> Updating...");
  $("#btnReset").prop("disabled", true);
  let selectedData = localStorage.getItem("data");
  let selectedService = localStorage.getItem("selectedService");

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "json",
    data: {
      type: "updatePassword",
      password,
      selectedData,
      selectedService,
    },
    success: function (response) {
      if (response == "success") {
        console.log(response.message);
        const offcanvas = new bootstrap.Offcanvas(
          document.getElementById("offcanvasPassword"),
        );

        offcanvas.show();
        $("#btnReset").html("Verified");
        $("#btnReset").prop("disabled", false);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Error:", error);
      $("#btnReset").prop("disabled", false);
      $("#btnReset").html("Verify Account");
    },
  });

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

function fetchBanner(type) {
  return $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "json",
    data: {
      type,
    },
  });
}
async function getBanners() {
  let heroData = await fetchBanner("handleHeroBanner");
  $("#heroBanner").attr("src", imageUrl + heroData.data.image);

  let topData = await fetchBanner("handleTopBanner");

  let topBannerHtml = "";
  topData?.data?.forEach((item) => {
    topBannerHtml += ` <div class="banner_sec_home1">
          <img src="${imageUrl + item?.image}" alt="" />
        </div>
     `;
  });

  $("#topBanner").html(topBannerHtml);

  let bottomData = await fetchBanner("handleBottomBanner");
  $("#bottomBanner").attr("src", imageUrl + bottomData.data.image);

  console.log(heroData, topData, bottomData);
}

function getCategory() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "json",
    data: {
      type: "handleCateory",
    },
    success: function (response) {
      if (response.status == "success") {
        console.log(response?.data);
        let categoryPrd = "";

        response?.data?.forEach((item) => {
          categoryPrd += `
       <div onclick="handleRenderResturant('${item.id}','${item.name}')" class="body_box">
       <div class="body_img_box">
            <img src="${imageUrl + item?.image}" alt="" />
            </div>
            <p>${item?.name}</p>
          </div>
      `;
        });
        $("#categoryShowcase1").html(categoryPrd);
        $("#categoryPrd").html(categoryPrd);
        $("#sugestCategoryData").html(categoryPrd);
      } else {
        console.log(response?.message);
      }
    },
  });
}

function handleRenderResturant(id, name) {
  localStorage.setItem("selectedCategory", name);
  location.href = `restaurants.html?cid=${id}`;
}

async function handleInput(e) {
  const value = e.target.value;
  console.log(value?.length);

  if (value?.length == 0) {
    return $("#searchData").html("");
  }

  let load = true;

  if (load) {
    $("#load").html("<span class='loader'></span>");
  }

  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );

  let data = await response.json();

  if (data) {
    load = false;
    $("#load").html("<i class='bi bi-mic'></i>");
  }

  console.log(data?.categories);

  let AllData = data?.categories?.filter((item) => {
    return item?.strCategory?.includes(value);
  });
  let searchHtml = "";
  console.log(AllData);

  if (AllData.length > 0) {
    AllData?.forEach((item) => {
      searchHtml += `<a href="searchDetail.html?query=${item.strCategory}" class="search_txt">
          <div class="search_txt_img_desc">
            <img src="${item.strCategoryThumb}" alt="" />
            <h4>${item?.strCategory}</h4>
          </div>
        <i class="bi bi-chevron-right"></i>
        </a>
      `;
    });
  } else {
    searchHtml += `<div class="not_found"><img src="../assets/image/icons/notFound.gif" alt=""/>No Meal Found !</div>`;
  }
  $("#searchData").html(searchHtml);
}

function getInputValue() {
  const params = new URLSearchParams(window.location.search);

  const query = params.get("query");
  $("#searchQuery").html(query);

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
    <div class="product_box">
          <div class="product_top_sec">
            <div class="disc_tag">
            ${item?.discount}
            </div>
            <div class="like">
             <i class="bi bi-bookmark"></i>
            </div>
           <a href="restaurants.html"> <img  src="${item?.image}" alt="" /></a>
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
        </div>`;
  });

  $("#prdSearch").html(getPrdHtml);
}

function getTopResturant() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "json",
    data: {
      type: "getTopResturant",
    },
    success: function (response) {
      if (response.status == "success") {
        console.log(response.data);
        let getPrdHtml = "";

        response.data?.forEach((item) => {
          getPrdHtml += `
    <div class="product_box">
          <div class="product_top_sec">
            <div class="disc_tag">
            flat 30% OFF
            </div>
            <div onclick="handleSaveData(${item.id},'restaurant')" class="like" id="shop${item.id}">
             <i class="bi bi-bookmark"></i>
            </div>
           <a href="restaurantDetail.html?rid=${item.id}"> <img  src="${imageUrl + item.cover_image}" alt="" /></a>
          </div>
          <div class="product_bottom_sec">
            <h4>${item?.name}</h4>
            <div class="bottom_last_sec">
              <img src="../assets/image/icons/current.svg" alt="" />
              <h5>${item?.address}</h5>
              <h5>•</h5>
              <h5></h5>
            </div>
          </div>
        </div>`;
        });
        $("#prd1").html(getPrdHtml);
        getSavedProduct("restaurant");
      } else {
        alert(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Error:", error);
    },
  });
}

function getBottomResturant() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "json",
    data: {
      type: "getBottomResturant",
    },
    success: function (response) {
      if (response.status == "success") {
        console.log(response);
        let restaurants = response?.data;
        let productContainer = "";

        restaurants.forEach((item, index) => {
          productContainer += `
  
  <div class="product_card">
      

    <div class="owl-carousel owl-theme product_slider product_slider_${index}">

      
      ${item.food_images
        ?.split(",")
        .map((prd, index) => {
          let prdId = item.food_id?.split(",");
          let names = item.food_name?.split(",");
          let prices = item.food_price?.split(",");

          return `
          
      <div class="item">
        <img  onclick="location.href='restaurantDetail.html?rid=${item?.id}&pid=${prdId[index]}'" src="${imageUrl + prd}" alt="${names[index]}">

        <div class="product_txt">
          ${names[index]} ₹${prices[index]}
        </div>
        
      </div>
    `;
        })
        .join("")}

    </div>

    <div class="product_info">
     <div class="details">
      <img src="../assets/image/icons/current.svg" alt="" />
        <span>item.deliveryTime</span>
        <span>•</span>
        <span>item.distance</span>
      </div>
      <div class="product_head">
      <h3>${item?.name}</h3>
      <div class="product_rate"><i class="bi bi-star-fill"></i> ${item?.avg_rating}</div>
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
        $("#prd2").html(productContainer);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Error:", error);
    },
  });
}

function getCategoryParam() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("cid");
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getCategoryParam",
      id,
    },
    success: function (response) {
      if (response.status == "success") {
        console.log(response);
        let data = response?.data?.[0];

        if (data) {
          let image = imageUrl + data.cover_image;
          console.log(image);

          $("#categoryName").html(data.name);
          $("#bannerImage").attr("src", image);
        }
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Err: " + error);
    },
  });
}
function getCategoryResturant() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("cid");
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getCategoryResturant",
      id,
    },
    success: function (response) {
      if (response.status == "success") {
        let resturantPrdHtml = "";
        console.log(response);
        let resturant = response.data;

        resturant?.forEach((item) => {
          resturantPrdHtml += `
       <a href="restaurantDetail.html?rid=${item.id}" class="bottom_product_wrap">
                        <div class="bottom_product_img">
                            <img src="${imageUrl + item?.logo}" alt="">
                        </div>
                        <div class="bottom_product_txt">
                            <h4>${item?.name}</h4>
                            <div class="product_star">
                                <div class="icon_star">
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>

                                </div>
                                <p>(${item.total_reviews})</p>
                            </div>
                            <div class="poduct_time">
                               <i class="bi bi-stopwatch-fill"></i>
                                <p>36-45 mins </p>
                            </div>
                            <p>${item.address}</p>
                           <div class="product_address">
                            <p>${item.city}</p>
                            <p>•</p>
                            <p>${item.pincode}</p>
                           </div>
                        </div>
                    </a>
  `;
        });

        $("#categoryResturants").html(resturantPrdHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("Ajax err: " + error);
    },
  });
}

function getResturantData() {
  const params = new URLSearchParams(window.location.search);

  const rid = params.get("rid");

  $.ajax({
    url: apiUrl,
    type: "POST",
    dataType: "JSON",
    data: {
      type: "getResturantData",
      id: rid,
    },
    success: function (response) {
      if (response.status == "success") {
        console.log(response);
        let resturant = response.data[0];
        let resturantHtml = "";

        resturantHtml += `<h4><i class="bi bi-shop"></i> ${resturant.name}</h4>
          <p>
            <i class="bi bi-geo-alt-fill"></i> ${resturant.address},
          </p>
          <div class="poduct_time">
            <i class="bi bi-stopwatch-fill"></i>
            <p>36-45 mins</p>
          </div>
          <div class="product_shop_flex">
            <div class="product_address">
              <p><i class="bi bi-geo-fill"></i></p>
              <p>${resturant.city} ${resturant.state}</p>
              
            </div>
            <div class="product_star">
              <div class="icon_star">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <p>(${resturant.total_reviews})</p>
            </div>
          </div>`;

        $("#shopDetail").html(resturantHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX errr: " + error);
    },
  });
}
function getSavedProduct(itemtype) {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getSavedProduct",
      id: userId,
      itemType: itemtype,
    },
    success: function (response) {
      if (response.status == "success") {
        let savedData = response.data;
        savedData?.forEach((item) => {
          if (itemtype == "food") {
            $(`#btn${item.item_id}`).addClass("fill-select");

            $(`#btn${item.item_id} i`)
              .addClass("bi-bookmark-fill")
              .removeClass("bi-bookmark");

            $(`#btn${item.item_id} p`).html("Saved");
          } else {
            $(`#shop${item.item_id}`).addClass("fill-select");
            $(`#shop${item.item_id} i`)
              .addClass("bi-bookmark-fill")
              .removeClass("bi-bookmark");
          }
        });
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJX err :" + error);
    },
  });
}
function getProduct() {
  const params = new URLSearchParams(window.location.search);

  const rid = params.get("rid");
  const pid = params.get("pid");
  if (rid) {
    $.ajax({
      url: apiUrl,
      method: "POST",
      dataType: "JSON",
      data: {
        type: "selectedResturants",
        id: rid,
      },
      success: function (response) {
        if (response.status == "success") {
          let Allproducts = response.data;
          if (pid) {
            Allproducts = response.data?.filter((item) => item.id !== pid);
          }
          if (!pid) {
            $(".selectedPrd").css("display", "none");
          }

          let resturantPrdHtml = "";

          Allproducts?.forEach((item) => {
            resturantPrdHtml += `
          
          <div class="resturant_products" >
          
            <div class="resturant_prd_left">
            
              ${
                item.food_type == "veg"
                  ? `<img src="../assets/image/icons/success.svg" alt="">`
                  : ""
              }            
              ${
                item.food_type == "nonveg"
                  ? `<img src="../assets/image/icons/failed.svg" alt="">`
                  : ""
              }            
                  
              
              
              <h4>${item?.name}</h4>
              
              <p>₹${item?.base_price}</p>

              <div class="prd_star">
                <i class="bi bi-star-fill"></i>
                <p>${item?.rating}</p>
                <p>(${item?.reviews})</p>
              </div>

              <div id="btn${item.id}" onclick="handleSaveData(${item.id},'food')" class="save_btn">
                <i class="bi bi-bookmark"></i>
                <p>Save to Eatlist</p>
              </div>

              <div class="desc_prd">
                <p>
                  ${item?.description}
                  <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasProductBox" aria-controls="offcanvasProductBox">more</button>
                </p>
              </div>

            </div>

            <div class="resturant_prd_right">
            
              <img onclick='handleModalData(${JSON.stringify(item)})' data-bs-toggle="offcanvas" data-bs-target="#offcanvasProductBox" aria-controls="offcanvasProductBox" src="${imageUrl}${item?.image}" alt="${item?.name}">
                  
             ${
               !item?.varient
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
                      onclick="handleToggleBtn(this)"
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
          });

          $("#resturantProduct").html(resturantPrdHtml);
          getSavedProduct("food");
        } else {
          console.log(response.message);
        }
      },

      error: function (xhr, status, error) {
        console.log("AJAX Err: " + error);
      },
    });
  } else {
    console.log("something wents wrong on params");
  }

  if (pid) {
    $.ajax({
      url: apiUrl,
      method: "POST",
      dataType: "JSON",
      data: {
        type: "selectedResturantsPrd",
        id: pid,
      },
      success: function (response) {
        if (response.status == "success") {
          let products = response.data[0];
          $("#prdName").html(products.name);
          let selectedPrdHtml = "";

          selectedPrdHtml += `
          
          <div class="resturant_products" >
          
            <div class="resturant_prd_left">
            
              ${
                products.food_type == "veg"
                  ? `<img src="../assets/image/icons/success.svg" alt="">`
                  : ""
              }            
              ${
                products.food_type == "nonveg"
                  ? `<img src="../assets/image/icons/failed.svg" alt="">`
                  : ""
              }            
                  
              
              
              <h4>${products?.name}</h4>
              
              <p>₹${products?.base_price}</p>

              <div class="prd_star">
                <i class="bi bi-star-fill"></i>
                <p>${products?.rating}</p>
                <p>(${products?.reviews})</p>
              </div>

              <div id="btn${products.id}" onclick="handleSaveData(${products.id},'food')" class="save_btn">
                <i class="bi bi-bookmark"></i>
                <p>Save to Eatlist</p>
              </div>

              <div class="desc_prd">
                <p>
                  ${products?.description}
                  <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasProductBox" aria-controls="offcanvasProductBox">more</button>
                </p>
              </div>

            </div>

            <div class="resturant_prd_right">
            
              <img onclick='handleModalData(${JSON.stringify(products)})' data-bs-toggle="offcanvas" data-bs-target="#offcanvasProductBox" aria-controls="offcanvasProductBox" src="${imageUrl}${products?.image}" alt="${products?.name}">

             ${
               !products?.varient
                 ? `<div
                   class="btn_add_data"
                   onclick='handleModalCartData(${JSON.stringify(products)})'
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
                      onclick="handleToggleBtn(this)"
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

          $("#selectedProduct").html(selectedPrdHtml);
        } else {
          console.log(response.message);
        }
      },
      error: function (xhr, status, error) {
        console.log("AJAX Err: " + error);
      },
    });
  } else {
    console.log("something wents wrong on params");
  }
}

function handleModalData(data) {
  console.log(data);
  let productDataHtml = "";
  productDataHtml += `  <img
          src="${imageUrl + data?.image}"
          alt=""
        />
        <div class="product_wrapper">
          <div class="flex_wrapper">
            <div class="resturant_prd_left">
              <img src="../assets/image/icons/success.svg" alt="" />

              <h4>${data?.name}</h4>

              <p>₹${data?.base_price}</p>

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

function handleSaveData(itemId, itemType) {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "handleSaveData",
      itemId,
      itemType,
      userId,
    },
    success: function (response) {
      if (response.status == "success") {
        if (itemType == "food") {
          if (response.queryName == "delete") {
            $(`#btn${itemId}`).removeClass("fill-select");
            $(`#btn${itemId} i`).removeClass("bi-bookmark-fill");
            $(`#btn${itemId} i`).addClass("bi-bookmark");
            $(`#btn${itemId} p`).html("Save To Eatlist");
          } else {
            $(`#btn${itemId}`).addClass("fill-select");
            $(`#btn${itemId} i`).removeClass("bi-bookmark");
            $(`#btn${itemId} i`).addClass("bi-bookmark-fill");
            $(`#btn${itemId} p`).html("Saved");
          }
        } else {
          if (response.queryName == "delete") {
            $(`#shop${itemId}`).removeClass("fill-select");
            $(`#shop${itemId} i`)
              .removeClass("bi-bookmark-fill")
              .addClass("bi-bookmark");
          } else {
            $(`#shop${itemId}`).addClass("fill-select");
            $(`#shop${itemId} i`)
              .addClass("bi-bookmark-fill")
              .removeClass("bi-bookmark");
          }
        }
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX err:" + error);
    },
  });
}

function handleModalCartData(data) {
  $("#prdNameModal").text(data?.name);
  $("#PrdImage").attr("src", imageUrl + data?.image);

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getVarientData",
      id: data.id,
    },
    success: function (response) {
      if (response.status == "success") {
        let varientData = response.data;
        let varientHtml = "";
        let btnHtml = "";
        let foodId = varientData[0].food_item_id;
        varientData.forEach((item) => {

          varientHtml += `
                <label onclick="handleTogglePrice('${item.price}','${item.id}','${item.variant_name}','${varientData[0].food_item_id}')" for="varient${item.id}" class="modal_resturant_selection_box">
              <div class="modal_resturant_left">
                <img src="../assets/image/icons/failed.svg" alt="" />
                <h5>${item.variant_name}</h5>
              </div>
              <div class="modal_resturant_right">
                <h5>₹ ${item.price}</h5>
                <input type="radio" id="varient${item.id}" name="selectVarient" />
              </div>
            </label>`;
        });
        btnHtml += `
        
              <div class="btn_add_data button_data">
              
                  <button onclick='decrementCounter(
                ${JSON.stringify(data)},
                ${JSON.stringify(varientData)},
                "${foodId}")' >-</button>
                  <input id="inp${foodId}" type="number" value="1" />  
                <button 
                onclick='incrementCounter(
                ${JSON.stringify(data)},
                ${JSON.stringify(varientData)},
                "${foodId}")' class="plus">+</button>
          </div>
          <input id="varientType${foodId}" type="text" style="display: none"/>
          <input id="varientId${foodId}" type="number" style="display: none"/>
          <input id="price${foodId}" type="number" style="display: none"/>
          <button  onclick='renderCartPage(
          
              "${foodId}",
            )'>
            Add Item | ₹<b id="totalPrice${foodId}"> </b>
          </button>`;

        $("#btnWrapper").html(btnHtml);
        $("#varientData").html(varientHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX error : " + error);
    },
  });
}
let qtyValue = 1;

function handleTogglePrice(price,vid, name, id) {
  $("#totalPrice").html("");
  $(`#totalPrice${id}`).html(price);
  $(`#price${id}`).val(price);
  qtyValue = 1;
  $(`#inp${id}`).val(qtyValue);
  $(`#varientType${id}`).val(name);
  $(`#varientId${id}`).val(vid);

}

function incrementCounter(data, varientData, id) {
  qtyValue += 1;
  let priceData = $(`#totalPrice${id}`).text();
  let varientType = $(`#varientType${id}`).val();
  let basePrice = $(`#price${id}`).val();
  let updatedPrice = Number(basePrice) * Number(qtyValue);

  $(`#inp${id}`).val(qtyValue);
  $(`#totalPrice${id}`).html(updatedPrice);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingItem = cart.find(
    (item) => item.id == id && item.Type == varientType,
  );

  if (existingItem) {
    cart = cart.map((item) => {
      if (item.id == id && item.Type == varientType) {
        return {
          ...item,
          qty: qtyValue,
          price: updatedPrice,
        };
      }

      return item;
    });
  } else {
    let product = {
      id: id,
      data: data,
      varientData: varientData,
      price: updatedPrice,
      qty: qtyValue,
      Type: varientType,
    };

    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function decrementCounter(data, varientData, id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let priceData = $(`#totalPrice${id}`).text();
  let varientType = $(`#varientType${id}`).val();
  let basePrice = $(`#price${id}`).val();
  let updatedPrice = Number(basePrice) * Number(qtyValue);
   $(`#inp${id}`).val(qtyValue);
  $(`#totalPrice${id}`).html(updatedPrice);
   
  if (qtyValue == 0) {
    cart = cart.filter((item) => !(item.id == id && item.Type == varientType));
    console.log("remove item !");
     localStorage.setItem("cart", JSON.stringify(cart));
     return false;
  }else{
    qtyValue -= 1;
  }
  
  


 

  let existingItem = cart.find(
    (item) => item.id == id && item.Type == varientType,
  );

  if (existingItem) {
    cart = cart.map((item) => {
      if (item.id == id && item.Type == varientType) {
        return {
          ...item,
          qty: qtyValue,
          price: updatedPrice,
        };
      }

      return item;
    });
  } else {
    console.log("something wents wrong !");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCartPage(fid) {
 const params = new URLSearchParams(window.location.search);


  const rid = params.get("rid");
  let totalPrice = $(`#totalPrice${fid}`).text();
  let qty = $(`#inp${fid}`).val();
   let price = Math.floor($(`#price${fid}`).val());
   let vid = $(`#varientId${fid}`).val();
    console.log(vid,price);

  $.ajax({
    url:apiUrl,
    method:"POST",
    dataType:"JSON",
    data:{
      type:"insertCartPage",
      userId,
       rid,
       fid,
       varId : vid,
       qty,
       price,
       totalPrice,
    },
    success: function (response) {
        if (response.status === "success") {
          console.log(response)
          location.href="cart.html";
         
        } else {
          console.log(response.message || "Something went wrong");
        }
      },

      error: function (xhr, status, error) {
        console.log("AJAX Error:", error);
      },
  });
  
}

// dumy js

function getProduct2() {
  let getSimilarPrdHtml = "";

  const recomendation = [
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

  recomendation?.forEach((item) => {
    getSimilarPrdHtml += `
     <div class="product_box">
          <div class="product_top_sec">
            <div class="disc_tag">
            ${item?.discount}
            </div>
            <div class="like">
             <i class="bi bi-bookmark"></i>
            </div>
           <a href="restaurants.html"> <img  src="${item?.image}" alt="" /></a>
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
        </div>`;
  });

  let productContainer = "";
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

  $("#recomendation").html(getSimilarPrdHtml);
  $("#prdSearch2").html(productContainer);
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

  // $("#prd2").html(productContainer);
}
getCarousel1();

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

function handleToggleBtn(el) {
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
  console.log(id);
  let prdDataHtml = "";

  let filteredData = orders.find((item) => item.id === Number(id));
  console.log(filteredData);

  $("#shopImg").attr("src", filteredData?.restaurantImage);
  $("#shopName").html(filteredData?.restaurantName);
  $("#shopAddress").html(filteredData?.location);

  filteredData?.items?.forEach((prd) => {
    prdDataHtml += ` <div class="order_middle_box">
                <img src="${prd?.icon}" alt="">
                <p>${prd?.name}</p>
            </div>`;
  });

  $("#prdData").html(prdDataHtml);
}
