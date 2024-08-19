function submitForm(formId) {
  let form = document.querySelector(`#${formId}`);
  try {
    if (form.checkValidity()) {
      console.log("valid");
      let formData = new FormData(form);
      let data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      console.log(data);
      fetch(form.action, {
        method: form.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log("response ok");
            return response.json();
          } else {
            console.log("response not ok");
            throw new Error("Server response was not ok.");
          }
        })
        .then((data) => {
          console.log(data);
          if (data.redirect) {
            window.location.href = data.redirect;
          } else {
            console.log("no redirect");
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      form.reportValidity();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
