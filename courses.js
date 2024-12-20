const courses = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "John Doe",
        category: "development",
        image: "https://via.placeholder.com/300x200",
        description: "Learn full-stack web development from scratch",
        price: 99.99,
        level: "beginner",
        rating: 4.8,
        students: 15234,
        duration: "30 hours",
        lectures: 280,
        featured: true,
        tags: ["html", "css", "javascript", "react", "node"]
    },
    {
        id: 2,
        title: "UI/UX Design Masterclass",
        instructor: "Sarah Wilson",
        category: "design",
        image: "https://via.placeholder.com/300x200",
        description: "Master modern UI/UX design principles",
        price: 89.99,
        level: "intermediate",
        rating: 4.7,
        students: 8567,
        duration: "25 hours",
        lectures: 180,
        featured: true,
        tags: ["ui", "ux", "figma", "design"]
    },
    {
        id: 3,
        title: "Python Programming Fundamentals",
        instructor: "Alex Johnson",
        category: "development",
        image: "https://via.placeholder.com/300x200",
        description: "Master Python programming from basics to advanced",
        price: 79.99,
        level: "beginner",
        rating: 4.9,
        students: 12000,
        duration: "28 hours",
        lectures: 200,
        featured: false,
        tags: ["python", "programming", "data science"]
    },
    {
        id: 4,
        title: "Digital Marketing Strategy",
        instructor: "Emily Brown",
        category: "marketing",
        image: "https://via.placeholder.com/300x200",
        description: "Learn effective digital marketing strategies",
        price: 69.99,
        level: "intermediate",
        rating: 4.6,
        students: 9800,
        duration: "20 hours",
        lectures: 150,
        featured: false,
        tags: ["marketing", "social media", "seo"]
    },
    {
        id: 5,
        title: "Machine Learning & AI Fundamentals",
        instructor: "Dr. Michael Chen",
        category: "development",
        image: "https://via.placeholder.com/300x200",
        description: "Comprehensive introduction to ML and AI concepts",
        price: 129.99,
        level: "advanced",
        rating: 4.9,
        students: 5600,
        duration: "40 hours",
        lectures: 300,
        featured: true,
        tags: ["machine learning", "ai", "python", "data science"]
    },
    {
        id: 6,
        title: "Financial Planning & Investment",
        instructor: "Robert Smith",
        category: "finance",
        image: "https://via.placeholder.com/300x200",
        description: "Learn personal finance and investment strategies",
        price: 59.99,
        level: "beginner",
        rating: 4.5,
        students: 7800,
        duration: "15 hours",
        lectures: 120,
        featured: false,
        tags: ["finance", "investment", "stocks", "planning"]
    },
    {
        id: 7,
        title: "Mobile App Development with Flutter",
        instructor: "Lisa Zhang",
        category: "development",
        image: "https://via.placeholder.com/300x200",
        description: "Build cross-platform mobile apps with Flutter",
        price: 94.99,
        level: "intermediate",
        rating: 4.8,
        students: 6300,
        duration: "32 hours",
        lectures: 240,
        featured: true,
        tags: ["flutter", "mobile", "dart", "app development"]
    },
    {
        id: 8,
        title: "Photography Masterclass",
        instructor: "David Miller",
        category: "photography",
        image: "https://via.placeholder.com/300x200",
        description: "Master the art of photography and photo editing",
        price: 79.99,
        level: "beginner",
        rating: 4.7,
        students: 4500,
        duration: "22 hours",
        lectures: 160,
        featured: false,
        tags: ["photography", "editing", "lightroom", "composition"]
    },
    {
        id: 9,
        title: "Data Science with R",
        instructor: "Emma Watson",
        category: "data science",
        image: "https://via.placeholder.com/300x200",
        description: "Comprehensive data analysis using R programming",
        price: 89.99,
        level: "advanced",
        rating: 4.6,
        students: 3200,
        duration: "35 hours",
        lectures: 220,
        featured: false,
        tags: ["R", "data analysis", "statistics", "visualization"]
    },
    {
        id: 10,
        title: "Graphic Design for Beginners",
        instructor: "Chris Anderson",
        category: "design",
        image: "https://via.placeholder.com/300x200",
        description: "Learn graphic design principles and tools",
        price: 69.99,
        level: "beginner",
        rating: 4.5,
        students: 8900,
        duration: "18 hours",
        lectures: 140,
        featured: false,
        tags: ["graphic design", "photoshop", "illustrator"]
    },
    {
        id: 11,
        title: "Blockchain Development",
        instructor: "James Wilson",
        category: "development",
        image: "https://via.placeholder.com/300x200",
        description: "Learn to build blockchain applications",
        price: 119.99,
        level: "advanced",
        rating: 4.8,
        students: 2800,
        duration: "45 hours",
        lectures: 280,
        featured: true,
        tags: ["blockchain", "ethereum", "smart contracts", "web3"]
    },
    {
        id: 12,
        title: "Content Marketing Strategy",
        instructor: "Sophie Turner",
        category: "marketing",
        image: "https://via.placeholder.com/300x200",
        description: "Master content creation and marketing",
        price: 74.99,
        level: "intermediate",
        rating: 4.6,
        students: 5600,
        duration: "20 hours",
        lectures: 160,
        featured: false,
        tags: ["content marketing", "strategy", "social media"]
    }
];

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCoursePage();
});

function initializeCoursePage() {
    setupMobileMenu();
    setupEventListeners();
    displayCourses();
    updateCourseCount();
}

// Mobile Menu Setup
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
            
            // Toggle between bars and times icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when window is resized
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
}

// Event Listeners Setup
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const levelFilter = document.getElementById('levelFilter');

    if (searchInput) searchInput.addEventListener('input', handleSearch);
    if (categoryFilter) categoryFilter.addEventListener('change', handleFilterChange);
    if (priceFilter) priceFilter.addEventListener('change', handleFilterChange);
    if (levelFilter) levelFilter.addEventListener('change', handleFilterChange);
}

// Search and Filter State
let searchTerm = '';
let filters = {
    category: '',
    price: '',
    level: ''
};

// Search Handler
function handleSearch(e) {
    searchTerm = e.target.value.toLowerCase();
    applyFilters();
}

// Filter Handler
function handleFilterChange(e) {
    filters[e.target.id.replace('Filter', '')] = e.target.value;
    applyFilters();
}

// Apply Filters
function applyFilters() {
    const filteredCourses = courses.filter(course => {
        const matchesSearch = 
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.tags.some(tag => tag.includes(searchTerm));

        const matchesCategory = !filters.category || course.category === filters.category;
        const matchesPrice = !filters.price || 
            (filters.price === 'free' && course.price === 0) ||
            (filters.price === 'paid' && course.price > 0);
        const matchesLevel = !filters.level || course.level === filters.level;

        return matchesSearch && matchesCategory && matchesPrice && matchesLevel;
    });

    displayCourses(filteredCourses);
    updateCourseCount(filteredCourses.length);
}

// Display Courses
function displayCourses(coursesToDisplay = courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    if (coursesToDisplay.length === 0) {
        coursesGrid.innerHTML = `
            <div class="no-courses">
                <i class="fas fa-search"></i>
                <h3>No Courses Found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    coursesGrid.innerHTML = coursesToDisplay.map(course => `
        <div class="course-card" data-course-id="${course.id}">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                ${course.featured ? '<span class="featured-badge">Featured</span>' : ''}
            </div>
            <div class="course-content">
                <div class="course-header">
                    <span class="course-category">${course.category}</span>
                    <span class="course-level">${course.level}</span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-video"></i> ${course.lectures} lectures</span>
                </div>
                <div class="course-stats">
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${course.rating}</span>
                    </div>
                    <div class="students">
                        <i class="fas fa-user"></i>
                        <span>${formatNumber(course.students)} students</span>
                    </div>
                </div>
                <div class="course-footer">
                    <div class="price">
                        ${course.price === 0 ? 
                            '<span class="free">Free</span>' : 
                            `<span>$${course.price.toFixed(2)}</span>`
                        }
                    </div>
                    <button class="btn btn-primary" onclick="enrollCourse(${course.id})">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update Course Count
function updateCourseCount(count = courses.length) {
    const courseCount = document.getElementById('courseCount');
    if (courseCount) {
        courseCount.textContent = `${count} ${count === 1 ? 'Course' : 'Courses'}`;
    }
}

// Enroll in Course
function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
        
        if (enrolledCourses.some(c => c.id === courseId)) {
            showNotification('You are already enrolled in this course!', 'warning');
            return;
        }

        enrolledCourses.push({
            ...course,
            enrollmentDate: new Date().toISOString(),
            progress: 0,
            lastAccessed: new Date().toISOString(),
            status: 'in-progress'
        });

        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        addActivity(`Enrolled in ${course.title}`, 'fa-graduation-cap');
        
        showNotification(`Successfully enrolled in ${course.title}!`, 'success');
        
        setTimeout(() => {
            showNotification(
                `View course in <a href="dashboard.html" style="color: white; text-decoration: underline;">Dashboard</a>`,
                'info'
            );
        }, 1000);
    }
}

// Helper Functions
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
}

function addActivity(text, icon = 'fa-clock') {
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    activities.unshift({
        text,
        icon,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('activities', JSON.stringify(activities.slice(0, 10)));
}

// Notification System
function showNotification(message, type = 'info', duration = 5000, actions = null) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let actionsHTML = '';
    if (actions) {
        actionsHTML = `
            <div class="notification-actions">
                ${actions.map(action => `
                    <button class="btn btn-${action.type}" onclick="${action.onClick}">
                        ${action.text}
                    </button>
                `).join('')}
            </div>
        `;
    }

    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <div class="notification-content">
            <span>${message}</span>
            ${actionsHTML}
        </div>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    container.appendChild(notification);

    // Add click event for close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    });

    // Handle auto-dismiss with pause on hover
    let timeoutId;
    if (duration > 0) {
        timeoutId = setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);

        // Pause timer on hover
        notification.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            notification.classList.add('paused');
        });

        // Resume timer on mouse leave
        notification.addEventListener('mouseleave', () => {
            notification.classList.remove('paused');
            timeoutId = setTimeout(() => {
                if (notification.parentElement) {
                    notification.classList.add('fade-out');
                    setTimeout(() => notification.remove(), 300);
                }
            }, duration);
        });
    }

    return notification;
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };
    return icons[type] || 'fa-bell';
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}