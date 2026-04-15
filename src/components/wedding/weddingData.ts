export const WEDDING_DATE = new Date("2026-06-06T14:30:00");

export const WEDDING_INFO = {
  groomName: "김우혁",
  brideName: "노현정",
  groomNameEn: "Kim Woo-hyeok",
  brideNameEn: "Noh hyun-jeong",
  date: WEDDING_DATE,
  dateStr: "2026년 6월 6일 토요일",
  timeStr: "오후 2시 30분",
  venue: "더 링크 서울",
  venueDetail: "7층 화이트홀",
  address: "서울 구로구 경인로 610",

  groom: {
    name: "김우혁",
    phone: process.env.NEXT_PUBLIC_GROOM_PHONE ?? '',
    fatherName: "김황중",
    fatherPhone: process.env.NEXT_PUBLIC_GROOM_FATHER_PHONE ?? '',
    motherName: "성정선",
    motherPhone: process.env.NEXT_PUBLIC_GROOM_MOTHER_PHONE ?? '',
    bank: "카카오뱅크",
    account: process.env.NEXT_PUBLIC_GROOM_ACCOUNT ?? '',
    holder: "김우혁",
  },
  bride: {
    name: "노현정",
    phone: process.env.NEXT_PUBLIC_BRIDE_PHONE ?? '',
    fatherName: "노태훈",
    fatherPhone: process.env.NEXT_PUBLIC_BRIDE_FATHER_PHONE ?? '',
    motherName: "은진경",
    motherPhone: process.env.NEXT_PUBLIC_BRIDE_MOTHER_PHONE ?? '',
    bank: "신한은행",
    account: process.env.NEXT_PUBLIC_BRIDE_ACCOUNT ?? '',
    holder: "노현정",
  },
};

export const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1769415244729-ce85690aebb1?w=600&q=80",

    rotation: -3,
  },
  {
    src: "https://images.unsplash.com/photo-1769050350292-f990b8fc9e3b?w=600&q=80",
    rotation: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1772868357202-347e1f8ae16e?w=600&q=80",
    rotation: -1.5,
  },
  {
    src: "https://images.unsplash.com/photo-1768777273037-aa1cbd2afa08?w=600&q=80",
    rotation: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1751552272702-1cd0fd2db2fe?w=600&q=80",
    rotation: -2,
  },
];
