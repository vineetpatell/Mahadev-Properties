 an enterprise-grade, custom-coded, high-end multi-page Real Estate web application for "Mahadev Property" using React 18, Tailwind CSS, Framer Motion, and lucide-react. The application must feature proper page routing via React Router DOM across a clean multi-page setup. Avoid generic AI template aesthetics; design it like a high-end architectural developer portfolio with sharp geometric precision, asymmetric layouts, and production-level micro-interactions.

--- CLEAN PRODUCTION DESIGN & GLOBAL THEME ---
- Theme & Colors: Premium Luxury Dark Aesthetic. Canvas background is Deep Charcoal-Obsidian (#060813 / #0A0E1A), Text in absolute White and muted Muted Slate (#94A3B8). Highlight/Accent color is Matte Brushed Gold (#C5A880) used precisely for micro-details, elegant borders, and clean interactive elements.
- Typography: Use a razor-sharp modern sans-serif (Inter/Geist-style sans). Headings must have strong weight tracking with tracking-tight styles.
- Animations (High-End Developer Standard): 
  - Smooth Page Reveals: Use Framer Motion's staggered child animations for section content reveal on scroll. No aggressive 3D flips. Use elegant opacity + Y-axis slide transitions.
  - Interactive Magnetic Buttons: All major CTA buttons must exhibit a smooth magnetic scale and internal glow shifting on hover.
  - Infinite Architectural Ticker: Implement an error-free infinite auto-scrolling slider component showcasing fast project blueprints or property wireframes across the background sections.
- Global Layouts: 
  - Sticky Ultra-Thin Frosted Navbar: Contains a minimalist Logo (Mahadev Property) and sharp navigation buttons: [Home], [Properties], [About Us], [Services], [Contact Us].
  - Clean Minimalist Footer: Standard grid containing secondary navigation, professional compliance metadata, complete Malad West address details, phone, and direct corporate email.
  - Floating Action UI: A sleek, minimal, glowing WhatsApp chat assistant widget in the bottom-right corner linked directly to +919152383586.

--- PAGE 1: ARCHITECTURAL HOME PAGE ---
- Hero Frame: High-end developer layout. Left side uses massive bold typography: "Find Your Dream Space With Trust & Transparency" paired with clean, ultra-thin subtext detailing premium development solutions. Two sleek, matte-gold framed CTA buttons ("View Portfolio" & "Request Briefing"). Right side features an asymmetrical layered media layout displaying a razor-sharp high-rise residential structure render visual using premium architectural photography placeholders.
- Advanced Real-Time Search Dashboard: A bento-style structured search panel with absolute filters for: Location (e.g., Malad West), Configuration Class (1RK, 1BHK, 2BHK, 3BHK, Commercial), Price Range, and Property Status.
- Interactive Client Feedback Board: Placed cleanly at the bottom container. Features an error-free local state review sub-system. Users can input Name, toggle interactive gold-glowing star icons, write text descriptions, and hit a "Submit Review" action button which appends the submission smoothly into a grid layout using clean React state management. Pre-populate with two highly polished dummy test reviews.

--- PAGE 2: PREMIUM PROPERTIES LISTING PORTAL ---
- Layout Architecture: Header title reads "Premium Portfolios" accented by a thin gold geometric line. 
- Live Filtering Mechanism: Horizontal sleek pill buttons acting as instantaneous content switchers (All, 1RK, 1BHK, 2BHK, 3BHK, Commercial Space, Flats for Sale, Independent Houses). Clicking a pill filters the main data array dynamically with 0ms visual lag.
- Premium Property Grid: A clean asymmetric grid housing 6 high-converting pre-seeded property mockups (comprising 1RK Studio, 1BHK Apartment, 2BHK Luxury Unit, 3BHK Villa, Main-Road Commercial Office, and a High-Floor Flat for Sale).
- Property Cards UI: Each card features a clean image, a minimalist technical spec tag (e.g., "950 sq.ft • East Facing • Vastu Compliant"), a bold location label (Malad West), pricing, and a custom action link: "View Blueprint Details".

--- PAGE 3: DYNAMIC PROPERTY BLUEPRINT DETAILS (Routable via /property/:id) ---
- Robust Params Integration: Read dynamic route identifiers safely via useParams() with robust data fallbacks to handle unexpected index calls cleanly without breaking UI execution.
- 2-Column Luxury Grid:
  - Left Media Column: High-resolution featured picture frame paired with a clean horizontal layout showing interior architecture layout wireframes. Clicking a mockup image fires an overlay modal showing a virtual tour mockup interface.
  - Right Specification Dashboard: Displays the chosen property name, exact pricing metrics, specific detailed address, and an icon-mapped grid outlining structural technicalities (Configuration, Carppet Area, Semi-Furnished status, Parking allotments). Includes a glowing glassmorphic "Book Private Site Visit" data form and a custom WhatsApp action string passing the exact property name natively to +919152383586.

--- PAGE 4: BENTO-GRID ABOUT US PAGE ---
- Layout Concept: A beautiful asymmetric Bento Grid box layout.
  - Large Primary Box: Holds the core narrative: "Mahadev Property is a trusted real estate and property development company committed to delivering quality residential, commercial, and land development solutions. We specialize in property sales, purchases, investments, and development, helping clients find the right opportunities with confidence and transparency. Our focus is on developing and promoting well-planned projects that offer long-term value, modern infrastructure, and excellent connectivity. Whether it's residential plots, apartments, villas, commercial spaces, or investment properties, we strive to provide reliable and customer-focused real estate services. At Mahadev Property, we believe in integrity, professionalism, and customer satisfaction. Our experienced team works closely with clients to understand their needs and provide personalized guidance throughout the buying, selling, or investment process."
  - Two Secondary Side-by-Side Boxes: Distinctively highlighting "Our Mission" and "Our Vision" using sharp minimal iconography.
    * Mission: To build trust through quality developments, transparent business practices, and exceptional customer service while creating valuable real estate opportunities for individuals and businesses.
    * Vision: To become a leading and trusted name in the real estate industry by delivering sustainable developments and helping clients achieve their property ownership and investment goals.

--- PAGE 5: SERVICES LOGISTICS HUB ---
- Grid Layout: A geometrically clean 3-column structural layout hosting the 7 essential developer services mapped to clean, solid lucide-react icons:
  1. Residential Property Development (Home)
  2. Commercial Property Development (Building)
  3. Plot and Land Sales (Map)
  4. Property Buying & Selling Assistance (Handshake)
  5. Real Estate Investment Consulting (TrendingUp)
  6. Project Marketing and Sales (Megaphone)
  7. Property Management Services (ShieldCheck)
- Interactive Section Addition: Directly below the grid layout, construct a fully working interactive Property EMI & Investment Calculator using smooth, responsive input sliders. Real-time state shifts must recalculate exact monthly liabilities instantly and display the metrics via a highly clean HTML/CSS ring chart without layout breakage.

--- PAGE 6: HIGH-CONVERSION CONTACT HUB ---
- Dual Layout Structure:
  - Left Container: A premium Lead Generation Console tracking Name, Email, Phone Number, Selected Service, and Message. The submit button fires a tactile click compression transition animation.
  - Right Container: Sharp dashboard details containing:
    * Phone: +91 9152383586
    * Email: mahadevproperties@gmail.com
    * Address: P1, Deep Sadan Bldg, Sundar Nagar, Malad West, Mumbai 400064
    * Visualization Frame: A customized dark-skinned mockup representation frame simulating a highly detailed interactive satellite Google Map canvas pinpointed over Malad West.

Ensure rigid application-wide responsive scaling across mobile, tablet, and wide desktop viewports with seamless page transition hooks.



- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
