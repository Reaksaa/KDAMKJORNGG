document.addEventListener("DOMContentLoaded", () => {
  const movieGrid = document.getElementById("movieGrid");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const modal = new bootstrap.Modal(document.getElementById('movieModal'));
  const modalTitle = document.querySelector("#movieModal .modal-title");
  const modalVideo = document.querySelector("#movieModal iframe");

  // Movie array with YouTube IDs
  const movies = [
    { title: "Batman", rating: "⭐️ 9.0/10", img: "https://ntvb.tmsimg.com/assets/p8757074_v_h10_ah.jpg?w=960&h=540", videoId: "GokKUqLcvD8" },
    { title: "Chainsaw Man S2", rating: "⭐️ 9.8/10", img: "https://static0.srcdn.com/wordpress/wp-content/uploads/2025/12/chainsaw-man-assassins-arc-poster-2.png?w=1600&h=900&fit=crop", videoId: "_PRaywfa1LE" },
    { title: "Jujutsu Kaisen", rating: "⭐️ 8.6/10", img: "https://de7i3bh7bgh0d.cloudfront.net/2025/10/31/17/59/32/02723005-ae95-4654-9e6b-9720880310e1/JJK_v28_Social_Blog_1200x630.jpg", videoId: "MPfZhgLiK6w" },
    // Add more movies here
  ];

  function renderMovies(list) {
    movieGrid.innerHTML = "";
    list.forEach(movie => {
      const col = document.createElement("div");
      col.classList.add("col-md-4");
      col.innerHTML = `
        <div class="card bg-secondary text-light h-100" data-video="${movie.videoId}">
          <img src="${movie.img}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.rating}</p>
            <button class="btn btn-outline-light watch-btn" data-bs-toggle="modal" data-bs-target="#movieModal">Watch</button>
          </div>
        </div>
      `;
      movieGrid.appendChild(col);
    });

    document.querySelectorAll('.watch-btn').forEach(button => {
      button.addEventListener('click', function () {
        const card = this.closest('.card');
        const videoId = card.getAttribute('data-video');
        modalTitle.textContent = card.querySelector('.card-title').textContent;
        modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      });
    });
  }

  renderMovies(movies);

  // SEARCH
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.toLowerCase();
      const filtered = movies.filter(movie => movie.title.toLowerCase().includes(query));
      renderMovies(filtered);
    });
    searchInput.addEventListener("keyup", (e) => { if(e.key === "Enter") searchBtn.click(); });
  }

  document.getElementById('movieModal').addEventListener('hidden.bs.modal', () => {
    modalVideo.src = "";
  });
});
