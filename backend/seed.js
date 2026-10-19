import { sequelize, connectDB } from "./config/database.js";
import Book from "./model/Book.js";

const booksData = [
  // หมวด: เทคโนโลยี (Technology)
  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "เทคโนโลยี",
    publishedDate: "2008-08-01",
    description: "คู่มือการเขียนโค้ดให้สะอาด อ่านง่าย และบำรุงรักษาได้อย่างยั่งยืนสำหรับนักพัฒนาซอฟต์แวร์มืออาชีพ",
    status: true,
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "เทคโนโลยี",
    publishedDate: "2017-03-16",
    description: "เจาะลึกสถาปัตยกรรมระบบข้อมูลขนาดใหญ่ ความน่าเชื่อถือ ความสามารถในการขยายตัว และความคงสภาพของข้อมูล",
    status: true,
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    category: "เทคโนโลยี",
    publishedDate: "2019-09-13",
    description: "หลักคิดและแนวทางปฏิบัติสำคัญที่เปลี่ยนโปรแกรมเมอร์ธรรมดาให้กลายเป็นวิศวกรซอฟต์แวร์ที่เชี่ยวชาญ",
    status: true,
  },
  {
    title: "Building Microservices: Designing Fine-Grained Systems",
    author: "Sam Newman",
    category: "เทคโนโลยี",
    publishedDate: "2021-08-02",
    description: "แนวคิดและการออกแบบระบบไมโครเซอร์วิส การแยกโดเมน และการจัดการความปลอดภัยในการสื่อสารระหว่างระบบ",
    status: false,
  },
  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    category: "เทคโนโลยี",
    publishedDate: "2020-04-28",
    description: "ตำรามาตรฐานระดับโลกที่ครอบคลุมทฤษฎีและเทคนิคด้านปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง",
    status: true,
  },

  // หมวด: วิทยาศาสตร์ (Science)
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "วิทยาศาสตร์",
    publishedDate: "1988-03-01",
    description: "การเดินทางสำรวจจักรวาลวิทยา บิ๊กแบง และหลุมดำ ด้วยภาษาที่เข้าใจง่ายสำหรับคนทั่วไป",
    status: true,
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    category: "วิทยาศาสตร์",
    publishedDate: "1980-10-12",
    description: "เรื่องราวประวัติศาสตร์ของเอกภพ วิวัฒนาการของชีวิต และสถานที่ของมนุษยชาติในจักรวาลอันกว้างใหญ่",
    status: true,
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "วิทยาศาสตร์",
    publishedDate: "1976-10-28",
    description: "มุมมองวิวัฒนาการผ่านหน่วยของยีน อธิบายพฤติกรรมและการคัดเลือกโดยธรรมชาติในสิ่งมีชีวิต",
    status: false,
  },
  {
    title: "Astrophysics for People in a Hurry",
    author: "Neil deGrasse Tyson",
    category: "วิทยาศาสตร์",
    publishedDate: "2017-05-02",
    description: "ฟิสิกส์ดาราศาสตร์แบบกระชับ รวดเร็ว และสนุกสนานสำหรับผู้ที่สนใจความลึกลับของจักรวาลแต่มีเวลาน้อย",
    status: true,
  },
  {
    title: "The Gene: An Intimate History",
    author: "Siddhartha Mukherjee",
    category: "วิทยาศาสตร์",
    publishedDate: "2016-05-17",
    description: "ชีวประวัติทางพันธุศาสตร์ ตั้งแต่การค้นพบของเมนเดลจนถึงเทคโนโลยีการตัดต่อยีน CRISPR ในปัจจุบัน",
    status: false,
  },

  // หมวด: วรรณกรรม (Literature)
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    category: "วรรณกรรม",
    publishedDate: "1967-05-30",
    description: "หนึ่งร้อยปีแห่งความโดดเดี่ยว มหากาพย์สัจนิยมมหัศจรรย์แห่งตระกูลบวนเดียในเมืองมาคอนโด",
    status: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "วรรณกรรม",
    publishedDate: "1949-06-08",
    description: "วรรณกรรมดิสโทเปียคลาสสิกที่สะท้อนสังคมอำนาจนิยม การบิดเบือนความจริง และการจับตาตรวจตราของพี่เบิ้ม",
    status: true,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "วรรณกรรม",
    publishedDate: "1925-04-10",
    description: "เรื่องราวภาพสะท้อนความฝันแบบอเมริกัน ความรัก ความหลงใหล และความสูญสลายในยุคแจ๊สอันฟุ้งเฟ้อ",
    status: false,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "วรรณกรรม",
    publishedDate: "1960-07-11",
    description: "วรรณกรรมสะท้อนความอยุติธรรมทางสังคม ความกล้าหาญทางศีลธรรม และการเติบโตของเด็กในแถบใต้ของสหรัฐฯ",
    status: false,
  },
];

const seed = async () => {
  try {
    await connectDB();
    console.log("Seeding books data...");

    for (const book of booksData) {
      await Book.findOrCreate({
        where: { title: book.title },
        defaults: book,
      });
    }

    console.log(`Successfully seeded ${booksData.length} books!`);
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    await sequelize.close();
    process.exit(1);
  }
};

seed();
