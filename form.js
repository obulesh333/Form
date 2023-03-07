let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Mail"
};



let workingStatusEl = document.getElementById("status");
workingStatusEl.addEventListener("change", function(event) {
    formData.status = event.target.value;
    console.log(formData);
});

let genderMaleEl = document.getElementById("genderMale");
genderMaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

let genderFemaleEl = document.getElementById("genderFemale");
genderFemaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

let myFormEl = document.getElementById("myForm");

let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

function submitFormData(formData) {
    let options = {
        method: "POST",
        headers: {
            'Content-type': "application/json",
            Accept: "application/json",
            Authorization: "Bearer 721f60f089129833c4364d106fdaa8e1cfdff836783793349426913ca8a23254"
        },
        body: JSON.stringify(formData)
    };
    let url = "https://gorest.co.in/public-api/users";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrMsgEl.textContent = "Email Already Registerd";
                }
            }
        });
}

nameEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }
    formData.name = event.target.value;
});

emailEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
    formData.email = event.target.value;
});

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();

    submitFormData(formData);
});