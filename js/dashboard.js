const access_token = JSON.parse(localStorage.getItem("access"));
const refresh_token = JSON.parse(localStorage.getItem("refresh"));
const getDashboardData = async () => {
  let res = await fetch("https://freddy.codesubmit.io/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status !== 200) return;
  const data = await res.json();
  const weeklyEntries = data.dashboard.sales_over_time_week;
  const monthlyEntries = data.dashboard.sales_over_time_year;

  const weeklySales = [];
  Object.values(weeklyEntries).map((sale) => {
    weeklySales.push(sale.total);
  });

  const monthlySales = [];
  Object.values(monthlyEntries).map((sale) => {
    monthlySales.push(sale.total);
  });

  const ctx = document.getElementById("myChart").getContext("2d");
  const monthctx = document.getElementById("myMonthlyChart").getContext("2d");

  let weeklyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "Weekly Sales",
          data: weeklySales,
        },
      ],
    },
    options: {},
  });
  let monthlyChart = new Chart(monthctx, {
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Monthly Sales",
          data: monthlySales,
        },
      ],
    },
    options: {},
  });
};

getDashboardData();

// Getting a new access token
const updateToken = async () => {
  let res = await fetch("https://freddy.codesubmit.io/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh_token}`,
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    localStorage.setItem("access", JSON.stringify(data.access_token));
  } else {
    console.log("Error");
  }
};

// Setting an interval to request new access token
let timer = 1000 * 60 * 14;
setInterval(() => {
  updateToken();
}, timer);

const logout = document.getElementById('logout')
logout.addEventListener('click',()=>{
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    location.replace("/");

})