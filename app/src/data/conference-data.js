/**
 * ข้อมูลทั้งหมดของเว็บ Mini-Conference อยู่ในไฟล์นี้ไฟล์เดียว (ทั้งภาษาไทยและอังกฤษ)
 * แก้ข้อความ/วันที่/รายชื่อที่นี่ แล้วรัน `npm run build` เว็บทุกหน้าทั้ง 2 ภาษาจะอัปเดตตาม
 *
 * รูปแบบข้อความ:
 *   { th: "ภาษาไทย", en: "English" }  → แสดงตามภาษาที่เลือก
 *   "ข้อความเดียว"                     → แสดงเหมือนกันทั้ง 2 ภาษา (เช่น ตัวเลข ชื่อคน)
 *
 * Placeholder ที่ใช้ (แสดงเป็นสีจางอัตโนมัติ):
 *   "[...]"            = ยังไม่ได้ตั้งชื่อ/ข้อความ
 *   "รอประกาศ" / "TBA" = ยังไม่มีข้อมูล
 *   "---"              = ยังไม่ได้ระบุชื่อคน
 */

const TBA = { th: "รอประกาศ", en: "TBA" };

const CONFERENCE_DATA = {
  course: {
    code: "300-1412",
    name: { th: "สัมมนาทางวิศวกรรมคอมพิวเตอร์", en: "Seminar in Computer Engineering" },
    faculty: { th: "คณะเทคโนโลยีดิจิทัล", en: "Faculty of Digital Technology" },
    institute: { th: "สถาบันเทคโนโลยีจิตรลดา", en: "Chitralada Technology Institute" },
    instituteShort: "CDTI",
    instituteUrl: "https://www.cdti.ac.th",
    instructors: ["Sumalee Unhavanich", "Arnon Rungsawang"],
    year: "2026"
  },

  conference: {
    acronym: { th: "[ชื่อย่อ] 2026", en: "[ACRONYM] 2026" },
    name: { th: "[ชื่องานประชุมวิชาการ]", en: "[Conference Name]" },
    theme: { th: "[ธีมของงาน]", en: "[Conference Theme]" },
    date: TBA,
    dateNote: { th: "สัปดาห์ที่ 9 ของภาคเรียน", en: "Week 9 of the semester" },
    venue: TBA,
    venueNote: { th: "สถาบันเทคโนโลยีจิตรลดา", en: "Chitralada Technology Institute" },
    format: { th: "บรรยาย + โปสเตอร์", en: "Oral + Poster" },
    audience: { th: "[กลุ่มเป้าหมาย — เช่น นักศึกษา อาจารย์ และผู้สนใจด้านวิศวกรรมคอมพิวเตอร์]",
                en: "[Target audience — e.g. students, faculty and anyone interested in computer engineering]" },
    status: { th: "กำลังเตรียมงาน", en: "In preparation" }
  },

  stats: [
    { value: "14", label: { th: "ผู้เขียน", en: "Authors" } },
    { value: "14", label: { th: "บทความ", en: "Papers" } },
    { value: "4", label: { th: "นำเสนอแบบบรรยาย", en: "Oral presentations" } },
    { value: "10", label: { th: "นำเสนอแบบโปสเตอร์", en: "Poster presentations" } },
    { value: "9", label: { th: "สัปดาห์เตรียมงาน", en: "Weeks of preparation" } }
  ],

  // กำหนดการสำคัญ — ใส่วันที่จริงแทน TBA เมื่อตกลงแล้ว เช่น date: { th: "15 ธ.ค. 2569", en: "15 Dec 2026" }
  dates: [
    { week: 3, title: { th: "ประกาศรับบทความ", en: "Call for papers" }, date: TBA },
    { week: 4, title: { th: "เปิดระบบส่งบทความ", en: "Submission opens" }, date: TBA },
    { week: 6, title: { th: "ปิดรับบทความ", en: "Submission deadline" }, date: TBA, key: true },
    { week: 7, title: { th: "แจ้งผลการพิจารณา", en: "Notification of acceptance" }, date: TBA },
    { week: 8, title: { th: "ส่งบทความฉบับสมบูรณ์", en: "Camera-ready due" }, date: TBA },
    { week: 9, title: { th: "วันจัดงาน", en: "Conference day" }, date: TBA, key: true }
  ],

  // ขอบเขตหัวข้อ (จากสไลด์ Week 1) — ทีมยังเลือก/แก้ได้
  topics: [
    { icon: "cpu", name: { th: "ปัญญาประดิษฐ์และวิทยาการข้อมูล", en: "AI & Data Science" },
      desc: { th: "แอปพลิเคชันที่ใช้ AI ระบบอัจฉริยะ และการวิเคราะห์ข้อมูล", en: "AI-based applications, intelligent systems and data analytics" } },
    { icon: "code", name: { th: "วิศวกรรมซอฟต์แวร์และแอปพลิเคชัน", en: "Software Engineering & Applications" },
      desc: { th: "การพัฒนาซอฟต์แวร์ คุณภาพซอฟต์แวร์ และแอปพลิเคชัน", en: "Software development, software quality and applications" } },
    { icon: "shield", name: { th: "เครือข่ายและความมั่นคงปลอดภัยไซเบอร์", en: "Computer Networks & Cybersecurity" },
      desc: { th: "ระบบเครือข่าย การป้องกันภัย และความปลอดภัยของข้อมูล", en: "Network systems, threat protection and data security" } },
    { icon: "chip", name: { th: "ระบบสมองกลฝังตัวและ IoT", en: "Embedded Systems & IoT" },
      desc: { th: "ไมโครคอนโทรลเลอร์ เซนเซอร์ และอุปกรณ์เชื่อมต่อ", en: "Microcontrollers, sensors and connected devices" } },
    { icon: "user", name: { th: "ปฏิสัมพันธ์ระหว่างมนุษย์กับคอมพิวเตอร์", en: "Human-Computer Interaction" },
      desc: { th: "การออกแบบประสบการณ์ผู้ใช้และการประเมินการใช้งาน", en: "User experience design and usability evaluation" } },
    { icon: "layers", name: { th: "ระบบคอมพิวเตอร์อัจฉริยะ", en: "Intelligent Computing Systems" },
      desc: { th: "ระบบอัตโนมัติและระบบสนับสนุนการตัดสินใจ", en: "Automation and decision support systems" } }
  ],

  // วิทยากร — เติมเมื่อได้ชื่อ
  keynotes: [
    { name: { th: "[ชื่อวิทยากร]", en: "[Speaker name]" }, affiliation: { th: "[หน่วยงาน]", en: "[Affiliation]" }, talk: { th: "[หัวข้อบรรยาย]", en: "[Talk title]" } },
    { name: { th: "[ชื่อวิทยากร]", en: "[Speaker name]" }, affiliation: { th: "[หน่วยงาน]", en: "[Affiliation]" }, talk: { th: "[หัวข้อบรรยาย]", en: "[Talk title]" } }
  ],

  // กำหนดการวันงาน — แท็บละช่วง (type: break / talk / oral / poster)
  program: [
    {
      tab: { th: "ช่วงเช้า", en: "Morning" },
      items: [
        { time: "--:--", type: "break", title: { th: "ลงทะเบียน", en: "Registration" } },
        { time: "--:--", type: "talk", title: { th: "พิธีเปิด", en: "Opening" } },
        { time: "--:--", type: "talk", title: { th: "บรรยายพิเศษ", en: "Keynote" }, note: { th: "[หัวข้อบรรยาย]", en: "[Talk title]" } },
        { time: "--:--", type: "oral", title: { th: "นำเสนอแบบบรรยาย ช่วงที่ 1", en: "Oral session 1" }, note: { th: "บทความ 2 เรื่อง", en: "2 papers" } }
      ]
    },
    {
      tab: { th: "ช่วงบ่าย", en: "Afternoon" },
      items: [
        { time: "--:--", type: "break", title: { th: "พักรับประทานอาหารกลางวัน", en: "Lunch" } },
        { time: "--:--", type: "oral", title: { th: "นำเสนอแบบบรรยาย ช่วงที่ 2", en: "Oral session 2" }, note: { th: "บทความ 2 เรื่อง", en: "2 papers" } },
        { time: "--:--", type: "poster", title: { th: "นำเสนอแบบโปสเตอร์", en: "Poster session" }, note: { th: "บทความ 10 เรื่อง", en: "10 papers" } },
        { time: "--:--", type: "talk", title: { th: "พิธีปิด", en: "Closing" } }
      ]
    }
  ],

  // โครงสร้างทีม (จากสไลด์ Week 1) — ใส่ชื่อแทน "---"
  teams: [
    { id: "chair", name: { th: "ประธานจัดงาน", en: "General Chair" }, duty: { th: "ประสานงานภาพรวมของทุกทีม", en: "Overall coordination" },
      lead: "---", members: ["---"] },
    { id: "tpc", name: { th: "คณะกรรมการวิชาการ", en: "Technical Program Committee" }, duty: { th: "พิจารณาบทความและจัดโปรแกรม", en: "Paper review and program" },
      lead: "---", members: ["---", "---"] },
    { id: "pub", name: { th: "ทีมสิ่งพิมพ์", en: "Publication Team" }, duty: { th: "เทมเพลตบทความและรวมเล่มบทความ", en: "Templates and proceedings" },
      lead: "---", members: ["---", "---"] },
    { id: "web", name: { th: "ทีมเว็บไซต์และลงทะเบียน", en: "Website & Registration" }, duty: { th: "เว็บไซต์และระบบส่งบทความ", en: "Website and submissions" },
      lead: "---", members: ["---", "---"] },
    { id: "pr", name: { th: "ทีมประชาสัมพันธ์และออกแบบ", en: "Publicity & Design" }, duty: { th: "อัตลักษณ์ของงานและการประชาสัมพันธ์", en: "Visual identity and announcements" },
      lead: "---", members: ["---", "---"] },
    { id: "venue", name: { th: "ทีมสถานที่และการจัดงาน", en: "Venue & Logistics" }, duty: { th: "ห้อง อุปกรณ์ และการจัดงานในวันจริง", en: "Room, equipment and event operation" },
      lead: "---", members: ["---", "---"] }
  ],

  // แผนงาน 9 สัปดาห์ (จากสไลด์ Week 1)
  roadmap: [
    { week: 1, title: { th: "เปิดโครงการและตั้งทีม", en: "Conference kickoff and organization" }, done: true },
    { week: 2, title: { th: "พัฒนาบทความวิจัย", en: "Research paper development" } },
    { week: 3, title: { th: "ประกาศรับบทความและนโยบายการพิจารณา", en: "CFP and review policy" } },
    { week: 4, title: { th: "เว็บไซต์และระบบส่งบทความ", en: "Website and submission system" } },
    { week: 5, title: { th: "เตรียมการพิจารณาบทความ", en: "Peer review preparation" } },
    { week: 6, title: { th: "ปิดรับบทความ ฝึกการนำเสนอ", en: "Submission deadline and presentation skills" } },
    { week: 7, title: { th: "ประชุมคณะกรรมการวิชาการและตัดสินผล", en: "PC meeting and decisions" } },
    { week: 8, title: { th: "เตรียมงานและซ้อมใหญ่", en: "Final preparation and rehearsal" } },
    { week: 9, title: { th: "วันจัดงาน", en: "Mini-Conference" } }
  ],

  // ขั้นตอนของงานประชุมวิชาการ (จากสไลด์ Week 1)
  workflow: [
    { th: "ประกาศรับบทความ", en: "Call for Papers" }, { th: "ส่งบทความ", en: "Paper Submission" },
    { th: "พิจารณาบทความ", en: "Peer Review" }, { th: "ประชุมคณะกรรมการวิชาการ", en: "PC Meeting" },
    { th: "แจ้งผลการพิจารณา", en: "Acceptance" }, { th: "ส่งฉบับสมบูรณ์", en: "Camera-Ready" },
    { th: "จัดทำกำหนดการ", en: "Program" }, { th: "วันจัดงาน", en: "Conference Day" },
    { th: "รวมเล่มบทความ", en: "Proceedings" }
  ],

  submission: {
    systemNote: { th: "ระบบส่งบทความจะเปิดในสัปดาห์ที่ 4", en: "The submission system opens in week 4." },
    length: { th: "[จำนวนหน้า]", en: "[Page limit]" },
    language: { th: "[ภาษาของบทความ]", en: "[Paper language]" },
    review: { th: "[รูปแบบการพิจารณา — เช่น ไม่เปิดเผยชื่อทั้งสองฝ่าย]", en: "[Review type — e.g. double-blind]" },
    templates: [
      { label: { th: "เทมเพลต Word", en: "Word template" }, file: "" },
      { label: { th: "เทมเพลต LaTeX", en: "LaTeX template" }, file: "" }
    ]
  },

  registration: {
    fee: TBA,
    note: { th: "[รายละเอียดการลงทะเบียน]", en: "[Registration details]" },
    types: [
      { name: { th: "ผู้นำเสนอบทความ", en: "Author / presenter" }, detail: { th: "ลงทะเบียนพร้อมส่งบทความ", en: "Register when you submit your paper" } },
      { name: { th: "ผู้เข้าร่วมทั่วไป", en: "Attendee" }, detail: TBA }
    ]
  },

  venue: {
    name: TBA,
    address: { th: "สถาบันเทคโนโลยีจิตรลดา [ห้อง / อาคาร]", en: "Chitralada Technology Institute [room / building]" }
  },

  // รูปประกอบ (อยู่ใน src/img) — ทุกรูปมาจาก Wikimedia Commons ใช้ได้ฟรี
  // เปลี่ยนเป็นรูปจริงของงานได้: วางไฟล์ใหม่ใน src/img แล้วแก้ชื่อไฟล์ตรงนี้
  images: {
    hero: { file: "lecture-hall.jpg", alt: { th: "ห้องบรรยายขนาดใหญ่ที่มีจอโปรเจกเตอร์สองจอ", en: "Large lecture hall with two projector screens" },
      credit: "Ohio University Lecture Hall — Garden Sprite (CC0)", source: "https://commons.wikimedia.org/wiki/File:Ohio_University_Lecture_Hall.jpg" },
    poster: { file: "poster-session.jpg", alt: { th: "ผู้เข้าร่วมงานคุยกันหน้าโปสเตอร์งานวิจัย", en: "Attendees discussing a research poster" },
      credit: "2016 AMS Annual Meeting Poster Session — NOAASatellites (Public domain)", source: "https://commons.wikimedia.org/wiki/File:2016_AMS_Annual_Meeting_Poster_Session_(24083760450).jpg" },
    research: { file: "computer-lab.jpg", alt: { th: "นักศึกษาทำงานร่วมกันในห้องปฏิบัติการคอมพิวเตอร์", en: "Students working together in a computer lab" },
      credit: "Computer lab at vgdc — A Anesh (CC0)", source: "https://commons.wikimedia.org/wiki/File:Computer_lab_at_vgdc.jpg" },
    panel: { file: "panel-discussion.jpg", alt: { th: "วิทยากรถือไมโครโฟนพูดบนเวทีงานประชุม", en: "Speaker with a microphone on a conference stage" },
      credit: "2013 NOAA Satellite Conference — NOAASatellites (Public domain)", source: "https://commons.wikimedia.org/wiki/File:2013_NOAA_Satellite_Conference_(14378955640).jpg" }
  },

  contact: {
    email: TBA,
    phone: TBA,
    office: { th: "คณะเทคโนโลยีดิจิทัล สถาบันเทคโนโลยีจิตรลดา", en: "Faculty of Digital Technology, Chitralada Technology Institute" }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFERENCE_DATA;
}
