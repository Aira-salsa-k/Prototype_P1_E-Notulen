
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { mockMeetings } from "@/mocks/meeting";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

// Reuse parts of Notulen components but read-only? 
// Or build a specifically optimized "Live View" component.
// "anggota dewan dapat memantau dengan realtime ... KANISIUS KANGO ... - point 1"

export default function LivePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [meeting, setMeeting] = useState<any>(null);
  const resolvedParams = use(params);
  
  const { sections, points, actions } = useNotulenStore();

  useEffect(() => {
    const found = mockMeetings.find(m => m.id === resolvedParams.id);
    setMeeting(found);
    
    // Initialize store if needed (in real app, user would subscribe to websocket here)
    if (found) {
        actions.initializeMeeting(found.id);
    }
  }, [resolvedParams.id, actions]);

  if (!meeting) return <div>Memuat data rapat...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4">
       {/* HEADER */}
       <div className="flex flex-col gap-4 border-b pb-6">
           <ButtonBack router={router} />
           <div>
               <div className="flex items-center gap-3 mb-2">
                   <Chip color="danger" variant="dot" className="pl-2">LIVE PROGRESS</Chip>
                   <span className="text-sm text-gray-500">{meeting.date}</span>
               </div>
               <h1 className="text-3xl font-bold text-gray-900 leading-tight">{meeting.title}</h1>
               <p className="text-lg text-gray-600 mt-2">{meeting.agenda}</p>
           </div>
       </div>

       {/* CONTENT STREAM */}
       <div className="space-y-8">
           {sections.length === 0 && (
               <div className="text-center py-12 text-gray-400 italic">
                   Belum ada notulensi yang dimulai.
               </div>
           )}
           
           {sections.map(section => (
               <div key={section.id} className="relative pl-8 border-l-4 border-indigo-100">
                   {/* Avatar/Icon placeholder */}
                   <div className="absolute -left-[1.3rem] top-0 bg-white border-4 border-indigo-50 rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold text-indigo-700 shadow-sm">
                       {section.order}
                   </div>
                   
                   <div className="mb-4">
                       <h3 className="text-lg font-bold text-gray-900 uppercase">
                           {section.displayFormat.split("®")[0]?.trim()}
                       </h3>
                       <p className="text-sm font-semibold text-indigo-600">
                           {section.displayFormat.split("®")[1]?.trim()}
                       </p>
                   </div>
                   
                   <ul className="space-y-3">
                       {points[section.id]?.map((point) => (
                           <li key={point.id} className="text-lg text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                               {point.content || <span className="text-gray-400 italic">Mengetik...</span>}
                           </li>
                       ))}
                       {points[section.id]?.length === 0 && (
                           <li className="text-gray-400 italic text-sm">Menunggu poin pembicaraan...</li>
                       )}
                   </ul>
               </div>
           ))}
       </div>
    </div>
  );
}

function ButtonBack({ router }: { router: any }) {
    return (
        <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-gray-900 w-fit">
              <ArrowLeftIcon className="w-5 h-5 mr-2" /> Kembali ke Dashboard
       </button>
    )
}
