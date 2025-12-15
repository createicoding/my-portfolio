
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  "settings": {
    "siteTitle": "MYSELF - Resume or portfolio HTML Template",
    "logo": "img/logo.png",
    "favicon": "img/favicon.png",
    "metaDescription": "Professional portfolio and resume",
    "metaKeywords": "portfolio, resume, developer, designer",
    "metaAuthor": "Awesome Themez",
    "github": {
      "username": "createicoding",
      "repo": "my-portfolio",
      "pat": "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",
      "branch": "main"
    }
  },
  "hero": {
    "title": "HELLO HI,",
    "name": "lalina",
    "subtitle": "Front end Developer",
    "backgroundImage": "img/hero-bg.jpg"
  },
  "about": {
    "mainTitle": "Web Designer & Developer",
    "mainDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod set tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimu veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "image": "img/about-img.jpg",
    "features": [
      {
        "title": "New Ideas",
        "description": "Lorem ipsum dolor sit amet more consectetur adipiscing elit, sed do eiusmod."
      },
      {
        "title": "Clean Design",
        "description": "Lorem ipsum dolor sit amet more consectetur adipiscing elit, sed do eiusmod."
      },
      {
        "title": "Easy Code",
        "description": "Lorem ipsum dolor sit amet more consectetur adipiscing elit, sed do eiusmod."
      },
      {
        "title": "Awesome Product",
        "description": "Lorem ipsum dolor sit amet more consectetur adipiscing elit, sed do eiusmod."
      }
    ]
  },
  "education": [
    {
      "id": "1",
      "degree": "Bachelor In Web Technology",
      "school": "University Of Florida",
      "year": "2005-2008"
    },
    {
      "id": "2",
      "degree": "Masters In Graphic Design",
      "school": "University Of Coventry",
      "year": "2009-2010"
    },
    {
      "id": "3",
      "degree": "Diploma In Motion Graphic",
      "school": "University Of Florida",
      "year": "2008-2011"
    },
    {
      "id": "4",
      "degree": "Bachelor In Web Technology",
      "school": "University Of Florida",
      "year": "2005-2008"
    },
    {
      "id": "5",
      "degree": "Masters In Graphic Design",
      "school": "University Of Coventry",
      "year": "2009-2010"
    },
    {
      "id": "6",
      "degree": "Diploma In Motion Graphic",
      "school": "University Of Florida",
      "year": "2008-2011"
    }
  ],
  "experience": [
    {
      "id": "1",
      "role": "Project Manager",
      "company": "Awesome Themez",
      "year": "2005-2008"
    },
    {
      "id": "2",
      "role": "Senior Graphic Designer",
      "company": "Web Tech",
      "year": "2009-2010"
    },
    {
      "id": "3",
      "role": "Word Press Developer",
      "company": "Perfect IT",
      "year": "2008-2011"
    },
    {
      "id": "4",
      "role": "Team Leader",
      "company": "Theme Loops",
      "year": "2005-2008"
    },
    {
      "id": "5",
      "role": "Software Testing",
      "company": "Soft LTD",
      "year": "2009-2010"
    },
    {
      "id": "6",
      "role": "UI / UX Designer",
      "company": "Mount Soft IT",
      "year": "2008-2011"
    }
  ],
  "skills": [
    {
      "id": "1",
      "name": "Photoshop",
      "percentage": 90
    },
    {
      "id": "2",
      "name": "Html / css",
      "percentage": 80
    },
    {
      "id": "3",
      "name": "Adobe muse",
      "percentage": 85
    },
    {
      "id": "4",
      "name": "Python",
      "percentage": 80
    }
  ],
  "services": [
    {
      "id": "1",
      "icon": "paint-brush",
      "title": "Web Design",
      "description": "Sed ut perspiciatis unde omnis iste error sit voluptatem accusantium doloremque laudantium."
    },
    {
      "id": "2",
      "icon": "laptop",
      "title": "App Showcase",
      "description": "Sed ut perspiciatis unde omnis iste error sit voluptatem accusantium doloremque laudantium."
    },
    {
      "id": "3",
      "icon": "code",
      "title": "Web Programming",
      "description": "Sed ut perspiciatis unde omnis iste error sit voluptatem accusantium doloremque laudantium."
    },
    {
      "id": "4",
      "icon": "pencil-square-o",
      "title": "Pencil Sketches",
      "description": "Sed ut perspiciatis unde omnis iste error sit voluptatem accusantium doloremque laudantium."
    },
    {
      "id": "5",
      "icon": "sliders",
      "title": "3D Animation",
      "description": "Sed ut perspiciatis unde omnis iste error sit voluptatem accusantium doloremque laudantium."
    },
    {
      "id": "6",
      "icon": "wordpress",
      "title": "Wordpress Developent",
      "description": "Sed ut perspiciatis unde omnis iste error sit voluptatem accusantium doloremque laudantium."
    }
  ],
  "categories": [
    {
      "id": "cat-1",
      "name": "PHOTOGRAPHY",
      "filterClass": "item-1"
    },
    {
      "id": "cat-2",
      "name": "WEB DESIGN",
      "filterClass": "item-2"
    },
    {
      "id": "cat-3",
      "name": "DEVELOPMENT",
      "filterClass": "item-3"
    }
  ],
  "works": [
    {
      "id": "1",
      "title": "GRAPHIC DESIGN",
      "subtitle": "Info Graphic",
      "categoryId": "cat-2",
      "image": "img/work-01.jpg",
      "largeImage": "img/work-l-01.jpg"
    },
    {
      "id": "2",
      "title": "BOTTLE DESIGN",
      "subtitle": "Branding",
      "categoryId": "cat-1",
      "image": "img/work-02.jpg",
      "largeImage": "img/work-l-02.jpg"
    },
    {
      "id": "3",
      "title": "BRAND LOGO",
      "subtitle": "Branding",
      "categoryId": "cat-2",
      "image": "img/work-03.jpg",
      "largeImage": "img/work-l-03.jpg"
    },
    {
      "id": "4",
      "title": "ANIMATOR",
      "subtitle": "Monster",
      "categoryId": "cat-1",
      "image": "img/work-04.jpg",
      "largeImage": "img/work-l-04.jpg"
    },
    {
      "id": "5",
      "title": "ILLUSTRATOR",
      "subtitle": "Digital Flower",
      "categoryId": "cat-2",
      "image": "img/work-05.jpg",
      "largeImage": "img/work-l-05.jpg"
    },
    {
      "id": "6",
      "title": "GRAPHIC DESIGN",
      "subtitle": "Brochure",
      "categoryId": "cat-1",
      "image": "img/work-06.jpg",
      "largeImage": "img/work-l-06.jpg"
    }
  ],
  "contact": {
    "address": "4995 Collins Avenue,London",
    "phone": "002-333-8471",
    "email": "mail.lalin@gmail.com",
    "formActionUrl": "https://script.google.com/macros/s/AKfycbybzvSvJtuRLj3HXb9I7TKeYiSYA9Ty1tibpD6nijrtlbFkbOrgrw5mM1zO2vlTwl5pxg/exec"
  }
};
