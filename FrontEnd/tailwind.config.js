import React, { useEffect } from 'react'
import Header from './components/Header'
import EmployeeCard from './components/EmployeeCard'

export default function TentangPegawai() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Data struktur pegawai
  const employeeStructure = [
    [{ name: 'Nama Pegawai', position: 'Kepala Dinas' }],
    [{ name: 'Nama Pegawai', position: 'Sekretaris' }],
    [
      { name: 'Nama Pegawai', position: 'Kepala Bidang' },
      { name: 'Nama Pegawai', position: 'Kepala Bidang' },
      { name: 'Nama Pegawai', position: 'Kepala Bidang' },
    ],
    [
      { name: 'Nama Pegawai', position: 'Kepala Seksi' },
      { name: 'Nama Pegawai', position: 'Kepala Seksi' },
      { name: 'Nama Pegawai', position: 'Kepala Seksi' },
      { name: 'Nama Pegawai', position: 'Kepala Seksi' },
    ],
    [
      { name: 'Nama Pegawai', position: 'Staff' },
      { name: 'Nama Pegawai', position: 'Staff' },
      { name: 'Nama Pegawai', position: 'Staff' },
      { name: 'Nama Pegawai', position: 'Staff' },
      { name: 'Nama Pegawai', position: 'Staff' },
      { name: 'Nama Pegawai', position: 'Staff' },
      { name: 'Nama Pegawai', position: 'Staff' },
    ],
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="PROFIL PEGAWAI" imageUrl="/path-to-your-image.jpg" />

      <div className="container mx-auto py-16 px-4">
        <div className="flex flex-col items-center gap-16">
          {employeeStructure.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-8 flex-wrap"
            >
              {row.map((employee, empIndex) => (
                <EmployeeCard
                  key={`${rowIndex}-${empIndex}`}
                  name={employee.name}
                  position={employee.position}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}