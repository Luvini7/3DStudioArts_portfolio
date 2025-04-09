//one-page-scroll-effect
window.addEventListener("scroll", () => {
    let sections = document.querySelectorAll("section");
    let navlinks = document.querySelectorAll("nav ul li a");

    sections.forEach((sec, index) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            navlinks.forEach(link => link.classList.remove("active"));
            navlinks[index].classList.add("active");
        }
    });
});

// Rolagem suave ao clicar nos links da navbar
document.querySelectorAll("nav ul li a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault(); // Impede o comportamento padrão

        let targetId = this.getAttribute("href"); // Obtém o id do destino
        let targetSection = document.querySelector(targetId);

        if (targetSection) {
            let offsetTop = targetSection.offsetTop; // Pega a posição da seção

            window.scrollTo({
                top: offsetTop, // Move para a posição correta
                behavior: "smooth" // Ativa a rolagem suave
            });
        }
    });
});

//header-scroll
window.onscroll = function() {
    let header = document.querySelector('header');
    if (window.scrollY > 50) {  //quando a janela tiver rolado mais de 50px pra cima
        header.classList.add('scrolled') //adicionar o efeito
    } else { //quando a janela tiver no topo
        header.classList.remove('scrolled') //remove o efeito
    }
};

//header autohide/reveal
if (window.innerWidth <= 1023) {
    let lastScroll = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Rolando pra baixo
            header.classList.add("hide-header");
        } else {
            // Rolando pra cima
            header.classList.remove("hide-header");
        }

        lastScroll = currentScroll;
    });
}

//home-slider
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".slider img");
    let currentIndex = 0;

    function changeImage() {
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add("active");
    }

    images[currentIndex].classList.add("active");
    setInterval(changeImage, 4000); // Troca de imagem a cada 4 segundos
});

//menu-toogle
class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
        this.closeMenuOnClick = this.closeMenuOnClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation = link.style.animation
                ? ""
                : `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    closeMenuOnClick() {
        this.navList.classList.remove(this.activeClass);
        this.mobileMenu.classList.remove(this.activeClass);
        this.navLinks.forEach(link => link.style.animation = ""); // Remove animação
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
        this.navLinks.forEach(link => link.addEventListener("click", this.closeMenuOnClick));
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    "header nav ul",
    "header nav ul li"
);
mobileNavbar.init();

//loadMore button
document.getElementById('btn-loadMore').addEventListener('click', function() {
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    hiddenItems.forEach(item => item.classList.remove('hidden'));

    const btnContainer = this.parentElement; // .btn-loadMore
    btnContainer.remove(); // Remove o contêiner inteiro do botão (e a margem dele)

    this.style.display = 'none'; // Oculta o botão após expandir as imagens
});

//lightbox
//Para abrir as imagens
document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeButton = document.querySelector(".lightbox-close");
    const prevButton = document.querySelector(".lightbox-prev");
    const nextButton = document.querySelector(".lightbox-next");
    let currentIndex = 0;

    // Quando a imagem da galeria for clicada
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            currentIndex = index;  // Atualiza o índice da imagem clicada
            openLightbox(item.src); // Abre a lightbox com a imagem clicada
        });
    });

    // Ações dos botões
    closeButton.addEventListener("click", closeLightbox); // Fecha a lightbox
    prevButton.addEventListener("click", () => changeImage(-1)); // Navega para a imagem anterior
    nextButton.addEventListener("click", () => changeImage(1)); // Navega para a imagem seguinte

    // Função para abrir a lightbox
    function openLightbox(src) {
        lightboxImg.src = src; // Atualiza a imagem na lightbox
        lightbox.classList.add("active"); // Torna a lightbox visível
    }

    // Função para fechar a lightbox
    function closeLightbox() {
        lightbox.classList.remove("active"); // Torna a lightbox invisível
    }

    // Função para mudar a imagem
    function changeImage(direction) {
        currentIndex += direction; // Incrementa ou decrementa o índice
        if (currentIndex < 0) {
            currentIndex = galleryItems.length - 1; // Se chegar à primeira, vai para a última
        } else if (currentIndex >= galleryItems.length) {
            currentIndex = 0; // Se chegar à última, vai para a primeira
        }
        lightboxImg.src = galleryItems[currentIndex].src; // Atualiza a imagem da lightbox
    }
});

//Para abrir os vídeos
function openModal(videoSrc) {
    document.getElementById('videoModal').style.display = 'flex';
    document.getElementById('modalVideo').src = videoSrc + "?autoplay=1";
}

function closeModal() {
    document.getElementById('videoModal').style.display = 'none';
    // Remove o src para interromper o vídeo ao fechar o modal
    document.getElementById('modalVideo').src = "";
}

//carregamento automático de video do youtube - lazy video
document.addEventListener("DOMContentLoaded", function () {
    const lazyVideos = document.querySelectorAll("iframe.lazy-video");

    const observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            const src = iframe.getAttribute("data-src");
            if (src) {
              iframe.setAttribute("src", src);
              iframe.removeAttribute("data-src");
            }
            observer.unobserve(iframe);
          }
        });
      },
      {
        rootMargin: "0px 0px 200px 0px", // começa a carregar um pouco antes de aparecer
        threshold: 0.1,
      }
    );

    lazyVideos.forEach(function (iframe) {
      observer.observe(iframe);
    });
});