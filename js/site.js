(function () {
  // Resolve links relative to the site root from any page depth
  // e.g. "/" -> "", "/amenities/" -> "../", "/es/amenities/" -> "../../"
  function rootPrefix() {
    var path = location.pathname || "/";
    path = path.replace(/\\/g, "/");
    if (/\/index\.html$/i.test(path)) path = path.slice(0, -10);
    path = path.replace(/\/+$/, "");
    var parts = path.split("/").filter(Boolean);
    if (!parts.length) return "";
    return parts.map(function () { return ".."; }).join("/") + "/";
  }

  function detectLocale(pathname) {
    var path = (pathname || "/").toLowerCase().replace(/\\/g, "/");
    if (/\/index\.html$/i.test(path)) path = path.slice(0, -10);
    path = path.replace(/\/+$/, "") || "/";
    var parts = path.split("/").filter(Boolean);
    return parts[0] === "es" ? "es" : "en";
  }

  function normalizePath(pathname) {
    var path = (pathname || "/").toLowerCase().replace(/\\/g, "/");
    if (/\/index\.html$/i.test(path)) path = path.slice(0, -10);
    path = path.replace(/\/+$/, "") || "/";
    var parts = path.split("/").filter(Boolean);
    if (parts[0] === "es") parts = parts.slice(1);
    if (!parts.length) return "/";
    return parts[parts.length - 1] + "/";
  }

  var root = rootPrefix();
  var locale = detectLocale(location.pathname);
  var isEs = locale === "es";
  var current = normalizePath(location.pathname);

  function url(path) {
    var localeRoot = isEs ? "es/" : "";
    if (!path || path === "/") return (root || "./") + localeRoot;
    return (root || "") + localeRoot + path.replace(/^\//, "");
  }

  function pageUrlForLocale(targetLocale) {
    var localeRoot = targetLocale === "es" ? "es/" : "";
    if (current === "/") return (root || "./") + localeRoot;
    return (root || "") + localeRoot + current;
  }

  var copy = isEs
    ? {
        pages: [
          ["/", "Inicio"],
          ["apartment/", "Apartamento"],
          ["amenities/", "Amenidades"],
          ["neighborhood/", "Barrio"],
          ["getting-here/", "Cómo llegar"],
          ["check-in/", "Check-in"],
          ["house-guide/", "Guía de la casa"],
          ["faq/", "Preguntas"],
          ["gallery/", "Galería"],
          ["contact/", "Reservar", "cta"]
        ],
        skip: "Saltar al contenido",
        primaryNav: "Principal",
        menu: "Menú",
        close: "Cerrar",
        langLabel: "Idioma",
        footerEyebrow: "El Rodadero",
        footerTitle: "Una estadía con vista al mar, a dos cuadras de la playa.",
        footerBlurb:
          "Santa Marta, El Rodadero. Capacidad para 5. Escríbenos por Airbnb o WhatsApp si necesitas ayuda antes de llegar, con el registro del edificio, el acceso o recomendaciones locales.",
        inquire: "Consultar fechas",
        whatsappHost: "WhatsApp al anfitrión",
        host: "Anfitrión",
        reservationInquiry: "Consulta de reserva",
        emergency: "Emergencias",
        theStay: "La estadía",
        theApartment: "El apartamento",
        amenities: "Amenidades",
        neighborhood: "Barrio",
        gallery: "Galería",
        arrival: "Llegada",
        gettingHere: "Cómo llegar",
        checkIn: "Check-in",
        houseGuide: "Guía de la casa",
        faq: "Preguntas",
        beforeYouGo: "Antes de irte",
        quietHours: "Horario de silencio 12 a.m.–6 a.m.",
        checkout: "Checkout 11 a.m.",
        cleaningFee: "Tarifa de limpieza 80.000 COP (única)",
        wristband: "Manilla obligatoria para entrar",
        terms: "Términos de servicio",
        privacy: "Privacidad",
        sitemap: "Mapa del sitio",
        checkoutAfterCheckin: "La salida debe ser después del check-in.",
        fillEveryField: "Completa todos los campos para que podamos responderte.",
        waHello: "Hola — quiero consultar por una estadía en El Rodadero.",
        waName: "Nombre",
        waCheckin: "Check-in",
        waCheckout: "Check-out",
        waEmail: "Correo",
        waPhone: "Teléfono",
        waMessage: "Mensaje",
        months: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
      }
    : {
        pages: [
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
        ],
        skip: "Skip to content",
        primaryNav: "Primary",
        menu: "Menu",
        close: "Close",
        langLabel: "Language",
        footerEyebrow: "El Rodadero",
        footerTitle: "A beach-view stay, two blocks from the sand.",
        footerBlurb:
          "Santa Marta, El Rodadero. Sleeps 5. Message us on Airbnb or WhatsApp if you need help before arrival, with building registration, getting in, or local recommendations.",
        inquire: "Inquire about dates",
        whatsappHost: "WhatsApp the host",
        host: "Host",
        reservationInquiry: "Reservation inquiry",
        emergency: "Emergency",
        theStay: "The stay",
        theApartment: "The apartment",
        amenities: "Amenities",
        neighborhood: "Neighborhood",
        gallery: "Gallery",
        arrival: "Arrival",
        gettingHere: "Getting here",
        checkIn: "Check-in",
        houseGuide: "House guide",
        faq: "FAQ",
        beforeYouGo: "Before you go",
        quietHours: "Quiet hours 12 am–6 am",
        checkout: "Checkout 11 a.m.",
        cleaningFee: "80,000 COP cleaning fee (one-time)",
        wristband: "Wristband required to enter",
        terms: "Terms of service",
        privacy: "Privacy",
        sitemap: "Sitemap",
        checkoutAfterCheckin: "Check-out must be after check-in.",
        fillEveryField: "Please fill in every field so we can reply.",
        waHello: "Hello — I'd like to inquire about staying at El Rodadero.",
        waName: "Name",
        waCheckin: "Check-in",
        waCheckout: "Check-out",
        waEmail: "Email",
        waPhone: "Phone",
        waMessage: "Message",
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      };

  var pages = copy.pages;

  function link(href, label, currentAttr, kind) {
    var classes = [];
    if (kind === "cta") classes.push("nav__cta");
    var classAttr = classes.length ? ' class="' + classes.join(" ") + '"' : "";
    var attr = currentAttr ? ' aria-current="page"' : "";
    return '<a href="' + href + '"' + classAttr + attr + ">" + label + "</a>";
  }

  function langSwitch() {
    return (
      '<nav class="lang" aria-label="' + copy.langLabel + '">' +
        '<a href="' + pageUrlForLocale("en") + '" hreflang="en" lang="en"' + (!isEs ? ' aria-current="true"' : "") + ">EN</a>" +
        '<span class="lang__sep" aria-hidden="true">/</span>' +
        '<a href="' + pageUrlForLocale("es") + '" hreflang="es" lang="es"' + (isEs ? ' aria-current="true"' : "") + ">ES</a>" +
      "</nav>"
    );
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
      '<a class="skip" href="#content">' + copy.skip + "</a>" +
      '<header class="nav">' +
        '<a class="logo" href="' + url("/") + '"><strong>El Rodadero</strong><span>Santa Marta · ' + (isEs ? "Piso 14" : "14th floor") + "</span></a>" +
        '<nav class="nav__links" aria-label="' + copy.primaryNav + '">' + desktop + "</nav>" +
        langSwitch() +
        '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="site-menu">' + copy.menu + "</button>" +
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
          '<p class="eyebrow">' + copy.footerEyebrow + "</p>" +
          "<h2>" + copy.footerTitle + "</h2>" +
          "<p>" + copy.footerBlurb + "</p>" +
          '<div class="btn-row">' +
            '<a class="btn btn--light" href="' + url("contact/") + '">' + copy.inquire + "</a>" +
            '<a class="btn btn--ghost" href="https://wa.me/573113656374">' + copy.whatsappHost + "</a>" +
          "</div>" +
          '<div class="footer-grid">' +
            "<div><h3>" + copy.host + "</h3><ul>" +
              "<li><a href=\"https://wa.me/573113656374\">+57 311 365 6374</a> · Colombia</li>" +
              "<li><a href=\"tel:+19175651024\">+1 917 565 1024</a> · USA</li>" +
              '<li><a href="' + url("contact/") + '">' + copy.reservationInquiry + "</a></li>" +
              "<li>" + copy.emergency + ': <a href="tel:123">123</a></li>' +
            "</ul></div>" +
            "<div><h3>" + copy.theStay + "</h3><ul>" +
              '<li><a href="' + url("apartment/") + '">' + copy.theApartment + "</a></li>" +
              '<li><a href="' + url("amenities/") + '">' + copy.amenities + "</a></li>" +
              '<li><a href="' + url("neighborhood/") + '">' + copy.neighborhood + "</a></li>" +
              '<li><a href="' + url("gallery/") + '">' + copy.gallery + "</a></li>" +
            "</ul></div>" +
            "<div><h3>" + copy.arrival + "</h3><ul>" +
              '<li><a href="' + url("getting-here/") + '">' + copy.gettingHere + "</a></li>" +
              '<li><a href="' + url("check-in/") + '">' + copy.checkIn + "</a></li>" +
              '<li><a href="' + url("house-guide/") + '">' + copy.houseGuide + "</a></li>" +
              '<li><a href="' + url("faq/") + '">' + copy.faq + "</a></li>" +
            "</ul></div>" +
            "<div><h3>" + copy.beforeYouGo + "</h3><ul>" +
              "<li>" + copy.quietHours + "</li>" +
              "<li>" + copy.checkout + "</li>" +
              "<li>" + copy.cleaningFee + "</li>" +
              "<li>" + copy.wristband + "</li>" +
            "</ul></div>" +
          "</div>" +
          '<div class="footer__base">' +
            "<span>El Rodadero · Santa Marta</span>" +
            '<span class="footer__legal">' +
              '<a href="' + url("terms/") + '">' + copy.terms + "</a>" +
              '<a href="' + url("privacy/") + '">' + copy.privacy + "</a>" +
              '<a href="' + url("sitemap/") + '">' + copy.sitemap + "</a>" +
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
    toggle.textContent = open ? copy.close : copy.menu;
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
      var month = copy.months[Number(parts[1]) - 1] || parts[1];
      if (isEs) return Number(parts[2]) + " " + month + " " + parts[0];
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
        setError(copy.checkoutAfterCheckin);
        invalid.forEach(function (el) { if (el) el.classList.add("is-invalid"); });
        if (checkoutEl) checkoutEl.focus();
        return;
      }

      if (invalid.length) {
        invalid.forEach(function (el) { if (el) el.classList.add("is-invalid"); });
        setError(copy.fillEveryField);
        if (invalid[0]) invalid[0].focus();
        return;
      }

      var lines = [
        copy.waHello,
        "",
        copy.waName + ": " + firstname + " " + lastname,
        copy.waCheckin + ": " + formatDate(checkin),
        copy.waCheckout + ": " + formatDate(checkout),
        copy.waEmail + ": " + email,
        copy.waPhone + ": " + phone,
        "",
        copy.waMessage + ":",
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
      img.setAttribute("src", (root || "") + src.slice(1));
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
