// app/lib/utils/resolveSekretarisDewanTable.ts
// import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
// import { AnggotaDewan } from "@/types/anggota-dewan";
// import { SekretarisDewanRow } from "@/types/view/sekretatis-dewan-row";
// import { formatDate } from "./formatDate";
// export function resolveSekretarisDewanTable(
//   sekwan: SekretarisDewanProfile[],
//   anggota: AnggotaDewan[],
// ): SekretarisDewanRow[] {
//   return sekwan.map((s) => {
//     const anggotaDewan = anggota.find((a) => a.userId === s.userId);

//     return {
//       id: s.id,
//       name: anggotaDewan?.name ?? "—",
//       jabatan: s.jabatan,
//       periode: `${formatDate(s.periodeStart)} – ${formatDate(s.periodeEnd)}`,
//       isActive: s.isActive,
//       sekretaris: s,
//     };
//   });
// }

// lib/utils/sekretaris-dewan/resolveSekwan.ts
// lib/utils/sekretaris-dewan/resolveSekwan.ts
// import { AnggotaDewan } from "@/types/anggota-dewan";
// import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
// import { SekretarisDewanRow } from "@/types/view/sekretatis-dewan-row";
// import { format } from "date-fns";

// export function resolveSekwanTable(
//   profiles: SekretarisDewanProfile[],
//   members: AnggotaDewan[]
// ): SekretarisDewanRow[] {

//   return profiles.map((p) => {
//     // Cari data orangnya di master anggota
//     const person = members.find((m) => m.userId === p.userId);

//     return {
//       id: p.id,
//       name: person?.name ?? "Tidak Diketahui",
//       jabatan: p.jabatan,
//       // Logic formatting dipusatkan di sini
//       // periode: `${format(new Date(p.periodeStart), "yyyy")} - ${format(new Date(p.periodeEnd), "yyyy")}`,
//       periode: `${format(p.periodeStart, "yyyy")} - ${format(
//         p.periodeEnd,
//         "yyyy",
//       )}`,
//       isActive: p.isActive,
//       sekretaris: p, // Simpan raw data jika perlu
//     };
//   });
// }

// utils/sekretaris-dewan-resolver.ts
import { AnggotaDewan } from "@/types/anggota-dewan";
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
import { SekretarisDewanRow } from "@/features/sekretaris-dewan/views/sekretatis-dewan-row";
import { format } from "date-fns";

export function resolveSekretarisDewan(
  profiles: SekretarisDewanProfile[],
  anggota: AnggotaDewan[],
): SekretarisDewanRow[] {
  return profiles.map((profile) => {
    const person = anggota.find((a) => a.userId === profile.userId);
    return {
      id: profile.id,
      userId: profile.userId,
      name: person?.name || "Tidak Diketahui",
      jabatan: profile.jabatan,
      periode: `${format(profile.periodeStart, "yyyy")} - ${format(profile.periodeEnd, "yyyy")}`,
      isActive: profile.isActive,
      anggota: person!, // asumsikan selalu ada, atau bisa optional
      sekretaris: profile,
      
      _meta: {
        originalProfile: profile,
        originalAnggota: person!,
      },
    
    };
  });
}
