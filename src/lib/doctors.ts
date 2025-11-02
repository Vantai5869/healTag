export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department?: string;
  description?: string;
  image: string;
  hospital?: string;
  qualifications?: string[];
  experience?: string;
  education?: string[];
  languages?: string[];
  training?: string[];
  hospitalLinks?: string[];
  professionalLinks?: string[];
  teachingLinks?: string[];
  motto?: string;
  specialties?: string[];
  certificates?: string[];
  email?: string;
  phone?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

// Helper function to generate slug from doctor name
export function generateDoctorSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Sample doctors data - in production, this would come from an API
export const sampleDoctors: Doctor[] = [
  {
    id: 'tran-hoai-nam',
    name: 'PGS Trần Hoài Nam',
    specialty: 'Khoa cấp cứu',
    department: 'Khoa cấp cứu',
    image: '/imgs/bacsi1-1.png',
    description: 'Chuyên gia hàng đầu về cấp cứu và hồi sức tích cực. Với hơn 20 năm kinh nghiệm trong điều trị các ca cấp cứu phức tạp.',
    qualifications: ['Phó Giáo sư', 'Tiến sĩ Y khoa'],
    experience: 'Hơn 20 năm',
    motto: '"Tận tâm – Chính xác – Hiệu quả" là phương châm mà bác sĩ luôn đặt lên hàng đầu trong mọi ca điều trị.',
    specialties: [
      'Phẫu thuật thay khớp háng, khớp gối',
      'Điều trị chấn thương thể thao, rách dây chằng',
      'Phẫu thuật nội soi khớp vai, khớp gối',
      'Phục hồi chức năng sau phẫu thuật',
      'Ứng dụng robot và công nghệ điều hướng trong phẫu thuật xương khớp'
    ],
    certificates: [
      '/imgs/chungchi.png',
      '/imgs/chungchi.png',
      '/imgs/chungchi.png',
      '/imgs/chungchi.png',
      '/imgs/chungchi.png'
    ],
    email: 'hoainam@gmail.com',
    phone: '+0 123 456 7890',
    socialMedia: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    },
    education: [
      'Đại học Y Hà Nội',
      'Trường Đại học Texas, Houston (Mỹ) – Chuyên khoa Chấn thương chỉnh hình',
      'Nhật Bản và Singapore - Công nghệ phẫu thuật nội soi khớp hiện đại'
    ],
    training: [
      'Hiệp hội Chấn thương chỉnh hình Việt Nam (VOSA)',
      'Hiệp hội Y học Thể thao Châu Á',
      'Thành viên Hội đồng phẫu thuật nội soi khớp khu vực ASEAN'
    ],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
  },
  {
    id: 'pham-thu-ha',
    name: 'PGS Phạm Thu Hà',
    specialty: 'Khoa cấp cứu',
    department: 'Khoa cấp cứu',
    image: '/imgs/bacsi1-2.png',
    description: 'Chuyên gia về điều trị các bệnh lý cơ – xương - khớp phức tạp. Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương - khớp phức tạp.',
    qualifications: ['Phó Giáo sư', 'Tiến sĩ Y khoa'],
    experience: 'Hơn 20 năm',
    education: [
      'Đại học Y Hà Nội',
      'Trường Đại học Texas, Houston (Mỹ) – Chuyên khoa Chấn thương chỉnh hình',
      'Nhật Bản và Singapore - Công nghệ phẫu thuật nội soi khớp hiện đại'
    ],
    training: [
      'Hiệp hội Chấn thương chỉnh hình Việt Nam (VOSA)',
      'Hiệp hội Y học Thể thao Châu Á',
      'Thành viên Hội đồng phẫu thuật nội soi khớp khu vực ASEAN'
    ],
    hospitalLinks: [
      'Bệnh viện Christus Spohn South',
      'Trung tâm Y tế Khu vực Doctor\'s',
      'Bệnh viện Phẫu thuật Nam Texas',
      'Tổ chức CCOPS'
    ],
    professionalLinks: [
      'Hiệp hội Y học Hạt Nueces',
      'Hiệp hội Y khoa Texas',
      'Hiệp hội Nội soi Khớp Bắc Mỹ'
    ],
    teachingLinks: [
      'Đội thể thao Corpus Christi Hooks',
      'Đại học Texas A&M – Cơ sở Corpus Christi',
      'Đại học Texas A&M – Cơ sở Kingsville'
    ],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
  },
  {
    id: 'nguyen-minh-khoa',
    name: 'BS Nguyễn Minh Khoa',
    specialty: 'Khoa tim mạch',
    department: 'Khoa tim mạch',
    image: '/imgs/bacsi1-3.png',
    description: 'Chuyên gia tim mạch với nhiều năm kinh nghiệm trong chẩn đoán và điều trị các bệnh lý tim mạch.',
    qualifications: ['Bác sĩ chuyên khoa II'],
    experience: 'Hơn 15 năm',
    education: [
      'Đại học Y Hà Nội',
      'Trường Đại học Texas, Houston (Mỹ) – Chuyên khoa Tim mạch',
      'Singapore - Chương trình đào tạo nâng cao Tim mạch can thiệp'
    ],
    training: [
      'Hiệp hội Tim mạch Việt Nam',
      'Hiệp hội Tim mạch Châu Á Thái Bình Dương',
      'Thành viên Hội đồng Tim mạch can thiệp khu vực'
    ],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
  },
  {
    id: 'le-hong-son',
    name: 'BS Lê Hồng Sơn',
    specialty: 'Khoa hô hấp',
    department: 'Khoa hô hấp',
    image: '/imgs/bacsi1-1.png',
    description: 'Chuyên gia về bệnh lý hô hấp với nhiều kinh nghiệm điều trị các bệnh phổi và đường hô hấp.',
    qualifications: ['Bác sĩ chuyên khoa II'],
    experience: 'Hơn 15 năm',
    education: [
      'Đại học Y Hà Nội',
      'Trường Đại học Y Johns Hopkins (Mỹ) – Chuyên khoa Hô hấp',
      'Nhật Bản - Chương trình đào tạo về bệnh phổi tắc nghẽn mãn tính'
    ],
    training: [
      'Hiệp hội Hô hấp Việt Nam',
      'Hiệp hội Hô hấp Châu Á',
      'Thành viên Hội đồng Điều trị bệnh phổi mãn tính'
    ],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
  },
  {
    id: 'tran-hai-yen',
    name: 'BS Trần Hải Yến',
    specialty: 'Khoa tiêu hoá',
    department: 'Khoa tiêu hoá',
    image: '/imgs/bacsi1-2.png',
    description: 'Chuyên gia tiêu hóa với nhiều năm kinh nghiệm trong nội soi và điều trị các bệnh lý đường tiêu hóa.',
    qualifications: ['Bác sĩ chuyên khoa II'],
    experience: 'Hơn 15 năm',
    education: [
      'Đại học Y Hà Nội',
      'Trường Đại học Y Mayo Clinic (Mỹ) – Chuyên khoa Tiêu hóa',
      'Hàn Quốc - Chương trình đào tạo nội soi tiêu hóa cao cấp'
    ],
    training: [
      'Hiệp hội Tiêu hóa Việt Nam',
      'Hiệp hội Nội soi Tiêu hóa Châu Á',
      'Thành viên Hội đồng Nội soi tiêu hóa khu vực'
    ],
    languages: ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Hàn'],
  },
  {
    id: 'pham-quang-vu',
    name: 'BS Phạm Quang Vũ',
    specialty: 'Khoa ngoại',
    department: 'Khoa ngoại',
    image: '/imgs/bacsi1-3.png',
    description: 'Chuyên gia phẫu thuật với nhiều năm kinh nghiệm trong các ca phẫu thuật phức tạp.',
    qualifications: ['Bác sĩ chuyên khoa II'],
    experience: 'Hơn 15 năm',
    education: [
      'Đại học Y Hà Nội',
      'Trường Đại học Y Harvard (Mỹ) – Chuyên khoa Ngoại tổng quát',
      'Đức - Chương trình đào tạo phẫu thuật nội soi'
    ],
    training: [
      'Hiệp hội Ngoại khoa Việt Nam',
      'Hiệp hội Phẫu thuật nội soi Quốc tế',
      'Thành viên Hội đồng Phẫu thuật nội soi Châu Á'
    ],
    languages: ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Đức'],
  },
  {
    id: 'tran-manh-dung',
    name: 'BS Trần Mạnh Dũng',
    specialty: 'Đa khoa',
    department: 'Phòng khám đa khoa',
    image: '/imgs/bacsi1-1.png',
    description: 'Bác sĩ đa khoa với nhiều năm kinh nghiệm khám và điều trị các bệnh thông thường.',
    qualifications: ['Bác sĩ đa khoa'],
    experience: 'Hơn 10 năm',
    education: [
      'Đại học Y Hà Nội',
      'Chương trình đào tạo Y học gia đình'
    ],
    training: [
      'Hiệp hội Y học Gia đình Việt Nam',
      'Hiệp hội Bác sĩ Gia đình Châu Á'
    ],
    languages: ['Tiếng Việt'],
  },
];

export function getDoctorById(id: string): Doctor | undefined {
  return sampleDoctors.find(d => d.id === id);
}

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return sampleDoctors.find(d => generateDoctorSlug(d.name) === slug);
}

export function getAllDoctorSlugs(): string[] {
  return sampleDoctors.map(d => generateDoctorSlug(d.name));
}

