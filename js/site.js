(function () {
  // Resolve links relative to the site root from any page depth
  // e.g. "/" -> "", "/amenities/" -> "../", "/amenities/index.html" -> "../"
  function rootPrefix() {
    var path = location.pathname || "/";
    path = path.replace(/\\/g, "/");
    if (/\/index\.html$/i.test(path)) path = path.slice(0, -10);
    path = path.replace(/\/+$/, "");
    var parts = path.split("/").filter(Boolean);
    if (!parts.length) return "";
    return parts.map(function () { return ".."; }).join("/") + "/";
  }

  var root = rootPrefix();
  function url(path) {
    if (!path || path === "/") return root || "./";
    return root + path.replace(/^\//, "");
  }

  var pages = [
    ["/", "Home"],
    ["apartment/", "Apartment"],
    ["amenities/", "Amenities"],
    ["neighborhood/", "Neighborhood"],
    ["getting-here/", "Getting here"],
    ["check-in/", "Check-in"],
    ["house-guide/", "House guide"],
    ["faq/", "FAQ"],
    ["gallery/", "Gallery"],
    ["contact/", "Book Now", "cta"]
  ];

  function normalizePath(pathname) {
    var path = (pathname || "/").toLowerCase().replace(/\\/g, "/");
    if (/\/index\.html$/i.test(path)) path = path.slice(0, -10);
    path = path.replace(/\/+$/, "") || "/";
    if (path === "/" || path === "/index") return "/";
    var slug = path.split("/").filter(Boolean).pop();
    return slug ? slug + "/" : "/";
  }

  var current = normalizePath(location.pathname);

  function link(href, label, currentAttr, kind) {
    var classes = [];
    if (kind === "cta") classes.push("nav__cta");
    var classAttr = classes.length ? ' class="' + classes.join(" ") + '"' : "";
    var attr = currentAttr ? ' aria-current="page"' : "";
    return '<a href="' + href + '"' + classAttr + attr + ">" + label + "</a>";
  }

  var desktop = pages
    .filter(function (p) { return p[0] !== "/"; })
    .map(function (p) { return link(url(p[0]), p[1], current === p[0], p[2]); })
    .join("");

  var mobile = pages
    .map(function (p) { return link(url(p[0]), p[1], current === p[0], p[2]); })
    .join("");

  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<a class="skip" href="#content">Skip to content</a>' +
      '<header class="nav">' +
        '<a class="logo" href="' + url("/") + '"><strong>El Rodadero</strong><span>Santa Marta · 14th floor</span></a>' +
        '<nav class="nav__links" aria-label="Primary">' + desktop + "</nav>" +
        '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="site-menu">Menu</button>' +
      "</header>";
    var menuEl = document.createElement("div");
    menuEl.className = "menu";
    menuEl.id = "site-menu";
    menuEl.innerHTML = mobile;
    document.body.appendChild(menuEl);
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<footer class="footer">' +
        '<div class="wrap-wide">' +
          '<p class="eyebrow">El Rodadero</p>' +
          '<h2>A beach-view stay, two blocks from the sand.</h2>' +
          '<p>Santa Marta, El Rodadero. Sleeps 5. Message us on Airbnb or WhatsApp if you need help before arrival, with building registration, getting in, or local recommendations.</p>' +
          '<div class="btn-row">' +
            '<a class="btn btn--light" href="' + url("contact/") + '">Inquire about dates</a>' +
            '<a class="btn btn--ghost" href="https://wa.me/573113656374">WhatsApp the host</a>' +
          "</div>" +
          '<div class="footer-grid">' +
            '<div><h3>Host</h3><ul>' +
              "<li><a href=\"https://wa.me/573113656374\">+57 311 365 6374</a> · Colombia</li>" +
              "<li><a href=\"tel:+19175651024\">+1 917 565 1024</a> · USA</li>" +
              '<li><a href="' + url("contact/") + '">Reservation inquiry</a></li>' +
              "<li>Emergency: <a href=\"tel:123\">123</a></li>" +
            "</ul></div>" +
            '<div><h3>The stay</h3><ul>' +
              '<li><a href="' + url("apartment/") + '">The apartment</a></li>' +
              '<li><a href="' + url("amenities/") + '">Amenities</a></li>' +
              '<li><a href="' + url("neighborhood/") + '">Neighborhood</a></li>' +
              '<li><a href="' + url("gallery/") + '">Gallery</a></li>' +
            "</ul></div>" +
            '<div><h3>Arrival</h3><ul>' +
              '<li><a href="' + url("getting-here/") + '">Getting here</a></li>' +
              '<li><a href="' + url("check-in/") + '">Check-in</a></li>' +
              '<li><a href="' + url("house-guide/") + '">House guide</a></li>' +
              '<li><a href="' + url("faq/") + '">FAQ</a></li>' +
            "</ul></div>" +
            '<div><h3>Before you go</h3><ul>' +
              "<li>Quiet hours 12 am–6 am</li>" +
              "<li>Checkout 11 a.m.</li>" +
              "<li>80,000 COP cleaning fee (one-time)</li>" +
              "<li>Wristband required to enter</li>" +
            "</ul></div>" +
          "</div>" +
          '<div class="footer__base">' +
            "<span>El Rodadero · Santa Marta</span>" +
            '<span class="footer__legal">' +
              '<a href="' + url("terms/") + '">Terms of service</a>' +
              '<a href="' + url("privacy/") + '">Privacy</a>' +
              '<a href="' + url("sitemap/") + '">Sitemap</a>' +
            "</span>" +
          "</div>" +
        "</div>" +
      "</footer>";
  }

  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("site-menu");
  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
    document.body.classList.toggle("menu-open", open);
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("is-open"));
    });
    menu.querySelectorAll("a").forEach(function (linkEl) {
      linkEl.addEventListener("click", function () { setMenu(false); });
    });
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 861px)").matches) setMenu(false);
    });
  }

  var inquiryForm = document.getElementById("inquiry-form");
  if (inquiryForm) {
    var checkinEl = document.getElementById("checkin");
    var checkoutEl = document.getElementById("checkout");
    var firstnameEl = document.getElementById("firstname");
    var lastnameEl = document.getElementById("lastname");
    var emailEl = document.getElementById("email");
    var phoneEl = document.getElementById("phone");
    var messageEl = document.getElementById("message");
    var errorEl = document.getElementById("inquiry-error");
    var fields = [checkinEl, checkoutEl, firstnameEl, lastnameEl, emailEl, phoneEl, messageEl];
    var hostWhatsApp = "573113656374";

    function pad2(n) {
      return n < 10 ? "0" + n : String(n);
    }

    function todayISO() {
      var d = new Date();
      return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
    }

    function formatDate(iso) {
      if (!iso) return "";
      var parts = iso.split("-");
      if (parts.length !== 3) return iso;
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var month = months[Number(parts[1]) - 1] || parts[1];
      return month + " " + Number(parts[2]) + ", " + parts[0];
    }

    function setError(msg) {
      if (!errorEl) return;
      if (msg) {
        errorEl.hidden = false;
        errorEl.textContent = msg;
      } else {
        errorEl.hidden = true;
        errorEl.textContent = "";
      }
    }

    function clearInvalid() {
      fields.forEach(function (el) {
        if (el) el.classList.remove("is-invalid");
      });
    }

    if (checkinEl) {
      checkinEl.min = todayISO();
      checkinEl.addEventListener("change", function () {
        if (!checkoutEl) return;
        checkoutEl.min = checkinEl.value || todayISO();
        if (checkoutEl.value && checkoutEl.value <= checkinEl.value) {
          checkoutEl.value = "";
        }
      });
    }
    if (checkoutEl) checkoutEl.min = todayISO();

    inquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();
      clearInvalid();
      setError("");

      var checkin = (checkinEl && checkinEl.value) || "";
      var checkout = (checkoutEl && checkoutEl.value) || "";
      var firstname = (firstnameEl && firstnameEl.value.trim()) || "";
      var lastname = (lastnameEl && lastnameEl.value.trim()) || "";
      var email = (emailEl && emailEl.value.trim()) || "";
      var phone = (phoneEl && phoneEl.value.trim()) || "";
      var message = (messageEl && messageEl.value.trim()) || "";

      var invalid = [];
      if (!checkin) invalid.push(checkinEl);
      if (!checkout) invalid.push(checkoutEl);
      if (!firstname) invalid.push(firstnameEl);
      if (!lastname) invalid.push(lastnameEl);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) invalid.push(emailEl);
      if (!phone) invalid.push(phoneEl);
      if (!message) invalid.push(messageEl);

      if (checkin && checkout && checkout <= checkin) {
        invalid.push(checkoutEl);
        setError("Check-out must be after check-in.");
        invalid.forEach(function (el) { if (el) el.classList.add("is-invalid"); });
        if (checkoutEl) checkoutEl.focus();
        return;
      }

      if (invalid.length) {
        invalid.forEach(function (el) { if (el) el.classList.add("is-invalid"); });
        setError("Please fill in every field so we can reply.");
        if (invalid[0]) invalid[0].focus();
        return;
      }

      var lines = [
        "Hello — I'd like to inquire about staying at El Rodadero.",
        "",
        "Name: " + firstname + " " + lastname,
        "Check-in: " + formatDate(checkin),
        "Check-out: " + formatDate(checkout),
        "Email: " + email,
        "Phone: " + phone,
        "",
        "Message:",
        message
      ];
      var text = encodeURIComponent(lines.join("\n"));
      window.location.href = "https://wa.me/" + hostWhatsApp + "?text=" + text;
    });
  }

  var prioritizedHero = false;
  document.querySelectorAll(".photo img").forEach(function (img) {
    var src = img.getAttribute("src") || "";
    var figure = img.closest(".photo");
    var isHero = figure && figure.classList.contains("photo--hero");

    // Make photo/css-relative assets work from nested pages if they used root paths
    if (src.charAt(0) === "/") {
      img.setAttribute("src", url(src.slice(1)));
      src = img.getAttribute("src") || "";
    }

    if (/\.jpe?g$/i.test(src)) {
      var webp = src.replace(/\.jpe?g$/i, ".webp");
      var picture = document.createElement("picture");
      var source = document.createElement("source");
      source.type = "image/webp";
      source.srcset = webp;
      img.parentNode.insertBefore(picture, img);
      picture.appendChild(source);
      picture.appendChild(img);
    }

    if (isHero) {
      img.setAttribute("loading", "eager");
      if (!prioritizedHero) {
        img.setAttribute("fetchpriority", "high");
        prioritizedHero = true;
      }
    } else {
      img.setAttribute("loading", "lazy");
    }
    img.setAttribute("decoding", "async");

    function show() {
      img.classList.add("is-loaded");
      if (figure) figure.classList.add("has-photo");
    }
    function hide() {
      img.remove();
      var pictureWrap = figure && figure.querySelector("picture");
      if (pictureWrap && !pictureWrap.querySelector("img")) pictureWrap.remove();
    }
    if (img.complete && img.naturalWidth > 0) show();
    else {
      img.addEventListener("load", show);
      img.addEventListener("error", hide);
    }
  });
})();
