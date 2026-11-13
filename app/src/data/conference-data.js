/**
 * ข้อมูลทั้งหมดของเว็บ Mini-Conference อยู่ในไฟล์นี้ไฟล์เดียว
 * แก้ข้อความ/วันที่/รายชื่อที่นี่ แล้วรัน `npm run build` เว็บทุกหน้าจะอัปเดตตาม
 *
 * Placeholder ที่ใช้:
 *   "[...]"  = ยังไม่ได้ตั้งชื่อ/ข้อความ
 *   "รอประกาศ" = ยังไม่มีข้อมูล
 *   "---"    = ยังไม่ได้ระบุชื่อคน
 * ข้อความที่ขึ้นต้นด้วย "[" หรือเป็น "รอประกาศ" / "---" จะแสดงเป็นสีจางบนเว็บอัตโนมัติ
 */

const CONFERENCE_DATA = {
  course: {
    code: "300-1412",
    nameEn: "Seminar in CPE",
    nameTh: "สัมมนาทางวิศวกรรมคอมพิวเตอร์",
    facultyTh: "คณะเทคโนโลยีดิจิทัล",
    facultyEn: "Faculty of Digital Technology",
    instituteTh: "สถาบันเทคโนโลยีจิตรลดา",
    instituteEn: "Chitralada Technology Institute",
    instituteShort: "CDTI",
    instituteUrl: "https://www.cdti.ac.th",
    instructors: ["Sumalee Unhavanich", "Arnon Rungsawang"],
    year: "2026"
  },

  conference: {
    acronym: "[ACRONYM] 2026",
    nameTh: "[ชื่องานประชุมวิชาการ]",
    nameEn: "[Conference Name]",
    themeTh: "[ธีมของงาน]",
    themeEn: "[Theme in English]",
    date: "รอประกาศ",
    dateNote: "สัปดาห์ที่ 9 ของภาคเรียน",
    venue: "รอประกาศ",
    venueNote: "สถาบันเทคโนโลยีจิตรลดา",
    format: "บรรยาย + โปสเตอร์",
    audience: "[กลุ่มเป้าหมาย — เช่น นักศึกษา อาจารย์ และผู้สนใจด้านวิศวกรรมคอมพิวเตอร์]",
    status: "กำลังเตรียมงาน"
  },

  stats: [
    { value: "14", th: "ผู้เขียน" },
    { value: "14", th: "บทความ" },
    { value: "4", th: "นำเสนอแบบบรรยาย" },
    { value: "10", th: "นำเสนอแบบโปสเตอร์" },
    { value: "9", th: "สัปดาห์เตรียมงาน" }
  ],

  // กำหนดการสำคัญ — ใส่วันที่จริงแทน "รอประกาศ" เมื่อตกลงแล้ว
  dates: [
    { week: 3, th: "ประกาศรับบทความ", en: "Call for Papers", date: "รอประกาศ" },
    { week: 4, th: "เปิดระบบส่งบทความ", en: "Submission opens", date: "รอประกาศ" },
    { week: 6, th: "ปิดรับบทความ", en: "Submission deadline", date: "รอประกาศ", key: true },
    { week: 7, th: "แจ้งผลการพิจารณา", en: "Notification of acceptance", date: "รอประกาศ" },
    { week: 8, th: "ส่งบทความฉบับสมบูรณ์", en: "Camera-ready due", date: "รอประกาศ" },
    { week: 9, th: "วันจัดงาน", en: "Conference day", date: "รอประกาศ", key: true }
  ],

  // ขอบเขตหัวข้อ (จากสไลด์ Week 1) — ทีมยังเลือก/แก้ได้
  topics: [
    { icon: "cpu", th: "ปัญญาประดิษฐ์และวิทยาการข้อมูล", en: "AI & Data Science",
      desc: "แอปพลิเคชันที่ใช้ AI ระบบอัจฉริยะ และการวิเคราะห์ข้อมูล" },
    { icon: "code", th: "วิศวกรรมซอฟต์แวร์และแอปพลิเคชัน", en: "Software Engineering & Applications",
      desc: "การพัฒนาซอฟต์แวร์ คุณภาพซอฟต์แวร์ และแอปพลิเคชัน" },
    { icon: "shield", th: "เครือข่ายและความมั่นคงปลอดภัยไซเบอร์", en: "Computer Networks & Cybersecurity",
      desc: "ระบบเครือข่าย การป้องกันภัย และความปลอดภัยของข้อมูล" },
    { icon: "chip", th: "ระบบสมองกลฝังตัวและ IoT", en: "Embedded Systems & IoT",
      desc: "ไมโครคอนโทรลเลอร์ เซนเซอร์ และอุปกรณ์เชื่อมต่อ" },
    { icon: "user", th: "ปฏิสัมพันธ์ระหว่างมนุษย์กับคอมพิวเตอร์", en: "Human-Computer Interaction",
      desc: "การออกแบบประสบการณ์ผู้ใช้และการประเมินการใช้งาน" },
    { icon: "layers", th: "ระบบคอมพิวเตอร์อัจฉริยะ", en: "Intelligent Computing Systems",
      desc: "ระบบอัตโนมัติและระบบสนับสนุนการตัดสินใจ" }
  ],

  // วิทยากร — เติมเมื่อได้ชื่อ
  keynotes: [
    { name: "[ชื่อวิทยากร]", affiliation: "[หน่วยงาน]", talk: "[หัวข้อบรรยาย]" },
    { name: "[ชื่อวิทยากร]", affiliation: "[หน่วยงาน]", talk: "[หัวข้อบรรยาย]" }
  ],

  // กำหนดการวันงาน — แท็บละช่วง
  program: [
    {
      tab: "Morning", th: "ช่วงเช้า",
      items: [
        { time: "--:--", type: "break", title: "ลงทะเบียน", en: "" },
        { time: "--:--", type: "talk", title: "พิธีเปิด", en: "" },
        { time: "--:--", type: "talk", title: "บรรยายพิเศษ", en: "[หัวข้อบรรยาย]" },
        { time: "--:--", type: "oral", title: "นำเสนอแบบบรรยาย ช่วงที่ 1", en: "บทความ 2 เรื่อง" }
      ]
    },
    {
      tab: "Afternoon", th: "ช่วงบ่าย",
      items: [
        { time: "--:--", type: "break", title: "พักรับประทานอาหารกลางวัน", en: "" },
        { time: "--:--", type: "oral", title: "นำเสนอแบบบรรยาย ช่วงที่ 2", en: "บทความ 2 เรื่อง" },
        { time: "--:--", type: "poster", title: "นำเสนอแบบโปสเตอร์", en: "บทความ 10 เรื่อง" },
        { time: "--:--", type: "talk", title: "พิธีปิด", en: "" }
      ]
    }
  ],

  // โครงสร้างทีม (จากสไลด์ Week 1) — ใส่ชื่อแทน "---"
  teams: [
    { id: "chair", th: "ประธานจัดงาน", en: "General Chair", duty: "ประสานงานภาพรวมของทุกทีม",
      lead: "---", members: ["---"] },
    { id: "tpc", th: "คณะกรรมการวิชาการ", en: "Technical Program Committee", duty: "พิจารณาบทความและจัดโปรแกรม",
      lead: "---", members: ["---", "---"] },
    { id: "pub", th: "ทีมสิ่งพิมพ์", en: "Publication Team", duty: "เทมเพลตบทความและรวมเล่มบทความ",
      lead: "---", members: ["---", "---"] },
    { id: "web", th: "ทีมเว็บไซต์และลงทะเบียน", en: "Website & Registration", duty: "เว็บไซต์และระบบส่งบทความ",
      lead: "---", members: ["---", "---"] },
    { id: "pr", th: "ทีมประชาสัมพันธ์และออกแบบ", en: "Publicity & Design", duty: "อัตลักษณ์ของงานและการประชาสัมพันธ์",
      lead: "---", members: ["---", "---"] },
    { id: "venue", th: "ทีมสถานที่และการจัดงาน", en: "Venue & Logistics", duty: "ห้อง อุปกรณ์ และการจัดงานในวันจริง",
      lead: "---", members: ["---", "---"] }
  ],

  // แผนงาน 9 สัปดาห์ (จากสไลด์ Week 1)
  roadmap: [
    { week: 1, en: "Conference kickoff and organization", th: "เปิดโครงการและตั้งทีม", done: true },
    { week: 2, en: "Research paper development", th: "พัฒนาบทความวิจัย" },
    { week: 3, en: "CFP and review policy", th: "ประกาศรับบทความและนโยบายการพิจารณา" },
    { week: 4, en: "Website and submission system", th: "เว็บไซต์และระบบส่งบทความ" },
    { week: 5, en: "Peer review preparation", th: "เตรียมการพิจารณาบทความ" },
    { week: 6, en: "Submission deadline and presentation skills", th: "ปิดรับบทความ ฝึกการนำเสนอ" },
    { week: 7, en: "PC meeting and decisions", th: "ประชุมคณะกรรมการวิชาการและตัดสินผล" },
    { week: 8, en: "Final preparation and rehearsal", th: "เตรียมงานและซ้อมใหญ่" },
    { week: 9, en: "Mini-Conference", th: "วันจัดงาน" }
  ],

  // ขั้นตอนของงานประชุมวิชาการ (จากสไลด์ Week 1)
  workflow: [
    "ประกาศรับบทความ", "ส่งบทความ", "พิจารณาบทความ", "ประชุมคณะกรรมการวิชาการ",
    "แจ้งผลการพิจารณา", "ส่งฉบับสมบูรณ์", "จัดทำกำหนดการ", "วันจัดงาน", "รวมเล่มบทความ"
  ],

  submission: {
    system: "รอประกาศ",
    systemNote: "ระบบส่งบทความจะเปิดในสัปดาห์ที่ 4",
    length: "[จำนวนหน้า]",
    language: "[ภาษาของบทความ]",
    review: "[รูปแบบการพิจารณา — เช่น ไม่เปิดเผยชื่อทั้งสองฝ่าย]",
    templates: [
      { label: "เทมเพลต Word", file: "" },
      { label: "เทมเพลต LaTeX", file: "" }
    ]
  },

  registration: {
    fee: "รอประกาศ",
    note: "[รายละเอียดการลงทะเบียน]",
    types: [
      { th: "ผู้นำเสนอบทความ", detail: "ลงทะเบียนพร้อมส่งบทความ" },
      { th: "ผู้เข้าร่วมทั่วไป", detail: "รอประกาศ" }
    ]
  },

  venue: {
    name: "รอประกาศ",
    address: "สถาบันเทคโนโลยีจิตรลดา [ห้อง / อาคาร]",
    mapUrl: ""
  },

  // รูปประกอบ (อยู่ใน src/img) — ทุกรูปมาจาก Wikimedia Commons ใช้ได้ฟรี
  // เปลี่ยนเป็นรูปจริงของงานได้: วางไฟล์ใหม่ใน src/img แล้วแก้ชื่อไฟล์ตรงนี้
  images: {
    hero: { file: "lecture-hall.jpg", alt: "ห้องบรรยายขนาดใหญ่ที่มีจอโปรเจกเตอร์สองจอ",
      credit: "Ohio University Lecture Hall — Garden Sprite (CC0)", source: "https://commons.wikimedia.org/wiki/File:Ohio_University_Lecture_Hall.jpg" },
    poster: { file: "poster-session.jpg", alt: "ผู้เข้าร่วมงานคุยกันหน้าโปสเตอร์งานวิจัย",
      credit: "2016 AMS Annual Meeting Poster Session — NOAASatellites (Public domain)", source: "https://commons.wikimedia.org/wiki/File:2016_AMS_Annual_Meeting_Poster_Session_(24083760450).jpg" },
    research: { file: "computer-lab.jpg", alt: "นักศึกษาทำงานร่วมกันในห้องปฏิบัติการคอมพิวเตอร์",
      credit: "Computer lab at vgdc — A Anesh (CC0)", source: "https://commons.wikimedia.org/wiki/File:Computer_lab_at_vgdc.jpg" },
    panel: { file: "panel-discussion.jpg", alt: "วิทยากรถือไมโครโฟนพูดบนเวทีงานประชุม",
      credit: "2013 NOAA Satellite Conference — NOAASatellites (Public domain)", source: "https://commons.wikimedia.org/wiki/File:2013_NOAA_Satellite_Conference_(14378955640).jpg" }
  },

  contact: {
    email: "รอประกาศ",
    phone: "รอประกาศ",
    office: "คณะเทคโนโลยีดิจิทัล สถาบันเทคโนโลยีจิตรลดา"
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFERENCE_DATA;
}
