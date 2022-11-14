const form = document.getElementById("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const loginDetails = new FormData(form);
  const formDataSerialized = Object.fromEntries(loginDetails);

  console.log(formDataSerialized);

  const res = await fetch("https://freddy.codesubmit.io/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataSerialized),
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data);
    localStorage.setItem("access", JSON.stringify(data.access_token));
    localStorage.setItem("refresh", JSON.stringify(data.refresh_token));
  } else {
    console.log("error");
  }
});

const refresh_token = JSON.parse(localStorage.getItem("refresh"));

const updateToken = async () => {
  let res = await fetch("https://freddy.codesubmit.io/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh_token}`,
    },
  });
  if (res.status === 200) {
    const data = await res.json()
    console.log(data)
    console.log("Good");
    localStorage.setItem("access", JSON.stringify(data.access_token));

  } else {
    console.log("Error");
  }
};

let timer = 1000 * 60 * 1;
let interval = setInterval(() => {
  updateToken()
}, 4000);

