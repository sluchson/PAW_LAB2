(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  function showLoadingPopup() {
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loadingPopup";
    loadingDiv.textContent = "Loading…";
    loadingDiv.style.position = "fixed";
    loadingDiv.style.top = 0;
    loadingDiv.style.left = 0;
    loadingDiv.style.width = "100%";
    loadingDiv.style.height = "100%";
    loadingDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
    loadingDiv.style.color = "#fff";
    loadingDiv.style.fontSize = "24px";
    loadingDiv.style.display = "flex";
    loadingDiv.style.alignItems = "center";
    loadingDiv.style.justifyContent = "center";
    loadingDiv.style.zIndex = 9999;
    document.body.appendChild(loadingDiv);
    return loadingDiv;
  }

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
    const loading = showLoadingPopup();

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        console.log(posts);
        console.log(posts[0].title);
        console.log(posts[0].body);

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
          loading.remove();
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
