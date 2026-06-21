import React, { useState, useEffect } from "react";

const STORAGE_KEY = "wanda-30th-todos";

const guestLists = [
  {
    id: "gl-brunch",
    event: "Birthday Brunch",
    emoji: "🥂",
    date: "July 10 (11am-1pm)",
    accent: "#D4763B", bg: "#FFF5EE", border: "#F5D5B8",
    guests: [
      { name: "Wanda", status: "confirmed" },
      { name: "Alfred", status: "confirmed" },
      { name: "Joycie", status: "confirmed" },
      { name: "Steph", status: "confirmed" },
    ],
  },
  {
    id: "gl-soiree",
    event: "Birthday Soiree",
    emoji: "🎉",
    date: "July 10 (8pm-11:30pm)",
    accent: "#D4763B", bg: "#FFF5EE", border: "#F5D5B8",
    note: "Alfred and Joycie are free to leave after 11pm if they wish.",
    guests: [
      { name: "Wanda", status: "hellyes" },
      { name: "Alfred", status: "hellyes" },
      { name: "Joycie", status: "hellyes" },
      { name: "Steph", status: "hellyes" },
      { name: "Allan", status: "hellyes" },
      { name: "Sam G", status: "hellyes" },
      { name: "Ru + Daleroy", status: "hellyes", count: 2 },
      { name: "George", status: "hellyes" },
      { name: "Patrick", status: "hellyes" },
      { name: "Daudi", status: "hellyes" },
      { name: "Sam S + Jojo", status: "hellyes", count: 2 },
      { name: "Olga + Russell", status: "hellyes", count: 2 },
      { name: "Nathalie", status: "hellyes" },
      { name: "Jess", status: "hellyes" },
      { name: "Esther", status: "hellyes" },
      { name: "Reem + Marco", status: "hellyes", count: 2 },
      { name: "Chidera", status: "hellyes" },
      { name: "Selome", status: "courtesy" },
      { name: "Sheree + Raanan", status: "courtesy", count: 2 },
      { name: "Monica + Miguel", status: "courtesy", count: 2 },
      { name: "Misri + Brad", status: "courtesy", count: 2 },
      { name: "Becca + Jesenia", status: "courtesy", count: 2 },
      { name: "Zina + AJ", status: "courtesy", count: 2 },
      { name: "Bri", status: "courtesy" },
      { name: "Annabelle", status: "courtesy" },
      { name: "Liz", status: "courtesy" },
      { name: "Raquel + Clint", status: "hellyes", count: 2 },
      { name: "Cassie + Chris", status: "hellyes", count: 2 },
      { name: "Danielle", status: "hellyes" },
      { name: "Erica", status: "hellyes" },
      { name: "Kusal", status: "hellyes" },
      { name: "Vic + Ryan", status: "hellyes", count: 2 },
      { name: "Erin + Blaise", status: "hellyes", count: 2 },
      { name: "Judy + Forrest", status: "hellyes", count: 2 },
      { name: "Maya + Craig", status: "hellyes", count: 2 },
      { name: "Cara + Zulema", status: "hellyes", count: 2 },
      { name: "Nigel + wife", status: "hellyes", count: 2, plusOneNote: "plus one is a maybe" },
      { name: "Sarah + fiance", status: "hellyes", count: 2, plusOneNote: "plus one is a maybe" },
      { name: "Felicia", status: "hellyes" },
      { name: "Aditi", status: "hellyes" },
      { name: "Claude", status: "hellyes" },
      { name: "Sam L", status: "hellyes" },
      { name: "Aish", status: "maybe" },
      { name: "Jaslyn", status: "maybe" },
      { name: "Daylee", status: "maybe" },
      { name: "Thandi", status: "maybe" },
      { name: "Cheyenne", status: "maybe" },
      { name: "Lulu", status: "maybe" },
      { name: "Janet", status: "hellyes" },
      { name: "Nari", status: "hellyes" },
      { name: "Charlie + Natalie", status: "maybe", count: 2 },
    ],
  },
  {
    id: "gl-dinner",
    event: "Birthday Dinner and Concert",
    emoji: "🎂",
    date: "July 11 (4:30pm)",
    accent: "#A07800", bg: "#FFFBEB", border: "#F5E4A0",
    guests: [
      { name: "Wanda", status: "confirmed" },
      { name: "Alfred", status: "confirmed" },
      { name: "Joycie", status: "confirmed" },
      { name: "Steph", status: "confirmed" },
      { name: "Allan", status: "pending" },
      { name: "Sam G", status: "pending" },
    ],
  },
  {
    id: "gl-hamptons",
    event: "The Hamptons",
    emoji: "🍷",
    date: "July 12-14",
    accent: "#5A8A5E", bg: "#F1F7F2", border: "#C2DBC4",
    guests: [
      { name: "Wanda", status: "confirmed" },
      { name: "Alfred", status: "confirmed" },
      { name: "Joycie", status: "confirmed" },
      { name: "Steph", status: "confirmed" },
      { name: "Sam S", status: "confirmed" },
      { name: "Olga", status: "confirmed" },
      { name: "Nathalie", status: "confirmed" },
      { name: "Jess", status: "confirmed" },
    ],
  },
  {
    id: "gl-pr",
    event: "Puerto Rico",
    emoji: "🌴",
    date: "July 14-21",
    accent: "#2E7DAF", bg: "#EFF6FC", border: "#B8D8EF",
    guests: [
      { name: "Wanda", status: "confirmed" },
      { name: "Alfred", status: "confirmed" },
      { name: "Joycie", status: "confirmed" },
      { name: "Steph", status: "confirmed" },
      { name: "Allan", status: "pending" },
    ],
  },
  {
    id: "gl-atlanta",
    event: "Atlanta",
    emoji: "🏙️",
    date: "July 21-23",
    accent: "#7B5EA7", bg: "#F5F0FB", border: "#D4C2ED",
    guests: [
      { name: "Wanda", status: "confirmed" },
      { name: "Alfred", status: "confirmed" },
      { name: "Joycie", status: "confirmed" },
      { name: "Steph", status: "confirmed" },
    ],
  },
  {
    id: "gl-spa",
    event: "Girls Spa Day",
    emoji: "💆🏾‍♀️",
    date: "July 24",
    accent: "#B04880", bg: "#FDF0F7", border: "#F0C0DC",
    note: "Open to larger girl group—anyone who wants to join welcome",
    guests: [
      { name: "Wanda", status: "confirmed" },
      { name: "Joycie", status: "confirmed" },
      { name: "Steph", status: "confirmed" },
      { name: "Sam S", status: "confirmed" },
      { name: "Olga", status: "confirmed" },
      { name: "Nathalie", status: "confirmed" },
      { name: "Jess", status: "confirmed" },
      { name: "Silvia", status: "pending" },
    ],
  },
  {
    id: "gl-mass-brunch",
    event: "Mass + Brunch",
    emoji: "🙏🏾",
    date: "July 26",
    accent: "#B04880", bg: "#FDF0F7", border: "#F0C0DC",
    guests: [
      { name: "Wanda", status: "confirmed" },
      { name: "Joycie", status: "confirmed" },
      { name: "Sam G", status: "confirmed" },
      { name: "Allan", status: "pending" },
      { name: "Olga", status: "pending" },
      { name: "Nathalie", status: "pending" },
      { name: "Ru + Daleroy", status: "pending", count: 2 },
    ],
  },
  {
    id: "gl-work-drinks",
    event: "Work Anniversary Drinks",
    emoji: "🍻",
    date: "July 27 (4:30pm)",
    accent: "#B04880", bg: "#FDF0F7", border: "#F0C0DC",
    guests: [
      { name: "Wanda", status: "confirmed" },
      { name: "Aditi", status: "confirmed" },
      { name: "Maya", status: "confirmed" },
      { name: "Felicia", status: "confirmed" },
    ],
  },
  {
    id: "gl-mondayfunday",
    event: "Monday Funday Dinner",
    emoji: "🍽️",
    date: "July 27 (6:30pm)",
    accent: "#B04880", bg: "#FDF0F7", border: "#F0C0DC",
    guests: [
      { name: "Wanda", status: "confirmed" },
      { name: "Joycie", status: "confirmed" },
      { name: "Mo (Joycie's Friend)", status: "confirmed" },
      { name: "Dierdre", status: "pending" },
    ],
  },
  {
    id: "gl-farewell",
    event: "Farewell Dinner",
    emoji: "🥹",
    date: "July 29 (7pm)",
    accent: "#B04880", bg: "#FDF0F7", border: "#F0C0DC",
    guests: [
      { name: "Wanda", status: "confirmed" },
      { name: "Alfred", status: "confirmed" },
      { name: "Joycie", status: "confirmed" },
      { name: "Allan", status: "pending" },
      { name: "Sam G", status: "pending" },
    ],
  },
];

const sections = [
  {
    id: "brunch", emoji: "🥂", title: "Birthday Brunch", date: "July 10 (11am-1pm)",
    accent: "#D4763B", bg: "#FFF5EE", border: "#F5D5B8",
    sectionNote: "Intimate meal with close family.",
    subsections: [
      {
        title: "Details",
        notes: [
          "Venue options: Colonia Verde, Evelina, Arden, Sisters",
          "Address: TBD—once restaurant is selected",
          ],
        todos: [
          { id: "br1", label: "Make reservation" },
        ],
      },
    ],
  },
  {
    id: "soiree", emoji: "🎉", title: "Birthday Soiree", date: "July 10 (8pm-11:30pm)",
    accent: "#D4763B", bg: "#FFF5EE", border: "#F5D5B8",
    sectionNote: "Evening party with a larger crowd. Soirée crew: Wanda, Alfred + Joycie, Steph, Sam S, Olga, Nathalie, Jess, Allan, Maya, Sam G, Ru + Daleroy.",
    subsections: [
      {
        title: "Details",
        notes: [
          "Address: 635 W 59 St, 22nd Floor Lounge",
          "Note: Concierge will let guests up",
        ],
        todos: [],
      },
      {
        title: "To Do",
        notes: [],
        todos: [
          { id: "b7", label: "Plan programming" },
          { id: "b0", label: "Draft guest list" },
          { id: "b9", label: "Create venue shortlist" },
          { id: "b2", label: "Finalize venue" },
          { id: "b1", label: "Finalize guest list" },
          { id: "b8", label: "Draft Partiful invite" },
          { id: "b3", label: "Send out Partiful invites" },
          { id: "b12", label: "Buy gift for Ru and Daleroy" },
          { id: "b13", label: "Confirm glassware, cutlery etc with Ru and make purchases if necessary" },
          { id: "b14", label: "Confirm screen situation for Mentimeter and Sour Grapes trailer—buy or rent projector if needed" },
          { id: "b15", label: "Remind soiree crew to bring speakers, projector, First to Worst, Uno and WNRS Level 1 (all part of decor/supplies)" },
          { id: "b4a", label: "Make a shortlist of catering options for soiree hors d'oeuvres (consider a grazing table) by June 29" },
          { id: "b4b", label: "Finalize catering by July 2" },
          { id: "b5", label: "Send soiree crew list of decor needed" },
          { id: "b10", label: "Make Mentimeter quiz" },
          { id: "b11", label: "Buy prizes" },
          { id: "b6", label: "Create hour by hour soiree schedule in JSX" },
        ],
      },
    ],
  },
  {
    id: "dinner", emoji: "🎂", title: "Birthday Dinner and Concert", date: "July 11 (4:30pm)",
    accent: "#A07800", bg: "#FFFBEB", border: "#F5E4A0",
    sectionNote: "Intimate meal with nearest and dearest followed by a nostalgic concert.",
    subsections: [
      {
        title: "Details",
        notes: [
          "Dinner Venue: Ci Siamo",
          "Dinner Address: 440 W 33rd St Ste #100, New York, NY 10001",
          "Dinner reservation time: 4:30pm",
          "Concert Venue: Madison Square Garden",
          "Concert Address: 4 Pennsylvania Plaza, New York, NY 10001",
          "Concert Start Time: 7:30pm (must be seated by 7pm)",
        ],
        todos: [
          { id: "di1", label: "Make reservation for Ci Siamo for July 11 at 4:30pm for 6 people" },
          { id: "di2", label: "Buy 6 tickets for Lionel Richie and EWF concert" },
        ],
      },
    ],
  },
  {
    id: "hamptons", emoji: "🍷", title: "The Hamptons", date: "July 12-14",
    accent: "#5A8A5E", bg: "#F1F7F2", border: "#C2DBC4",
    sectionNote: "A mini trip centered around the Wolffer Winery Tour and Tasting—a nod to the original Wanda's Worldwide Wine Tours plan.",
    subsections: [
      {
        title: "Details",
        notes: [
          "Accommodation: Cottage in Hampton Bays Airbnb",
          "Airbnb address: 19 Oceanview Road, Hampton Bays, NY 11946",
          "Airbnb features: 3 bedrooms, 3 beds, 2 baths, sleeps 8; saltwater pool, hot tub, private beach access, pet friendly",
          "Wolffer Winery address: 139 Sagg Rd, Sagaponack, NY 11962",
          "Car 1 (Avis, Standard Elite SUV): Wanda (DD), Alfred, Joycie, Steph",
          "Car 2 (Avis, VW Jetta): Sam S (DD), Jess, Olga, Nathalie",
          "Car 1 pickup address: 106 York St, Brooklyn, NY 11201",
          "Car 1 drop off address: JFK Airport, 124-20 S Conduit Ave, Jamaica, NY 11420",
          "Car 2 pickup and drop off address: 120 Warren St, New York, NY 10007",
          "Note: Jess and Nathalie may both leave July 13. Jess may also be bringing her dog Nori",
        ],
        todos: [],
      },
      {
        title: "Itinerary",
        notes: [
          "July 12: Drive down, Wolffer Winery Tour and Tasting, check in to Airbnb",
          "Car 1 (Avis, Standard Elite SUV): Wanda, Alfred, Joycie, Steph—pickup 106 York St Brooklyn July 12 at 8:30am, drop off JFK July 14 by 5pm",
          "Car 2 (Avis, VW Jetta): Sam S (DD), Jess, Olga, Nathalie—pickup 120 Warren St NYC July 12 at 8:30am, drop off same location July 14 by 6pm",
          "July 13: Pool, hot tub, private beach day",
          "July 14: Late checkout of Airbnb, lunch nearby. Depart from JFK at 7:29pm on DL1859",
        ],
        todos: [],
      },
      {
        title: "To Do",
        notes: [],
        todos: [
          { id: "h1", label: "Book Hamptons Airbnb for July 12-14" },
          { id: "h9", label: "Email vstilletti@wolffer.com (Wolffer Winery) re: non-alc options, a la carte, back-to-back reservation" },
          { id: "h10", label: "Reply to Wolffer Winery email" },
          { id: "h2", label: "Book Wolffer Winery Tour and Tasting for July 12 at 12pm for 8 people on June 28" },
          { id: "h5", label: "Book Car 1 (Avis, Standard Elite SUV): pickup 106 York St Brooklyn July 12 at 8:30am, drop off JFK July 14 at 5pm" },
          { id: "h13", label: "Book Car 2 in Sam S's name (Avis, VW Jetta): pickup 120 Warren St NYC July 12 at 8:30am, drop off same location July 14 at 6pm" },
          { id: "h11", label: "Request late checkout (12pm) from Airbnb host" },
          { id: "h12", label: "Send Venmo requests to friends for Airbnb and Wolffer Winery Tour" },
          { id: "h6", label: "Clarify costs with Jess and Nathalie if they leave on July 13" },
        ],
      },
    ],
  },
  {
    id: "pr", emoji: "🌴", title: "Puerto Rico", date: "July 14-21",
    accent: "#2E7DAF", bg: "#EFF6FC", border: "#B8D8EF",
    sectionNote: "Post-Hamptons getaway—sun, culture and a change of scenery.",
    subsections: [
      {
        title: "Details",
        notes: [
          "Accommodation: Home in San Juan",
          "Airbnb address: 818 Avenida Juan Ponce de León, San Juan, PR 00907",
          "Note: Pack games (First to Worst, WNRS Levels 1-3, Matchbox, Kumiliki, Names etc, a regular deck of cards)",
          "Note: Steph working remotely July 20-25",
        ],
        todos: [],
      },
      {
        title: "Itinerary",
        notes: [
          "July 14: Arrive at SJU at 11:53pm on DL1859. Check in to Airbnb.",
          "July 15-20: Explore PR—activities TBD",
          "July 21: Depart from SJU at 12:50pm on DL1757",
        ],
        todos: [],
      },
      {
        title: "To Do",
        notes: [],
        todos: [
          { id: "p1", label: "Book flights: NYC to PR for July 14" },
          { id: "p2", label: "Book flights: PR to Atlanta for July 21" },
          { id: "p3", label: "Book Airbnb for July 14-21" },
          { id: "p4", label: "Plan activities" },
        ],
      },
    ],
  },
  {
    id: "atlanta", emoji: "🏙️", title: "Atlanta", date: "July 21-23",
    accent: "#7B5EA7", bg: "#F5F0FB", border: "#D4C2ED",
    sectionNote: "A family visit and slow re-entry to big city life.",
    subsections: [
      {
        title: "Details",
        notes: [
          "Accommodation: Apartment in Atlanta",
          "Airbnb address: 505 Pharr Rd NE, Atlanta, GA 30305",
          "Note: Steph working remotely July 20-25",
        ],
        todos: [],
      },
      {
        title: "Itinerary",
        notes: [
          "July 21: Arrive at ATL at 4:40pm on DL1757",
          "July 22: Family time—cousin arranging dinners and local plans",
          "July 23: Wanda, Joycie and Steph depart from ATL to NYC. Alfred stays in Georgia.",
        ],
        todos: [],
      },
      {
        title: "To Do",
        notes: [],
        todos: [
          { id: "a5", label: "Coordinate with cousin on dinners / plans" },
        ],
      },
    ],
  },
  {
    id: "nyc", emoji: "🗽", title: "Back to NYC", date: "July 23-30",
    accent: "#B04880", bg: "#FDF0F7", border: "#F0C0DC",
    sectionNote: "Final stretch—girls time, family activities, and (unfortunately) work.",
    subsections: [
      {
        title: "Details",
        notes: [
          "Accommodation: Wanda's apartment (July 23-28 for Joycie; all NYC stretches for Steph), The Smyth Tribeca (July 9-12 for Alfred and Joycie); The Frederick Hotel (July 27-30 for Alfred and Joycie)",
          "The Smyth Tribeca address: 85 West Broadway, New York, NY 10007",
          "QC Spa address: 112 Andes Rd, Governors Island, NY 10004 (ferry from 10 South St, Manhattan)",
          "St. Charles Borromeo Church address: 211 W 141st St, New York, NY 10030",
          "The Edge Harlem address: 101 Edgecombe Ave, New York, NY 10030",
          "Stafili Wine Cafe address: 222 W Broadway, New York, NY 10013",
          "Maison Passerelle address: 1 Wall St, New York, NY 10005",
          "Paros Tribeca address: 211 W Broadway, New York, NY 10013",
          "Note: Steph working remotely July 20-25",
          "Note: Mo (Joycie's Friend) is visiting NYC July 27-28—Alfred, Joycie and friend will explore NYC while Wanda is in the office.",
          "Note: Wanda will arrange a car pickup for Alfred from LGA on July 27.",
        ],
        todos: [],
      },
      {
        title: "Itinerary",
        notes: [
          "July 23: Arrive at LGA at 7:20pm on DL997. Steph and Joycie at Wanda's apartment (Steph working remotely). Alfred and Joycie at The Frederick Hotel from July 27",
          "July 24: Girls spa day at QC Spa",
          "July 25: Steph departs. Wanda and Joycie swim at Lifetime Dumbo. Joycie and Wanda at Wanda's apartment",
          "July 26: Mass at St. Charles Borromeo then brunch at The Edge Harlem. Evening: girl dinner + movie + braid takedown",
          "July 27: Wanda working (in office). Alfred flies MGM to LGA. Mo (Joycie's Friend) visiting NYC—Alfred, Joycie and friend hang out while Wanda works. Evening: Monday Funday Dinner at Maison Passerelle (6:30pm).",
          "July 28: Wanda working (in office). Mo (Joycie's Friend) still visiting—Alfred, Joycie and friend explore NYC.",
          "July 29: Wanda working (pushing for WFH). Farewell dinner at Paros Tribeca",
          "July 30: Wanda working (pushing for WFH). Alfred and Joycie depart",
        ],
        todos: [],
      },
      {
        title: "To Do",
        notes: [],
        todos: [
          { id: "n1", label: "Book The Smyth Tribeca for July 9-12 (Deluxe King, I Prefer Member Rate)" },
          { id: "n2", label: "Book The Smyth Tribeca for July 28-30 (Superior King, $508/night)" },
          { id: "n4", label: "Make reservation for QC Spa for July 24 for Wanda, Joycie and Steph on July 3" },
          { id: "n4b", label: "Text larger girl group about making their own QC Spa reservation for July 24 on July 5" },
          { id: "n7", label: "Make reservation for The Edge Harlem for July 26 at 12pm for 8 people" },
          { id: "n8", label: "Make reservation for Stafili Wine Cafe for July 27 at 4:30pm for 4 people" },
          { id: "n9a", label: "Make reservation for Maison Passerelle for July 27 at 6:30pm for 4 people" },
          { id: "n9", label: "Make reservation for Paros Tribeca for July 29 at 7pm for 5 people" },
          { id: "n5", label: "Confirm WFH for July 29 and 30" },
          { id: "n6", label: "Brainstorm more NYC activities for parents (July 27-30)" },
        ],
      },
    ],
  },
];

const openQuestions = [
    { q: "PR activities", a: "To be planned." },
];

const programmingSections = [
  {
    id: "prog-brunch", emoji: "🥂", title: "Birthday Brunch", date: "July 10 (11am-1pm)",
    accent: "#D4763B", bg: "#FFF5EE", border: "#F5D5B8",
    blocks: [{ title: "Programming", notes: ["Programming TBD"] }],
  },
  {
    id: "prog-soiree", emoji: "🎉", title: "Birthday Soiree", date: "July 10 (8pm-11:30pm)",
    accent: "#D4763B", bg: "#FFF5EE", border: "#F5D5B8",
    blocks: [
      {
        title: "Note",
        notes: [
          "See the Wanda 30th Soirée Programming deep dive artifact for full details.",
          "See the crew tab for full soirée crew details.",
          "Note: First to Worst is the one programming item that can be nixed if needed—all other elements are core.",
        ],
      },
      {
        title: "Run of Show",
        notes: [
          "7:15pm: Soirée crew and parents arrive at venue for setup. Allan to join later.",
          "8:00pm: Guests arrive—welcome drinks, hors d'oeuvres, mingle. Wine Hunt bottles collected at the door.",
          "8:30pm: Wine Hunt judging quietly in the background. Bottles on display for guests to admire.",
          "9:15pm: Mentimeter quiz results announced, then remote winner revealed.",
          "9:30pm: First to Worst kicks off in the corner. Guests mingle, watch, or play Uno and WNRS. Open floor.",
          "10:15pm: First to Worst prize reveal. Wine Hunt winners announced. Sour Grapes trailer plays as intro to Wine Hunt results.",
          "10:30pm: Cake cutting! Parents bring out 3 cakes—Berry Chantilly, Mango Yuzu Chantilly (both Whole Foods), and a chocolate surprise. Olga and Sam S coordinate logistics.",
          "10:45pm: Open floor—dancing, more card games, vibes. Uno and WNRS stay out for the rest of the night.",
          "11:00pm: Parents free to depart anytime from here.",
          "11:30pm: Soiree ends. Cleanup begins (11:30pm-12am)—full soiree crew responsible. Allan to communicate after-party plan as guests head out.",
        ],
      },
    ],
  },
  {
    id: "prog-dinner", emoji: "🎂", title: "Birthday Dinner and Concert", date: "July 11 (4:30pm)",
    accent: "#A07800", bg: "#FFFBEB", border: "#F5E4A0",
    blocks: [{ title: "Programming", notes: ["4:30pm: Dinner at Ci Siamo", "7:30pm: Lionel Richie and EWF concert at Madison Square Garden (seated by 7pm)"] }],
  },
  {
    id: "prog-hamptons", emoji: "🍷", title: "The Hamptons", date: "July 12-14",
    accent: "#5A8A5E", bg: "#F1F7F2", border: "#C2DBC4",
    blocks: [
      {
        title: "Sunday July 12",
        notes: [
          "8am: Leave respective homes in NYC to meet at car rental",
          "8:30am: Car 1, Standard Elite SUV, pickup at Avis, 106 York St Brooklyn. Wanda (DD), Alfred, Joycie, Steph.",
          "8:30am: Car 2, VW Jetta, pickup at Avis, 120 Warren St NYC. Sam S (DD), Jess, Olga, Nathalie.",
          "9am: Depart for the Hamptons",
          "~11:30am: Arrive at Wolffer Winery",
          "12pm: Wolffer Winery Tour and Tasting (90 mins, sommelier-guided, 4 pours + light bites)",
          "~1:30pm: Tour and tasting ends—explore the grounds, Wine Stand, or grab food a la carte",
          "3pm+: Check in to Hamptons Airbnb",
          "Evening: Settle in, dinner TBD",
        ],
      },
      {
        title: "Monday July 13",
        notes: [
          "Morning: Leisurely start—breakfast at the house",
          "Daytime: Pool, hot tub, private beach (1/4 mile away)",
          "Evening: Dinner TBD",
          "Note: Jess may depart today—departure time TBD",
        ],
      },
      {
        title: "Tuesday July 14",
        notes: [
          "Morning: Enjoy the house—pool, hot tub, pack up",
          "12pm: Late checkout (requested from host)",
          "12:15pm: Lunch nearby",
          "3pm: Depart for JFK",
          "~4:30pm: Arrive at JFK. 5pm: Car 1, Standard Elite SUV, drop off at JFK, 124-20 S Conduit Ave. Wanda (DD), Alfred, Joycie, Steph.",
          "6pm: Car 2, VW Jetta, drop off at Avis, 120 Warren St NYC. Sam S (DD), Jess, Olga, Nathalie.",
          "7:29pm: Depart from JFK on DL1859",
        ],
      },
    ],
  },
  {
    id: "prog-pr", emoji: "🌴", title: "Puerto Rico", date: "July 14-21",
    accent: "#2E7DAF", bg: "#EFF6FC", border: "#B8D8EF",
    blocks: [
      {
        title: "Tuesday July 14",
        notes: ["11:53pm: Arrive at SJU on DL1859", "Check in to PR Airbnb"],
      },
      {
        title: "Wednesday July 15",
        notes: ["Activities TBD"],
      },
      {
        title: "Thursday July 16",
        notes: ["Activities TBD"],
      },
      {
        title: "Friday July 17",
        notes: ["Activities TBD"],
      },
      {
        title: "Saturday July 18",
        notes: ["Activities TBD"],
      },
      {
        title: "Sunday July 19",
        notes: ["Activities TBD"],
      },
      {
        title: "Monday July 20",
        notes: ["Note: Steph working remotely (July 20-25)", "Activities TBD"],
      },
      {
        title: "Tuesday July 21",
        notes: ["Note: Steph working remotely (July 20-25)", "Check out", "12:50pm: Depart from SJU on DL1757"],
      },
    ],
  },
  {
    id: "prog-atlanta", emoji: "🏙️", title: "Atlanta", date: "July 21-23",
    accent: "#7B5EA7", bg: "#F5F0FB", border: "#D4C2ED",
    blocks: [
      {
        title: "Tuesday July 21",
        notes: ["4:40pm: Arrive at ATL on DL1757", "Note: Steph working remotely (July 20-25)", "Evening: Family dinner TBD (cousin arranging)"],
      },
      {
        title: "Wednesday July 22",
        notes: ["Note: Steph working remotely (July 20-25)", "Family time—cousin arranging plans", "Dinner TBD"],
      },
      {
        title: "Thursday July 23",
        notes: ["Wanda, Joycie and Steph fly back to NYC (flight TBD)", "Alfred stays in Georgia"],
      },
    ],
  },
  {
    id: "prog-nyc", emoji: "🗽", title: "Back to NYC", date: "July 23-30",
    accent: "#B04880", bg: "#FDF0F7", border: "#F0C0DC",
    blocks: [
      {
        title: "Thursday July 23",
        notes: [
          "7:20pm: Arrive at LGA on DL997",
          "Note: Steph working remotely (July 20-25)",
          "Note: Steph and Joycie staying at Wanda's apartment",
          "Evening: Rest and recover TBD",
        ],
      },
      {
        title: "Friday July 24",
        notes: [
          "Note: Steph working remotely (July 20-25)",
          "Girls spa day at QC Spa",
        ],
      },
      {
        title: "Saturday July 25",
        notes: [
          "Steph departs",
          "Wanda and Joycie swim at Lifetime Dumbo—Wanda shows Joycie how to get there and signs her up for a day guest pass for July 29",
          "Joycie and Wanda at Wanda's apartment",
        ],
      },
      {
        title: "Sunday July 26",
        notes: [
          "9:45am: Arrive at St. Charles Borromeo Church—Mass at 10am",
          "12pm: Post-Mass brunch at The Edge Harlem",
          "Evening: Girl dinner + movie at Wanda's apartment while Joycie helps take down Wanda's braids",
        ],
      },
      {
        title: "Monday July 27",
        notes: [
          "Wanda working (in office)",
          "Mo (Joycie's Friend) visiting NYC—Alfred, Joycie and friend explore NYC while Wanda works",
          "2:50pm: Alfred departs MGM on DL5379+DL434",
          "4:30pm: Work anniversary drinks at Stafili Wine Cafe",
          "6:30pm: Monday Funday Dinner at Maison Passerelle (Wanda, Joycie, Mo (Joycie's Friend), Dierdre)",
          "8:27pm: Alfred arrives LGA—car pickup arranged. Alfred and Joycie check in to The Frederick Hotel (95 West Broadway)",
        ],
      },
      {
        title: "Tuesday July 28",
        notes: [
          "Wanda working (in office)",
          "Mo (Joycie's Friend) still visiting—Alfred, Joycie and friend explore NYC",
          "Alfred and Joycie: shopping at Marshall's, TJ Maxx, SoHo",
        ],
      },
      {
        title: "Wednesday July 29",
        notes: [
          "Wanda working (pushing for WFH)",
          "Joycie: swimming at Lifetime Dumbo", "Alfred and Joycie: shopping at Marshall's, TJ Maxx, SoHo",
          "7pm: Farewell dinner at Paros Tribeca",
        ],
      },
      {
        title: "Thursday July 30",
        notes: [
          "Wanda working (pushing for WFH)",
          "Alfred and Joycie depart",
        ],
      },
    ],
  },
];

const largerGirlGroup = ["Esther","Reem","Sheree","Chidera","Selome","Ru","Monica","Misri","Becca","Raquel","Cassie","Danielle","Erica","Maya","Cara"];

function getHeadcounts(guests) {
  const hellyes = guests.filter(g => g.status === "hellyes" || g.status === "confirmed");
  const pending = guests.filter(g => g.status === "pending" || g.status === "courtesy");
  const maybe = guests.filter(g => g.status === "maybe");
  const sum = arr => arr.reduce((acc, g) => acc + (g.count || 1), 0);
  const hellyesMin = hellyes.reduce((acc, g) => acc + (g.plusOneNote ? 1 : (g.count || 1)), 0);
  return { confirmedMin: hellyesMin, confirmedMax: sum(hellyes), tbd: sum(pending), maybe: sum(maybe) };
}

function Checkbox({ id, label, checked, onChange, accent }) {
  return (
    <div onClick={() => onChange(id)} style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)", opacity: checked ? 0.45 : 1 }}>
      <div style={{ width: "17px", height: "17px", minWidth: "17px", borderRadius: "4px", border: checked ? ("2px solid " + accent) : "2px solid #CBD5E1", background: checked ? accent : "white", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px", flexShrink: 0 }}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 3.5L3.8 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span style={{ fontSize: "13.5px", color: checked ? "#94A3B8" : "#374151", textDecoration: checked ? "line-through" : "none", lineHeight: "1.55", userSelect: "none" }}>{label}</span>
    </div>
  );
}

function Accordion({ emoji, title, date, accent, bg, border, defaultOpen = false, badge, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: "white", borderRadius: "14px", border: ("1px solid " + border), overflow: "hidden", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", cursor: "pointer", background: bg, borderBottom: open ? ("1px solid " + border) : "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
          {emoji && <span style={{ fontSize: "20px", lineHeight: 1 }}>{emoji}</span>}
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B" }}>{title}</div>
            {date && <div style={{ fontSize: "11.5px", color: accent, fontWeight: "600", marginTop: "1px", letterSpacing: "0.04em", textTransform: "uppercase" }}>{date}</div>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {badge}
          <span style={{ color: "#64748B", fontSize: "14px", transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.2s", display: "inline-block" }}>&#9662;</span>
        </div>
      </div>
      {open && children}
    </div>
  );
}

function Section({ section, checked, onToggle }) {
  return (
    <Accordion emoji={section.emoji} title={section.title} date={section.date} accent={section.accent} bg={section.bg} border={section.border} badge={null}>
      <div style={{ padding: "16px 20px" }}>
        {section.sectionNote && (
          <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 14px 0", lineHeight: "1.6", fontStyle: "italic", paddingBottom: "12px", borderBottom: ("1px solid " + section.border) }}>
            {section.sectionNote}
          </p>
        )}
        {section.subsections.map((sub, si) => (
          <div key={si} style={{ marginTop: si === 0 ? 0 : "16px" }}>
            {sub.notes.length > 0 && (
              <div style={{ fontSize: "10.5px", fontWeight: "700", color: section.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{sub.title}</div>
            )}
            {sub.notes.map((note, ni) => (
              <p key={ni} style={{ fontSize: "13px", color: "#475569", margin: "0 0 6px 0", lineHeight: "1.55", paddingLeft: "10px", borderLeft: ("2.5px solid " + section.border) }}>{note}</p>
            ))}
          </div>
        ))}
      </div>
    </Accordion>
  );
}

function GuestListCard({ list }) {
  const { confirmedMin, confirmedMax, tbd, maybe } = getHeadcounts(list.guests);
  const confirmedLabel = confirmedMin === confirmedMax ? ("" + confirmedMax) : (confirmedMin + "-" + confirmedMax);
  const badge = (
    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
      <span style={{ fontSize: "11px", background: "#DCFCE7", color: "#166534", borderRadius: "20px", padding: "2px 10px", fontWeight: "700" }}>{"✓ " + confirmedLabel}</span>
      {tbd > 0 && <span style={{ fontSize: "11px", background: "#FEF3C7", color: "#92400E", borderRadius: "20px", padding: "2px 10px", fontWeight: "700" }}>{"? " + tbd}</span>}
    </div>
  );
  return (
    <Accordion emoji={list.emoji} title={list.event} date={list.date} accent={list.accent} bg={list.bg} border={list.border} badge={badge}>
      <div style={{ padding: "10px 18px 14px" }}>
        {list.note && <p style={{ fontSize: "12.5px", color: "#64748B", fontStyle: "italic", margin: "8px 0 12px" }}>{list.note}</p>}
        {["hellyes","confirmed","pending","courtesy"].map(status => {
          const group = list.guests.filter(g => g.status === status);
          if (!group.length) return null;
          const labels = { hellyes: "Inviting", confirmed: "Confirmed", pending: "Confirmation Pending", courtesy: "Courtesy Invite (They have a conflict)", maybe: "Invite TBD" };
          return (
            <div key={status} style={{ marginTop: "10px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: list.accent, marginBottom: "6px" }}>{labels[status]}</div>
              {group.map((g, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", borderBottom: i < group.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <span style={{ fontSize: "13px", color: "#374151" }}>
                    {g.name}
                    {g.plusOneNote && <span style={{ fontSize: "11px", color: "#94A3B8", marginLeft: "6px", fontStyle: "italic" }}>({g.plusOneNote})</span>}
                  </span>
                  {g.count && g.count > 1 && <span style={{ fontSize: "11px", color: "#94A3B8" }}>{g.count} people</span>}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </Accordion>
  );
}

function ProgrammingSection({ section }) {
  return (
    <Accordion emoji={section.emoji} title={section.title} date={section.date} accent={section.accent} bg={section.bg} border={section.border}>
      <div style={{ padding: "16px 20px" }}>
        {section.blocks.map((block, bi) => (
          <div key={bi} style={{ marginTop: bi === 0 ? 0 : "16px" }}>
            <div style={{ fontSize: "10.5px", fontWeight: "700", color: section.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{block.title}</div>
            {block.notes.map((note, ni) => (
              <p key={ni} style={{ fontSize: "13px", color: "#475569", margin: "0 0 6px 0", lineHeight: "1.55", paddingLeft: "10px", borderLeft: ("2.5px solid " + section.border) }}>{note}</p>
            ))}
          </div>
        ))}
      </div>
    </Accordion>
  );
}

function StaticPanel({ emoji, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "white", borderRadius: "14px", border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", marginBottom: "16px" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "14px 20px", background: "#F8FAFC", borderBottom: open ? "1px solid #E2E8F0" : "none", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
        <span style={{ fontSize: "17px" }}>{emoji}</span>
        <span style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B" }}>{title}</span>
        <span style={{ color: "#64748B", fontSize: "13px", marginLeft: "auto", transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.2s", display: "inline-block" }}>&#9662;</span>
      </div>
      {open && children}
    </div>
  );
}

const crewMembers = [
  { name: "Wanda", title: "Master of Ceremonies, Co-Guest of Honor + Head of Programming", emoji: "👑", accent: "#A07800", bg: "#FFFBEB", border: "#F5E4A0", role: "The architect of the entire evening (and month)—the vision, the vibe, and every beautiful detail in between. All this labour warrants all these titles. I can't wait to celebrate and be celebrated!", events: [], todos: ["Buy/order outfit by June 16", "Finalize Mentimeter quiz by June 29", "Send Partiful invites + Partiful Card with quiz link on July 1", "Coordinate with soiree crew on all moving parts", "Send quiz reminder text blast via Partiful on July 8", "Buy prizes for soiree by July 9", "Decor and supplies shopping with Steph on July 9", "Day-of text blast via Partiful on July 10", "Send Partiful Card with quiz results to remote guests after the party on July 10", "Day-after thank you text blast via Partiful on July 11", "Arrive at venue at 7:15pm for setup"] },
  { name: "Alfred + Joycie", title: "Co-Guests of Honor", emoji: "🥹", accent: "#2E7DAF", bg: "#EFF6FC", border: "#B8D8EF", role: "The reason the other guest of honor exists—and the greatest gift she has ever received. What a blessing that they will be here to share in the joy of this milestone! Tonight their only job is to mingle, be merry, and bring out the cake.", eventsLabel: "Pre and Post-Soiree Events", events: ["🥂 Birthday Brunch—July 10", "🎂 Birthday Dinner and Concert—July 11", "🍷 The Hamptons—July 12-14", "🌴 Puerto Rico—July 14-21", "🏙️ Atlanta—July 21-23", "💆🏾‍♀️ Girls Spa Day (Joycie)—July 24", "🙏🏾 Mass + Brunch (Joycie)—July 26", "🍽️ Monday Funday Dinner (Joycie)—July 27", "🥹 Farewell Dinner—July 29"], todos: ["Mingle and have fun", "Bring out and cut one of the cakes at 10:30pm"] },
  { name: "Steph", title: "Head of Logistics", emoji: "📦", accent: "#D4763B", bg: "#FFF5EE", border: "#F5D5B8", role: "She stays calm under pressure and consistently delivers come what may. With her sharp intuition, deep creativity and calming presence she's sure to solve problems before they even present themselves. She never fails to show up and show out so today we'll keep her load light! Works closely with Head of Sonic Experience.", eventsLabel: "Pre and Post-Soiree Events", events: ["🥂 Birthday Brunch—July 10", "🎂 Birthday Dinner and Concert—July 11", "🍷 The Hamptons—July 12-14", "🌴 Puerto Rico—July 14-21", "🏙️ Atlanta—July 21-23", "💆🏾‍♀️ Girls Spa Day—July 24"], todos: ["Coordinate with Nathalie to contribute music to playlist before July 10", "Decor and supplies shopping with Wanda on July 9", "Transport to venue: decor, glassware, cutlery, speakers, projector, and card games (First to Worst, Uno, WNRS Level 1)", "Arrive at venue at 7:15pm for setup"] },
  { name: "Sam S", title: "Head of Flow", emoji: "🌊", accent: "#B04880", bg: "#FDF0F7", border: "#F0C0DC", role: "She knows how to stay on task, keeps things on track, and seize the moment—she understands organic timing. Head of Flow keeps the rhythm of the night steady and responsive to the crowd. Majoring in structure, minoring in feeling—works in close collaboration with the Head of Ambiance.", events: ["🍷 The Hamptons—July 12-14", "💆🏾‍♀️ Girls Spa Day—July 24"], todos: ["Coordinate with Olga on which cake(s) to bring", "Bring cake(s) to venue. 1 Berry Chantilly 12in and 1 Mango Yuzu Chantilly 12in from Whole Foods; and another cake—surprise me!", "Arrive at venue at 7:15pm for setup", "Bring out cakes at cake cutting (10:30pm)", "Light candles", "Monitor schedule and suggest tweaks as needed", "Help with cleanup 11:30pm-12am", "Be designated driver for Car 2—meet at car rental pickup location (120 Warren St NYC) on July 12 at 8:30am"] },
  { name: "Olga", title: "Head of Ambiance", emoji: "✨", accent: "#A07800", bg: "#FFFBEB", border: "#F5E4A0", role: "With her aura and warmth, she was born to work a crowd. She makes everyone feel seen and welcome so as Head of Ambiance she will keep the buzz of the room high. Majoring in feeling, minoring in structure—works in close collaboration with the Head of Flow.", events: ["🍷 The Hamptons—July 12-14", "💆🏾‍♀️ Girls Spa Day—July 24", "🙏🏾 Mass + Brunch—July 26"], todos: ["Coordinate with Sam S on which cake(s) to bring", "Bring cake(s) to venue. 1 Berry Chantilly 12in and 1 Mango Yuzu Chantilly 12in from Whole Foods; and another cake—surprise me!", "Arrive at venue at 7:15pm for setup", "Bring out cakes at cake cutting (10:30pm)", "Light candles", "Monitor energy in the room and suggest tweaks as needed", "Help with cleanup 11:30pm-12am", "Meet at car rental pickup location (120 Warren St NYC) on July 12 at 8:30am"] },
  { name: "Nathalie", title: "Head of Sonic Experience", emoji: "🎵", accent: "#7B2D8B", bg: "#FAF5FC", border: "#E2C8F0", role: "Head of Sonic Experience is in charge of the heartbeat of the night. As someone who's always in the know and on the go she will thrive at capturing the vibe ahead of time and at a moment's notice. DJ Babes aka TheChampagneMami on deck all month long! Works closely with Head of Logistics.", events: ["🍷 The Hamptons—July 12-14", "💆🏾‍♀️ Girls Spa Day—July 24", "🙏🏾 Mass + Brunch—July 26"], todos: ["Make playlist before July 10 (ask Steph to contribute music too)", "Arrive at venue at 7:15pm for setup", "Manage music throughout the night (and during The Hamptons trip)", "Help with cleanup 11:30pm-12am"] },
  { name: "Jess", title: "Head of Scenography", emoji: "🎨", accent: "#D4763B", bg: "#FFF5EE", border: "#F5D5B8", role: "An expert in visual tempo, she knows how to set a scene—when to evoke drama and when to evoke serenity. Head of Scenography tells the story of the soiree in everything we see and who better to do it than this queen of design.", events: ["🍷 The Hamptons—July 12-14", "💆🏾‍♀️ Girls Spa Day—July 24"], todos: ["Arrive at venue at 7:15pm for setup", "Set up decor", "Help with cleanup 11:30pm-12am", "Meet at car rental pickup location (120 Warren St NYC) on July 12 at 8:30am"] },
  { name: "Allan", title: "Head of Post-Programming Festivities", emoji: "🎉", accent: "#5A8A5E", bg: "#F1F7F2", border: "#C2DBC4", role: "Head of Post-Programming Festivities must take a pulse of the room and create a plan that is alluring enough to garner interest, unique enough to feel like a change of pace, yet concrete enough to be feasible. He knows all the cool spots in the city and has the charisma, energy and wit to execute on the impossible. And he can do it on the fly!", events: ["🎂 Birthday Dinner and Concert—July 11", "🌴 Puerto Rico—July 14-21", "🙏🏾 Mass + Brunch—July 26", "🥹 Farewell Dinner—July 29"], todos: ["Come up with after-party plan before July 10", "Sense check crowd and adjust after-party plan as needed", "Communicate after-party details to guests at 11:30pm", "Help with cleanup 11:30pm-12am"] },
  { name: "Maya", title: "Head of Innovation", emoji: "💡", accent: "#B04880", bg: "#FDF0F7", border: "#F0C0DC", role: "As a creative technologist, she's always thinking about how tools and products (both digital and physical) can make or break strategy and success. Head of Innovation will make sure that outreach and merchandising is backed by thoughtful design/systems, real feedback and thorough testing.", events: ["🍻 Work Anniversary Drinks—July 27"], todos: ["Research fast production and shipping of custom wine glasses and t-shirts before June 19", "Investigate schedule-send functionality for Partiful text blasts and cards", "Review Partiful invite draft before June 30", "Review Partiful Card with quiz link for remote quiz takers before June 30", "Review Partiful Card with quiz results for remote quiz takers before July 10", "Help with cleanup 11:30pm-12am"] },
  { name: "Sam G", title: "Head of Libations", emoji: "🍹", accent: "#2E7DAF", bg: "#EFF6FC", border: "#B8D8EF", role: "Head of Libations ensures your cup is full at all times. With his expertise in wines—albeit passed on to him unwillingly by an associate—and his taste for mocktails, he is well poised to keep the knowledge and the drinks flowing.", events: ["🎂 Birthday Dinner and Concert—July 11", "🙏🏾 Mass + Brunch—July 26", "🥹 Farewell Dinner—July 29"], todos: ["Source a few drinks for cocktails and mocktails", "Get drinks to venue before or at 7:15pm (can even take them there the day before)", "Arrive at venue at 7:15pm for setup", "Help with cleanup 11:30pm-12am"] },
  { name: "Ru + Daleroy", title: "Co-Heads of Space", emoji: "🏠", accent: "#5A8A5E", bg: "#F1F7F2", border: "#C2DBC4", role: "Space is not just physical it is also social. The Co-Heads of Space didn't simply provide a venue for this soiree, they welcomed us into their home and allowed connections to emerge and grow. Without their generosity, this soiree would not be possible. Their only job is to enjoy the night!", events: ["💆🏾‍♀️ Girls Spa Day (Ru)—July 24", "🙏🏾 Mass + Brunch—July 26"], todos: ["Confirm decor allowances and available supplies"] },
];

function CrewSection({ member }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ background: "white", borderRadius: "14px", border: "1px solid " + member.border, overflow: "hidden", marginBottom: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", cursor: "pointer", background: member.bg, borderBottom: open ? "1px solid " + member.border : "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
          <span style={{ fontSize: "20px", lineHeight: 1 }}>{member.emoji}</span>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B" }}>{member.name}</div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: member.accent, marginTop: "1px", letterSpacing: "0.05em", textTransform: "uppercase" }}>{member.title}</div>
          </div>
        </div>
        <span style={{ color: "#64748B", fontSize: "14px", transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.2s", display: "inline-block", lineHeight: 1 }}>&#9662;</span>
      </div>
      {open && (
        <div style={{ padding: "14px 20px 16px" }}>
          <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.55, margin: "0 0 12px", paddingBottom: "12px", borderBottom: "1px solid #F1F5F9" }}>{member.role}</p>
          <div style={{ fontSize: "11px", fontWeight: "800", letterSpacing: "0.1em", textTransform: "uppercase", color: member.accent, marginBottom: "8px" }}>Action Items</div>
          {member.todos.map((todo, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", padding: "7px 0", borderBottom: i < member.todos.length - 1 ? "1px solid #F1F5F9" : "none", alignItems: "flex-start" }}>
              <span style={{ fontSize: "13px", color: member.accent, marginTop: "1px", flexShrink: 0 }}>→</span>
              <div style={{ fontSize: "13px", color: "#475569", lineHeight: 1.45 }}>{todo}</div>
            </div>
          ))}
          {member.events && member.events.length > 0 && (
            <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #F1F5F9" }}>
              <div style={{ fontSize: "11px", fontWeight: "800", letterSpacing: "0.1em", textTransform: "uppercase", color: member.accent, marginBottom: "8px" }}>{member.eventsLabel || "Post-Soiree Events"}</div>
              <p style={{ fontSize: "12px", color: "#94A3B8", fontStyle: "italic", margin: "0 0 8px" }}>Attendance is requested for the following events to keep the celebration going all month!</p>
              {member.events.map((event, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", padding: "5px 0", borderBottom: i < member.events.length - 1 ? "1px solid #F8FAFC" : "none" }}>
                  <div style={{ fontSize: "13px", color: "#475569" }}>{event}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TabBar({ tabs, active, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "4px", background: "white", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "4px", marginBottom: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)} style={{ flex: 1, padding: "8px 10px", borderRadius: "9px", border: "none", cursor: "pointer", fontWeight: "700", fontSize: "12px", background: active === t.id ? "#0F172A" : "transparent", color: active === t.id ? "white" : "#64748B", whiteSpace: "nowrap" }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default function BirthdayPlanner() {
  const [checked, setChecked] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("crew");
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch (e) {}
    setLoaded(true);
  }, []);

  const handleToggle = (id) => {
    const updated = { ...checked, [id]: !checked[id] };
    setChecked(updated);
    setSaveStatus("saving");
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (e) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const allTodos = sections.flatMap(s => s.subsections.flatMap(sub => sub.todos));
  const totalDone = allTodos.filter(t => checked[t.id]).length;
  const totalAll = allTodos.length;
  const overallPct = totalAll > 0 ? (totalDone / totalAll) * 100 : 0;

  if (!loaded) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}><div style={{ color: "#64748B" }}>Loading...</div></div>;

  const tabs = [
    { id: "crew", label: "Crew" },
    { id: "planning", label: "Overview" },
    { id: "guests", label: "Guests" },
    { id: "programming", label: "Programming" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", padding: "36px 20px 60px", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "660px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "inline-block", fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4763B", background: "#FFF0E6", border: "1px solid #F5D5B8", borderRadius: "20px", padding: "4px 14px", marginBottom: "14px" }}>
            July 10, 2026 &middot; New York City
          </div>
          <h1 style={{ fontSize: "clamp(26px, 6vw, 38px)", fontWeight: "800", color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            🎂 Wanda&apos;s 30th — Summary (as of 06-22)
          </h1>
          <p style={{ color: "#64748B", fontSize: "13px", margin: "6px 0 0", fontStyle: "italic" }}>
            &ldquo;Wanda&apos;s Worldwide Wine Tours&rdquo; &mdash; the spirit lives on ✨
          </p>
          <div style={{ marginTop: "20px" }}>
            <div style={{ fontSize: "11px", color: "#94A3B8", letterSpacing: "0.03em" }}>Last updated June 22, 2026</div>
          </div>
        </div>

        <TabBar tabs={tabs} active={activeTab} onSelect={setActiveTab} />

        {activeTab === "planning" && (
          <div>
            {sections.map(section => <Section key={section.id} section={section} checked={checked} onToggle={handleToggle} />)}
            <StaticPanel emoji="🔍" title="Open Questions">
              <div style={{ padding: "4px 20px 8px" }}>
                {openQuestions.map((oq, i) => (
                  <div key={i} style={{ padding: "11px 0", borderBottom: i < openQuestions.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "2px" }}>{oq.q}</div>
                    <div style={{ fontSize: "12.5px", color: "#64748B", fontStyle: "italic" }}>{oq.a}</div>
                  </div>
                ))}
              </div>
            </StaticPanel>
          </div>
        )}

        {activeTab === "guests" && (
          <div>
            {guestLists.map(list => <GuestListCard key={list.id} list={list} />)}
          </div>
        )}

        {activeTab === "programming" && (
          <div>
            {programmingSections.map(section => <ProgrammingSection key={section.id} section={section} />)}
          </div>
        )}

        {activeTab === "crew" && (
          <div>
            {crewMembers.map((member, i) => <CrewSection key={i} member={member} />)}
          </div>
        )}

      </div>
    </div>
  );
}
