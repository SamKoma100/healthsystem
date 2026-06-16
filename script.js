const clinics = [
  {
    name: "Connaught Hospital",
    district: "western",
    area: "Freetown",
    services: "Emergency, general consultation, surgery referral",
  },
  {
    name: "Lumley Community Health Centre",
    district: "western",
    area: "Western Area",
    services: "Maternal care, child immunization, malaria testing",
  },
  {
    name: "Bo Government Hospital",
    district: "bo",
    area: "Bo",
    services: "General consultation, maternity, laboratory services",
  },
  {
    name: "Njala Health Post",
    district: "bo",
    area: "Bo District",
    services: "First aid, family planning, referral support",
  },
  {
    name: "Kenema Government Hospital",
    district: "kenema",
    area: "Kenema",
    services: "Emergency, malaria care, maternal services",
  },
  {
    name: "Makeni Regional Hospital",
    district: "makeni",
    area: "Bombali / Makeni",
    services: "General care, pharmacy, laboratory services",
  },
];

const tips = [
  {
    title: "Prevent malaria",
    body: "Sleep under a treated mosquito net, remove standing water near the home, and visit a clinic quickly when fever starts.",
  },
  {
    title: "Safe drinking water",
    body: "Boil or treat water when safety is uncertain. Wash hands before cooking, eating, and caring for children.",
  },
  {
    title: "Maternal care",
    body: "Pregnant women should attend antenatal visits and seek urgent help for bleeding, severe headache, swelling, or reduced baby movement.",
  },
  {
    title: "Child health",
    body: "Keep immunization dates, monitor fever, and seek care immediately if a child becomes weak, dehydrated, or breathes fast.",
  },
];

const guidance = {
  fever: "Fever can be malaria or infection. Drink fluids, avoid self-medicating with unknown drugs, and request a malaria test at a nearby clinic.",
  pregnancy: "Pregnancy bleeding, severe headache, fever, or swelling needs urgent care. Contact a maternity clinic or hospital immediately.",
  diarrhoea: "Use oral rehydration solution or clean fluids. Seek care quickly for blood in stool, weakness, sunken eyes, or persistent vomiting.",
  breathing: "Difficulty breathing is an emergency warning sign. Go to the nearest hospital or call local emergency support now.",
};

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const clinicList = document.querySelector("#clinicList");
const districtFilter = document.querySelector("#districtFilter");
const tipContent = document.querySelector("#tipContent");
const prevTip = document.querySelector("#prevTip");
const nextTip = document.querySelector("#nextTip");
const symptomForm = document.querySelector("#symptomForm");
const guidanceResult = document.querySelector("#guidanceResult");
const appointmentForm = document.querySelector("#appointmentForm");
const formMessage = document.querySelector("#formMessage");
const emergencyModal = document.querySelector("#emergencyModal");
const openEmergency = document.querySelector("#openEmergency");
const closeEmergency = document.querySelector("#closeEmergency");

let tipIndex = 0;

function renderClinics(filter = "all") {
  const selectedClinics = filter === "all" ? clinics : clinics.filter((clinic) => clinic.district === filter);

  clinicList.innerHTML = selectedClinics
    .map(
      (clinic) => `
      <article class="clinic-card">
        <div>
          <h3>${clinic.name}</h3>
          <p><strong>Location:</strong> ${clinic.area}</p>
          <p><strong>Services:</strong> ${clinic.services}</p>
        </div>
        <span class="clinic-badge">Open listing</span>
      </article>
    `,
    )
    .join("");
}

function renderTip() {
  const tip = tips[tipIndex];
  tipContent.innerHTML = `<h3>${tip.title}</h3><p>${tip.body}</p>`;
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

districtFilter.addEventListener("change", (event) => {
  renderClinics(event.target.value);
});

prevTip.addEventListener("click", () => {
  tipIndex = (tipIndex - 1 + tips.length) % tips.length;
  renderTip();
});

nextTip.addEventListener("click", () => {
  tipIndex = (tipIndex + 1) % tips.length;
  renderTip();
});

symptomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const symptom = document.querySelector("#symptom").value;
  guidanceResult.textContent = guidance[symptom] || "Choose a symptom to receive guidance.";
});

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(appointmentForm);
  const name = data.get("fullName").trim();
  const district = data.get("district");
  const service = data.get("service");

  formMessage.textContent = `Thank you, ${name}. Your ${service.toLowerCase()} request for ${district} has been received. A clinic officer would contact you by phone in a real system.`;
  appointmentForm.reset();
});

openEmergency.addEventListener("click", () => {
  if (typeof emergencyModal.showModal === "function") {
    emergencyModal.showModal();
  }
});

closeEmergency.addEventListener("click", () => {
  emergencyModal.close();
});

renderClinics();
renderTip();
