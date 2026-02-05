
"use client";

import { Switch } from "@heroui/switch";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { useState } from "react";
import { Button } from "@heroui/button";

export default function AccessControlPanel() {
  // Mock State
  const [globalAccess, setGlobalAccess] = useState(true);
  const [notulisAccess, setNotulisAccess] = useState(true);
  
  // Mock Meeting Specific Access
  const [meetings, setMeetings] = useState([
     { id: "1", title: "RAPAT PARIPURNA V", access: true },
     { id: "2", title: "RAPAT KOMISI I", access: false },
  ]);

  const toggleMeetingAccess = (id: string) => {
      setMeetings(prev => prev.map(m => m.id === id ? { ...m, access: !m.access } : m));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Global Controls */}
      <Card className="border border-danger-100">
        <CardHeader className="flex flex-col items-start px-6 pt-6">
             <h3 className="text-lg font-bold text-gray-900">Kontrol Akses Global</h3>
             <p className="text-sm text-gray-500">Pengaturan darurat untuk mematikan/menyalakan akses sistem.</p>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-6 space-y-6">
            <div className="flex justify-between items-center">
                 <div>
                    <p className="font-semibold text-gray-800">Akses Seluruh Sistem</p>
                    <p className="text-xs text-gray-500">Jika dimatikan, seluruh Anggota Dewan & Notulis tidak bisa login/akses.</p>
                 </div>
                 <Switch 
                    isSelected={globalAccess} 
                    onValueChange={setGlobalAccess} 
                    color="success"
                 >
                    {globalAccess ? "Aktif" : "Non-Aktif"}
                 </Switch>
            </div>
            
            <Divider />
            
             <div className="flex justify-between items-center">
                 <div>
                    <p className="font-semibold text-gray-800">Akses Notulis</p>
                    <p className="text-xs text-gray-500">Kontrol spesifik untuk login Notulis.</p>
                 </div>
                 <Switch 
                    isSelected={notulisAccess} 
                    onValueChange={setNotulisAccess} 
                    color="primary"
                 >
                    {notulisAccess ? "Aktif" : "Non-Aktif"}
                 </Switch>
            </div>
        </CardBody>
      </Card>

      {/* Per Meeting Controls */}
      <Card>
         <CardHeader className="px-6 pt-6">
             <h3 className="text-lg font-bold text-gray-900">Akses Per Rapat</h3>
         </CardHeader>
         <CardBody className="px-6 py-4">
             <div className="space-y-4">
                 {meetings.map((meeting) => (
                     <div key={meeting.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                         <span className="font-medium text-gray-700">{meeting.title}</span>
                         <Switch 
                            size="sm"
                            isSelected={meeting.access} 
                            onValueChange={() => toggleMeetingAccess(meeting.id)}
                         >
                            {meeting.access ? "Buka" : "Tutup"}
                         </Switch>
                     </div>
                 ))}
             </div>
         </CardBody>
      </Card>
      
      <div className="flex justify-end">
          <Button color="primary">Simpan Perubahan</Button>
      </div>
    </div>
  );
}
