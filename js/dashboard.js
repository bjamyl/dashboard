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

  const monthlyValues = [20, 40, 50, 10, 378, 129, 12, 35, 12, 765, 123, 20];
  const dailyValues = [276, 985, 510, 310, 378, 129, 122];

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
          data: dailyValues,
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
          data: monthlyValues,
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

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  location.replace("/");
});

// Toggling charts
const toggleButton = document.getElementById("toggle");
const weekGraph = document.querySelector(".wgraph");
const monthGraph = document.querySelector(".mgraph");

toggleButton.addEventListener("click", function () {
  weekGraph.classList.toggle("active");
  monthGraph.classList.toggle("active");
});
