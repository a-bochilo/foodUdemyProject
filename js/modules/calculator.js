function calculator() {
    //
    //
    //Calculator
    const calcResult = document.querySelector(".calculating__result span");
    let sex = localStorage.getItem("sex") || "female",
        height,
        weight,
        age,
        ratio = localStorage.getItem("ratio") || 1.375;

    function initLocalSettings(parent, activeClass) {
        const elements = document.querySelectorAll(`${parent} div`);
        elements.forEach((elem) => {
            elem.classList.remove(activeClass);
            if (
                elem.matches(`#${sex}`) ||
                elem.getAttribute("data-ratio") == ratio
            ) {
                elem.classList.add(activeClass);
            }
        });
        calcTotal();
    }
    initLocalSettings("#gender", "calculating__choose-item_active");
    initLocalSettings(
        ".calculating__choose_big",
        "calculating__choose-item_active"
    );

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            calcResult.textContent = "____";
            return;
        }
        if (sex === "female") {
            calcResult.textContent = Math.round(
                (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
            );
        } else {
            calcResult.textContent = Math.round(
                (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
            );
        }
    }
    calcTotal();

    function getStaticInfo(parent, activeClass) {
        const elements = document.querySelectorAll(`${parent} div`);

        document.querySelector(parent).addEventListener("click", (e) => {
            if (!e.target.matches(`${parent} div`)) return;
            if (e.target.hasAttribute("data-ratio")) {
                ratio = +e.target.getAttribute("data-ratio");
                localStorage.setItem("ratio", ratio);
            } else {
                sex = e.target.getAttribute("id");
                localStorage.setItem("sex", sex);
            }

            elements.forEach((elem) => elem.classList.remove(activeClass));
            e.target.classList.add(activeClass);
            calcTotal();
        });
    }
    getStaticInfo("#gender", "calculating__choose-item_active");
    getStaticInfo(
        ".calculating__choose_big",
        "calculating__choose-item_active"
    );

    function getDynamicInfo(e) {
        if (e.target.value.match(/\D/g)) {
            e.target.style.boxShadow = "0 4px 15px red";
        } else {
            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,.2)";
        }
        switch (e.target.getAttribute("id")) {
            case "height":
                height = +e.target.value;
                break;
            case "weight":
                weight = +e.target.value;
                break;
            case "age":
                age = +e.target.value;
                break;
        }
        calcTotal();
    }

    document
        .querySelector(".calculating__choose_medium")
        .addEventListener("input", (e) => getDynamicInfo(e));
}

export default calculator;
