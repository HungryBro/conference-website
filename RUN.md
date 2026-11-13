# วิธีรันเว็บ Mini-Conference

ต้องมี Node.js ในเครื่องก่อน (เช็กด้วย `node -v`)

## เปิดเว็บ (ใช้บ่อยสุด)

```bash
cd /Users/dolphin/Desktop/Seminar/conference-website/app && npm run dev
```

แล้วเปิด **http://127.0.0.1:8080** ในเบราว์เซอร์ (ภาษาอังกฤษอยู่ที่ http://127.0.0.1:8080/en/ หรือกดปุ่ม EN มุมขวาบน)

คำสั่งนี้ build เว็บใหม่ แล้วเปิดเซิร์ฟเวอร์ให้ในคำสั่งเดียว
หยุดเซิร์ฟเวอร์: กด `Ctrl + C` ใน Terminal

## แก้เนื้อหา

1. แก้ไฟล์ `app/src/data/conference-data.js` (ข้อมูลทุกหน้าอยู่ไฟล์นี้ไฟล์เดียว)
   ข้อความส่วนใหญ่เขียนเป็น `{ th: "ภาษาไทย", en: "English" }` ให้แก้ทั้งสองภาษา
2. เปิด Terminal อีกแท็บแล้วรัน

   ```bash
   cd /Users/dolphin/Desktop/Seminar/conference-website/app && npm run build
   ```

3. Refresh หน้าเว็บ

## คำสั่งทั้งหมด (รันในโฟลเดอร์ `app`)

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run dev` | build แล้วเปิดเซิร์ฟเวอร์ |
| `npm run build` | สร้างไฟล์เว็บใหม่ลงโฟลเดอร์ `dist/` |
| `npm start` | เปิดเซิร์ฟเวอร์อย่างเดียว (ไม่ build) |

## พอร์ต 8080 ถูกใช้อยู่

ถ้าขึ้น error `EADDRINUSE` ให้เปลี่ยนพอร์ต:

```bash
cd /Users/dolphin/Desktop/Seminar/conference-website/app && PORT=8081 npm start
```

แล้วเปิด http://127.0.0.1:8081

## ไม่อยากใช้เซิร์ฟเวอร์

ดับเบิลคลิกไฟล์ `app/dist/index.html` เปิดในเบราว์เซอร์ได้เลย ลิงก์ทุกหน้าใช้ได้

## ไฟล์ที่ควรรู้

| ไฟล์ | คืออะไร |
|---|---|
| `app/src/data/conference-data.js` | เนื้อหาทั้งหมด (ชื่องาน วันที่ ทีม หัวข้อ ฯลฯ) |
| `app/src/css/style.css` | สีและหน้าตา |
| `app/build.js` | ตัวสร้างหน้าเว็บ |
| `app/serve.js` | เซิร์ฟเวอร์สำหรับเปิดดูในเครื่อง |
| `app/dist/` | ไฟล์เว็บที่ build แล้ว (อย่าแก้ตรงนี้ จะโดนเขียนทับ) |
| `DESIGN.md` | กฎเรื่องสี ฟอนต์ และภาษา |
