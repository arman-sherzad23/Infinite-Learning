// Course Data
const courses = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        instructor: "John Doe",
        category: "development",
        image: "https://via.placeholder.com/300x200",
        description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
        price: "$49.99",
        rating: 4.5,
        students: 1234,
        featured: true
    },
    {
        id: 2,
        title: "UI/UX Design Masterclass",
        instructor: "Jane Smith",
        category: "design",
        image: "https://via.placeholder.com/300x200",
        description: "Master the principles of user interface and user experience design.",
        price: "$59.99",
        rating: 4.8,
        students: 856,
        featured: false
    },
    {
        id: 3,
        title: "Business Analytics",
        instructor: "Mike Johnson",
        category: "business",
        image: "https://via.placeholder.com/300x200",
        description: "Learn data analysis for business decision making.",
        price: "$69.99",
        rating: 4.6,
        students: 945,
        featured: true
    },
    {
        id: 4,
        title: "Advanced JavaScript",
        instructor: "Sarah Wilson",
        category: "development",
        image: "https://via.placeholder.com/300x200",
        description: "Master advanced JavaScript concepts and modern frameworks.",
        price: "$79.99",
        rating: 4.7,
        students: 1567,
        featured: false
    },
    {
        id: 5,
        title: "Graphic Design Essentials",
        instructor: "Tom Brown",
        category: "design",
        image: "https://via.placeholder.com/300x200",
        description: "Learn essential graphic design skills and tools.",
        price: "$54.99",
        rating: 4.4,
        students: 723,
        featured: false
    }
];

// DOM Elements
const courseGrid = document.getElementById('courseGrid');
const filterButtons = document.querySelectorAll('.btn-filter');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Course Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        filterCourses(category);
    });
});

function filterCourses(category) {
    const filteredCourses = category === 'all' 
        ? courses 
        : courses.filter(course => course.category === category);
    
    displayCourses(filteredCourses);
}

// Display Courses
function displayCourses(coursesToShow = courses) {
    courseGrid.innerHTML = coursesToShow.map(course => `
        <div class="course-card" data-category="${course.category}" data-featured="${course.featured}">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-content">
                <div class="course-category">${course.category}</div>
                <h3>${course.title}</h3>
                <p class="instructor">By ${course.instructor}</p>
                <p class="description">${course.description}</p>
                <div class="course-meta">
                    <span class="rating">
                        <i class="fas fa-star"></i> ${course.rating}
                    </span>
                    <span class="students">
                        <i class="fas fa-user"></i> ${course.students} students
                    </span>
                </div>
                <div class="course-price-action">
                    <span class="price">${course.price}</span>
                    <button class="enroll-btn" onclick="enrollCourse(${course.id})">
                        <i class="fas fa-graduation-cap"></i>
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Enroll Course
function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        showNotification(`Successfully enrolled in ${course.title}!`, 'success');
    }
}

// Newsletter Subscription
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    
    if (validateEmail(email)) {
        showNewsletterMessage('Thank you for subscribing!', 'success');
        newsletterForm.reset();
    } else {
        showNewsletterMessage('Please enter a valid email address.', 'error');
    }
});

// Utility Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNewsletterMessage(message, type) {
    newsletterMessage.textContent = message;
    newsletterMessage.className = `newsletter-message ${type}`;
    
    setTimeout(() => {
        newsletterMessage.textContent = '';
        newsletterMessage.className = 'newsletter-message';
    }, 3000);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayCourses();
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .course-card {
        animation: fadeIn 0.5s ease;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.5s ease;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .notification.success {
        background: #28a745;
    }

    .notification.error {
        background: #dc3545;
    }
`;
document.head.appendChild(style);