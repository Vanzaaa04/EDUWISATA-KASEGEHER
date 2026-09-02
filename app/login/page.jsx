'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, EnvelopeSimple, Lock, SpinnerGap, Warning, CheckCircle, ArrowLeft } from '@phosphor-icons/react';
import getSupabaseClient from '@/lib/supabaseClient';
import './login.css';

/**
 * Halaman Login Admin.
 * Hanya email yang terdaftar di tabel admin_users yang bisa masuk.
 * Setelah login, redirect ke /data-pengunjung.
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Handle submit form login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!email.trim()) {
      setStatus('error');
      setErrorMsg('Email wajib diisi.');
      return;
    }
    if (!password.trim()) {
      setStatus('error');
      setErrorMsg('Password wajib diisi.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      // Login langsung menggunakan Supabase Auth di client
      const supabaseClient = getSupabaseClient();
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setStatus('error');
        setErrorMsg('Email atau password salah.');
        return;
      }

      // Cek apakah user adalah admin melalui API
      const checkRes = await fetch('/api/auth/check', {
        headers: {
          'Authorization': `Bearer ${data.session.access_token}`,
        },
      });
      const checkData = await checkRes.json();

      if (!checkData.isAdmin) {
        // Logout jika bukan admin
        await getSupabaseClient().auth.signOut();
        setStatus('error');
        setErrorMsg('Akun Anda tidak memiliki akses admin.');
        return;
      }

      // Simpan token di localStorage
      localStorage.setItem('admin_token', data.session.access_token);
      localStorage.setItem('admin_email', data.user.email);

      setStatus('success');

      // Redirect ke halaman data pengunjung setelah 1 detik
      setTimeout(() => {
        router.push('/data-pengunjung');
      }, 1000);

    } catch (err) {
      setStatus('error');
      setErrorMsg('Terjadi kesalahan jaringan. Pastikan koneksi Anda stabil.');
    }
  };

  return (
    <section className="login-hero">
      <div className="login-card" data-aos="zoom-in">
        {/* Header */}
        <div className="login-card__header">
          <div className="login-card__icon">
            <ShieldCheck size={32} weight="duotone" />
          </div>
          <h1 className="login-card__title">Login Admin</h1>
          <p className="login-card__subtitle">
            Masuk untuk mengelola data pengunjung
          </p>
        </div>

        {/* Pesan error */}
        {status === 'error' && (
          <div className="login-form__error">
            <Warning size={18} weight="bold" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Pesan sukses */}
        {status === 'success' && (
          <div className="login-form__success">
            <CheckCircle size={18} weight="bold" />
            <span>Login berhasil! Mengalihkan...</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="login-form__group">
            <label htmlFor="login-email" className="login-form__label">
              <EnvelopeSimple size={16} weight="duotone" />
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              className="login-form__input"
              required
              disabled={status === 'loading' || status === 'success'}
            />
          </div>

          {/* Password */}
          <div className="login-form__group">
            <label htmlFor="login-password" className="login-form__label">
              <Lock size={16} weight="duotone" />
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="login-form__input"
              required
              disabled={status === 'loading' || status === 'success'}
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="btn-primary login-form__btn"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? (
              <>
                <SpinnerGap size={20} weight="bold" className="login-form__spinner" />
                Memproses...
              </>
            ) : (
              <>
                <ShieldCheck size={20} weight="bold" />
                Masuk
              </>
            )}
          </button>
        </form>

        {/* Link kembali */}
        <Link href="/" className="login-card__back">
          <ArrowLeft size={14} weight="bold" style={{ verticalAlign: 'middle', marginRight: '4px' }} />
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
