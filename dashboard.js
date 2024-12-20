// Global variable for course removal
let currentCourseToRemove = null;

document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

function initializeDashboard() {
    displayEnrolledCourses();
    loadActivities();
    setupEventListeners();
    updateDashboardStats();
    updateUserName();
}

function updateUserName() {
    const userNameElement = document.getElementById('userName');
    const userName = localStorage.getItem('userName') || 'Student';
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
}

function setupEventListeners() {
    // View toggle buttons
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('enrolledCoursesGrid').className = 
                `enrolled-courses-grid ${btn.dataset.view}-view`;
        });
    });

    // Refresh activity button
    const refreshBtn = document.getElementById('refreshActivity');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            // Add loading state
            refreshBtn.classList.add('loading');
            refreshBtn.innerHTML = `
                <i class="fas fa-sync-alt"></i>
                <span>Refreshing...</span>
            `;

            // Simulate loading delay
            setTimeout(() => {
                loadActivities();
                
                // Remove loading state
                refreshBtn.classList.remove('loading');
                refreshBtn.innerHTML = `
                    <i class="fas fa-sync-alt"></i>
                    <span>Refresh</span>
                `;
                
                showNotification('Activities refreshed!', 'success');
            }, 1000);
        });
    }

    // Event listener for ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('removeModal');
            if (modal) {
                closeRemoveModal();
            }
        }
    });

    // Event listener for clicking outside modal to close
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('removeModal');
        if (modal && e.target.classList.contains('modal-overlay')) {
            closeRemoveModal();
        }
    });
}

function displayEnrolledCourses() {
    const enrolledCoursesGrid = document.getElementById('enrolledCoursesGrid');
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];

    if (enrolledCourses.length === 0) {
        enrolledCoursesGrid.innerHTML = `
            <div class="no-courses">
                <i class="fas fa-book-reader"></i>
                <h3>No Enrolled Courses</h3>
                <p>Start learning today by enrolling in our courses!</p>
                <a href="courses.html" class="btn btn-primary">
                    <i class="fas fa-search"></i> Browse Courses
                </a>
            </div>
        `;
        return;
    }

    enrolledCoursesGrid.innerHTML = enrolledCourses.map(course => `
        <div class="enrolled-course-card">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                <div class="course-progress-bar">
                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <button class="remove-course-btn" 
                        onclick="event.stopPropagation(); confirmRemoveCourse(${course.id})" 
                        aria-label="Remove course">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="course-content">
                <div class="course-header">
                    <span class="course-category">${course.category}</span>
                    <span class="course-status ${course.progress === 100 ? 'completed' : 'in-progress'}">
                        ${course.progress === 100 ? 'Completed' : 'In Progress'}
                    </span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <div class="course-instructor">
                    <img src="https://via.placeholder.com/30" alt="${course.instructor}" class="instructor-avatar">
                    <span>${course.instructor}</span>
                </div>
                <div class="course-meta">
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-video"></i> ${course.lectures} lectures</span>
                    <span><i class="fas fa-calendar-alt"></i> Enrolled: ${formatDate(course.enrollmentDate)}</span>
                </div>
                <div class="progress-info">
                    <div class="progress-text">
                        <span>Progress: ${course.progress}%</span>
                        <span>Last accessed: ${formatDate(course.lastAccessed)}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${course.progress}%"></div>
                    </div>
                </div>
                <div class="course-actions">
                    <button class="btn btn-primary" onclick="continueCourse(${course.id})">
                        <i class="fas fa-play-circle"></i> Continue Learning
                    </button>
                    <button class="btn btn-secondary" onclick="updateProgress(${course.id})">
                        <i class="fas fa-chart-line"></i> Update Progress
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    updateDashboardStats();
}

function updateDashboardStats() {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    const totalCourses = enrolledCourses.length;
    const completedCourses = enrolledCourses.filter(course => course.progress === 100).length;
    const totalHours = enrolledCourses.reduce((acc, course) => {
        return acc + parseInt(course.duration);
    }, 0);

    document.getElementById('enrolledCount').textContent = totalCourses;
    document.getElementById('completedCount').textContent = completedCourses;
    document.getElementById('totalHours').textContent = `${totalHours}h`;
}

function loadActivities() {
    const timeline = document.getElementById('activityTimeline');
    if (!timeline) return;

    // Show loading state
    timeline.innerHTML = `
        <div class="loading-activities">
            <div class="loading-spinner"></div>
            <p>Loading activities...</p>
        </div>
    `;

    // Get activities from localStorage
    const activities = JSON.parse(localStorage.getItem('activities')) || [];

    // Simulate network delay
    setTimeout(() => {
        if (activities.length === 0) {
            timeline.innerHTML = `
                <div class="no-activities">
                    <i class="fas fa-history"></i>
                    <h3>No Recent Activities</h3>
                    <p>Your learning activities will appear here</p>
                </div>
            `;
            return;
        }

        timeline.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas ${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span class="activity-time">${formatDate(activity.timestamp)}</span>
                </div>
            </div>
        `).join('');
    }, 500);
}

function confirmRemoveCourse(courseId) {
    currentCourseToRemove = courseId;
    const course = JSON.parse(localStorage.getItem('enrolledCourses'))
        .find(c => c.id === courseId);

    // Create and show modal
    const modalHTML = `
        <div class="modal-overlay" id="removeModal">
            <div class="confirmation-modal">
                <h3>Remove Course</h3>
                <p>Are you sure you want to remove "${course.title}"? This action cannot be undone.</p>
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="closeRemoveModal()">
                        Cancel
                    </button>
                    <button class="btn btn-danger" onclick="executeRemoveCourse()">
                        Remove Course
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal with animation
    setTimeout(() => {
        document.getElementById('removeModal').classList.add('active');
    }, 10);
}

function closeRemoveModal() {
    const modal = document.getElementById('removeModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
        currentCourseToRemove = null;
    }, 300);
}

function executeRemoveCourse() {
    if (!currentCourseToRemove) return;

    let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    const courseToRemove = enrolledCourses.find(course => course.id === currentCourseToRemove);
    
    if (courseToRemove) {
        enrolledCourses = enrolledCourses.filter(course => course.id !== currentCourseToRemove);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        
        // Close modal
        closeRemoveModal();
        
        // Update UI and show notification
        displayEnrolledCourses();
        addActivity(`Removed course: ${courseToRemove.title}`, 'fa-trash-alt');
        showNotification('Course removed successfully', 'success');
    }
}

function updateProgress(courseId) {
    let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    const courseIndex = enrolledCourses.findIndex(course => course.id === courseId);
    
    if (courseIndex !== -1) {
        const newProgress = Math.min(100, enrolledCourses[courseIndex].progress + 10);
        enrolledCourses[courseIndex].progress = newProgress;
        enrolledCourses[courseIndex].lastAccessed = new Date().toISOString();
        
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        
        displayEnrolledCourses();
        addActivity(`Updated progress in ${enrolledCourses[courseIndex].title}`, 'fa-chart-line');
        
        if (newProgress === 100) {
            showNotification('Congratulations! You\'ve completed the course!', 'success');
        } else {
            showNotification('Progress updated successfully', 'success');
        }
    }
}

function continueCourse(courseId) {
    const course = JSON.parse(localStorage.getItem('enrolledCourses'))
        .find(c => c.id === courseId);
    
    if (course) {
        // Update last accessed time
        let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses'));
        const courseIndex = enrolledCourses.findIndex(c => c.id === courseId);
        enrolledCourses[courseIndex].lastAccessed = new Date().toISOString();
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        
        // Add activity
        addActivity(`Started learning ${course.title}`, 'fa-play-circle');
        
        // Show notification
        showNotification('Redirecting to course content...', 'info');
        
        // Redirect to course content (you can modify this as needed)
        setTimeout(() => {
            window.location.href = `course-viewer.html?id=${courseId}`;
        }, 1000);
    }
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
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
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    container.appendChild(notification);
    
    if (duration > 0) {
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
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