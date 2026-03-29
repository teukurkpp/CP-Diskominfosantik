import axios from 'axios';

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    if (!token) throw new Error('No Token');

    const formData = new FormData();
    formData.append('namaDokumen', namaDokumen);
    formData.append('kategoriDokumen', kategoriDokumen);
    formData.append('file', file);

    const response = await axios.post('http://localhost:5000/api/dokumen/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Kirim cookie jika diperlukan
    });

    console.log('Upload berhasil:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};