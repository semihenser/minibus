# İBB Minibüs Hat ve Plaka Yönetim Sistemi

Bu proje, İzmir Büyükşehir Belediyesi Ulaşım Dairesi Başkanlığı için tasarlanmış **Minibüs Hat ve Plaka Tanımlama Modülü**'nün ön yüz (frontend) prototipidir.

## 🎯 Özellikler

Uygulama aşağıdaki temel işlevleri içerir:

1.  **Dashboard (Kontrol Paneli):**
    *   Mevcut hatların listelenmesi.
    *   Hat adı ve durumuna (Aktif/Pasif) göre filtreleme.
    *   Hatlara ait özet bilgilerin (Güzergah sayısı, Araç sayısı) görüntülenmesi.

2.  **Hat Yönetimi:**
    *   **Yeni Hat Ekleme:** Güzergah bilgileri ve UKOME kararı ile yeni hat oluşturma.
    *   **Hat Düzenleme:** Mevcut hat bilgilerinde düzeltme yapma (Correction).
    *   **Hat Revize Etme:** Yeni bir UKOME kararı ile hattı güncelleme ve eski halini tarihçeye kaydetme.
    *   **Görüntüleme:** Hattın güncel durumunu ve tüm geçmiş UKOME kararlarını izleme.

3.  **Plaka İşlemleri:**
    *   Plaka sorgulama.
    *   Plakanın mevcut hattını ve tarihçesini görüntüleme.
    *   Plakayı bir hatta ekleme veya hat değişikliği yapma.

## 🛠 Teknolojiler

Bu proje aşağıdaki modern web teknolojileri kullanılarak geliştirilmiştir:

*   **React:** Kullanıcı arayüzü kütüphanesi.
*   **TypeScript:** Tip güvenliği ve geliştirme kolaylığı için.
*   **Tailwind CSS:** Hızlı ve esnek stillendirme için.
*   **Lucide React:** İkon seti.

## 🚀 Kurulum ve Çalıştırma

Bu proje modern tarayıcıların ES Module desteği sayesinde derleme (build) işlemine gerek kalmadan doğrudan çalışabilir veya basit bir statik sunucu ile yayınlanabilir.

1.  Repoyu klonlayın.
2.  Klasör dizininde bir terminal açın.
3.  Eğer yerel geliştirme ortamındaysanız `npm install` ve `npm start` (veya `vite` vb.) komutlarını kullanabilirsiniz.
4.  Alternatif olarak `index.html` dosyasını bir canlı sunucu (Live Server) eklentisi ile tarayıcıda açabilirsiniz.

## 📂 Proje Yapısı

*   `App.tsx`: Ana uygulama mantığı ve (Simüle edilmiş) Veri Yönetimi.
*   `components/`: Uygulama parçacıkları (Header, Dashboard, Formlar vb.).
*   `types.ts`: TypeScript veri modelleri ve arayüz tanımları.

---
*Not: Bu bir ön yüz prototipidir. Veriler tarayıcı belleğinde (state) tutulmaktadır ve sayfa yenilendiğinde sıfırlanır.*