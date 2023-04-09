(function () {
  const inputsContainer = document.querySelector(".inputs-container");
  const circles = document.querySelectorAll(".circle");
  const personalInfo = [ ]

  circles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
      if (index === 0) {
        yourInfo();
      } else if (index === 1) {
        selectPlan();
      } else if (index === 2) {
        addOns();
      } else if (index === 3) {
        finishinup();
      }
    });
  });

  document.addEventListener("DOMContentLoaded", yourInfo);

  function yourInfo() {
    let newcontent1 = `
      <h1>Personal info</h1>
      <p class="subtitle">
        Please provide your name, mail, address, and phone number
      </p>
        <form>
            <div class="inputs">
                <div>
                    <p class="title-camp">Name</p>
                    <input type="text" placeholder="e.g Stephen King" class="name" required/>
                </div>
                <div>
                    <p class="title-camp">Email Address</p>
                    <input type="email" placeholder="e.g Stephenking@lorem.com" class="mail" required />
                </div>
                <div>
                    <p class="title-camp">Phone Number</p>
                    <input type="tel" placeholder="e.g. +1 234 567 890" class="tel" pattern="[0-9]+" minlength="5" required/>
                </div>
            </div>
            <button class="next1" disabled>NEXT</button>
        </form>
    `;

    inputsContainer.innerHTML = newcontent1;

    const inpname = document.querySelector(".name");
    const inpmail = document.querySelector(".mail");
    const inptel = document.querySelector(".tel");
    const next1 = document.querySelector(".next1");

    function checkFormValidity() {
      const inputs = [inpname, inpmail, inptel];
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].checkValidity()) {
          next1.disabled = true;
          return;
        }
      }
      next1.disabled = false;
    }

    inpname.addEventListener("input", checkFormValidity);
    inpmail.addEventListener("input", checkFormValidity);
    inptel.addEventListener("input", checkFormValidity);


    next1.addEventListener("click", () => {
     personalInfo.push(inpname.value,inpmail.value,inptel.value);
      selectPlan(personalInfo);
    });

    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    circles[0].classList.add("active");
  }

  function selectPlan(personalInfo) {
    let priceTotal = 0;
    let newContent2 = `
      <h1>Select your plan</h1>
      <p class="subtitle">You have the option of monthly or yearly billing.</p>
      <div class="boxes2">
        <div class="box" data-num="9">
          <img src="./assets/images/icon-arcade.svg" alt="">
          <div class="data-price" > 
            <p class="plan">Arcade</p>
            <p class="price">$9/mo</p>
          </div>
        </div>
        <div class="box value2" data-num="12">
          <img src="./assets/images/icon-advanced.svg" alt="">
          <div class= "data-price"> 
            <p class="plan">Advanced</p>
            <p class="price">$12/mo</p>
          </div>
        </div>
        <div class="box value3" data-num="15">
          <img src="./assets/images/icon-pro.svg" alt="">
          <div class="data-price">
            <p class="plan">Pro</p>
            <p class="price">$15/mo</p>
          </div>   
        </div>
      </div>
      <div class="input-switch">
        <p>Monthly</p>
        <label class="switch">
          <input type="checkbox" class="check-state">
          <span class="slider round"></span>
        </label>
        <p>Yearly</p>
      </div>
      <div class="btns2">
        <div class="prev2">BACK</div>
        <div class="next2">NEXT</div>
      </div>
    `;

    inputsContainer.innerHTML = newContent2;
    const prev2 = document.querySelector(".prev2");
    const next2 = document.querySelector(".next2");
    const boxes = document.querySelectorAll(".box");
    const checkbox = document.querySelector(".check-state");
    prev2.addEventListener("click", () => {
      yourInfo(personalInfo);
    });
    next2.addEventListener("click", () => {
      addOns(personalInfo);
    });
    boxes.forEach(function (box) {
      box.addEventListener("click", function (e) {
        priceTotal = 0;
        if (!box.classList.contains("activado")) {
          boxes.forEach(function (b) {
            if (b.classList.contains("activado")) {
              b.classList.remove("activado");
              personalInfo.pop()
            }
          });

          box.classList.add("activado");
          const price = parseInt(box.dataset.num);
          priceTotal = price;
          console.log(priceTotal);
          personalInfo.push(priceTotal);
        } else {
          box.classList.remove("activado");
          personalInfo.pop()
          
        }
      });
    });
    
    

    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        const prices = document.querySelectorAll("p.price");

        prices.forEach((price) => {
          // Obtenemos el texto actual del elemento y lo convertimos a número
          const currentPrice = Number(
            price.textContent.replace(/[^0-9.-]+/g, "")
          );

          // Multiplicamos el precio por 10 y lo formateamos como string con el signo "$"
          const newPrice = "$" + currentPrice * 10 + "/yr";
          // Asignamos el nuevo texto al elemento
          price.textContent = newPrice;
        });
        const promos = document.querySelectorAll(".data-price");
        promos.forEach((promo) => {
          const nuevop = document.createElement("p");
          nuevop.textContent = "2 months free";
          nuevop.classList.add("plan2");
          promo.appendChild(nuevop);
        });
        boxes.forEach((box) => {
          const datanumactual = parseInt(box.dataset.num);
          box.dataset.num = datanumactual * 10;
          console.log(box.dataset.num);
        });
      } else {
        const prices = document.querySelectorAll("p.price");
        prices.forEach((price) => {
          // Obtenemos el texto actual del elemento y lo convertimos a número
          const currentPrice = Number(
            price.textContent.replace(/[^0-9.-]+/g, "")
          );
          // Dividimos el precio por 10 y lo formateamos como string con el signo "$"
          const newPrice = "$" + currentPrice / 10 + "/mo";
          // Asignamos el nuevo texto al elemento
          price.textContent = newPrice;
        });
        const promos = document.querySelectorAll(".data-price");
        promos.forEach((promo) => {
          const plan2Elements = promo.querySelectorAll(".plan2");
          plan2Elements.forEach((plan2) => {
            promo.removeChild(plan2);
          });
        });
        boxes.forEach((box) => {
          const datanumactual = parseInt(box.dataset.num);
          box.dataset.num = datanumactual / 10;
          console.log(box.dataset.num);
        });
      }
    });

    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    circles[1].classList.add("active");
  }

  function addOns(personalInfo) {
    let newcontent3 = `
      <h1> Pick add-ons </h1>
      <p class="subtitle"> Add-ons help to enhance your gaming experience.</p>
      <div class="boxes3">
          <div class="box3">
              <div class="check-info">
                  <input type="checkbox" class="checkbox">
                  <div class="plan-info">
                      <p class="plan">Online service</p>
                      <p class="subtitle">Acces to multiplayer games</p>
                  </div>
              </div>
              <p class="price-ads">+$1/mo</p>
          </div>
  
          <div class="box3">
              <div class="check-info">
                  <input type="checkbox" class="checkbox">
                  <div class="plan-info">
                      <p class="plan">Larger storage</p>
                      <p class="subtitle">Extra 1TB cloud save</p>
                  </div>
              </div>
              <p class="price-ads">+$2/mo</p>
          </div>
  
          <div class="box3">
              <div class="check-info">
                  <input type="checkbox" class="checkbox">
                  <div class="plan-info">
                      <p class="plan">Customizable profile</p>
                      <p class="subtitle">Custom theme on your profile</p>
                  </div>
              </div>
              <p class="price-ads">+$1/mo</p>
          </div>
      </div>
      <div class="btns3">
          <div class="prev3">BACK</div>
          <div class="next3">NEXT</div>
      </div>
      `;

    inputsContainer.innerHTML = newcontent3;
    const next3 = document.querySelector(".next3");
    const prev3 = document.querySelector(".prev3");
    next3.addEventListener("click", finishinup);
    prev3.addEventListener("click", selectPlan);

    console.log(personalInfo);

    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    circles[2].classList.add("active");
  }

  function finishinup() {
    let newcontent4 = `
      <h1> Finishing up </h1>
      <p class="subtitle"> Double-check everything looks OK before confirming.</p>
      <div class="resume-container">
        <div class="ticket-container">
            <div class= "plan-container">
                <div class="info-plan">
                    <p class="plan-ticket">Arcade(Monthly)</p>
                    <p class="subtitle-title">Change</p>
                </div>
                <p class="">$9/mo</p>      
            </div
            <div class="add-container">
              
             </div>
  
             <div>
              <p>Total:</p>
              <p class="total-price">$12/mo</p>
          </div>
      </div>
      </div>
      
      `;

    inputsContainer.innerHTML = newcontent4;
    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    circles[3].classList.add("active");
  }
})();
