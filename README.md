# CodeChef Contest Scraper

### ✨ Overview  
The **CodeChef Contest Scraper** is a web scraping application built with Node.js, Express, and Puppeteer. It retrieves and structures contest rankings data from CodeChef, providing users with detailed information about contestants, scores, and problem-wise performance for a specific institution or contest.

---

### 🛠️ Key Features  
- **Customizable Scraping**:  
  Retrieve rankings data for a specific contest and category by passing query parameters.  
- **Institution-Specific Filtering**:  
  Scrapes rankings filtered by a specific institution (e.g., "Indian Institute of Information Technology Design and Manufacturing, Kurnool").  
- **Structured JSON Response**:  
  Transforms scraped table data into a clean, structured JSON format for easy consumption.  
- **Problem-Wise Breakdown**:  
  Includes problem-wise scores for each contestant in the response.  
- **Optimized Puppeteer Setup**:  
  Configured for production environments with headless browsing and sandboxing disabled.

---

### 📝 How It Works  
1. **Endpoint**:  
   The project exposes a single endpoint:  
   ```http
   GET /scrape
