const grid = document.getElementById("gallery-grid")
let photos = []
let currentDensity = "dense"

// Loads photos.json and renders the initial gallery.
fetch("photographs/photographs.json")
  .then((res) => res.json())
  .then((data) => {
    photos = data.slice().sort((a, b) => new Date(`${b.date}T${b.time || "00:00"}`) - new Date(`${a.date}T${a.time || "00:00"}`))
    renderGallery()
  })
  .catch((err) => console.error("Could not load photographs.json:", err))

const gridClassesByDensity = {
  large: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-0.5",
  dense: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-0.5",
  full: "grid grid-cols-1 gap-3"
}

function renderGallery() {
  grid.className = gridClassesByDensity[currentDensity]
  grid.innerHTML = ""

  photos.forEach((photo) => {
    const caption = [photo.name, photo.description].filter(Boolean).join(" — ")
    const title = [caption, photo.date].filter(Boolean).join(" · ")

    const tile = document.createElement("div")
    const img = document.createElement("img")
    img.src = `photographs/${photo.filename}`
    img.alt = photo.name || photo.filename
    img.title = title
    img.loading = "lazy"

    if (currentDensity === "full") {
      tile.className = "relative overflow-hidden bg-surface-container-low group cursor-pointer"
      img.className = "w-full h-auto filter contrast-105 transition-transform duration-300 ease-out"
    } else {
      tile.className = "relative overflow-hidden bg-surface-container-low group cursor-pointer aspect-square"
      img.className = "w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-300 ease-out"
    }
    tile.addEventListener("click", () => openLightbox(photo))

    tile.appendChild(img)
    grid.appendChild(tile)
  })
}

// Toggles the gallery between large / dense (square tiles) and full (one image per line at native size).
document.querySelectorAll(".density-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".density-btn").forEach((b) => {
      b.classList.remove("bg-surface-container-high", "text-primary", "font-medium", "px-2.5", "py-0.5", "rounded-full")
    })
    btn.classList.add("bg-surface-container-high", "text-primary", "font-medium", "px-2.5", "py-0.5", "rounded-full")

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
  const [year, month, day] = dateString.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number)
  return new Date(0, 0, 0, hours, minutes).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit"
  })
}

function openLightbox(photo) {
  lightboxImg.src = `photographs/${photo.filename}`
  lightboxImg.alt = photo.name || photo.filename

  lightboxName.textContent = photo.name || photo.filename
  lightboxName.classList.toggle("hidden", !photo.name)

  lightboxDescription.textContent = photo.description || ""
  lightboxDescription.classList.toggle("hidden", !photo.description)

  const metaParts = []
  if (photo.date) {
    metaParts.push(photo.time ? `${formatDate(photo.date)} at ${formatTime(photo.time)}` : formatDate(photo.date))
  }
  if (photo.camera) metaParts.push(photo.camera)
  lightboxMeta.textContent = metaParts.join(" · ")

  lightbox.classList.remove("hidden")
  lightbox.classList.add("flex")
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  lightbox.classList.add("hidden")
  lightbox.classList.remove("flex")
  document.body.style.overflow = ""
}

document.getElementById("lightbox-close").addEventListener("click", closeLightbox)

// Closes when clicking the backdrop, but not when clicking the image or caption.
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox()
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.classList.contains("hidden")) closeLightbox()
})
