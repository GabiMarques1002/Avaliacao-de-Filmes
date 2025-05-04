function redirectToLogin(){
    window.location.href = "./login.html"
}
function scrollGallery(direction) {
    const gallery = document.getElementById('gallery');
    const scrollAmount = 220; // Distância que cada clique irá mover (largura da imagem + margem)

    gallery.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
};