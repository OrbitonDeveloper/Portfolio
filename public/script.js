(function () {
  [...document.querySelectorAll(".control")].forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
      document.querySelector(".active").classList.remove("active");
      document.getElementById(button.dataset.id).classList.add("active");
    });
  });
  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });

  const submitButton = document.getElementById("send-mail");
  const myForm = document.getElementById("mail-form");

  submitButton.addEventListener("click", () => {
    const name = document.getElementById("name-form").value;
    const mail = document.getElementById("mail-form").value;
    const text = document.getElementById("text-form").value;
    const subject = document.getElementById("subject-form").value;
    if (name == "" || mail == "" || text == "" || subject == "") {
      alert("please fill the form");
      return;
    }
    myForm.submit(); // Programmatically submit the form
    alert("submission successful");
  });
})();
