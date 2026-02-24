class Dashboard {
  constructor() {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();

    this.initElements();
    this.initEventListeners();
    this.initCalendar();
    this.updateCurrentDate();
    this.initTheme();
  }

  initElements() {
    // Navigation
    this.navItems = document.querySelectorAll(".nav-item");
    this.pages = document.querySelectorAll(".page");

    // Sidebar
    this.sidebar = document.getElementById("sidebar");
    this.mobileMenu = document.getElementById("mobileMenu");

    // Notifications
    this.notificationsBtn = document.getElementById("notificationsBtn");
    this.notificationsPanel = document.getElementById("notificationsPanel");
    this.closeNotifications = document.getElementById("closeNotifications");

    // Theme
    this.themeToggle = document.getElementById("themeToggle");

    // Search
    this.searchInput = document.getElementById("searchInput");

    // Calendar
    this.prevMonthBtn = document.getElementById("prevMonth");
    this.nextMonthBtn = document.getElementById("nextMonth");
    this.currentMonthYear = document.getElementById("currentMonthYear");
    this.calendarGrid = document.getElementById("calendarGrid");

    // Add Event
    this.addEventBtn = document.getElementById("addEventBtn");

    // Theme Select
    this.themeSelect = document.getElementById("themeSelect");
  }

  initEventListeners() {
    // Navigation
    this.navItems.forEach((item) => {
      item.addEventListener("click", () => this.switchPage(item));
    });

    // Mobile menu
    if (this.mobileMenu) {
      this.mobileMenu.addEventListener("click", () => {
        this.sidebar.classList.toggle("active");
      });
    }

    // Notifications
    if (this.notificationsBtn) {
      this.notificationsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.notificationsPanel.classList.toggle("open");
      });
    }

    if (this.closeNotifications) {
      this.closeNotifications.addEventListener("click", () => {
        this.notificationsPanel.classList.remove("open");
      });
    }

    // Close notifications when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.notificationsPanel &&
        !this.notificationsPanel.contains(e.target) &&
        !this.notificationsBtn.contains(e.target)
      ) {
        this.notificationsPanel.classList.remove("open");
      }
    });

    // Theme toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
    }

    // Theme select in settings
    if (this.themeSelect) {
      this.themeSelect.addEventListener("change", (e) => {
        if (e.target.value === "dark") {
          document.body.classList.add("dark-theme");
          const icon = this.themeToggle.querySelector("i");
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
          localStorage.setItem("theme", "dark");
        } else if (e.target.value === "light") {
          document.body.classList.remove("dark-theme");
          const icon = this.themeToggle.querySelector("i");
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
          localStorage.setItem("theme", "light");
        }
      });
    }

    // Search with Cmd+K
    if (this.searchInput) {
      document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          this.searchInput.focus();
        }
      });

      this.searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
          alert(`🔍 Searching for: ${e.target.value}`);
          e.target.value = "";
        }
      });
    }

    // Calendar navigation
    if (this.prevMonthBtn) {
      this.prevMonthBtn.addEventListener("click", () => this.changeMonth(-1));
    }

    if (this.nextMonthBtn) {
      this.nextMonthBtn.addEventListener("click", () => this.changeMonth(1));
    }

    // Add event
    if (this.addEventBtn) {
      this.addEventBtn.addEventListener("click", () => {
        alert("📅 Add Event - This would open a modal form in production");
      });
    }

    // Close sidebar on mobile when clicking outside
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        if (
          !this.sidebar.contains(e.target) &&
          !this.mobileMenu.contains(e.target)
        ) {
          this.sidebar.classList.remove("active");
        }
      }
    });

    // Settings switches
    document.querySelectorAll(".switch input").forEach((switch_) => {
      switch_.addEventListener("change", (e) => {
        const setting = e.target.id;
        const state = e.target.checked ? "enabled" : "disabled";
        alert(`⚙️ ${setting} ${state}`);
      });
    });
  }

  switchPage(selectedItem) {
    // Update active nav item
    this.navItems.forEach((item) => item.classList.remove("active"));
    selectedItem.classList.add("active");

    // Get page ID
    const pageId = selectedItem.getAttribute("data-page");

    // Hide all pages
    this.pages.forEach((page) => page.classList.remove("active"));

    // Show selected page
    const activePage = document.getElementById(`${pageId}-page`);
    if (activePage) {
      activePage.classList.add("active");
    }

    // Close sidebar on mobile
    if (window.innerWidth <= 1024) {
      this.sidebar.classList.remove("active");
    }

    // Show feedback
    console.log(`Navigated to ${pageId} page`);
  }

  initTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      const icon = this.themeToggle?.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
      if (this.themeSelect) {
        this.themeSelect.value = "dark";
      }
    }
  }

  toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const icon = this.themeToggle.querySelector("i");

    if (document.body.classList.contains("dark-theme")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
      if (this.themeSelect) {
        this.themeSelect.value = "dark";
      }
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
      if (this.themeSelect) {
        this.themeSelect.value = "light";
      }
    }
  }

  updateCurrentDate() {
    const dateElement = document.getElementById("currentDate");
    if (dateElement) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      dateElement.textContent = new Date().toLocaleDateString("en-US", options);
    }
  }

  initCalendar() {
    this.renderCalendar();
  }

  changeMonth(delta) {
    this.currentMonth += delta;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.renderCalendar();
  }

  renderCalendar() {
    if (!this.calendarGrid || !this.currentMonthYear) return;

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.currentMonthYear.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;

    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0,
    ).getDate();

    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === this.currentMonth &&
      today.getFullYear() === this.currentYear;
    const todayDate = today.getDate();

    // Clear grid
    this.calendarGrid.innerHTML = "";

    // Add empty cells
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.className = "calendar-day empty";
      this.calendarGrid.appendChild(emptyDay);
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.className = "calendar-day";

      if (isCurrentMonth && day === todayDate) {
        dayElement.classList.add("today");
      }

      // Randomly mark some days with events (for demo)
      if (Math.random() > 0.7) {
        dayElement.classList.add("has-event");
      }

      dayElement.textContent = day;

      dayElement.addEventListener("click", () => {
        alert(
          `📅 Selected: ${monthNames[this.currentMonth]} ${day}, ${this.currentYear}`,
        );
      });

      this.calendarGrid.appendChild(dayElement);
    }
  }
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  new Dashboard();
});
