(function () {
  const inputsContainer = document.querySelector(".inputs-container");
  const circles = document.querySelectorAll(".circle");
  const circleresponsive = document.querySelectorAll(".circle-responsive");
  // Declaramos el objeto que almacenara toda la informacion del formulario
  let user = {
    name: "",
    mail: "",
    tel: "",
    plan: "",
    priceplan: "",
    addsprice: [],
  };

  // Funcion que es ejecutada apenas temrina de cargar todos los elementos del DOM

  document.addEventListener("DOMContentLoaded", yourInfo);

  // Paso 1

  function yourInfo() {
    // Declaramos el valor que tendra inputs container inicialmente

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

    // Le damos valor a todos los elementos inputs

    const inpname = document.querySelector(".name");
    const inpmail = document.querySelector(".mail");
    const inptel = document.querySelector(".tel");

    // Le damos valor al boton que llevara a la siguiente seccion

    const next1 = document.querySelector(".next1");

    // Funcion de validacion

    function checkFormValidity() {
      const inputs = [inpname, inpmail, inptel];
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].checkValidity()) {
          next1.disabled = true;
          next1.style.backgroundColor = "red";
          return;
        }
      }
      next1.disabled = false;
      next1.style.backgroundColor = "blue";
    }

    // Le añadimos un evento input a todos los campos que seleccionamos anteriormente y llamamos a la funcion de validacion cada vez que se inserta algo

    inpname.addEventListener("input", checkFormValidity);
    inpmail.addEventListener("input", checkFormValidity);
    inptel.addEventListener("input", checkFormValidity);

    // Guardamos toda la informacion recogida en el objeto y pasamos a la siguiente seccion

    next1.addEventListener("click", () => {
      user.name = inpname.value;
      user.mail = inpmail.value;
      user.tel = inptel.value;
      selectPlan(user);
    });

    // Funcion para activar el circulo en base a la seccion

    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    circles[0].classList.add("active");

    circleresponsive.forEach((circle) => {
      circle.classList.remove("active");
    });

    circleresponsive[0].classList.add("active");
  }

  // Paso 2

  function selectPlan(user) {
    // Acordamos el valor totoal del plan que utilizara en 0 y le damos valor al nuevo contenido que aparecera en pantalla

    let priceTotal = 0;
    let newContent2 = `
      <h1>Select your plan</h1>
      <p class="subtitle">You have the option of monthly or yearly billing.</p>
      <div class="boxes2">
        <div class="box" data-num="9" data-plan="Arcade(Monthly)">
          <img src="./assets/images/icon-arcade.svg" alt="">
          <div class="data-price" > 
            <p class="plan">Arcade</p>
            <p class="price">$9/mo</p>
          </div>
        </div>
        <div class="box value2" data-num="12" data-plan="Advanced(Monthly)">
          <img src="./assets/images/icon-advanced.svg" alt="">
          <div class= "data-price"> 
            <p class="plan">Advanced</p>
            <p class="price">$12/mo</p>
          </div>
        </div>
        <div class="box value3" data-num="15"data-plan="Pro(Monthly)" >
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

    // Le damos valor a todos los elementos que aparecen en pantalla

    const prev2 = document.querySelector(".prev2");
    const next2 = document.querySelector(".next2");
    const boxes = document.querySelectorAll(".box");
    const checkbox = document.querySelector(".check-state");

    // Añadimos el evento a los botones para poder direccionarte al paso 1 o 2 usando como parametro los datos ya registrados en el objeto

    prev2.addEventListener("click", () => {
      yourInfo(user);
    });
    next2.addEventListener("click", () => {
      addOns(user, checkbox);
    });

    // Le damos un evento a cada caja de plan, le damos estilo al seleccionado y los guardamos en el objeto (Solo se puede seleccionar 1)

    boxes.forEach(function (box) {
      box.addEventListener("click", function (e) {
        priceTotal = 0;
        if (!box.classList.contains("activado")) {
          boxes.forEach(function (b) {
            if (b.classList.contains("activado")) {
              b.classList.remove("activado");
            }
          });

          box.classList.add("activado");
          const price = parseInt(box.dataset.num);
          priceTotal = price;
          const datasetplan = box.dataset.plan;
          user.plan = datasetplan;
          user.priceplan = priceTotal;
        } else {
          box.classList.remove("activado");
        }
      });
    });

    // Le damos el evento al checkbox switch permitiendo cambiar los valores y los precios de los planes, desactivado (plan mensual), activado (plan anual)

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

        // Cremos un nuevo parrafo en cada uno de los planes notando que se activo el plan anual

        const promos = document.querySelectorAll(".data-price");
        promos.forEach((promo) => {
          const nuevop = document.createElement("p");
          nuevop.textContent = "2 months free";
          nuevop.classList.add("plan2");
          promo.appendChild(nuevop);
        });

        // Cambiamos los valores que tiene la etiqueta en el html (no visibles para el usario)

        boxes.forEach((box) => {
          const datanumactual = parseInt(box.dataset.num);
          box.dataset.num = datanumactual * 10;
          const currentPlan = box.dataset.plan;
          if (!currentPlan.includes("Yearly")) {
            const newPlan = currentPlan.replace("(Monthly)", "(Yearly)");
            box.dataset.plan = newPlan;
          }
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

        // Eliminamos el nuevo p creado en caso de ser desactivado

        const promos = document.querySelectorAll(".data-price");
        promos.forEach((promo) => {
          const plan2Elements = promo.querySelectorAll(".plan2");
          plan2Elements.forEach((plan2) => {
            promo.removeChild(plan2);
          });
        });

        // Cambiamos los valores que tiene la etiqueta en el html (no visibles para el usario)

        boxes.forEach((box) => {
          const datanumactual = parseInt(box.dataset.num);
          box.dataset.num = datanumactual / 10;
          const currentPlan = box.dataset.plan;
          if (!currentPlan.includes("Monthly")) {
            const newPlan = currentPlan.replace("(Yearly)", "(Monthly)");
            box.dataset.plan = newPlan;
          }
        });
      }
    });

    // Funcion para activar el circulo en base a la seccion

    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    circles[1].classList.add("active");

    circleresponsive.forEach((circle) => {
      circle.classList.remove("active");
    });

    circleresponsive[1].classList.add("active");
  }

  // Paso 3

  function addOns(user, checkbox) {

    // Declaramos el nuevo valor que tendra la seccion 3 

    let newcontent3 = `
      <h1> Pick add-ons </h1>
      <p class="subtitle"> Add-ons help to enhance your gaming experience.</p>
      <div class="boxes3">
          <div class="box3">
              <div class="check-info">
                  <input type="checkbox" class="checkbox checkbox1" data-num="1" data-add="Online service">
                  <div class="plan-info">
                      <p class="plan">Online service</p>
                      <p class="subtitle2">Acces to multiplayer games</p>
                  </div>
              </div>
              <p class="price-ads">+$1/mo</p>
          </div>
  
          <div class="box3" >
              <div class="check-info">
                  <input type="checkbox" class="checkbox checkbox2" data-num="2" data-add="Larger storage">
                  <div class="plan-info">
                      <p class="plan">Larger storage</p>
                      <p class="subtitle2">Extra 1TB cloud save</p>
                  </div>
              </div>
              <p class="price-ads">+$2/mo</p>
          </div>
  
          <div class="box3">
              <div class="check-info">
                  <input type="checkbox" class="checkbox checkbox3" data-num="1" data-add="Customizable profile">
                  <div class="plan-info">
                      <p class="plan">Customizable profile</p>
                      <p class="subtitle2">Custom theme on your profile</p>
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

    // Le damos valor a los botones y le asignamos la funcion para retroceder o avanzar en el formulario

    const next3 = document.querySelector(".next3");
    const prev3 = document.querySelector(".prev3");
    next3.addEventListener("click", () => {
      finishinup(user, checkbox);
    });
    prev3.addEventListener("click", () => {
      selectPlan(user, checkbox);
    });

    // Le damos valor a los chebox de seleccion de adds

    const checkboxes = document.querySelectorAll(".checkbox");

    // En caso que venga de la activacion del plan anual, el precio de los adds son corregidos al precio anual. Tambien cambiamos el valor de de la etiqueta HTML (no visible)

    if (checkbox.checked) {
      const prices = document.querySelectorAll("p.price-ads");
      prices.forEach((price) => {
        const currentPrice = Number(
          price.textContent.replace(/[^0-9.-]+/g, "")
        );
        const newPrice = "$" + currentPrice * 10 + "/yr";
        price.textContent = newPrice;
      });
      checkboxes.forEach((box) => {
        let datanumactual = parseInt(box.dataset.num);
        datanumactual = datanumactual * 10;
        box.dataset.num = datanumactual;
      });
    }

    // Le damos valor puntualmente a cada uno

    const checkbox1 = document.querySelector(".checkbox1");
    const checkbox2 = document.querySelector(".checkbox2");
    const checkbox3 = document.querySelector(".checkbox3");

    // En caso de activar cada checkbox se guardara el nombre del add y el precio dentro de un array ubicado en el objeto 

    checkbox1.addEventListener("input", () => {
      if (checkbox1.checked) {
        const ads = parseInt(checkbox1.dataset.num);
        const dataadd = checkbox1.dataset.add;

        user.addsprice.push(dataadd);
        user.addsprice.push(ads);
      } else {
        user.addsprice.pop();
        user.addsprice.pop();
      }
    });
    checkbox2.addEventListener("input", () => {
      if (checkbox2.checked) {
        const ads = parseInt(checkbox2.dataset.num);
        const dataadd = checkbox2.dataset.add;

        user.addsprice.push(dataadd);
        user.addsprice.push(ads);
      } else {
        user.addsprice.pop();
        user.addsprice.pop();
      }
    });
    checkbox3.addEventListener("input", () => {
      if (checkbox3.checked) {
        const ads = parseInt(checkbox3.dataset.num);
        const dataadd = checkbox3.dataset.add;

        user.addsprice.push(dataadd);
        user.addsprice.push(ads);
      } else {
        user.addsprice.pop();
        user.addsprice.pop();
      }
    });

    // Funcion de activacion de circulos 

    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    circles[2].classList.add("active");

    circleresponsive.forEach((circle) => {
      circle.classList.remove("active");
    });

    circleresponsive[2].classList.add("active");
  }

  // Paso 4

  function finishinup(user, checkbox) {

    	// Declaramos el valor que tendra la pantalla en la seccion 4

    let newcontent4 = `
  <h1>Finishing up</h1>
  <p class="subtitle">${user.name}, double-check everything looks OK before confirming.</p>
  <div class="resume-container">
    <div class="plan-resume">
      <h1 class="resume">${user.plan}</h1>
      <p class="resume-price">$${user.priceplan}</p>
    </div>
    <div class="adds-resume">
`;

    // Agregar el contenido dinámico en el div "adds-resume"
    for (let i = 0; i < user.addsprice.length; i += 2) {
      newcontent4 += `
    <div class="add-info-resume">
      <h1 class="resume">${user.addsprice[i]}</h1>
      <p class="resume-price">$${user.addsprice[i + 1]}</p>
    </div>
  `;
    }

    // For que permite calcular el total a pagar sumando el plan con los adds seleccionados 

    let total = user.priceplan;

    for (let i = 0; i < user.addsprice.length; i++) {
      if (!isNaN(user.addsprice[i])) {
        total += parseInt(user.addsprice[i]);
      }
    }
    newcontent4 += `
    </div>
    <div class="total-resume">
      <h1>TOTAL:</h1>
      <p class="total-price-resume">$${total}</p>
    </div>
    <div class=btn-container4>
      <button class="back4">BACK</button>
      <button class="next4">CONFIRM</button>
    </div>
  </div>

`;

    // Funcion de activacion de circulo 

    inputsContainer.innerHTML = newcontent4;

    circles.forEach((circle) => {
      circle.classList.remove("active");
    });

    circles[3].classList.add("active");

    circleresponsive.forEach((circle) => {
      circle.classList.remove("active");
    });

    circleresponsive[3].classList.add("active");


    // Le damos valor a los botones para retroceder o avanzar en secciones 

    const next4 = document.querySelector(".next4");
    next4.addEventListener("click", () => {
      tanks();
    });

    const back4 = document.querySelector(".back4");
    back4.addEventListener("click", () => {
      resetAdds(user)
      addOns(user, checkbox);
    });
  }


  // Paso 5

  function tanks() {

    // Declaramos el contenido del final del formulario 

    let newcontent5 = `
    <div class="last-container">
      <div class="finish-container">
        <img src="./assets/images/icon-thank-you.svg" alt="">
        <h1>Thank you!</h1>
        <p class="subtitle2">Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
      </div>
    </div>
    
    `;

    inputsContainer.innerHTML = newcontent5;
  }


  function resetAdds() {
    user.addsprice = [];
  }
  
})();
