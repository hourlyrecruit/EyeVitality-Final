// Site content. Edit the text, phone number, address and doctors here.

export interface Doctor { name: string; role: string; qualifications: string; experience: string; photo: string; position: string; bio: string; focus: string[]; }
export interface Service { icon: string; title: string; summary: string; included: string; audience: string; image: string; imageAlt: string; }
export interface Condition { icon: string; name: string; summary: string; notice: string; care: string; simple: string; }
export interface TextItem { title: string; text: string; }
export interface Faq { question: string; answer: string; }
export interface NavItem { label: string; link: string; }

export const CLINIC = {
  name: 'EyeVitality',
  phone: '+91 70198 94846',
  telHref: 'tel:+917019894846',
  email: 'care@eyevitality.com',
  address: "No 13118, 4th Floor, Marenahalli Road 100 Feet Ring Road, Marenahalli Rd, J. P. Nagar, Bengaluru, Karnataka 560041",
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent("No 13118, 4th Floor, Marenahalli Road 100 Feet Ring Road, Marenahalli Rd, J. P. Nagar, Bengaluru, Karnataka 560041"),
  founded: 2012
};

export const SLOTS: string[] = ['9:00 AM – 11:00 AM', '11:00 AM – 1:00 PM', '2:30 PM – 4:30 PM', '4:30 PM – 7:00 PM'];

export const NAV: NavItem[] = [
  { label: 'Home', link: '/' },
  { label: 'About', link: '/about' },
  { label: 'Services', link: '/services' },
  { label: 'Eye health', link: '/eye-health' },
  { label: 'Doctors', link: '/doctors' },
  { label: 'Contact', link: '/contact' }
];

export const DOCTORS: Doctor[] = [
  {
    "name": "Dr. Ananya Sharma",
    "role": "Senior Ophthalmologist",
    "qualifications": "MBBS, MS (Ophthalmology)",
    "experience": "14+ years experience",
    "photo": "doctors/ananya.jpg",
    "position": "50% 30%",
    "bio": "Leads comprehensive eye care, from routine exams to cataract and glaucoma management, and coordinates your plan across the clinic.",
    "focus": [
      "Comprehensive eye exams",
      "Cataract evaluation",
      "Glaucoma follow-up",
      "Dry eye"
    ]
  },
  {
    "name": "Dr. Rohan Mehta",
    "role": "Retina Specialist",
    "qualifications": "MBBS, DNB, Fellowship in Retina",
    "experience": "11+ years experience",
    "photo": "doctors/rohan.jpg",
    "position": "50% 20%",
    "bio": "Diagnoses and treats diseases of the retina, including diabetic eye disease and macular conditions, using detailed retinal imaging.",
    "focus": [
      "Diabetic eye disease",
      "Macular conditions",
      "OCT and retinal imaging",
      "Floaters and flashes"
    ]
  },
  {
    "name": "Dr. Priya Nair",
    "role": "Pediatric Ophthalmologist",
    "qualifications": "MBBS, MD, Fellowship in Pediatric Eye Care",
    "experience": "9+ years experience",
    "photo": "doctors/priya.jpg",
    "position": "50% 15%",
    "bio": "Cares for children’s developing vision, including lazy eye, squint and short-sightedness, in a gentle, child-friendly way.",
    "focus": [
      "Children’s vision screening",
      "Lazy eye",
      "Squint",
      "Short-sightedness in children"
    ]
  }
];

export const SERVICES: Service[] = [
  {
    "icon": "◉",
    "title": "Comprehensive eye examination",
    "summary": "Complete vision and eye-health assessment using modern diagnostic tools.",
    "included": "Vision and glasses prescription, eye pressure, a close look at the front of the eye, and a check of the retina and optic nerve (with dilating drops when needed).",
    "audience": "Everyone. Most adults benefit from a check every one to two years, and sooner with diabetes, high blood pressure or a family history of eye disease.",
    "image": "images/retina-scan-exam.jpg",
    "imageAlt": "A patient having an eye scan while a doctor reviews the images"
  },
  {
    "icon": "◎",
    "title": "Cataract treatment",
    "summary": "Diagnosis and modern surgical solutions for clear, restored vision.",
    "included": "Assessment of the clouded lens, measurements for the right replacement lens, and surgery when your sight is affecting daily life. Cataract surgery is usually a day-care procedure.",
    "audience": "Adults with blurred or dim vision, glare at night or faded colours.",
    "image": "images/slit-lamp-exam.jpg",
    "imageAlt": "An eye doctor examining a patient with a slit lamp"
  },
  {
    "icon": "◈",
    "title": "Retina care",
    "summary": "Specialized diagnosis and treatment for retinal conditions.",
    "included": "OCT cross-section scans and retinal photographs, with monitoring and treatment planned by a retina specialist, such as laser or injections where appropriate.",
    "audience": "People with diabetes, macular degeneration, or sudden floaters and flashes.",
    "image": "images/oct-scan-review.jpg",
    "imageAlt": "A doctor reviewing an OCT retina scan with a patient"
  },
  {
    "icon": "◇",
    "title": "Glaucoma treatment",
    "summary": "Early detection and long-term management to protect your sight.",
    "included": "Eye-pressure checks, optic nerve scans and visual-field tests, followed by drops, laser or surgery as needed. Glaucoma needs lifelong follow-up.",
    "audience": "Anyone over 40, and people with a family history, since early glaucoma often has no symptoms.",
    "image": "images/glaucoma-exam.jpg",
    "imageAlt": "An eye doctor examining an older patient for glaucoma, with scan results on screen"
  },
  {
    "icon": "✦",
    "title": "LASIK and vision correction",
    "summary": "Personalized refractive solutions for lasting visual freedom.",
    "included": "Corneal mapping and thickness measurements to check whether laser correction is safe for you. If it isn’t, we’ll say so and discuss other options.",
    "audience": "Adults with a stable prescription who want less dependence on glasses or contacts.",
    "image": "images/lasik-suite.jpg",
    "imageAlt": "Laser vision correction suite"
  },
  {
    "icon": "☺",
    "title": "Pediatric eye care",
    "summary": "Gentle, specialized care for children’s developing vision.",
    "included": "Child-friendly vision screening, checks for lazy eye and squint, and monitoring of short-sightedness as it develops.",
    "audience": "Children of any age, especially if they squint, sit close to screens or struggle at school.",
    "image": "images/pediatric-eye-test.jpg",
    "imageAlt": "An eye doctor testing a child’s vision with a trial frame"
  }
];

export const CONDITIONS: Condition[] = [
  {
    "icon": "◐",
    "name": "Myopia",
    "summary": "Nearsightedness causing distant objects to appear blurry.",
    "notice": "Squinting at the board, headaches, holding things close.",
    "care": "Glasses, contacts or laser correction. In children, progression is monitored.",
    "simple": "Close things look clear, far things look blurry."
  },
  {
    "icon": "◑",
    "name": "Hyperopia",
    "summary": "Farsightedness making close objects difficult to focus on.",
    "notice": "Eye strain and headaches when reading, blur up close.",
    "care": "Glasses or contacts, sometimes laser correction.",
    "simple": "Far things may look fine, but close work tires your eyes."
  },
  {
    "icon": "◯",
    "name": "Cataract",
    "summary": "Clouding of the lens leading to blurred or dim vision.",
    "notice": "Cloudy vision, glare from headlights, colours looking faded.",
    "care": "Updated glasses early on; surgery to replace the lens when it limits daily life.",
    "simple": "It’s like looking through a foggy window."
  },
  {
    "icon": "◇",
    "name": "Glaucoma",
    "summary": "Increased eye pressure that can damage the optic nerve.",
    "notice": "Usually none at first; side vision narrows slowly.",
    "care": "Pressure-lowering drops, laser or surgery. Early detection protects sight.",
    "simple": "Side vision fades slowly and painlessly, so many people don’t notice at first."
  },
  {
    "icon": "≈",
    "name": "Dry eye",
    "summary": "Insufficient or poor-quality tears causing irritation and discomfort.",
    "notice": "Gritty, burning or watering eyes, worse on screens.",
    "care": "Lubricating drops, lid care and changes to screen habits.",
    "simple": "Eyes feel gritty or sting because tears aren’t doing their job."
  },
  {
    "icon": "✚",
    "name": "Diabetic retinopathy",
    "summary": "Diabetes-related damage to retinal blood vessels.",
    "notice": "Often none early on, which is why yearly dilated exams matter.",
    "care": "Blood-sugar control, monitoring, and laser or injections if needed.",
    "simple": "Diabetes can weaken the tiny blood vessels at the back of the eye."
  }
];

export const TIPS: TextItem[] = [
  {
    "title": "Follow the 20-20-20 rule",
    "text": "Every 20 minutes of screen time, look at something 20 feet (6 metres) away for 20 seconds."
  },
  {
    "title": "Wear UV-blocking sunglasses",
    "text": "Look for lenses that block UVA and UVB light whenever you’re out in strong sun."
  },
  {
    "title": "Don’t rub your eyes",
    "text": "It can irritate the surface of the eye and, over time, may affect the shape of the cornea."
  },
  {
    "title": "Control diabetes and blood pressure",
    "text": "Both can damage the tiny blood vessels of the retina."
  },
  {
    "title": "Eat for your eyes",
    "text": "Leafy greens, fish, eggs, nuts and colourful fruit support general eye health."
  },
  {
    "title": "Keep lenses clean",
    "text": "Wash hands first, follow the replacement schedule and never sleep in lenses unless advised."
  }
];

export const FAQS: Faq[] = [
  {
    "question": "How often should I have my eyes checked?",
    "answer": "Most adults every one to two years, and every year if you have diabetes, a family history of eye disease or a condition your doctor is monitoring. Children should have a first check before school age, or sooner if you notice a problem."
  },
  {
    "question": "Will I be able to drive after the exam?",
    "answer": "If dilating drops are used, your vision may be blurry and light-sensitive for a few hours. Bring sunglasses and, if possible, someone to travel with you."
  },
  {
    "question": "What should I bring to my appointment?",
    "answer": "Your current glasses and contact lenses, a list of medicines, and any earlier eye reports."
  },
  {
    "question": "Is LASIK right for everyone?",
    "answer": "No. It depends on your prescription, the thickness and shape of your cornea, your eye health and your age. A consultation with measurements will tell you."
  },
  {
    "question": "Can I book for my child?",
    "answer": "Yes. Dr. Priya Nair and the team see children of all ages, and visits are kept short and friendly."
  }
];

export const SERVICE_FAQS: Faq[] = [
  {
    "question": "Is cataract surgery painful?",
    "answer": "It is usually done with numbing drops or local anaesthesia, so most people feel pressure rather than pain. Your surgeon will explain exactly what to expect."
  },
  {
    "question": "How long does cataract recovery take?",
    "answer": "Many people notice clearer vision within days, with full healing over a few weeks. You’ll get eye drops and a follow-up schedule."
  },
  {
    "question": "Do I need a stable prescription for LASIK?",
    "answer": "Generally yes. Your prescription should have been steady for about a year, and your corneas need to be healthy and thick enough. We measure and advise honestly."
  },
  {
    "question": "When should my child have a first eye check?",
    "answer": "Before school age, or sooner if you notice squinting, eye rubbing or head tilting."
  },
  {
    "question": "Can glaucoma be cured?",
    "answer": "Not yet, but treatment can slow or stop further damage. Early detection and regular follow-up make the biggest difference."
  },
  {
    "question": "Does a retina scan hurt?",
    "answer": "No. OCT and retinal photography are quick, painless and don’t touch the eye."
  }
];
