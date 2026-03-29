import React, { useState, useEffect } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

// Add a typed alias for the form data
type FormDataType = {
  judul: string;
  isi: string;
};

export default function UploadArtikel() {
  const { token, fetchUserData } = useAuth(); // Use the useAuth hook to get the token and fetchUserData
  const [formData, setFormData] = useState<FormDataType>({
    judul: '',
    isi: ''
  });

  useEffect(() => {
    fetchUserData(); // Ensure user data is fetched and token is validated on component mount
  }, [fetchUserData]);

  // foto bisa null atau File
  const [foto, setFoto] = useState<File | null>(null);
  const [previewFoto, setPreviewFoto] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Fix: explicitly type event and safely index formData
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormDataType;
    setFormData(prev => ({
      ...prev,
      [key]: value
    } as FormDataType)); // <-- cast to satisfy TS when using computed key
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar!');
        return;
      }

      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB!');
        return;
      }

      setFoto(file);

      // Buat preview
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result bisa null atau ArrayBuffer, pastikan string sebelum set
        if (typeof reader.result === 'string') {
          setPreviewFoto(reader.result);
        } else {
          setPreviewFoto('');
        }
      };
      reader.readAsDataURL(file);
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
      alert('Judul Artikel wajib diisi!');
      return;
    }

    if (!formData.isi.trim()) {
      alert('Isi artikel wajib diisi!');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('judul', formData.judul);
      submitData.append('isi', formData.isi);
      
      if (foto) {
        submitData.append('gambar', foto); // Changed 'foto' to 'gambar' to match backend
      }

      const response = await fetch('http://localhost:5000/api/berita/upload', { // Assuming backend runs on port 5000
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data' is automatically set by FormData
          'Authorization': `Bearer ${token}` // Use token from AuthContext
        },
        body: submitData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengupload artikel.');
      }

      // Tampilkan success message
      setSuccessMessage('Artikel berhasil diupload!');
      
      // Reset form setelah 2 detik
      setTimeout(() => {
        setFormData({
          judul: '',
          isi: ''
        });
        setFoto(null);
        setPreviewFoto('');
        setSuccessMessage('');
      }, 2000);

    } catch (error: any) {
      console.error('Error:', error);
      alert(`Gagal mengupload artikel. ${error.message || 'Silakan coba lagi.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <h1 className="text-2xl font-bold text-gray-800">Upload Artikel</h1>
              <p className="text-gray-600 text-sm">Tambahkan dokumentasi artikel Diskominfo</p>
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
          
          {/* Judul artikel */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Judul Artikel <span className="text-red-500">*</span>
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

          {/* Isi */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Isi Artikel <span className="text-red-500">*</span>
            </label>
            <textarea
              name="isi"
              value={formData.isi}
              onChange={handleInputChange}
              placeholder="Jelaskan detail artikel, tujuan, peserta, dan hasil yang dicapai..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Jelaskan artikel secara lengkap dan detail</p>
          </div>

          {/* Upload Foto */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4 text-blue-500" />
                Foto <span className="text-gray-400">(Opsional)</span>
            </label>
            
            {!previewFoto ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-all cursor-pointer bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoUpload}
                  className="hidden"
                  id="foto-upload"
                />
                <label htmlFor="foto-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium mb-1">Klik untuk upload foto</p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 5MB)</p>
                </label>
              </div>
            ) : (
              <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                <img 
                  src={previewFoto} 
                  alt="Preview" 
                  className="w-full h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={removeFoto}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                  {foto?.name}
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Foto akan disimpan dengan nama file unik di server
            </p>
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
                  Upload Artikel
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ judul: '', isi: '' });
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
            <li>• Pastikan judul artikel jelas dan deskriptif</li>
            <li>• Isi sebaiknya mencakup tujuan, peserta, dan hasil artikel</li>
            <li>• Foto akan otomatis di-resize jika terlalu besar</li>
            <li>• Data akan tersimpan dengan timestamp otomatis</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
