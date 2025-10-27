(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function() {
    answer.textContent = "Processing...";

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Nowy post",
        body: "Treść nowego posta",
        userId: 1
      })
    })
      .then(response => response.json())
      .then(data => {
        answer.textContent = `Dodano nowy post o ID = ${data.id}`;
      })
  });


  cw2.addEventListener("click", function() {
    answer.textContent = "Loading...";

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        const htmlPosts = posts.map(post => {
          return `
            <div class="post">
              <h3>${post.title}</h3>
              <p>${post.body}</p>
            </div>
          `;
        });

        setTimeout(() => {
          answer.innerHTML = htmlPosts.join('');
        }, 1000);
      })
      .catch(error => {
        answer.textContent = "Błąd podczas pobierania danych!";
        console.error(error);
      });
  });


  cw3.addEventListener("click", function() {
    //TODO
  })

})();
