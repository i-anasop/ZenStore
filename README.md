# Zen Store

A modern, responsive eCommerce front-end for a footwear store, built with plain HTML, CSS, and JavaScript. Browse products by category, add items to a cart, sign in, check out with a simulated EasyPaisa flow, and chat with an AI assistant.

**Live demo:** https://i-anasop.github.io/Zen-Store/

---

## Features

- Multi-category product browsing (Men, Women, Sports)
- Product detail pages
- Shopping cart with add / remove / quantity controls
- Login & sign-up flow
- Checkout with delivery option and EasyPaisa payment
- Order confirmation and thank-you page
- Admin panel for manual order verification
- User profile with order history view
- Embedded AI chatbot (powered by Chatbase)
- Animated preloader on page load
- Fully responsive layout

---

## Tech Stack

- **HTML5** — page structure
- **CSS3** — styling, layout, and responsiveness
- **JavaScript (vanilla)** — interactivity and cart logic
- **Chatbase** — AI chatbot embed
- **LottieFiles** — preloader animation

No build step, no frameworks, no dependencies to install.

---

## Project Structure

```
Zen-Store/
├── index.html              Home page
├── men.html                Men's category
├── women.html              Women's category
├── sports.html             Sports category
├── product.html            Product details
├── cart.html               Shopping cart
├── login.html              Sign in
├── signup.html             Create account
├── checkout.html           Checkout & payment
├── profile.html            User profile
├── admin.html              Admin order verification
├── thankyou.html           Order confirmation
├── 404.html                Not-found page
├── assets/
│   ├── css/style.css       Global stylesheet
│   ├── js/bot.js           Chatbot + preloader
│   ├── images/
│   │   ├── logo.jpg
│   │   ├── products/       Product photos by category
│   │   ├── collections/    Featured collection images
│   │   ├── payments/       Payment method images
│   │   ├── socials/        Social media icons
│   │   └── extras/         Hero & decorative imagery
│   └── svg/                SVG icons
├── README.md
├── LICENSE
└── .gitignore
```

---

## Getting Started

### Run locally

The site is fully static. You can either open `index.html` directly in a browser, or serve the folder with any static file server for the best experience (so absolute paths and the chatbot work correctly):

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

### Clone

```bash
git clone https://github.com/i-anasop/Zen-Store.git
cd Zen-Store
```

---

## Deployment

This site is hosted for free on **GitHub Pages**, served from the `main` branch root.

To deploy your own fork:

1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Select branch `main` and folder `/ (root)`, then save.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute.

---

## Notes

- Payments are simulated and verified manually through the admin panel — no live payment gateway is integrated.
- The chatbot uses a Chatbase embed and requires an internet connection.
- This project is a front-end demo and is not connected to a live backend or database.

---

## Credits

- Developed by **Anas**
- Chatbot powered by [Chatbase](https://chatbase.co)
- Preloader animation from [LottieFiles](https://lottiefiles.com)

---

## License

Released under the [MIT License](LICENSE).
