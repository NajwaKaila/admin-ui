describe('Skenario E2E - Login dan Akses Dashboard Overview', () => {
  
  beforeEach(() => {
    // Jalankan pembersihan localStorage agar status login sebelumnya tidak tersisa
    cy.clearLocalStorage();
    
    // 1. User membuka browser dan mengakses halaman login
    cy.visit('http://localhost:5173/login'); // Sesuaikan port dengan local Vite Anda
  });

  it('Harus berhasil login dan menampilkan seluruh komponen dashboard dengan benar', () => {
    // 2. Memastikan elemen form login termuat di layar
    cy.get('form').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');

    // 3. User memasukkan kredensial email dan password yang valid
    cy.get('input[type="email"]').type('hello@example.com');
    cy.get('input[type="password"]').type('password123'); // Sesuaikan password dummy akun Anda

    // 4. User menekan tombol login
    cy.get('button[type="submit"]').click();

    // 5. Memastikan notifikasi sukses (Snackbar) muncul di layar
    // Menggunakan penanda kata 'Login berhasil' sesuai implementasi Snackbar Anda sebelumnya
    cy.contains('Login berhasil').should('be.visible');

    // 6. Sistem mengalihkan halaman ke root dashboard (/)
    cy.url().should('eq', 'http://localhost:5173/');

    // 7. Memastikan token otentikasi tersimpan di localStorage aplikasi
    cy.window().then((window) => {
      expect(window.localStorage.getItem('token')).to.not.be.null;
    });

    // 8. Memastikan komponen utama Dashboard Sidebar & Content termuat sempurna
    cy.get('aside').should('be.visible'); // Sidebar menu
    cy.get('header').should('be.visible'); // Header atas tempat nama profil

    // 9. Memastikan teks atau komponen spesifik di Dashboard Overview muncul
    // Memastikan judul widget "Total Balance" dan "Recent Transactions" terlihat di halaman utama
    cy.contains('Total Balance').should('be.visible');
    cy.contains('Recent Transactions').should('be.visible');
    cy.contains('Goals').should('be.visible');
  });
});