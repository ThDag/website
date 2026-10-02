// Reference to the main container element where photo tiles will be injected.
const grid = document.getElementById("gallery-grid")

// In-memory cache holding the fetched and sorted photo list across re-renders.
let photos = []

// Active layout state determining grid column counts and image aspect ratios ("large" | "dense" | "full").
let currentDensity = "dense"

// Loads photos.json and renders the initial gallery.
fetch("/api/photographs/photographs.json")
  .then((res) => res.json())
  .then((data) => {
    // 1. `.slice()` creates a shallow clone so sorting does not mutate the original data array.
    // 2. Sorts descending (newest first): `b - a`.
    // 3. Fallback `|| "00:00"` ensures an ISO-compliant "YYYY-MM-DDTHH:mm" timestamp even if time is missing,
    //    preventing invalid Date parses or timezone drift that occurs when parsing date-only strings.
    photos = data.slice().sort((a, b) => new Date(`${b.date}T${b.time || "00:00"}`) - new Date(`${a.date}T${a.time || "00:00"}`))
    renderGallery()
  })
  .catch((err) => console.error("Could not load photographs.json:", err))

// Tailwind CSS mapping for CSS Grid setups based on screen breakpoints (sm: 640px, md: 768px).
const gridClassesByDensity = {
  large: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-0.5",
  dense: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-0.5",
  full: "grid grid-cols-1 gap-3"
}

function renderGallery() {
  // Overwrites existing layout classes on the wrapper to reflect the chosen density.
  grid.className = gridClassesByDensity[currentDensity]

  // Wipes all previously rendered DOM nodes before rebuilding the list.
  grid.innerHTML = ""

  photos.forEach((photo) => {
    // `.filter(Boolean)` drops empty strings, null, or undefined before joining,
    // preventing trailing or orphan separators (" — " or " · ") if metadata fields are missing.
    const caption = [photo.name, photo.description].filter(Boolean).join(" — ")
    const title = [caption, photo.date].filter(Boolean).join(" · ")

    const tile = document.createElement("div")
    const img = document.createElement("img")
    img.src = `/api/photographs/${photo.filename}`

    // Accessible fallback: uses photo.name if available, otherwise filename.
    img.alt = photo.name || photo.filename

    // Native browser hover tooltip showing the composed caption and date.
    img.title = title

    // Defers network requests and offscreen image decoding until the element nears the viewport.
    img.loading = "lazy"

    // "full" view keeps native aspect ratios (h-auto), while other views lock tiles into 
    // a 1:1 ratio (aspect-square) and crop with object-cover + zoom on parent hover.
    if (currentDensity === "full") {
      tile.className = "relative overflow-hidden bg-surface-container-low group cursor-pointer"
      img.className = "w-full h-auto filter contrast-105 transition-transform duration-300 ease-out"
    } else {
      tile.className = "relative overflow-hidden bg-surface-container-low group cursor-pointer aspect-square"
      img.className = "w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-300 ease-out"
    }

    // Captures the current `photo` object in this iteration's closure to pass to the modal handler.
    tile.addEventListener("click", () => openLightbox(photo))

    tile.appendChild(img)
    grid.appendChild(tile)
  })
}

// Toggles the gallery between large / dense (square tiles) and full (one image per line at native size).
document.querySelectorAll(".density-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Reset active button styling across all sibling buttons (pill shape with background highlight).
    document.querySelectorAll(".density-btn").forEach((b) => {
      b.classList.remove("bg-surface-container-high", "text-primary", "font-medium", "px-2.5", "py-0.5", "rounded-full")
    })

    // Apply active pill styles to the clicked button.
    btn.classList.add("bg-surface-container-high", "text-primary", "font-medium", "px-2.5", "py-0.5", "rounded-full")

    // Reads `data-density="..."` from the clicked HTML element (e.g. data-density="dense").
    currentDensity = btn.dataset.density
    renderGallery()
  })
})

// Lightbox: shows the clicked photo at full size with its name, description, date and camera.
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
const lightboxName = document.getElementById("lightbox-name")
const lightboxDescription = document.getElementById("lightbox-description")
const lightboxMeta = document.getElementById("lightbox-meta")

function formatDate(dateString) {
  // Manual numeric extraction avoids UTC parsing offsets that can shift dates back by one day depending on local time.
  const [year, month, day] = dateString.split("-").map(Number)

  // `month - 1` because JS Date months are zero-indexed (0 = January, 11 = December).
  // `undefined` uses the browser's current runtime locale.
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number)

  // Creates a dummy base date (epoch 0) solely to format the hours and minutes into localized 12h/24h time.
  return new Date(0, 0, 0, hours, minutes).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit"
  })
}

function openLightbox(photo) {
  lightboxImg.src = `/api/photographs/${photo.filename}`
  lightboxImg.alt = photo.name || photo.filename

  lightboxName.textContent = photo.name || photo.filename
  // `.classList.toggle(className, force)`: adds 'hidden' if false, removes if true.
  // Hides the element entirely if no name exists to prevent empty whitespace/margins.
  lightboxName.classList.toggle("hidden", !photo.name)

  lightboxDescription.textContent = photo.description || ""
  lightboxDescription.classList.toggle("hidden", !photo.description)

  const metaParts = []
  if (photo.date) {
    // Appends localized time string only if the time property is present on the record.
    metaParts.push(photo.time ? `${formatDate(photo.date)} at ${formatTime(photo.time)}` : formatDate(photo.date))
  }
  if (photo.camera) metaParts.push(photo.camera)
  lightboxMeta.textContent = metaParts.join(" · ")

  // Switches display property from none ('hidden') to flexbox ('flex') for centering the modal layout.
  lightbox.classList.remove("hidden")
  lightbox.classList.add("flex")

  // Prevents the background page from scrolling while the modal is open.
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  lightbox.classList.add("hidden")
  lightbox.classList.remove("flex")

  // Restores normal background page scrolling by removing the inline overflow override.
  document.body.style.overflow = ""
}

document.getElementById("lightbox-close").addEventListener("click", closeLightbox)

// Closes when clicking the backdrop, but not when clicking the image or caption.
lightbox.addEventListener("click", (event) => {
  // `event.target` is the actual clicked element. Only triggers if the user clicked the outer overlay
  // itself, rather than an inner child (event bubbling would still reach this listener, but target would differ).
  if (event.target === lightbox) closeLightbox()
})

document.addEventListener("keydown", (event) => {
  // Global shortcut: only dismisses if the lightbox is currently visible (does not have .hidden).
  if (event.key === "Escape" && !lightbox.classList.contains("hidden")) closeLightbox()
})
