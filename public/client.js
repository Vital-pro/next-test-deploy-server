let formClient = document.getElementById('form');

formClient.addEventListener('submit', async (e) => {
  e.preventDefault();
  // let result = await fetch(`https://next-test-deploy-server.vercel.app/api/news`)
  let result = await fetch(`http://http://45.142.36.120/api/news`)
  // let result = await fetch(`http://localhost:3001/api/news`)
  .then((response) =>
    response.json()
  );
  let dogImg = document.getElementById('img');
  // .then(data => console.log(data));
  dogImg.src = result.message;
});


