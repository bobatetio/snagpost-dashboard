import type { CreatorProfile, FacebookPost, Folder, Group } from "../lib/types";

/* Mock fixture data. When the real backend lands, replace the import sites of
 * `MOCK_POSTS`/`MOCK_FOLDERS` with the equivalent fetch — the rest of the app
 * is type-bound to FacebookPost so nothing else changes. */

const profiles = [
  {
    id: "kendall.cooks", username: "kendall.cooks", display: "Kendall Cooks",
    verified: true, followers: 124_300, friends: 4_120, following: 312,
    fromGroup: undefined,
    bio: "Weeknight dinners, one-pan tricks, and the saved-folder hits.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop&auto=format",
    cover:  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=400&fit=crop&auto=format",
  },
  {
    id: "thecabinwoodworks", username: "thecabinwoodworks", display: "The Cabin Woodworks",
    verified: false, followers: 38_900, friends: 1_840, following: 220,
    fromGroup: "Fine Woodworking Forum",
    bio: "Hand-tool joinery from a Vermont garage. Slow builds, sharp chisels.",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=240&h=240&fit=crop&auto=format",
    cover:  "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1400&h=400&fit=crop&auto=format",
  },
  {
    id: "marcus.runs", username: "marcus.runs", display: "Marcus Runs",
    verified: true, followers: 76_200, friends: 2_960, following: 410,
    fromGroup: undefined,
    bio: "Marathon coach. Easy miles, hard intervals, no shortcuts.",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=240&h=240&fit=crop&auto=format",
    cover:  "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1400&h=400&fit=crop&auto=format",
  },
  {
    id: "lila.designs", username: "lila.designs", display: "Lila Designs",
    verified: false, followers: 22_100, friends: 980, following: 540,
    fromGroup: "Indie Designers Circle",
    bio: "Studio of one. Brand systems, weird type, and process posts.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&h=240&fit=crop&auto=format",
    cover:  "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1400&h=400&fit=crop&auto=format",
  },
];

export const MOCK_PROFILES: CreatorProfile[] = profiles.map((p) => ({
  id: p.id,
  username: p.username,
  displayName: p.display,
  verified: p.verified,
  followers: p.followers,
  friends: p.friends,
  following: p.following,
  fromGroup: p.fromGroup,
  bio: p.bio,
  avatarUrl: p.avatar,
  coverUrl: p.cover,
}));

const images: Record<string, string[]> = {
  food: [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=720&auto=format&fit=crop",
  ],
  wood: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503602642458-232111445657?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=720&auto=format&fit=crop",
  ],
  run: [
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486218119243-13883505764c?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?w=720&auto=format&fit=crop",
  ],
  design: [
    "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=720&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=720&auto=format&fit=crop",
  ],
};

const captions: Record<string, string[]> = {
  food: [
    "Three minutes, one pan, zero excuses. The garlic-butter shrimp that keeps showing up in my saved folder for a reason — try it tonight.",
    "Five pantry swaps that quietly upgrade every weeknight dinner. Swipe through — number 3 changed how I roast vegetables forever.",
    "Sunday baking light hits different.",
    "What I actually keep in my fridge in the middle of a busy week — no styled propaganda, just real life.",
    "Crispiest tofu, no cornstarch, no fryer. Save this one.",
    "I wrote up the full method for my make-ahead breakfast jars on the blog — link in the post.",
  ],
  wood: [
    "End-grain cutting board glow-up — start to finish in 14 minutes.",
    "Three joinery shortcuts that don't look like shortcuts.",
    "The sander I wish I'd bought five years ago. Full review on the channel.",
    "Picking the right finish: walnut oil vs. wipe-on poly side by side.",
    "Why I switched my whole shop to a single 18V battery system.",
  ],
  run: [
    "How I trained my 5K time down by 4 minutes in 8 weeks. Plan in comments.",
    "Why I run easy 80% of the time — even when it feels too slow.",
    "Race day fueling — what actually works at marathon pace.",
    "Trail morning. Quiet head, loud legs.",
    "The shoe rotation that fixed my recurring calf strain.",
  ],
  design: [
    "Three before-and-afters from this month's branding sprint.",
    "Picking type in 60 seconds — the only test I bother running.",
    "What goes into a strong logo brief — full template free in profile.",
    "Color systems for tiny brands: don't pick five colors, pick two and a relationship.",
    "Studio reset day. Felt cute, might keep it like this for an hour.",
  ],
};

/* Longer, post-style captions for text-only posts (no thumbnail). These look
 * like the bulk of what shows up on FB — observations, mini-essays, tips. */
const longCaptions: Record<string, string[]> = {
  food: [
    "Hot take: most weeknight dinner failures aren't recipe problems, they're prep problems. Spend Sunday roasting one tray of vegetables, one protein, and cook a pot of grains. That's three of your five dinners already half-done. The recipes don't matter as much as the staging.",
    "The single best change I made to my cooking this year: salting in layers. Salt the onions when they go in, salt the protein before searing, taste and salt the sauce twice. Salting once at the end is why your food tastes flat.",
    "After six months of testing I can confirm: a $12 instant-read thermometer is the highest ROI tool in any kitchen. Beats a stand mixer. Beats a Dutch oven. Stop guessing — measure.",
    "Three things I stopped doing this year and my food got better: peeling garlic with my hands, washing mushrooms under running water, and turning the heat down for chicken thighs. Sometimes more aggressive is the move.",
    "Restaurant trick I wish home cooks knew: finish almost everything with acid. Lemon, vinegar, a splash of pickle brine. Right at the end, off the heat. It's the difference between 'fine' and 'wait, why is this so good.'",
    "If your soups taste flat, the problem is almost never the recipe. It's that you didn't sear the aromatics hard enough at the start. Push the heat. Wait for color. Then add liquid.",
  ],
  wood: [
    "Three years in and the single biggest lesson is this: stop buying tools to solve problems your technique should solve. A sharp $40 chisel beats a dull $300 one every time. Sharpening is the skill — everything else is downstream of it.",
    "Hot take from someone who's done it both ways: hand-cut dovetails are not actually harder than jig dovetails. They're slower, but the failure modes are softer — you fix as you go instead of finding out after you've committed.",
    "Stop apologizing for using power tools. Your great-grandfather would've killed for a track saw. The romanticism around hand-tool-only work is fine if that's the point, but if the point is building furniture, use the tools that build furniture.",
    "Workshop dust control is the most under-appreciated investment in this hobby. I waited too long on a real cyclone separator and my lungs paid for it. Don't make the same mistake.",
    "If you're getting into woodworking and asking what to build first: cutting boards. Not because they're easy — they're not, end-grain especially is fussy — but because they teach you flatness, gluing, finishing, and they sell. You'll learn faster.",
    "The biggest unlock for me this year was admitting I needed to mill my own lumber. The S4S stuff from the big-box is fine, but it's never as flat as you need it. Get a planer. Get a jointer. The work changes.",
  ],
  run: [
    "Mile 18 thoughts: every marathon plan is a negotiation between the body you have and the body you want. The plans on Strava are for the second one. Train for the first one and you finish the race smiling.",
    "Coaching tip nobody likes hearing: if you don't have a heart rate cap on your easy days, you don't have easy days. Slow down. The slow days are where the gains compound.",
    "Did 22 miles this morning and I want to talk about pacing. Negative split, even effort, finished feeling like I could've run two more. That's the goal every time. If you're hammering the last 5k of a long run, your long run was too fast.",
    "Eight weeks out from race day. The work that matters now isn't the long run, it's the recovery between long runs. Sleep, food, restraint. If you're tired going into your workouts, you don't need more workouts.",
    "Easy day reflection: 80% of running improvement is showing up on the days you don't feel like it. Not crushing. Not racing. Just lacing up and going for 40 easy minutes. That's where it all comes from.",
    "Race day plan, written down: first 5k feels stupidly easy, next 10k feels comfortable, last 7k feels like work. If you flip that order, you blow up. Discipline early is the whole game.",
  ],
  design: [
    "Junior designers: nobody is going to remember your one perfect Dribbble shot. They will remember the brand system you shipped, the wordmark that's still in use three years later, the deck you handed off that didn't need a Slack thread to decode. Build for that.",
    "The single most underrated brand skill is restraint. Your job is mostly to subtract — to throw out the three okay ideas and stay with the one strong one until it's right. Most identities fail because the designer kept adding.",
    "Hot take after fifteen years: the best brand briefs are one page. Two if there's lots of audience research. Anything longer and the client doesn't know what they want yet, and a longer brief won't fix that — a workshop will.",
    "Color systems for small brands: pick a primary, pick one supporting hue, and one neutral. That's it. Three. Then build the rest from value variation. Brands fail when they treat their palette like a Pinterest board.",
    "Process post: I sketch a logo on paper for 30 minutes before I open any software. Always. The screen is for executing decisions, not for making them. Most designers reverse this and it shows in the work.",
    "On naming type: the size of the headline is doing more work than the choice of typeface. Get the scale right and almost any face works. Get the scale wrong and even Akzidenz looks bad. Hierarchy first, character second.",
  ],
};

const types: FacebookPost["type"][] = ["video", "carousel", "photo", "slideshow", "link", "video", "carousel"];

function makePosts(): FacebookPost[] {
  const out: FacebookPost[] = [];
  let id = 1;
  for (const p of profiles) {
    const bucket =
      p.id === "kendall.cooks"        ? "food" :
      p.id === "thecabinwoodworks"    ? "wood" :
      p.id === "marcus.runs"          ? "run"  :
                                        "design";
    const imgs = images[bucket];
    const caps = captions[bucket];
    const longCaps = longCaptions[bucket];
    const count = bucket === "food" ? 11 : bucket === "wood" ? 9 : bucket === "run" ? 8 : 7;
    for (let i = 0; i < count; i++) {
      const type = types[i % types.length];
      // ~70% of posts are text-only — pure captions with no thumbnail.
      const isTextOnly = (i * 7 + (p.id.length % 5)) % 10 >= 3;
      const likes  = Math.round((Math.random() * 0.9 + 0.3) * (type === "video" ? 18000 : 6000));
      const comments = Math.round((likes / (Math.random() * 25 + 18)));
      const shares = Math.round((likes / (Math.random() * 60 + 30)));
      const daysAgo = Math.floor(Math.random() * 120) + 1;
      const postedAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000 - Math.random() * 12 * 60 * 60 * 1000).toISOString();
      out.push({
        id: `pfbid_${id++}`,
        url: `https://www.facebook.com/${p.username}/posts/pfbid_${id}`,
        profileId: p.id,
        profileUsername: p.username,
        profileDisplayName: p.display,
        type,
        caption: isTextOnly ? longCaps[i % longCaps.length] : caps[i % caps.length],
        thumbnailUrl: isTextOnly ? null : imgs[i % imgs.length],
        videoUrl: null,
        stats: { likes, comments, shares },
        postedAt,
        capturedAt: Date.now() - daysAgo * 24 * 60 * 60 * 1000,
      });
    }
  }
  return out;
}

export const MOCK_POSTS: FacebookPost[] = makePosts();

export const MOCK_FOLDERS: Folder[] = [
  {
    id: "f_hooks",
    name: "Hooks I like",
    postIds: MOCK_POSTS.filter((p) => p.type === "video").slice(0, 5).map((p) => p.id),
    createdAt: Date.now() - 12 * 24 * 60 * 60 * 1000,
  },
  {
    id: "f_carousels",
    name: "Carousel inspo",
    postIds: MOCK_POSTS.filter((p) => p.type === "carousel").slice(0, 6).map((p) => p.id),
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
  {
    id: "f_woodshop",
    name: "Woodshop ideas",
    postIds: MOCK_POSTS.filter((p) => p.profileId === "thecabinwoodworks").slice(0, 4).map((p) => p.id),
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  },
];

export const MOCK_GROUPS: Group[] = [
  {
    id: "g_woodworking",
    name: "Fine Woodworking Forum",
    description: "Hand-tool joinery, milling tips, and shop builds. ~12k members.",
    memberCount: 12_400,
    trackedProfileIds: ["thecabinwoodworks"],
    trackedSince: Date.now() - 28 * 24 * 60 * 60 * 1000,
  },
  {
    id: "g_designers",
    name: "Indie Designers Circle",
    description: "Solo and small-studio designers sharing process + client work.",
    memberCount: 4_820,
    trackedProfileIds: ["lila.designs"],
    trackedSince: Date.now() - 14 * 24 * 60 * 60 * 1000,
  },
  {
    id: "g_creator_econ",
    name: "Creator Economy Roundtable",
    description: "Tactics + analytics swap for content creators on FB and IG.",
    memberCount: 31_200,
    trackedProfileIds: ["kendall.cooks", "marcus.runs"],
    trackedSince: Date.now() - 6 * 24 * 60 * 60 * 1000,
  },
];

export const MOCK_USER = {
  name: "Bob Tunji",
  email: "tunjinuel@gmail.com",
  initials: "BT",
  avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&auto=format",
};

const HOUR = 60 * 60 * 1000;
const DAY  = 24 * HOUR;

export const MOCK_NOTIFICATIONS = [
  {
    id: "n_1",
    kind: "new_post" as const,
    title: "Kendall Cooks posted",
    body: "Hot take: most weeknight dinner failures aren't recipe problems, they're prep problems.",
    avatarUrl: profiles[0].avatar,
    href: "/profile/kendall.cooks",
    timestamp: Date.now() - 35 * 60 * 1000,
    read: false,
  },
  {
    id: "n_2",
    kind: "group_activity" as const,
    title: "New activity in Fine Woodworking Forum",
    body: "The Cabin Woodworks shared 3 new posts this week.",
    avatarUrl: profiles[1].avatar,
    href: "/groups/g_woodworking",
    timestamp: Date.now() - 4 * HOUR,
    read: false,
  },
  {
    id: "n_3",
    kind: "bookmark" as const,
    title: "Bookmark milestone",
    body: "You've saved 25 posts. Nice. Try organising them into folders.",
    href: "/bookmarks",
    timestamp: Date.now() - DAY,
    read: false,
  },
  {
    id: "n_4",
    kind: "new_post" as const,
    title: "Marcus Runs posted",
    body: "Eight weeks out from race day. The work that matters now isn't the long run, it's the recovery.",
    avatarUrl: profiles[2].avatar,
    href: "/profile/marcus.runs",
    timestamp: Date.now() - 2 * DAY,
    read: true,
  },
  {
    id: "n_5",
    kind: "digest" as const,
    title: "Weekly digest ready",
    body: "12 new captures this week across 4 creators. Top post got 8.2K reactions.",
    href: "/library",
    timestamp: Date.now() - 3 * DAY,
    read: true,
  },
  {
    id: "n_6",
    kind: "system" as const,
    title: "Welcome to SocialPulse",
    body: "We just shipped Groups tracking — try adding a Facebook Group from the sidebar.",
    timestamp: Date.now() - 6 * DAY,
    read: true,
  },
];
