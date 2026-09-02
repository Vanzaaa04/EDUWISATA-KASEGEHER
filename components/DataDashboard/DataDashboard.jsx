'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ShieldCheck, SignOut, Plus, ChartBar, Info } from '@phosphor-icons/react';
import DataTable from '@/components/DataTable/DataTable';
import TableFormModal from '@/components/TableFormModal/TableFormModal';
import RowFormModal from '@/components/RowFormModal/RowFormModal';
import './DataDashboard.css';

/**
 * DataDashboard — Komponen utama dashboard data pengunjung.
 * Mengambil data tabel dari API, menampilkan tabel-tabel,
 * dan menyediakan fitur CRUD untuk admin.
 */
export default function DataDashboard() {
  // State data
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  // State admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminToken, setAdminToken] = useState('');

  // State modal tabel
  const [showTableModal, setShowTableModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  // State modal baris
  const [showRowModal, setShowRowModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [activeTable, setActiveTable] = useState(null); // tabel yang sedang ditambah/edit barisnya

  // Cek status admin saat pertama kali load
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const email = localStorage.getItem('admin_email');

    if (token && email) {
      // Verifikasi token masih valid
      fetch('/api/auth/check', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isAdmin) {
            setIsAdmin(true);
            setAdminEmail(email);
            setAdminToken(token);
          } else {
            // Token kadaluarsa, bersihkan
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_email');
          }
        })
        .catch(() => {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_email');
        });
    }
  }, []);

  // Fetch semua tabel data
  const fetchTables = useCallback(async () => {
    try {
      const res = await fetch('/api/data-tables');
      const data = await res.json();
      if (data.success) {
        setTables(data.tables || []);
      }
    } catch (err) {
      console.error('[DataDashboard] Gagal fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  // === HANDLER: Tabel ===

  // Buat tabel baru
  const handleCreateTable = async (title, columns) => {
    const res = await fetch('/api/data-tables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ title, columns }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    // Tambahkan tabel baru ke state
    setTables((prev) => [...prev, data.table]);
  };

  // Edit tabel
  const handleEditTable = async (title, columns) => {
    if (!editingTable) return;

    const res = await fetch(`/api/data-tables/${editingTable.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ title, columns }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    // Update tabel di state
    setTables((prev) =>
      prev.map((t) =>
        t.id === editingTable.id ? { ...t, title, columns } : t
      )
    );
  };

  // Hapus tabel
  const handleDeleteTable = async (tableId) => {
    const res = await fetch(`/api/data-tables/${tableId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    });

    const data = await res.json();
    if (!data.success) {
      console.error('Gagal hapus tabel:', data.message);
      return;
    }

    // Hapus tabel dari state
    setTables((prev) => prev.filter((t) => t.id !== tableId));
  };

  // === HANDLER: Baris ===

  // Tambah baris baru
  const handleCreateRow = async (values) => {
    if (!activeTable) return;

    const res = await fetch('/api/data-rows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ table_id: activeTable.id, values }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    // Tambahkan baris ke tabel yang sesuai di state
    setTables((prev) =>
      prev.map((t) =>
        t.id === activeTable.id
          ? { ...t, rows: [...(t.rows || []), data.row] }
          : t
      )
    );
  };

  // Edit baris
  const handleEditRow = async (values) => {
    if (!editingRow) return;

    const res = await fetch(`/api/data-rows/${editingRow.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ values }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    // Update baris di state
    setTables((prev) =>
      prev.map((t) => ({
        ...t,
        rows: (t.rows || []).map((r) =>
          r.id === editingRow.id ? { ...r, values } : r
        ),
      }))
    );
  };

  // Hapus baris
  const handleDeleteRow = async (rowId) => {
    const res = await fetch(`/api/data-rows/${rowId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    });

    const data = await res.json();
    if (!data.success) {
      console.error('Gagal hapus baris:', data.message);
      return;
    }

    // Hapus baris dari state
    setTables((prev) =>
      prev.map((t) => ({
        ...t,
        rows: (t.rows || []).filter((r) => r.id !== rowId),
      }))
    );
  };

  // === HANDLER: Logout ===
  const handleLogout = async () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    setIsAdmin(false);
    setAdminEmail('');
    setAdminToken('');
  };

  // === RENDER ===

  // Loading skeleton
  if (loading) {
    return (
      <div className="data-dashboard__loading">
        <div className="data-dashboard__skeleton" />
        <div className="data-dashboard__skeleton" style={{ height: '150px' }} />
      </div>
    );
  }

  return (
    <div className="data-dashboard">
      {/* Toolbar admin (hanya tampil jika sudah login) */}
      {isAdmin && (
        <div className="data-dashboard__toolbar" data-aos="fade-down">
          <div className="data-dashboard__toolbar-info">
            <ShieldCheck size={20} weight="duotone" className="data-dashboard__toolbar-info-icon" />
            <span>Login sebagai <strong>{adminEmail}</strong></span>
          </div>
          <div className="data-dashboard__toolbar-actions">
            <button
              className="btn-primary"
              onClick={() => {
                setEditingTable(null);
                setShowTableModal(true);
              }}
              style={{ padding: '8px 16px', fontSize: '0.875rem' }}
            >
              <Plus size={16} weight="bold" />
              Buat Tabel Baru
            </button>
            <button
              className="data-dashboard__logout-btn"
              onClick={handleLogout}
            >
              <SignOut size={14} weight="bold" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Daftar tabel */}
      {tables.length > 0 ? (
        <div className="data-dashboard__tables">
          {tables.map((table) => (
            <DataTable
              key={table.id}
              table={table}
              isAdmin={isAdmin}
              onEditTable={(t) => {
                setEditingTable(t);
                setShowTableModal(true);
              }}
              onDeleteTable={handleDeleteTable}
              onAddRow={(t) => {
                setActiveTable(t);
                setEditingRow(null);
                setShowRowModal(true);
              }}
              onEditRow={(t, row) => {
                setActiveTable(t);
                setEditingRow(row);
                setShowRowModal(true);
              }}
              onDeleteRow={handleDeleteRow}
            />
          ))}
        </div>
      ) : (
        <div className="data-dashboard__empty" data-aos="zoom-in">
          <ChartBar size={64} weight="duotone" className="data-dashboard__empty-icon" />
          <h3 className="data-dashboard__empty-title">Belum Ada Data</h3>
          <p className="data-dashboard__empty-desc">
            {isAdmin
              ? 'Klik tombol "Buat Tabel Baru" di atas untuk mulai menambahkan data pengunjung.'
              : 'Data pengunjung belum tersedia. Silakan kunjungi halaman ini lagi nanti.'}
          </p>
        </div>
      )}

      {/* Modal: Buat/Edit Tabel */}
      <TableFormModal
        isOpen={showTableModal}
        onClose={() => {
          setShowTableModal(false);
          setEditingTable(null);
        }}
        onSave={editingTable ? handleEditTable : handleCreateTable}
        editTable={editingTable}
      />

      {/* Modal: Tambah/Edit Baris */}
      <RowFormModal
        isOpen={showRowModal}
        onClose={() => {
          setShowRowModal(false);
          setEditingRow(null);
          setActiveTable(null);
        }}
        onSave={editingRow ? handleEditRow : handleCreateRow}
        columns={activeTable?.columns || []}
        editRow={editingRow}
        tableName={activeTable?.title || ''}
      />
    </div>
  );
}
