let formClient = document.getElementById('form');
console.log(formClient);

formClient.addEventListener('submit', async () => {
  let password = document.getElementById('passw');
  // let result = await fetch(`https://next-test-deploy-server.vercel.app/password/${password.value}`)
  let dogImg = document.getElementById('img');
  let result = await fetch(`http://localhost:3001/api/news`)
    .then(response => response.json())
    // .then(data => console.log(data));
  let div = document.getElementById('card');
  dogImg.src = result.message
})
