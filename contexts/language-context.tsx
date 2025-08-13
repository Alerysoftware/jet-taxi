"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "tr" | "en" | "ru" | "el"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  tr: {
    // Header
    "header.home": "Ana Sayfa",
    "header.services": "Hizmetler",
    "header.reviews": "Yorumlar",
    "header.contact": "İletişim",
    "header.bookNow": "Rezervasyon",

    // Hero Section
    "hero.title": "JET TAXI",
    "hero.phone": "0533 880 68 08",
    "hero.location": "İskele, Gazimağusa",
    "hero.licensePlate": "Plaka: TMZ 432",
    "hero.description":
      "Gazimağusa'da profesyonel ve güvenilir taksi hizmeti. Tüm ulaşım ihtiyaçlarınız için 7/24 hizmetinizdeyiz.",
    "hero.bookNow": "Rezervasyon",
    "hero.callUs": "Ara",

    // Services Section
    "services.title": "Hizmetlerimiz",
    "services.airportTransfers": "Havalimanı Transferi",
    "services.airportDesc": "Uçuş takipli güvenilir havalimanı karşılama ve uğurlama hizmeti.",
    "services.cityTours": "Şehir Turları",
    "services.cityToursDesc": "En güzel yerleri bilen deneyimli şoförlerimizle Kıbrıs'ı keşfedin.",
    "services.availability": "7/24 Hizmet",
    "services.availabilityDesc": "Hizmetimiz sizin rahatlığınız için günün her saati mevcuttur.",
    "services.payment": "Çoklu Ödeme Seçenekleri",
    "services.paymentDesc": "Nakit veya kartla ödeme - size en uygun olan şekilde.",
    "services.premiumFleet": "Premium Filo",
    "services.premiumDesc": "Lüks Mercedes-Benz taksilerimizle konfor ve şıklığı deneyimleyin.",
    "services.luxuryVehicles": "Lüks Mercedes-Benz araçlar",
    "services.professionalDrivers": "Profesyonel, deneyimli şoförler",
    "services.airConditioned": "Klimalı konfor",

    // Fleet Gallery
    "fleet.title": "Filomuz",
    "fleet.caption": "İskele, Gazimağusa'daki lüks Mercedes-Benz taksimiz.",

    // Reviews Section
    "reviews.title": "Müşteri Yorumları",
    "reviews.recent": "Son Yorumlar",
    "reviews.noComments": "Henüz yorum yok. İlk yorumu yapan siz olun!",
    "reviews.leaveComment": "Yorum Yap",
    "reviews.yourName": "Adınız",
    "reviews.enterName": "Adınızı girin",
    "reviews.rating": "Değerlendirme",
    "reviews.yourComment": "Yorumunuz",
    "reviews.commentPlaceholder": "Jet Taxi ile deneyiminizi paylaşın...",
    "reviews.submit": "Yorum Gönder",

    // Reviews Page
    "reviewsPage.subtitle": "Müşterilerimizin deneyimlerini okuyun ve kendi yorumunuzu paylaşın",
    "reviewsPage.customerSatisfaction": "Müşteri Memnuniyeti",
    "reviewsPage.averageRating": "Ortalama Puan",
    "reviewsPage.happyCustomers": "Mutlu Müşteri",
    "reviewsPage.serviceHours": "Hizmet Saati",
    "reviewsPage.tryJetTaxi": "Siz de Jet Taxi'yi Deneyin!",
    "reviewsPage.experienceService": "Profesyonel hizmetimizi deneyimleyin ve yorumunuzu paylaşın",
    "reviewsPage.bookNow": "Hemen Rezervasyon Yap",

    // Services Page
    "servicesPage.title": "Taksi Hizmetlerimiz",
    "servicesPage.subtitle": "Premium VIP hizmetlerimiz veya güvenilir standart taksi seçeneklerimizden birini seçin",
    "servicesPage.backToHome": "Ana Sayfaya Dön",
    "servicesPage.needHelp": "Seçim Yapmakta Yardım mı Lazım?",
    "servicesPage.helpDesc": "Kişiselleştirilmiş hizmet önerileri için bizimle iletişime geçin",
    "servicesPage.whatsappUs": "WhatsApp'tan Yazın",
    "servicesPage.call": "Ara: 0533 880 68 08",

    // VIP Services
    "vip.title": "VIP HİZMETLERİMİZ",
    "vip.spaciousInterior": "Geniş iç mekan",
    "vip.premiumComfort": "Premium konfor",
    "vip.airConditioning": "Klima",
    "vip.professionalService": "Profesyonel hizmet",
    "vip.luggageSpace": "Bagaj alanı",
    "vip.comfortableSeating": "Konforlu koltuklar",
    "vip.climateControl": "İklim kontrolü",
    "vip.spaciousCabin": "Geniş kabin",
    "vip.premiumMaterials": "Premium malzemeler",
    "vip.professionalAppearance": "Profesyonel görünüm",
    "vip.largeCapacity": "Büyük kapasite",
    "vip.modernDesign": "Modern tasarım",
    "vip.reliablePerformance": "Güvenilir performans",
    "vip.vitoTitle1": "Mercedes Vito VIP",
    "vip.vitoDesc1": "Premium Mercedes Vito filomuzla lüks seyahati deneyimleyin.",
    "vip.vitoTitle2": "Vito Lüks İç Mekan",
    "vip.vitoDesc2": "Grup seyahati için konforlu ve geniş iç mekan tasarımı.",
    "vip.vitoTitle3": "Mercedes Vito Profesyonel",
    "vip.vitoDesc3": "Premium ulaşım için profesyonel Mercedes Vito.",
    "vip.bookVip": "VIP Rezervasyon",
    "vip.call": "Ara",

    // Regular Taxi Services
    "taxi.title": "Taksi",
    "taxi.eClassTitle": "Mercedes E-Class Premium",
    "taxi.eClassDesc": "Lüks konfor ve profesyonel hizmet sunan Mercedes E-Class ile premium ulaşımı deneyimleyin.",
    "taxi.luxuryComfort": "Lüks konfor",
    "taxi.premiumInterior": "Premium iç mekan",
    "taxi.professionalService": "Profesyonel hizmet",
    "taxi.modernTechnology": "Modern teknoloji",
    "taxi.mercedesTitle": "Mercedes Taksi - Profesyonel Hizmet",
    "taxi.mercedesDesc": "Lüks konfor ve güvenilir ulaşım ile profesyonel Mercedes taksi hizmeti.",
    "taxi.airConditioning": "Klima",
    "taxi.comfortableSeating": "Konforlu koltuklar",
    "taxi.professionalDriver": "Profesyonel şoför",
    "taxi.cleanInterior": "Temiz iç mekan",
    "taxi.modernAmenities": "Modern olanaklar",
    "taxi.suvTitle": "SUV Taksi",
    "taxi.suvDesc": "Aileler ve fazla bagajlı gruplar için geniş SUV taksi.",
    "taxi.extraSpace": "Ekstra alan",
    "taxi.higherSeating": "Yüksek oturma",
    "taxi.allWeather": "Her hava",
    "taxi.groupTravel": "Grup seyahati",
    "taxi.bookNow": "Rezervasyon",
    "taxi.call": "Ara",
    "taxi.clickGallery": "Galeriyi görüntülemek için tıklayın",
    "taxi.photos": "fotoğraf",

    // Contact Page
    "contact.title": "İletişim",
    "contact.subtitle": "Tüm ulaşım ihtiyaçlarınız için Jet Taxi ile iletişime geçin",
    "contact.backToHome": "Ana Sayfaya Dön",
    "contact.methods": "İletişim Yöntemleri",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappDesc": "Hızlı rezervasyon ve sorularınız için WhatsApp'tan mesaj gönderin",
    "contact.openWhatsapp": "WhatsApp'ı Aç",
    "contact.phoneCall": "Telefon Araması",
    "contact.phoneDesc": "Anında yardım ve rezervasyon için doğrudan arayın",
    "contact.callNow": "Şimdi Ara: 0533 880 68 08",
    "contact.information": "İletişim Bilgileri",
    "contact.phoneNumber": "Telefon Numarası",
    "contact.available247": "7/24 Müsait",
    "contact.location": "Konum",
    "contact.cyprus": "Kıbrıs",
    "contact.licensePlate": "Plaka: TMZ 432",
    "contact.operatingHours": "Çalışma Saatleri",
    "contact.service247": "7/24 Hizmet",
    "contact.availableEveryDay": "Yılın her günü hizmetinizdeyiz",
    "contact.servicesOverview": "Hizmetlerimiz",
    "contact.vipServices": "VIP Hizmetler (Vito)",
    "contact.vipDesc": "Premium konfor ve alan ile lüks Mercedes Vito ulaşımı",
    "contact.taxiServices": "Taksi",
    "contact.taxiDesc": "Günlük ihtiyaçlar için konforlu ulaşım",
    "contact.viewAllServices": "Tüm Hizmetleri Görüntüle",
    "contact.emergencyContact": "Acil Durum İletişimi",
    "contact.emergencyDesc": "Acil ulaşım ihtiyaçları veya acil durumlar için hemen bizimle iletişime geçin:",
    "contact.emergencyCall": "Acil Arama",
    "contact.emergencyWhatsapp": "Acil WhatsApp",

    // Footer
    "footer.description":
      "Gazimağusa'da profesyonel ve güvenilir taksi hizmeti. Tüm ulaşım ihtiyaçlarınız için 7/24 hizmetinizdeyiz.",
    "footer.quickLinks": "Hızlı Bağlantılar",
    "footer.home": "Ana Sayfa",
    "footer.services": "Hizmetler",
    "footer.contact": "İletişim",
    "footer.contactUs": "İletişim",
    "footer.copyright": "Jet Taxi. Tüm hakları saklıdır. | Tasarım: Mine Çolak",

    // Common
    "common.phone": "0533 880 68 08",
    "common.location": "İskele, Gazimağusa, Kıbrıs",
  },
  en: {
    // Header
    "header.home": "Home",
    "header.services": "Services",
    "header.reviews": "Reviews",
    "header.contact": "Contact",
    "header.bookNow": "Book Now",

    // Hero Section
    "hero.title": "JET TAXI",
    "hero.phone": "0533 880 68 08",
    "hero.location": "İskele, Famagusta",
    "hero.licensePlate": "License Plate: TMZ 432",
    "hero.description":
      "Professional and reliable taxi service in Famagusta. Available 24/7 for all your transportation needs.",
    "hero.bookNow": "Book Now",
    "hero.callUs": "Call Us",

    // Services Section
    "services.title": "Our Services",
    "services.airportTransfers": "Airport Transfers",
    "services.airportDesc": "Reliable airport pickup and drop-off services with flight tracking.",
    "services.cityTours": "City Tours",
    "services.cityToursDesc": "Explore Cyprus with our experienced drivers who know the best spots.",
    "services.availability": "24/7 Availability",
    "services.availabilityDesc": "Our service is available around the clock for your convenience.",
    "services.payment": "Multiple Payment Options",
    "services.paymentDesc": "Pay with cash or card - whatever is most convenient for you.",
    "services.premiumFleet": "Premium Fleet",
    "services.premiumDesc": "Experience comfort and style with our luxury Mercedes-Benz taxis.",
    "services.luxuryVehicles": "Luxury Mercedes-Benz vehicles",
    "services.professionalDrivers": "Professional, experienced drivers",
    "services.airConditioned": "Air-conditioned comfort",

    // Fleet Gallery
    "fleet.title": "Our Fleet",
    "fleet.caption": "Our luxury Mercedes-Benz taxi at Iskele, Famagusta.",

    // Reviews Section
    "reviews.title": "Customer Reviews",
    "reviews.recent": "Recent Comments",
    "reviews.noComments": "No comments yet. Be the first to leave a review!",
    "reviews.leaveComment": "Leave a Comment",
    "reviews.yourName": "Your Name",
    "reviews.enterName": "Enter your name",
    "reviews.rating": "Rating",
    "reviews.yourComment": "Your Comment",
    "reviews.commentPlaceholder": "Share your experience with Jet Taxi...",
    "reviews.submit": "Submit Comment",

    // Reviews Page
    "reviewsPage.subtitle": "Read our customers' experiences and share your own review",
    "reviewsPage.customerSatisfaction": "Customer Satisfaction",
    "reviewsPage.averageRating": "Average Rating",
    "reviewsPage.happyCustomers": "Happy Customers",
    "reviewsPage.serviceHours": "Service Hours",
    "reviewsPage.tryJetTaxi": "Try Jet Taxi Too!",
    "reviewsPage.experienceService": "Experience our professional service and share your review",
    "reviewsPage.bookNow": "Book Now",

    // Services Page
    "servicesPage.title": "Our Taxi Services",
    "servicesPage.subtitle": "Choose from our premium VIP services or reliable standard taxi options",
    "servicesPage.backToHome": "Back to Home",
    "servicesPage.needHelp": "Need Help Choosing?",
    "servicesPage.helpDesc": "Contact us for personalized service recommendations",
    "servicesPage.whatsappUs": "WhatsApp Us",
    "servicesPage.call": "Call: 0533 880 68 08",

    // VIP Services
    "vip.title": "VIP SERVICES",
    "vip.spaciousInterior": "Spacious interior",
    "vip.premiumComfort": "Premium comfort",
    "vip.airConditioning": "Air conditioning",
    "vip.professionalService": "Professional service",
    "vip.luggageSpace": "Luggage space",
    "vip.comfortableSeating": "Comfortable seating",
    "vip.climateControl": "Climate control",
    "vip.spaciousCabin": "Spacious cabin",
    "vip.premiumMaterials": "Premium materials",
    "vip.professionalAppearance": "Professional appearance",
    "vip.largeCapacity": "Large capacity",
    "vip.modernDesign": "Modern design",
    "vip.reliablePerformance": "Reliable performance",
    "vip.vitoTitle1": "Mercedes Vito VIP",
    "vip.vitoDesc1": "Experience luxury travel with our premium Mercedes Vito fleet.",
    "vip.vitoTitle2": "Vito Luxury Interior",
    "vip.vitoDesc2": "Comfortable and spacious interior design for group travel.",
    "vip.vitoTitle3": "Mercedes Vito Professional",
    "vip.vitoDesc3": "Professional Mercedes Vito for premium transportation.",
    "vip.bookVip": "Book VIP",
    "vip.call": "Call",

    // Regular Taxi Services
    "taxi.title": "Taxi",
    "taxi.eClassTitle": "Mercedes E-Class Premium",
    "taxi.eClassDesc":
      "Experience premium transportation with our Mercedes E-Class featuring luxury comfort and professional service.",
    "taxi.luxuryComfort": "Luxury comfort",
    "taxi.premiumInterior": "Premium interior",
    "taxi.professionalService": "Professional service",
    "taxi.modernTechnology": "Modern technology",
    "taxi.mercedesTitle": "Mercedes Taxi - Professional Service",
    "taxi.mercedesDesc": "Professional Mercedes taxi service with luxury comfort and reliable transportation.",
    "taxi.airConditioning": "Air conditioning",
    "taxi.comfortableSeating": "Comfortable seating",
    "taxi.professionalDriver": "Professional driver",
    "taxi.cleanInterior": "Clean interior",
    "taxi.modernAmenities": "Modern amenities",
    "taxi.suvTitle": "SUV Taxi",
    "taxi.suvDesc": "Spacious SUV taxi for families and groups with extra luggage.",
    "taxi.extraSpace": "Extra space",
    "taxi.higherSeating": "Higher seating",
    "taxi.allWeather": "All weather",
    "taxi.groupTravel": "Group travel",
    "taxi.bookNow": "Book Now",
    "taxi.call": "Call",
    "taxi.clickGallery": "Click to view gallery",
    "taxi.photos": "photos",

    // Contact Page
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with Jet Taxi for all your transportation needs",
    "contact.backToHome": "Back to Home",
    "contact.methods": "Contact Methods",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappDesc": "Send us a message on WhatsApp for quick booking and inquiries",
    "contact.openWhatsapp": "Open WhatsApp",
    "contact.phoneCall": "Phone Call",
    "contact.phoneDesc": "Call us directly for immediate assistance and bookings",
    "contact.callNow": "Call Now: 0533 880 68 08",
    "contact.information": "Contact Information",
    "contact.phoneNumber": "Phone Number",
    "contact.available247": "Available 24/7",
    "contact.location": "Location",
    "contact.cyprus": "Cyprus",
    "contact.licensePlate": "License Plate: TMZ 432",
    "contact.operatingHours": "Operating Hours",
    "contact.service247": "24/7 Service",
    "contact.availableEveryDay": "Available every day of the year",
    "contact.servicesOverview": "Our Services",
    "contact.vipServices": "VIP Services (Vito)",
    "contact.vipDesc": "Luxury Mercedes Vito transportation with premium comfort and space",
    "contact.taxiServices": "Taxi",
    "contact.taxiDesc": "Comfortable transportation for everyday needs",
    "contact.viewAllServices": "View All Services",
    "contact.emergencyContact": "Emergency Contact",
    "contact.emergencyDesc": "For urgent transportation needs or emergencies, contact us immediately:",
    "contact.emergencyCall": "Emergency Call",
    "contact.emergencyWhatsapp": "Emergency WhatsApp",

    // Footer
    "footer.description":
      "Professional and reliable taxi service in Famagusta. Available 24/7 for all your transportation needs.",
    "footer.quickLinks": "Quick Links",
    "footer.home": "Home",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.contactUs": "Contact Us",
    "footer.copyright": "Jet Taxi. All rights reserved. | Design by Mine Colak",

    // Common
    "common.phone": "0533 880 68 08",
    "common.location": "İskele, Famagusta, Cyprus",
  },
  ru: {
    // Header
    "header.home": "Главная",
    "header.services": "Услуги",
    "header.reviews": "Отзывы",
    "header.contact": "Контакты",
    "header.bookNow": "Заказать",

    // Hero Section
    "hero.title": "JET TAXI",
    "hero.phone": "0533 880 68 08",
    "hero.location": "Искеле, Фамагуста",
    "hero.licensePlate": "Номер: TMZ 432",
    "hero.description":
      "Профессиональная и надежная служба такси в Фамагусте. Доступны 24/7 для всех ваших транспортных потребностей.",
    "hero.bookNow": "Заказать",
    "hero.callUs": "Позвонить",

    // Services Section
    "services.title": "Наши Услуги",
    "services.airportTransfers": "Трансфер в Аэропорт",
    "services.airportDesc": "Надежные услуги встречи и проводов в аэропорт с отслеживанием рейсов.",
    "services.cityTours": "Городские Туры",
    "services.cityToursDesc": "Исследуйте Кипр с нашими опытными водителями, знающими лучшие места.",
    "services.availability": "Доступность 24/7",
    "services.availabilityDesc": "Наш сервис доступен круглосуточно для вашего удобства.",
    "services.payment": "Различные Способы Оплаты",
    "services.paymentDesc": "Оплачивайте наличными или картой - как вам удобнее.",
    "services.premiumFleet": "Премиум Автопарк",
    "services.premiumDesc": "Испытайте комфорт и стиль с нашими роскошными такси Mercedes-Benz.",
    "services.luxuryVehicles": "Роскошные автомобили Mercedes-Benz",
    "services.professionalDrivers": "Профессиональные, опытные водители",
    "services.airConditioned": "Комфорт с кондиционером",

    // Fleet Gallery
    "fleet.title": "Наш Автопарк",
    "fleet.caption": "Наше роскошное такси Mercedes-Benz в Искеле, Фамагуста.",

    // Reviews Section
    "reviews.title": "Отзывы Клиентов",
    "reviews.recent": "Последние Комментарии",
    "reviews.noComments": "Пока нет комментариев. Будьте первым, кто оставит отзыв!",
    "reviews.leaveComment": "Оставить Комментарий",
    "reviews.yourName": "Ваше Имя",
    "reviews.enterName": "Введите ваше имя",
    "reviews.rating": "Рейтинг",
    "reviews.yourComment": "Ваш Комментарий",
    "reviews.commentPlaceholder": "Поделитесь своим опытом с Jet Taxi...",
    "reviews.submit": "Отправить Комментарий",

    // Reviews Page
    "reviewsPage.subtitle": "Читайте отзывы наших клиентов и поделитесь своим",
    "reviewsPage.customerSatisfaction": "Удовлетворенность Клиентов",
    "reviewsPage.averageRating": "Средний Рейтинг",
    "reviewsPage.happyCustomers": "Довольных Клиентов",
    "reviewsPage.serviceHours": "Часы Работы",
    "reviewsPage.tryJetTaxi": "Попробуйте Jet Taxi Тоже!",
    "reviewsPage.experienceService": "Испытайте наш профессиональный сервис и поделитесь отзывом",
    "reviewsPage.bookNow": "Заказать Сейчас",

    // Services Page
    "servicesPage.title": "Наши Услуги Такси",
    "servicesPage.subtitle": "Выберите из наших премиум VIP услуг или надежных стандартных опций такси",
    "servicesPage.backToHome": "Назад на Главную",
    "servicesPage.needHelp": "Нужна Помощь в Выборе?",
    "servicesPage.helpDesc": "Свяжитесь с нами для персональных рекомендаций услуг",
    "servicesPage.whatsappUs": "Напишите в WhatsApp",
    "servicesPage.call": "Звонить: 0533 880 68 08",

    // VIP Services
    "vip.title": "VIP УСЛУГИ",
    "vip.spaciousInterior": "Просторный салон",
    "vip.premiumComfort": "Премиум комфорт",
    "vip.airConditioning": "Кондиционер",
    "vip.professionalService": "Профессиональный сервис",
    "vip.luggageSpace": "Место для багажа",
    "vip.comfortableSeating": "Удобные сиденья",
    "vip.climateControl": "Климат-контроль",
    "vip.spaciousCabin": "Просторная кабина",
    "vip.premiumMaterials": "Премиум материалы",
    "vip.professionalAppearance": "Профессиональный вид",
    "vip.largeCapacity": "Большая вместимость",
    "vip.modernDesign": "Современный дизайн",
    "vip.reliablePerformance": "Надежная работа",
    "vip.vitoTitle1": "Mercedes Vito VIP",
    "vip.vitoDesc1": "Испытайте роскошные поездки с нашим премиум автопарком Mercedes Vito.",
    "vip.vitoTitle2": "Vito Роскошный Салон",
    "vip.vitoDesc2": "Удобный и просторный дизайн салона для групповых поездок.",
    "vip.vitoTitle3": "Mercedes Vito Профессиональный",
    "vip.vitoDesc3": "Профессиональный Mercedes Vito для премиум транспорта.",
    "vip.bookVip": "Заказать VIP",
    "vip.call": "Звонить",

    // Regular Taxi Services
    "taxi.title": "Такси",
    "taxi.eClassTitle": "Mercedes E-Class Премиум",
    "taxi.eClassDesc":
      "Испытайте премиум транспорт с нашим Mercedes E-Class с роскошным комфортом и профессиональным сервисом.",
    "taxi.luxuryComfort": "Роскошный комфорт",
    "taxi.premiumInterior": "Премиум салон",
    "taxi.professionalService": "Профессиональный сервис",
    "taxi.modernTechnology": "Современные технологии",
    "taxi.mercedesTitle": "Mercedes Такси - Профессиональный Сервис",
    "taxi.mercedesDesc": "Профессиональный сервис такси Mercedes с роскошным комфортом и надежным транспортом.",
    "taxi.airConditioning": "Кондиционер",
    "taxi.comfortableSeating": "Удобные сиденья",
    "taxi.professionalDriver": "Профессиональный водитель",
    "taxi.cleanInterior": "Чистый салон",
    "taxi.modernAmenities": "Современные удобства",
    "taxi.suvTitle": "SUV Такси",
    "taxi.suvDesc": "Просторное SUV такси для семей и групп с дополнительным багажом.",
    "taxi.extraSpace": "Дополнительное место",
    "taxi.higherSeating": "Высокая посадка",
    "taxi.allWeather": "Всепогодное",
    "taxi.groupTravel": "Групповые поездки",
    "taxi.bookNow": "Заказать Сейчас",
    "taxi.call": "Звонить",
    "taxi.clickGallery": "Нажмите для просмотра галереи",
    "taxi.photos": "фото",

    // Contact Page
    "contact.title": "Связаться с Нами",
    "contact.subtitle": "Свяжитесь с Jet Taxi для всех ваших транспортных потребностей",
    "contact.backToHome": "Назад на Главную",
    "contact.methods": "Способы Связи",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappDesc": "Отправьте нам сообщение в WhatsApp для быстрого заказа и вопросов",
    "contact.openWhatsapp": "Открыть WhatsApp",
    "contact.phoneCall": "Телефонный Звонок",
    "contact.phoneDesc": "Звоните нам напрямую для немедленной помощи и заказов",
    "contact.callNow": "Звонить Сейчас: 0533 880 68 08",
    "contact.information": "Контактная Информация",
    "contact.phoneNumber": "Номер Телефона",
    "contact.available247": "Доступно 24/7",
    "contact.location": "Местоположение",
    "contact.cyprus": "Кипр",
    "contact.licensePlate": "Номер: TMZ 432",
    "contact.operatingHours": "Часы Работы",
    "contact.service247": "Сервис 24/7",
    "contact.availableEveryDay": "Доступно каждый день года",
    "contact.servicesOverview": "Наши Услуги",
    "contact.vipServices": "VIP Услуги (Vito)",
    "contact.vipDesc": "Роскошный транспорт Mercedes Vito с премиум комфортом и пространством",
    "contact.taxiServices": "Такси",
    "contact.taxiDesc": "Комфортный транспорт для повседневных нужд",
    "contact.viewAllServices": "Посмотреть Все Услуги",
    "contact.emergencyContact": "Экстренная Связь",
    "contact.emergencyDesc":
      "Для срочных транспортных потребностей или чрезвычайных ситуаций, свяжитесь с нами немедленно:",
    "contact.emergencyCall": "Экстренный Звонок",
    "contact.emergencyWhatsapp": "Экстренный WhatsApp",

    // Footer
    "footer.description":
      "Профессиональная и надежная служба такси в Фамагусте. Доступны 24/7 для всех ваших транспортных потребностей.",
    "footer.quickLinks": "Быстрые Ссылки",
    "footer.home": "Главная",
    "footer.services": "Услуги",
    "footer.contact": "Контакты",
    "footer.contactUs": "Связаться с Нами",
    "footer.copyright": "Jet Taxi. Все права защищены. | Дизайн: Mine Colak",

    // Common
    "common.phone": "0533 880 68 08",
    "common.location": "Искеле, Фамагуста, Кипр",
  },
  el: {
    // Header
    "header.home": "Αρχική",
    "header.services": "Υπηρεσίες",
    "header.reviews": "Κριτικές",
    "header.contact": "Επικοινωνία",
    "header.bookNow": "Κράτηση",

    // Hero Section
    "hero.title": "JET TAXI",
    "hero.phone": "0533 880 68 08",
    "hero.location": "Ίσκελε, Αμμόχωστος",
    "hero.licensePlate": "Πινακίδα: TMZ 432",
    "hero.description":
      "Επαγγελματική και αξιόπιστη υπηρεσία ταξί στην Αμμόχωστο. Διαθέσιμη 24/7 για όλες τις μεταφορικές σας ανάγκες.",
    "hero.bookNow": "Κράτηση",
    "hero.callUs": "Καλέστε μας",

    // Services Section
    "services.title": "Οι Υπηρεσίες μας",
    "services.airportTransfers": "Μεταφορές Αεροδρομίου",
    "services.airportDesc": "Αξιόπιστες υπηρεσίες παραλαβής και αποστολής αεροδρομίου με παρακολούθηση πτήσεων.",
    "services.cityTours": "Περιηγήσεις Πόλης",
    "services.cityToursDesc": "Εξερευνήστε την Κύπρο με τους έμπειρους οδηγούς μας που γνωρίζουν τα καλύτερα μέρη.",
    "services.availability": "Διαθεσιμότητα 24/7",
    "services.availabilityDesc": "Η υπηρεσία μας είναι διαθέσιμη όλο το εικοσιτετράωρο για τη διευκόλυνσή σας.",
    "services.payment": "Πολλαπλές Επιλογές Πληρωμής",
    "services.paymentDesc": "Πληρώστε με μετρητά ή κάρτα - ό,τι είναι πιο βολικό για εσάς.",
    "services.premiumFleet": "Premium Στόλος",
    "services.premiumDesc": "Απολαύστε άνεση και στυλ με τα πολυτελή ταξί Mercedes-Benz μας.",
    "services.luxuryVehicles": "Πολυτελή οχήματα Mercedes-Benz",
    "services.professionalDrivers": "Επαγγελματίες, έμπειροι οδηγοί",
    "services.airConditioned": "Άνεση με κλιματισμό",

    // Fleet Gallery
    "fleet.title": "Ο Στόλος μας",
    "fleet.caption": "Το πολυτελές ταξί Mercedes-Benz μας στην Ίσκελε, Αμμόχωστος.",

    // Reviews Section
    "reviews.title": "Κριτικές Πελατών",
    "reviews.recent": "Πρόσφατα Σχόλια",
    "reviews.noComments": "Δεν υπάρχουν σχόλια ακόμα. Γίνετε ο πρώτος που θα αφήσει κριτική!",
    "reviews.leaveComment": "Αφήστε Σχόλιο",
    "reviews.yourName": "Το Όνομά σας",
    "reviews.enterName": "Εισάγετε το όνομά σας",
    "reviews.rating": "Αξιολόγηση",
    "reviews.yourComment": "Το Σχόλιό σας",
    "reviews.commentPlaceholder": "Μοιραστείτε την εμπειρία σας με το Jet Taxi...",
    "reviews.submit": "Υποβολή Σχολίου",

    // Reviews Page
    "reviewsPage.subtitle": "Διαβάστε τις εμπειρίες των πελατών μας και μοιραστείτε τη δική σας κριτική",
    "reviewsPage.customerSatisfaction": "Ικανοποίηση Πελατών",
    "reviewsPage.averageRating": "Μέσος Όρος Αξιολόγησης",
    "reviewsPage.happyCustomers": "Ευχαριστημένοι Πελάτες",
    "reviewsPage.serviceHours": "Ώρες Υπηρεσίας",
    "reviewsPage.tryJetTaxi": "Δοκιμάστε και εσείς το Jet Taxi!",
    "reviewsPage.experienceService": "Απολαύστε την επαγγελματική μας υπηρεσία και μοιραστείτε την κριτική σας",
    "reviewsPage.bookNow": "Κράτηση Τώρα",

    // Services Page
    "servicesPage.title": "Οι Υπηρεσίες Ταξί μας",
    "servicesPage.subtitle": "Επιλέξτε από τις premium VIP υπηρεσίες μας ή τις αξιόπιστες τυπικές επιλογές ταξί",
    "servicesPage.backToHome": "Επιστροφή στην Αρχική",
    "servicesPage.needHelp": "Χρειάζεστε Βοήθεια στην Επιλογή;",
    "servicesPage.helpDesc": "Επικοινωνήστε μαζί μας για εξατομικευμένες συστάσεις υπηρεσιών",
    "servicesPage.whatsappUs": "Στείλτε μας WhatsApp",
    "servicesPage.call": "Καλέστε: 0533 880 68 08",

    // VIP Services
    "vip.title": "VIP ΥΠΗΡΕΣΙΕΣ",
    "vip.spaciousInterior": "Ευρύχωρο εσωτερικό",
    "vip.premiumComfort": "Premium άνεση",
    "vip.airConditioning": "Κλιματισμός",
    "vip.professionalService": "Επαγγελματική υπηρεσία",
    "vip.luggageSpace": "Χώρος αποσκευών",
    "vip.comfortableSeating": "Άνετα καθίσματα",
    "vip.climateControl": "Έλεγχος κλίματος",
    "vip.spaciousCabin": "Ευρύχωρη καμπίνα",
    "vip.premiumMaterials": "Premium υλικά",
    "vip.professionalAppearance": "Επαγγελματική εμφάνιση",
    "vip.largeCapacity": "Μεγάλη χωρητικότητα",
    "vip.modernDesign": "Μοντέρνος σχεδιασμός",
    "vip.reliablePerformance": "Αξιόπιστη απόδοση",
    "vip.vitoTitle1": "Mercedes Vito VIP",
    "vip.vitoDesc1": "Απολαύστε πολυτελή ταξίδια με τον premium στόλο Mercedes Vito μας.",
    "vip.vitoTitle2": "Vito Πολυτελές Εσωτερικό",
    "vip.vitoDesc2": "Άνετος και ευρύχωρος σχεδιασμός εσωτερικού για ομαδικά ταξίδια.",
    "vip.vitoTitle3": "Mercedes Vito Επαγγελματικό",
    "vip.vitoDesc3": "Επαγγελματικό Mercedes Vito για premium μεταφορά.",
    "vip.bookVip": "Κράτηση VIP",
    "vip.call": "Καλέστε",

    // Regular Taxi Services
    "taxi.title": "Ταξί",
    "taxi.eClassTitle": "Mercedes E-Class Premium",
    "taxi.eClassDesc":
      "Απολαύστε premium μεταφορά με την Mercedes E-Class μας με πολυτελή άνεση και επαγγελματική υπηρεσία.",
    "taxi.luxuryComfort": "Πολυτελής άνεση",
    "taxi.premiumInterior": "Premium εσωτερικό",
    "taxi.professionalService": "Επαγγελματική υπηρεσία",
    "taxi.modernTechnology": "Μοντέρνα τεχνολογία",
    "taxi.mercedesTitle": "Mercedes Ταξί - Επαγγελματική Υπηρεσία",
    "taxi.mercedesDesc": "Επαγγελματική υπηρεσία ταξί Mercedes με πολυτελή άνεση και αξιόπιστη μεταφορά.",
    "taxi.airConditioning": "Κλιματισμός",
    "taxi.comfortableSeating": "Άνετα καθίσματα",
    "taxi.professionalDriver": "Επαγγελματίας οδηγός",
    "taxi.cleanInterior": "Καθαρό εσωτερικό",
    "taxi.modernAmenities": "Μοντέρνες ανέσεις",
    "taxi.suvTitle": "SUV Ταξί",
    "taxi.suvDesc": "Ευρύχωρο SUV ταξί για οικογένειες και ομάδες με επιπλέον αποσκευές.",
    "taxi.extraSpace": "Επιπλέον χώρος",
    "taxi.higherSeating": "Υψηλότερα καθίσματα",
    "taxi.allWeather": "Όλες οι καιρικές συνθήκες",
    "taxi.groupTravel": "Ομαδικά ταξίδια",
    "taxi.bookNow": "Κράτηση Τώρα",
    "taxi.call": "Καλέστε",
    "taxi.clickGallery": "Κάντε κλικ για προβολή γκαλερί",
    "taxi.photos": "φωτογραφίες",

    // Contact Page
    "contact.title": "Επικοινωνήστε μαζί μας",
    "contact.subtitle": "Επικοινωνήστε με το Jet Taxi για όλες τις μεταφορικές σας ανάγκες",
    "contact.backToHome": "Επιστροφή στην Αρχική",
    "contact.methods": "Μέθοδοι Επικοινωνίας",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappDesc": "Στείλτε μας μήνυμα στο WhatsApp για γρήγορη κράτηση και ερωτήσεις",
    "contact.openWhatsapp": "Άνοιγμα WhatsApp",
    "contact.phoneCall": "Τηλεφωνική Κλήση",
    "contact.phoneDesc": "Καλέστε μας απευθείας για άμεση βοήθεια και κρατήσεις",
    "contact.callNow": "Καλέστε Τώρα: 0533 880 68 08",
    "contact.information": "Στοιχεία Επικοινωνίας",
    "contact.phoneNumber": "Αριθμός Τηλεφώνου",
    "contact.available247": "Διαθέσιμο 24/7",
    "contact.location": "Τοποθεσία",
    "contact.cyprus": "Κύπρος",
    "contact.licensePlate": "Πινακίδα: TMZ 432",
    "contact.operatingHours": "Ώρες Λειτουργίας",
    "contact.service247": "Υπηρεσία 24/7",
    "contact.availableEveryDay": "Διαθέσιμο κάθε μέρα του χρόνου",
    "contact.servicesOverview": "Οι Υπηρεσίες μας",
    "contact.vipServices": "VIP Υπηρεσίες (Vito)",
    "contact.vipDesc": "Πολυτελής μεταφορά Mercedes Vito με premium άνεση και χώρο",
    "contact.taxiServices": "Ταξί",
    "contact.taxiDesc": "Άνετη μεταφορά για καθημερινές ανάγκες",
    "contact.viewAllServices": "Προβολή Όλων των Υπηρεσιών",
    "contact.emergencyContact": "Επείγουσα Επικοινωνία",
    "contact.emergencyDesc":
      "Για επείγουσες μεταφορικές ανάγκες ή έκτακτες περιστάσεις, επικοινωνήστε μαζί μας αμέσως:",
    "contact.emergencyCall": "Επείγουσα Κλήση",
    "contact.emergencyWhatsapp": "Επείγον WhatsApp",

    // Footer
    "footer.description":
      "Επαγγελματική και αξιόπιστη υπηρεσία ταξί στην Αμμόχωστο. Διαθέσιμη 24/7 για όλες τις μεταφορικές σας ανάγκες.",
    "footer.quickLinks": "Γρήγοροι Σύνδεσμοι",
    "footer.home": "Αρχική",
    "footer.services": "Υπηρεσίες",
    "footer.contact": "Επικοινωνία",
    "footer.contactUs": "Επικοινωνήστε μαζί μας",
    "footer.copyright": "Jet Taxi. Όλα τα δικαιώματα διατηρούνται. | Σχεδιασμός: Mine Colak",

    // Common
    "common.phone": "0533 880 68 08",
    "common.location": "Ίσκελε, Αμμόχωστος, Κύπρος",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr") // Default to Turkish

  useEffect(() => {
    const savedLanguage = localStorage.getItem("jet-taxi-language") as Language
    if (savedLanguage && ["tr", "en", "ru", "el"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("jet-taxi-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
