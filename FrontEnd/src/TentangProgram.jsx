import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import DetailModal from './components/DetailModal';

export default function TentangProgram() {
  const [programItems, setProgramItems] = useState([]);
  const [kegiatanItems, setKegiatanItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const programRes = await axios.get('http://localhost:5000/api/program');
      setProgramItems(programRes.data);

      const kegiatanRes = await axios.get('http://localhost:5000/api/kegiatan');
      setKegiatanItems(kegiatanRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDetailClick = (item, e) => {
    e.stopPropagation();
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div className={`bg-gray-50 min-h-screen`}>
      <Header title="PROGRAM & KEGIATAN" />
      <div className="container mx-auto px-2 py-8">
        {/* Program Section */}
        <h2 className="text-4xl font-bold text-blue-900 mb-6">Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {programItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 flex flex-col"
            >
              {/* Card */}
              <div className="relative">
                <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="w-full h-40 object-cover" />
              </div>
              <div className="p-6 flex flex-col relative">
                <h3 className="font-bold text-xl text-blue-900 mb-2">{item.name}</h3>
                <span className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</span>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{item.deskripsi || 'No description available.'}</p>
                <button
                  className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer mt-auto"
                  onClick={(e) => handleDetailClick(item, e)}
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Kegiatan Section */}
        <h2 className="text-4xl font-bold text-blue-900 mb-6">Kegiatan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kegiatanItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 flex flex-col"
            >
              {/* Card */}
              <div className="relative">
                <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="w-full h-40 object-cover" />
              </div>
              <div className="p-6 flex flex-col relative">
                <h3 className="font-bold text-xl text-blue-900 mb-2">{item.name}</h3>
                <span className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</span>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{item.deskripsi || 'No description available.'}</p>
                <button
                  className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer mt-auto"
                  onClick={(e) => handleDetailClick(item, e)}
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => {
            setModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}
