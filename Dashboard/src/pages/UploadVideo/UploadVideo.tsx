import React, { useState } from 'react';
import { X, FileText, Calendar, CheckCircle, Upload } from 'lucide-react'; // Add Upload icon import

// Add a typed alias for the form data
type FormDataType = {
  nama: string;
  deskripsi: string;
  videoUrl: string; // Add videoUrl field
};

export default function UploadVideo() {
  const [formData, setFormData] = useState<FormDataType>({
    nama: '',
    deskripsi: '',
    videoUrl: '' // Initialize videoUrl
  });

  // Remove foto, previewFoto states since we're using links
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

  // Fix: type the submit event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validasi
    if (!formData.nama.trim()) {
      alert('Nama Video wajib diisi!');
      return;
    }

    if (!formData.deskripsi.trim()) {
      alert('Deskripsi Video wajib diisi!');
      return;
    }

    if (!formData.videoUrl.trim()) {
      alert('Link Video wajib diisi!');
      return;
    }

    // Validate URL format
    try {
      new URL(formData.videoUrl);
    } catch {
      alert('Format URL tidak valid!');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      console.log('Frontend: Retrieved token:', token);

      if (!token) {
        alert('Anda harus login untuk mengupload video.');
        return;
      }

      const requestBody = {
        judul: formData.nama,
        deskripsi: formData.deskripsi,
        url_video: formData.videoUrl
      };
      console.log('Frontend: Sending request body:', requestBody);

      const response = await fetch('http://localhost:5000/api/berita_video/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Frontend: Response status:', response.status);
      const responseText = await response.text(); // Read as text first
      console.log('Frontend: Raw response text:', responseText);

      let result;
      try {
        result = JSON.parse(responseText); // Try to parse as JSON
      } catch (jsonError) {
        console.error('Frontend: Failed to parse response as JSON:', jsonError);
        throw new Error(`Backend returned non-JSON response: ${responseText}`);
      }

      if (!response.ok) {
        throw new Error(result.error || `Gagal mengupload video. Status: ${response.status}`);
      }

      setSuccessMessage('Video berhasil ditambahkan!');
      
      setTimeout(() => {
        setFormData({
          nama: '',
          deskripsi: '',
          videoUrl: ''
        });
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menambahkan video. Silakan coba lagi.');
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
              <h1 className="text-2xl font-bold text-gray-800">Upload Video</h1>
              <p className="text-gray-600 text-sm">Tambahkan dokumentasi video Diskominfo</p>
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
          
          {/* Nama video */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Nama Video <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              placeholder="Contoh: Sosialisasi Digital Marketing untuk UMKM"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Maksimal 255 karakter</p>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Deskripsi Video <span className="text-red-500">*</span>
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              placeholder="Jelaskan detail video, tujuan, peserta, dan hasil yang dicapai..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Jelaskan video secara lengkap dan detail</p>
          </div>

          {/* Video URL Input - Replace the file upload section */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Link Video <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleInputChange}
              placeholder="Contoh: https://youtube.com/watch?v=..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Masukkan link video dari YouTube, Vimeo, atau platform video lainnya
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
                  Upload Video
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  nama: '',
                  deskripsi: '',
                  videoUrl: ''
                });
                setSuccessMessage('');
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
            <li>• Pastikan nama video jelas dan deskriptif</li>
            <li>• Deskripsi sebaiknya mencakup tujuan dan konten video</li>
            <li>• Pastikan link video dapat diakses secara publik</li>
            <li>• Mendukung link dari YouTube, Vimeo, dan platform video lainnya</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
