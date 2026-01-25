// // app/components/dashboard/MeetingTypes.tsx
// import { Card, CardBody } from "@heroui/card";
// import { Chip } from "@heroui/chip";
// import { MeetingType } from "@/types/meeting";

// import {Button} from "@heroui/button"
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@heroui/popover";

// const meetingTypes: MeetingType[] = [
//   {
//     id: "1",
//     name: "Banggar",
//     description: "Rapat pembahasan anggaran",
//     color: "blue",
//   },
//   {
//     id: "2",
//     name: "Pleno",
//     description: "Rapat paripurna",
//     color: "green",
//   },
//   {
//     id: "3",
//     name: "Barnus",
//     description: "Rapat badan musyawarah",
//     color: "purple",
//   },
//   {
//     id: "4",
//     name: "Paripurna",
//     description: "Rapat paripurna",
//     color: "yellow",
//   },
//   {
//     id: "5",
//     name: "Komisi I",
//     description: "Rapat komisi I",
//     color: "red",
//   },
//   {
//     id: "6",
//     name: "Komisi II",
//     description: "Rapat komisi II",
//     color: "blue",
//   },
//   {
//     id: "7",
//     name: "Komisi III",
//     description: "Rapat komisi III",

//     color: "green",
//   },
//   {
//     id: "8",
//     name: "Komisi IV",
//     description: "Rapat komisi IV",

//     color: "purple",
//   },
// ];

// export default function MeetingTypes() {
//   return (
//     <div className="mb-8">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-gray-900">
//           Jenis Rapat yang telah terdaftar
//         </h2>
//       </div>

//       <Card className="border border-gray-200 shadow-sm mb-8">
//         <CardBody className="p-6">
//           <div className="flex flex-wrap gap-2">
//             {meetingTypes.map((rapat) => (
//               <Chip
//                 key={rapat.id}
//                 className=" bg-amber-500/30 border-2 border-amber-700/10 text-amber-950"
//               >
//                 {rapat.name}
//               </Chip>
//             ))}
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

// // Add MapPinIcon import at the top of the file
// import { MapPinIcon } from "@heroicons/react/24/outline";

import { mockMeetingCategories } from "@/mocks/meeting-category";
import { Card, CardBody } from "@heroui/card";
import { MeetingTypeBadge } from "@/components/ui/badges/meeting-type-badge";
export default function MeetingTypes() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Jenis Rapat Terdaftar
        </h2>
      </div>

      <Card className="border border-gray-200 shadow-sm mb-8">
        <CardBody className="p-6">
          <div className="flex flex-wrap gap-2">
            {mockMeetingCategories.map((item) => (
              <MeetingTypeBadge key={item.id} type={item} size="md" />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
