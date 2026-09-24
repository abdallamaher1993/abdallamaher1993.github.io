/* ============================================================
   projects.js — Real project data (verified video IDs, 2026-09-25)
   12 works: series -> historical docs -> mysteries -> style
   -> genre -> commercial
   ============================================================ */
window.PROJECTS = [
  { id: 'pharaonic-anime', tagKey: 'work_p1_tag', titleKey: 'work_p1_title', descKey: 'work_p1_desc', storyKey: 'story_p1', videoId: '0m9sP3wAxGw', image: 'img/menes.jpg', platform: 'YouTube · Bilibili', year: 2025 },
  { id: 'titanic-1912', tagKey: 'work_p2_tag', titleKey: 'work_p2_title', descKey: 'work_p2_desc', storyKey: 'story_p2', videoId: 'd4MIzWTf99A', image: 'img/titanic.jpg', platform: 'YouTube', year: 2025 },
  { id: 'mary-celeste', tagKey: 'work_p7_tag', titleKey: 'work_p7_title', descKey: 'work_p7_desc', storyKey: 'story_p7', videoId: 'CLjUCxyEXuY', image: 'img/maryceleste.jpg', platform: 'YouTube', year: 2026 },
  { id: 'dawn-of-civilization', tagKey: 'work_p4_tag', titleKey: 'work_p4_title', descKey: 'work_p4_desc', storyKey: 'story_p4', videoId: 'EBdsozeCMXs', image: 'img/dawn.jpg', platform: 'YouTube', year: 2025 },
  { id: 'chernobyl', tagKey: 'work_p3_tag', titleKey: 'work_p3_title', descKey: 'work_p3_desc', storyKey: 'story_p3', videoId: 'iAp6u-50q3s', image: 'img/chernobyl.jpg', platform: 'YouTube', year: 2025 },
  { id: 'tunguska-1908', tagKey: 'work_p9_tag', titleKey: 'work_p9_title', descKey: 'work_p9_desc', storyKey: 'story_p9', videoId: 'W0M6W4zl1rY', image: 'img/tunguska.jpg', platform: 'YouTube', year: 2026 },
  { id: 'dyatlov-pass', tagKey: 'work_p10_tag', titleKey: 'work_p10_title', descKey: 'work_p10_desc', storyKey: 'story_p10', videoId: 'VtiqIVDu_Gg', image: 'img/dyatlov.jpg', platform: 'YouTube', year: 2026 },
  { id: 'roanoke-lost-colony', tagKey: 'work_p11_tag', titleKey: 'work_p11_title', descKey: 'work_p11_desc', storyKey: 'story_p11', videoId: 'rzqc57VJfoE', image: 'img/roanoke.jpg', platform: 'YouTube', year: 2026 },
  { id: 'thoth-neon-anime', tagKey: 'work_p6_tag', titleKey: 'work_p6_title', descKey: 'work_p6_desc', storyKey: 'story_p6', videoId: '5nK-F3Frp_s', image: 'img/thoth.jpg', platform: 'YouTube', year: 2025 },
  { id: 'sphinx-painted-red', tagKey: 'work_p12_tag', titleKey: 'work_p12_title', descKey: 'work_p12_desc', storyKey: 'story_p12', videoId: '7gbQvuQcGu0', image: 'img/sphinx.jpg', platform: 'YouTube', year: 2026 },
  { id: 'minecraft-narrative', tagKey: 'work_p5_tag', titleKey: 'work_p5_title', descKey: 'work_p5_desc', storyKey: 'story_p5', videoId: 'JDBnVETohnc', image: 'img/minecraft.jpg', platform: 'YouTube', year: 2025 },
  { id: 'branded-ai-ads', tagKey: 'work_p8_tag', titleKey: 'work_p8_title', descKey: 'work_p8_desc', storyKey: 'story_p8', videoId: 'kRBwPvFz4Mg', image: 'img/nur.jpg', platform: 'YouTube', year: 2025 }
];

/* Lookup helper used by project.js */
function getProject(id) {
  if (!window.PROJECTS) return null;
  for (var i = 0; i < PROJECTS.length; i++) {
    if (PROJECTS[i].id === id) return PROJECTS[i];
  }
  return null;
}
