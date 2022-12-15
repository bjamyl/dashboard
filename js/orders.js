const access_token = JSON.parse(localStorage.getItem("access"));
const refresh_token = JSON.parse(localStorage.getItem("refresh"));

// Getting the orders from the backend
const getOrders = async () => {
  let res = await fetch("https://freddy.codesubmit.io/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status !== 200) return;
  const data = await res.json();
  const ordersData = data.orders;
  delete Object.keys(ordersData);
  console.log(ordersData);

  // Implementing pagination
  const tableList = document.getElementById('table')

let pageIndex = 0
let itemsPerPage = 4


showTable()

function showTable(){
  tableList.innerHTML = ''

  for (let i=pageIndex*itemsPerPage; i<(pageIndex*itemsPerPage)+itemsPerPage; i++){
    if (!ordersData[i]){break}
    const row = document.createElement('tr')
    row.innerHTML = `
    <tr>
      <td>
        ${ordersData[i].product.name}
      </td>
      <td>
        ${ordersData[i].created_at}
      </td>
      <td>
        ${ordersData[i].total}
      </td>
      <td>
        ${ordersData[i].status}
      </td>
    </tr>
    `
    tableList.append(row)
  }
}



  
};

const getComments = async () => {
  let res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json()
  console.log(data)


  const comments = [
    {id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz'},
    {id: 2, name: 'Ervin Howell', username: 'Bret', email: 'Sincere@april.biz'},
    {id: 3, name: 'Clementine Bauc', username: 'Bret', email: 'Sincere@april.biz'},
    {id: 4, name: 'Patricia Lebsack', username: 'Bret', email: 'Sincere@april.biz'},
    {id: 5, name: 'Chelsey Dietrich', username: 'Bret', email: 'Sincere@april.biz'},
    {id: 6, name: 'Mrs. Dennis Schulist', username: 'Bret', email: 'Sincere@april.biz'},
    {id: 7, name: 'Kurtis Weissnat', username: 'Bret', email: 'Sincere@april.biz'},
    {id: 8, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz'},
    {id: 9, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz'},
  
  ]
  







  
};

getComments()


getOrders();



