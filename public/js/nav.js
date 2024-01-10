const createNav =() =>{
    let nav = document.querySelector('.navbar');

    nav.innerHTML =`
    <div class="nav">
    <img src="../img/rpb.png" class="brand-logo" alt="">
    <img src="../img/rangoli.png" class="brand-logo2" alt="">
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


