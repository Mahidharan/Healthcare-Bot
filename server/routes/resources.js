const express = require("express");
const router = express.Router();

const healthResources = [
  {
    id: 1,
    category: "Common Diseases",
    title: "Understanding Diabetes",
    summary:
      "Learn about Type 1 and Type 2 diabetes, symptoms, management strategies, and lifestyle changes that can help control blood sugar levels.",
    content:
      "Diabetes is a chronic condition that affects how your body turns food into energy. There are two main types: Type 1 (autoimmune) and Type 2 (lifestyle-related). Common symptoms include frequent urination, excessive thirst, unexplained weight loss, and fatigue. Management includes regular blood sugar monitoring, healthy eating, physical activity, and medication as prescribed by your doctor.",
    icon: "heart",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Common Diseases",
    title: "Heart Disease Prevention",
    summary:
      "Discover key risk factors for heart disease and evidence-based strategies to protect your cardiovascular health.",
    content:
      "Heart disease remains the leading cause of death globally. Key risk factors include high blood pressure, high cholesterol, smoking, obesity, and physical inactivity. Prevention strategies include maintaining a healthy diet rich in fruits and vegetables, regular exercise (at least 150 minutes per week), managing stress, quitting smoking, and regular health check-ups.",
    icon: "activity",
    readTime: "6 min read",
  },
  {
    id: 3,
    category: "Common Diseases",
    title: "Managing Hypertension",
    summary:
      "High blood pressure affects millions worldwide. Learn how to monitor, manage, and reduce your blood pressure naturally.",
    content:
      "Hypertension, or high blood pressure, is often called the silent killer because it typically has no symptoms. Regular monitoring is essential. Lifestyle changes that help include reducing sodium intake, exercising regularly, maintaining a healthy weight, limiting alcohol, managing stress, and following your prescribed medication regimen.",
    icon: "thermometer",
    readTime: "4 min read",
  },
  {
    id: 4,
    category: "Preventive Healthcare",
    title: "Importance of Regular Check-ups",
    summary:
      "Regular health screenings can detect problems early when treatment is most effective.",
    content:
      "Preventive healthcare includes regular check-ups, screenings, and immunizations. Key screenings include blood pressure checks, cholesterol tests, cancer screenings (mammograms, colonoscopies), diabetes screening, and vision/dental exams. The frequency of these screenings depends on your age, gender, and risk factors. Talk to your healthcare provider about which screenings are right for you.",
    icon: "clipboard",
    readTime: "5 min read",
  },
  {
    id: 5,
    category: "Preventive Healthcare",
    title: "Vaccination Guide for Adults",
    summary:
      "Stay up to date with recommended vaccinations to protect yourself and your community.",
    content:
      "Adult vaccinations are an important part of preventive healthcare. Recommended vaccines include annual flu shots, COVID-19 boosters, Tdap (tetanus, diphtheria, pertussis), shingles vaccine (for adults 50+), pneumococcal vaccine (for adults 65+), and HPV vaccine (for adults up to age 26). Check with your healthcare provider for personalized recommendations.",
    icon: "shield",
    readTime: "4 min read",
  },
  {
    id: 6,
    category: "Preventive Healthcare",
    title: "Mental Health Awareness",
    summary:
      "Understanding mental health conditions and the importance of seeking help early.",
    content:
      "Mental health is just as important as physical health. Common conditions include depression, anxiety, PTSD, and bipolar disorder. Warning signs include persistent sadness, excessive worry, social withdrawal, changes in sleep or appetite, and difficulty concentrating. If you or someone you know is struggling, reach out to a mental health professional. Early intervention leads to better outcomes.",
    icon: "brain",
    readTime: "6 min read",
  },
  {
    id: 7,
    category: "Healthy Lifestyle",
    title: "Nutrition Basics for Optimal Health",
    summary:
      "Build a balanced diet with the right nutrients to fuel your body and mind.",
    content:
      "A balanced diet includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Aim for at least 5 servings of fruits and vegetables daily. Limit processed foods, added sugars, and excessive sodium. Stay hydrated by drinking plenty of water. Consider your individual nutritional needs based on age, activity level, and health conditions.",
    icon: "apple",
    readTime: "5 min read",
  },
  {
    id: 8,
    category: "Healthy Lifestyle",
    title: "Exercise and Physical Activity Guide",
    summary:
      "Discover the types and amounts of exercise recommended for different age groups and fitness levels.",
    content:
      "Regular physical activity is one of the most important things you can do for your health. Adults should aim for at least 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity aerobic activity per week, plus muscle-strengthening activities at least 2 days per week. Start slowly and gradually increase intensity. Choose activities you enjoy to make exercise a sustainable habit.",
    icon: "dumbbell",
    readTime: "5 min read",
  },
  {
    id: 9,
    category: "Healthy Lifestyle",
    title: "Sleep Hygiene: Better Rest for Better Health",
    summary:
      "Quality sleep is essential for physical and mental well-being. Learn how to improve your sleep habits.",
    content:
      "Adults need 7-9 hours of sleep per night. Good sleep hygiene includes maintaining a consistent sleep schedule, creating a relaxing bedtime routine, keeping your bedroom cool and dark, avoiding screens before bed, limiting caffeine and alcohol, and exercising regularly (but not too close to bedtime). Poor sleep is linked to obesity, heart disease, depression, and weakened immunity.",
    icon: "moon",
    readTime: "4 min read",
  },
];

// Get all resources
router.get("/", (req, res) => {
  const summaries = healthResources.map(({ content, ...rest }) => rest);
  res.json(summaries);
});

// Get resources by category
router.get("/category/:category", (req, res) => {
  const category = decodeURIComponent(req.params.category);
  const filtered = healthResources
    .filter((r) => r.category.toLowerCase() === category.toLowerCase())
    .map(({ content, ...rest }) => rest);
  res.json(filtered);
});

// Get single resource
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const resource = healthResources.find((r) => r.id === id);
  if (!resource) {
    return res.status(404).json({ error: "Resource not found" });
  }
  res.json(resource);
});

module.exports = router;
