import React, { useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

// Add a typed alias for the form data
type FormDataType = {
  judul: string;
  kategori: string;
};

export default function UploadDokumen() {
  const { token } = useAuth(); // Use the token from AuthContext
  const [formData, setFormData] = useState<FormDataType>({
    judul: '',
    kategori: ''
  });

  // foto bisa null atau File
  const [foto, setFoto] = useState<File | null>(null);
  const [previewFoto, setPreviewFoto] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Update handleInputChange to handle select elements
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      // Validasi tipe file dokumen
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ];
      if (!allowedTypes.includes(file.type)) {
        alert('File harus berupa dokumen PDF, DOC, DOCX, XLS, XLSX, PPT, atau PPTX!');
        return;
      }

      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB!');
        return;
      }

      setFoto(file);

      // Buat preview nama file saja (tidak bisa preview dokumen)
      setPreviewFoto(file.name);
    }
  };

  const removeFoto = () => {
    setFoto(null);
    setPreviewFoto('');
  };

  // Fix: type the submit event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validasi
    if (!formData.judul.trim()) {
      alert('Nama dokumen wajib diisi!');
      return;
    }

    if (!formData.kategori) {
      alert('Kategori dokumen wajib dipilih!');
      return;
    }

      setIsSubmitting(true);

      try {
        // Buat FormData untuk upload file
        const submitData = new FormData();
        submitData.append('judul', formData.judul);
        submitData.append('kategori', formData.kategori);
        
        if (foto) {
          submitData.append('file', foto); // Change 'foto' to 'file' to match backend multer config
        }

        if (!token) {
          throw new Error('No authentication token found.');
        }

        const response = await fetch('http://localhost:5000/api/dokumen/upload', {
          method: 'POST',
          body: submitData,
          headers: {
            'Authorization': `Bearer ${token}`, // Add Authorization header
          },
          credentials: 'include' // Send cookies for authentication
        });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengupload dokumen');
      }

      const result = await response.json();
      console.log('Upload successful:', result);

      console.log('Data yang akan disubmit:');
      console.log('- Judul:', formData.judul);
      console.log('- Kategori:', formData.kategori);
      console.log('- File:', foto?.name || 'Tidak ada file');

      // Tampilkan success message
      setSuccessMessage('Dokumen berhasil diupload!');
      
      // Reset form setelah 2 detik
      setTimeout(() => {
        setFormData({
          judul: '',
          kategori: ''
        });
        setFoto(null);
        setPreviewFoto('');
        setSuccessMessage('');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('Gagal mengupload dokumen. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add kategori options
  const kategoriOptions = [
    { value: 'regulasi', label: 'Regulasi' },
    { value: 'laporan', label: 'Laporan' },
    { value: 'data-statistik', label: 'Data & Statistik' }
  ];

  return (
    <div className="min-h-screen to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Upload Dokumen</h1>
              <p className="text-gray-600 text-sm">Tambahkan dokumentasi dokumen Diskominfo</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
          
          {/* Nama dokumen */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Nama Dokumen <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleInputChange}
              placeholder="Contoh: Sosialisasi Digital Marketing untuk UMKM"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Maksimal 255 karakter</p>
          </div>

          {/* Upload Dokumen */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Dokumen <span className="text-red-500">*</span>
            </label>
            {!previewFoto ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-all cursor-pointer bg-gray-50">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  onChange={handleFotoUpload}
                  className="hidden"
                  id="dokumen-upload"
                />
                <label htmlFor="dokumen-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium mb-1">Klik untuk upload dokumen</p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX (Max. 5MB)</p>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden p-6 flex items-center">
                  <FileText className="w-8 h-8 text-blue-500 mr-4" />
                  <span className="text-gray-700 font-medium">{previewFoto}</span>
                  <button
                    type="button"
                    onClick={removeFoto}
                    className="ml-auto bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Kategori Dokumen - Shown only after file upload */}
                <div className="mt-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    Kategori Dokumen <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {kategoriOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Pilih kategori yang sesuai dengan jenis dokumen
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Mengupload...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Dokumen
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ judul: '', kategori: '' });
                setFoto(null);
                setPreviewFoto('');
              }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Reset
            </button>
          </div>

        </form>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Informasi
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Pastikan nama dokumen jelas dan deskriptif</li>
            <li>• Pilih kategori yang sesuai dengan jenis dokumen</li>
            <li>• Hanya dokumen PDF, DOC, DOCX, XLS, XLSX, PPT, atau PPTX yang dapat diupload</li>
            <li>• Ukuran maksimal dokumen 5MB</li>
            <li>• Data akan tersimpan dengan timestamp otomatis</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
