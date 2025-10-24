// Fungsi untuk sidebar mobile
function initMobileSidebar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const sidebarBackdrop = document.createElement('div');
    
    // Create backdrop element
    sidebarBackdrop.className = 'sidebar-backdrop';
    document.body.appendChild(sidebarBackdrop);
    
    // Hanya buat tombol close jika di mobile
    if (window.innerWidth < 992) {
        const closeButton = document.createElement('button');
        closeButton.className = 'sidebar-close';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Close menu');
        navbarCollapse.appendChild(closeButton);
        
        // Event listener untuk tombol close
        closeButton.addEventListener('click', closeSidebar);
    }
    
    // Open sidebar
    function openSidebar() {
        navbarCollapse.classList.add('show');
        sidebarBackdrop.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Close sidebar
    function closeSidebar() {
        navbarCollapse.classList.remove('show');
        sidebarBackdrop.classList.remove('show');
        document.body.style.overflow = '';
        
        // Juga tutup dropdown jika terbuka
        const openDropdown = navbarCollapse.querySelector('.show');
        if (openDropdown) {
            // Untuk dropdown menu
            if (openDropdown.classList.contains('dropdown-menu')) {
                openDropdown.classList.remove('show');
            }
        }
    }
    
    // Event listeners
    if (navbarToggler) {
        navbarToggler.addEventListener('click', openSidebar);
    }
    
    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar when clicking on nav links (except dropdown toggle)
    const navLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // Handle dropdown in sidebar - hanya di mobile
    if (window.innerWidth < 992) {
        const dropdownToggles = navbarCollapse.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            // Hapus event listener default Bootstrap
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdownMenu = this.nextElementSibling;
                const isShowing = dropdownMenu.classList.contains('show');
                
                // Close all other dropdowns
                const allDropdowns = navbarCollapse.querySelectorAll('.dropdown-menu');
                allDropdowns.forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                    }
                });
                
                // Toggle current dropdown
                dropdownMenu.classList.toggle('show');
                
                // Update aria-expanded
                this.setAttribute('aria-expanded', !isShowing);
            });
        });
    }
    
    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            closeSidebar();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992 && navbarCollapse.classList.contains('show')) {
            closeSidebar();
        }
    });
}

// Fungsi untuk navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero-section') || document.querySelector('.page-header');
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.remove('navbar-top');
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('navbar-top');
        }
    }
    
    // Set initial state
    if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        if (window.scrollY > heroHeight * 0.1) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.add('navbar-top');
        }
    } else {
        navbar.classList.add('navbar-scrolled');
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateNavbar);
}

function initSearchFunctionality() {
    const desktopSearchBtn = document.getElementById('desktopSearchBtn');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    
    if (desktopSearchBtn) {
        desktopSearchBtn.addEventListener('click', function() {
            searchOverlay.style.display = 'block';
            document.getElementById('searchInput').focus();
        });
    }
    
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function() {
            searchOverlay.style.display = 'block';
            document.getElementById('searchInput').focus();
        });
    }
    
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', function() {
            searchOverlay.style.display = 'none';
        });
    }
    
    // Close search when clicking outside
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.style.display = 'none';
        }
    });
}

// Fungsi pencarian
function initSearch() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const searchResults = document.getElementById('searchResults');
        
        // Kosongkan hasil pencarian sebelumnya
        searchResults.innerHTML = '';
        
        if (searchTerm.trim() === '') {
            searchResults.innerHTML = '<p class="text-muted">Please enter a search term.</p>';
            return;
        }
        
        // Daftar halaman yang akan dicari
        const pagesToSearch = [
            { title: 'Home', content: 'Welcome to Our Company. We are a leading provider of high-quality silica and quartz sand products.', link: 'index.html' },
            { title: 'About Us', content: 'Founded in 2005, our company has grown to become a trusted name in the industrial minerals sector.', link: 'about.html' },
            { title: 'QA/QC Management', content: 'Ensuring product quality through rigorous testing and quality control processes.', link: 'qaqc.html' },
            { title: 'HSE Policy', content: 'Health, Safety, and Environment (HSE) are integral to our operations.', link: 'hse.html' },
            { title: 'Products - Silica Sand', content: 'High-purity silica sand with excellent physical and chemical properties for industrial applications.', link: 'silica-sand.html' },
            { title: 'Products - Quartz Sand', content: 'Premium quartz sand with high silica content and consistent grain size for specialized applications.', link: 'quartz-sand.html' },
            { title: 'Site Location', content: 'Our strategic locations ensure efficient supply to customers worldwide.', link: 'location.html' },
            { title: 'Contact Us', content: 'Get in touch with our team for inquiries and support.', link: 'contact.html' }
        ];
        
        // Filter halaman berdasarkan kata kunci
        const results = pagesToSearch.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.content.toLowerCase().includes(searchTerm)
        );
        
        // Tampilkan hasil pencarian
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="text-muted">No results found for "' + searchTerm + '".</p>';
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <h5>${result.title}</h5>
                    <p class="mb-1">${result.content.substring(0, 150)}...</p>
                    <small class="text-primary">Click to view</small>
                `;
                resultItem.addEventListener('click', function() {
                    window.location.href = result.link;
                    document.getElementById('searchOverlay').style.display = 'none';
                });
                searchResults.appendChild(resultItem);
            });
        }
    }
}

// Highlight active menu item
function highlightActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref && linkHref.includes(currentPage.replace('.html', '')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Form submission handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileSidebar();
    initNavbarScroll();
    initSearchFunctionality();
    initSearch();
    highlightActiveMenu();
    initContactForm();
});