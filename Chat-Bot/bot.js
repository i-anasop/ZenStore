
  (function() {
    if (
      !window.chatbase ||
      window.chatbase("getState") !== "initialized"
    ) {
      window.chatbase = (...arguments) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(arguments);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args) => target(prop, ...args);
        }
      });
    }

    const onLoad = function() {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "5uitmEnErxJkhtR3PdE7q";
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
  })();


  
// -------------------   Preloader   ---------------------------

document.addEventListener("DOMContentLoaded", function () {
  // Create a div for the preloader
  let preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.innerHTML = `
      <dotlottie-player 
          src="https://lottie.host/0292b6e2-2dc5-46c9-aace-706bc65d5081/vlC8TQW57C.lottie" 
          background="transparent" 
          speed="1" 
          style="width: 450px; height: 450px" 
          loop 
          autoplay>
      </dotlottie-player>
  `;
  
  // Style the preloader (CSS can be moved to external file)
  preloader.style.position = "fixed";
  preloader.style.top = "0";
  preloader.style.left = "0";
  preloader.style.width = "100vw";
  preloader.style.height = "100vh";
  preloader.style.background = "#fff"; // Change based on your theme
  preloader.style.display = "flex";
  preloader.style.justifyContent = "center";
  preloader.style.alignItems = "center";
  preloader.style.zIndex = "10000";

  document.body.appendChild(preloader);

  // Hide preloader after page loads
  window.onload = function () {
      setTimeout(() => {
          preloader.style.opacity = "0";
          setTimeout(() => {
              preloader.remove();
          }, 500);
      }, 1000); // Adjust time as needed
  };
});
