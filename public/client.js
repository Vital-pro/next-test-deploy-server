let formClient = document.getElementById('form');
console.log(formClient);

formClient.addEventListener('submit', () => {
  let password = formClient.querySelector('input[name="password"]');
  // event.preventDefault();
  let result = fetch(`https://next-test-deploy-server.vercel.app/password/${password.value}`)
    .then(response => response.json())
    .then(data => console.log(data));
})


// formClient.querySelector('input[type="submit"]').addEventListener('click', (event) => {
//   event.preventDefault();
//   let password = formClient.querySelector('input[name="password"]').value;
//   window.location.href = `/password/${password}`
// })