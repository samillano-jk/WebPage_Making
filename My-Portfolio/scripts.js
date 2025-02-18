// Function to scroll to a specific section on the page
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop, 
        behavior: 'smooth'
    });
}

// FUNCTION FOR HIDING AND SHOWING NAVBAR ------------------------------------------------------
let lastScrollTop = 0; // Track last scroll position
let scrollTimeout; // Timeout for hiding the navbar after scrolling stops
const navbar = document.getElementById("pillNav2"); // The navbar element

// Function to show the navbar
function showNavbar() {
  navbar.classList.remove("hidden"); // Show navbar
}

// Function to hide the navbar
function hideNavbar() {
  navbar.classList.add("hidden"); // Hide navbar
}

// Handle the scroll event
window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY;  // Get the current scroll position

  // Case 1: Show navbar when scrolling up, and not at the top
  if (currentScroll < lastScrollTop && currentScroll > 0) {
    showNavbar(); // Show navbar when scrolling up and not at the top
  }
  // Case 2: Hide navbar when scrolling down, and not at the top
  else if (currentScroll > lastScrollTop && currentScroll > 0) {
    hideNavbar(); // Hide navbar when scrolling down and not at the top
  }

  // Case 3: If at the top, the navbar stays visible
  if (currentScroll === 0) {
    showNavbar(); // Show navbar if at the top of the page
  }

  // Case 4: Clear any existing timeout when the user is scrolling
  clearTimeout(scrollTimeout);

  // Case 5: Set a timeout to hide the navbar after 2 seconds of inactivity
  scrollTimeout = setTimeout(function () {
    if (window.scrollY > 0) { // Only hide if not at the top
      hideNavbar(); // Hide navbar after 2 seconds of inactivity (unless at the top)
    }
  }, 1500); // Adjust this time as needed (in milliseconds)

  // Update lastScrollTop to the current scroll position
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent going below 0
});


// TYPING TEXT FUNCTION --------------------------------------------------------------------
// Select all paragraphs with the class 'typed-paragraph'
const typedParagraphs = document.querySelectorAll('.profile-desc');

// Function to start typing animation on a single paragraph
function startTypingAnimation(paragraph) {
  return new Promise((resolve) => {
    // Reset the animation by removing and adding the class again
    paragraph.classList.remove('typing');
    paragraph.style.width = "0"; // Reset width to 0
    void paragraph.offsetWidth; // Trigger reflow to restart the animation
    paragraph.classList.add('typing'); // Add typing class to restart animation
    
    // Listen for the end of the animation and resolve the promise
    paragraph.addEventListener('animationend', () => {
      resolve(); // Resolve the promise when the animation finishes
    });
  });
}

// Function to handle sequential typing
async function sequentialTyping() {
  // Loop through all paragraphs and type them sequentially
  for (let i = 0; i < typedParagraphs.length; i++) {
    const paragraph = typedParagraphs[i];
    // Wait for the current paragraph's animation to finish before starting the next
    await startTypingAnimation(paragraph);
  }
}

// Create an intersection observer to detect when any paragraph is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // If the paragraph is in view
    if (entry.isIntersecting) {
      // Reset typing for all paragraphs
      typedParagraphs.forEach(paragraph => {
        paragraph.classList.remove('typing'); // Remove the typing class
        paragraph.style.width = "0"; // Reset the width to restart typing
      });
      
      sequentialTyping(); // Start the typing animations sequentially
    }
  });
}, { threshold: .50 }); // Paragraph needs to be at least 50% in view

// Observe each typed paragraph
typedParagraphs.forEach(paragraph => {
  observer.observe(paragraph);
});
