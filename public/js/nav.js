const createNav =() =>{
    let nav = document.querySelector('.navbar');

    nav.innerHTML =`
    <div class="nav">
    <h1 style="font-weight:600; font-size:40px; color: #ECE5C7">-Rangoli Palace-</h1>
    <div class="nav-items"></div>
</div>
<ul class="links-container">
    <li class="link-item"><a href="/index" class="link">Home</a></li>
    <li class="link-item"><a href="/add" class="link">Add</a></li>
    <li class="link-item"><a href="/search" class="link">Search</a></li>
    <li class="link-item"><a href="/update" class="link">Update</a></li>
    <li class="link-item"><a href="delete" class="link">Delete</a></li>
</ul>
    `;
}
createNav();


