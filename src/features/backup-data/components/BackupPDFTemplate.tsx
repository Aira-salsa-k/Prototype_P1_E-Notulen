import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Table, TR, TD } from "@ag-media/react-pdf-table";
import {
  formatTanggalID,
  formatTanggalTanpaHari,
} from "@/features/notulen/utils/dateFormat";
import { Meeting } from "@/types/meeting";
import { mockNotulenSections, mockMeetingMinutes } from "@/mocks/notulen";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { useNotulisStore } from "@/features/data-notulis/store/useNotulisStore";
import { useSekretarisDewanStore } from "@/features/sekretaris-dewan/store/useSekretarisDewanStore";
import { KopSuratConfig } from "@/features/kop-surat/types";

const resolveUrl = (url: string) => {
  if (url.startsWith("/")) {
    return typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  }
  return url;
};

// ─── Font Registration ─────────────────────────────────────────────────────
Font.register({
  family: "Arimo",
  fonts: [
    {
      src: resolveUrl("/fonts/Arimo-Regular.ttf"),
      fontWeight: "normal",
    },
    {
      src: resolveUrl("/fonts/Arimo-Bold.ttf"),
      fontWeight: "bold",
    },
    {
      src: resolveUrl("/fonts/Arimo-Italic.ttf"),
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

// ─── Styles ─────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: "Arimo",
    fontSize: 10,
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 60,
    color: "#000",
  },
  kopRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  kopLogo: { width: 50, height: 50, objectFit: "contain" },
  kopCenter: { flex: 1, textAlign: "center", paddingHorizontal: 8 },
  kopTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  kopAddress: { fontSize: 8, marginTop: 3 },
  kopLine: { borderBottomWidth: 2, borderBottomColor: "#000", marginBottom: 2 },
  kopLineThin: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    marginBottom: 16,
  },
  titleCenter: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  subTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  metaRow: { flexDirection: "row", marginBottom: 2 },
  metaLabel: { width: 120, fontSize: 10 },
  metaColon: { width: 10, fontSize: 10 },
  metaValue: { flex: 1, fontSize: 10 },
  tableTitle: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 6,
    marginTop: 10,
  },
  thCell: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    padding: 6,
    backgroundColor: "#f3f4f6",
  },
  tdCenter: { fontSize: 9, textAlign: "center", padding: 6 },
  tdLeft: { fontSize: 9, textAlign: "left", padding: 6, paddingLeft: 10 },
  tdEmpty: {
    fontSize: 9,
    textAlign: "center",
    fontStyle: "italic",
    padding: 10,
  },
  sectionWrap: { marginBottom: 12 },
  sectionLabel: { fontWeight: "bold", fontSize: 9, marginBottom: 4 },
  bulletItem: { flexDirection: "row", marginBottom: 3, paddingLeft: 10 },
  bulletDot: { width: 10, fontSize: 9 },
  bulletText: { flex: 1, fontSize: 9, textAlign: "justify", lineHeight: 1.5 },
  sigRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  sigBlock: { width: 200, textAlign: "center" },
  sigLabel: {
    fontWeight: "bold",
    fontSize: 9,
    textTransform: "uppercase",
    marginBottom: 60,
  },
  sigName: {
    fontWeight: "bold",
    fontSize: 9,
    textTransform: "uppercase",
    textDecoration: "underline",
  },
  sigNip: { fontSize: 8, marginTop: 2 },
  closingText: { fontSize: 9, marginTop: 12, lineHeight: 1.6 },
  docImage: {
    width: "80%",
    objectFit: "contain",
    marginBottom: 16,
    alignSelf: "center",
  },
});

interface BackupPDFTemplateProps {
  meeting: Meeting;
  config: KopSuratConfig;
}

export const BackupPDFTemplate = ({
  meeting,
  config,
}: BackupPDFTemplateProps) => {
  const { anggota: allAnggota, users: allAnggotaUsers } = useAnggotaStore.getState();
  const { notulisList: allNotulisProfiles, users: allNotulisUsers } = useNotulisStore.getState();
  const { sekretarisDewan: allSekwanProfiles, users: allSekwanUsers } = useSekretarisDewanStore.getState();

  const allUsers = [...allSekwanUsers, ...allNotulisUsers, ...allAnggotaUsers];

  const resolveName = (id: string) => {
    const attendance = meeting.attendanceRecords?.find(
      (a) => a.entityId === id || a.id === id,
    );
    if (attendance?.name) return attendance.name;

    const user = allUsers.find((u) => u.id === id);
    if (user) return user.name;

    const anggota = allAnggota.find((a) => a.id === id);
    if (anggota) {
      const u = allUsers.find((user) => user.id === anggota.userId);
      if (u) return u.name;
    }

    const notulis = allNotulisProfiles.find(
      (n) => n.id === id || n.userID === id,
    );
    if (notulis) {
      const u = allUsers.find((user) => user.id === notulis.userID);
      if (u) return u.name;
    }

    return id || "Belum ditentukan";
  };

  const resolveJabatan = (id: string) => {
    const attendance = meeting.attendanceRecords?.find(
      (a) => a.entityId === id || a.id === id,
    );
    if (attendance?.jabatan) return attendance.jabatan;

    const anggota = allAnggota.find(
      (a) => a.id === id || a.userId === id,
    );
    if (anggota) return anggota.jabatan || "Anggota Dewan";
    return "Anggota Dewan";
  };

  const resolvePersonData = (id: string) => {
    if (!id)
      return {
        name: "..........................",
        nip: "...........................................",
      };
    
    const notulis = allNotulisProfiles.find(
      (n) => n.id === id || n.userID === id,
    );
    const userId = notulis ? notulis.userID : id;
    const user = allNotulisUsers.find((u) => u.id === userId);
    return {
      name: user?.name || "..........................",
      nip: notulis?.NIP || "...........................................",
    };
  };

  const sections = (meeting.notulenSections || []).sort((a, b) => a.order - b.order);
  const minutesData = meeting.minutesData || null;

  const pimpinanNames = meeting.pimpinanRapatId
    ? resolveName(meeting.pimpinanRapatId)
    : (meeting.invitedAnggotaDewanIds || [])
        .map((id) => resolveName(id))
        .join(", ");

  const sekwanData = (() => {
    const sekwanProfile = allSekwanProfiles.find(
      (s) => s.id === meeting.sekretarisId || s.userId === meeting.sekretarisId,
    );
    const userId = sekwanProfile ? sekwanProfile.userId : meeting.sekretarisId;
    const user = allSekwanUsers.find((u) => u.id === userId);
    return {
      name: user?.name || "..........................",
      nip: sekwanProfile?.nip || "...........................................",
    };
  })();

  const resolvedNotulisList = (meeting.notulisIds || []).map((id) =>
    resolvePersonData(id),
  );
  const notulis1 = resolvedNotulisList[0] || resolvePersonData("");
  const notulis2 = resolvedNotulisList[1] || resolvePersonData("");

  const fullAddress = `${config.address} Telp/E-Mail : ${config.phone || "..."}/${config.email || "..."} ${config.districtName ? config.districtName.split(" ").slice(-1)[0] : ""}- Papua Kode Pos ${config.postalCode}`;

  const AttendanceTable = ({
    title,
    ids,
    nameHeader = "NAMA",
  }: {
    title: string;
    ids: string[] | undefined;
    nameHeader?: string;
  }) => (
    <View style={{ marginBottom: 14 }}>
      <Text style={s.tableTitle}>{title}</Text>
      <Table>
        <TR>
          <TD style={s.thCell} weighting={0.03}>
            NO
          </TD>
          <TD style={s.thCell} weighting={0.5}>
            {nameHeader}
          </TD>
          <TD style={s.thCell} weighting={0.5}>
            JABATAN
          </TD>
        </TR>
        {ids && ids.length > 0 ? (
          ids.map((id, i) => (
            <TR key={id} wrap={false}>
              <TD style={s.tdCenter} weighting={0.03}>
                {String(i + 1)}
              </TD>
              <TD style={s.tdLeft} weighting={0.5}>
                {resolveName(id)}
              </TD>
              <TD style={s.tdCenter} weighting={0.5}>
                {resolveJabatan(id)}
              </TD>
            </TR>
          ))
        ) : (
          <TR>
            <TD style={s.tdEmpty}>Tidak ada data</TD>
          </TR>
        )}
      </Table>
    </View>
  );

  return (
    <Document>
      {/* PAGE 1 */}
      <Page size="A4" style={s.page}>
        <View style={s.kopRow}>
          <Image src={resolveUrl(config.logoUrl)} style={s.kopLogo} />
          <View style={s.kopCenter}>
            <Text style={s.kopTitle}>{config.institutionName}</Text>
            <Text style={s.kopTitle}>{config.districtName}</Text>
            <Text style={s.kopAddress}>{fullAddress}</Text>
          </View>
          <View style={{ width: 50 }} />
        </View>
        <View style={s.kopLine} />
        <View style={s.kopLineThin} />

        <Text style={s.titleCenter}>NOTULEN RAPAT</Text>
        <Text style={s.subTitle}>{meeting.title}</Text>
        <View style={{ marginBottom: 16 }} />

        {[
          ["Masa Sidang", meeting.masaSidang || "-"],
          ["Hari / Tanggal", formatTanggalID(meeting.date)],
          ["Waktu", `${meeting.startTime} WIT - ${meeting.endTime} WIT`],
          ["Tempat", meeting.room],
          ["Agenda", meeting.agenda],
          ["Pimpinan Rapat", pimpinanNames],
        ].map(([label, value]) => (
          <View key={label} style={s.metaRow}>
            <Text style={s.metaLabel}>{label}</Text>
            <Text style={s.metaColon}>:</Text>
            <Text style={s.metaValue}>{value}</Text>
          </View>
        ))}
        <View style={s.metaRow}>
          <Text style={s.metaLabel}>Notulis</Text>
          <Text style={s.metaColon}>:</Text>
          <View style={s.metaValue}>
            {resolvedNotulisList.length > 0 ? (
              resolvedNotulisList.map((n, idx) => (
                <Text key={idx} style={{ fontSize: 10 }}>
                  {idx + 1}. {n.name}
                </Text>
              ))
            ) : (
              <Text style={{ fontSize: 10 }}>-</Text>
            )}
          </View>
        </View>
        <View style={{ marginBottom: 16 }} />

        <Text style={s.titleCenter}>DAFTAR PESERTA RAPAT</Text>
        <AttendanceTable
          title="DAFTAR HADIR DEWAN PERWAKILAN RAKYAT KABUPATEN KEEROM"
          ids={meeting.invitedAnggotaDewanIds}
        />
        <AttendanceTable
          title="DAFTAR HADIR MITRA KERJA"
          ids={meeting.invitedMitraKerjaIds}
          nameHeader="NAMA / INSTANSI"
        />
        <AttendanceTable
          title="DAFTAR HADIR TENAGA AHLI"
          ids={meeting.invitedTenagaAhliIds}
        />

        {sections.map((section, index) => (
          <View key={section.id} style={s.sectionWrap} wrap={false}>
            {index === 0 && (
              <Text style={{ fontSize: 9, marginBottom: 6 }}>
                Rapat dibuka oleh{" "}
                <Text style={{ fontWeight: "bold" }}>{pimpinanNames}</Text>
              </Text>
            )}
            <Text style={s.sectionLabel}>{section.displayFormat}</Text>
            {(section.points || []).map((point) => (
              <View key={point.id} style={s.bulletItem}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletText}>{point.content}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={s.page}>
        <Text style={{ ...s.titleCenter, paddingTop: 10 }}>
          HASIL KEPUTUSAN RAPAT
        </Text>
        <Table>
          <TR>
            <TD style={s.thCell} weighting={0.05}>
              NO
            </TD>
            <TD style={{ ...s.thCell, textAlign: "left" }} weighting={0.95}>
              HASIL KEPUTUSAN RAPAT
            </TD>
          </TR>
          {minutesData?.decisions && minutesData.decisions.length > 0 ? (
            minutesData.decisions.map((d, i) => (
              <TR key={i} wrap={false}>
                <TD style={s.tdCenter} weighting={0.05}>
                  {String(i + 1)}
                </TD>
                <TD
                  style={{ ...s.tdLeft, textAlign: "justify" }}
                  weighting={0.95}
                >
                  {d}
                </TD>
              </TR>
            ))
          ) : (
            <TR>
              <TD style={s.tdEmpty}>Belum ada keputusan rapat</TD>
            </TR>
          )}
        </Table>

        {minutesData?.catatan && (
          <View style={{ marginTop: 14 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 9,
                textDecoration: "underline",
                marginBottom: 4,
              }}
            >
              CATATAN :
            </Text>
            <Text
              style={{ fontSize: 9, textAlign: "justify", lineHeight: 1.5 }}
            >
              {minutesData.catatan}
            </Text>
          </View>
        )}

        <Text style={s.closingText}>
          Demikian hasil rapat yang dapat kami tuangkan di dalam Notulen Rapat.
        </Text>
        <Text style={{ fontSize: 9, marginTop: 4 }}>
          Waktu selesai Rapat : {meeting.endTime} WIT
        </Text>
        <Text style={{ fontSize: 9, marginTop: 2 }}>Terimakasih.</Text>

        <View style={{ textAlign: "right", marginTop: 20 }}>
          <Text style={{ fontSize: 9 }}>
            Arso, {formatTanggalTanpaHari(meeting.date)}
          </Text>
        </View>

        <View style={s.sigRow}>
          <View style={s.sigBlock}>
            <Text style={s.sigLabel}>PIMPINAN RAPAT,</Text>
            <Text style={s.sigName}>
              {pimpinanNames || ".........................."}
            </Text>
          </View>
          <View style={s.sigBlock}>
            <Text style={s.sigLabel}>SEKRETARIS DPRK KEEROM,</Text>
            <Text style={s.sigName}>{sekwanData.name}</Text>
            <Text style={s.sigNip}>NIP. {sekwanData.nip}</Text>
          </View>
        </View>

        {meeting.notulisIds && meeting.notulisIds.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent:
                meeting.notulisIds.length === 1 ? "center" : "space-between",
              marginTop: 20,
            }}
          >
            <View style={s.sigBlock}>
              <Text style={s.sigLabel}>NOTULIS,</Text>
              <Text style={s.sigName}>{notulis1.name}</Text>
              <Text style={s.sigNip}>NIP. {notulis1.nip}</Text>
            </View>
            {meeting.notulisIds.length > 1 && (
              <View style={s.sigBlock}>
                <Text style={s.sigLabel}>NOTULIS II,</Text>
                <Text style={s.sigName}>{notulis2.name}</Text>
                <Text style={s.sigNip}>NIP. {notulis2.nip}</Text>
              </View>
            )}
          </View>
        )}
      </Page>

      {/* DOKUMENTASI */}
      {minutesData?.dokumentasi && minutesData.dokumentasi.length > 0 && (
        <Page size="A4" style={s.page}>
          <Text style={{ ...s.titleCenter, paddingTop: 10 }}>
            DOKUMENTASI KEGIATAN
          </Text>
          <Text style={s.subTitle}>{meeting.title}</Text>
          <View style={{ marginTop: 16 }}>
            {minutesData.dokumentasi.map((url, index) => (
              <Image key={index} src={resolveUrl(url)} style={s.docImage} />
            ))}
          </View>
        </Page>
      )}

      {/* LAMPIRAN ABSENSI */}
      {(() => {
        const lampiran = minutesData?.lampiranAbsensi;
        if (
          !lampiran ||
          (!lampiran.anggotaDewan?.length &&
            !lampiran.mitraKerja?.length &&
            !lampiran.tenagaAhli?.length)
        )
          return null;

        return (
          <>
            {lampiran.anggotaDewan && (
              <Page key="dewan" size="A4" style={s.page}>
                <Text style={s.titleCenter}>LAMPIRAN ABSENSI</Text>
                <Text style={s.subTitle}>
                  DAFTAR HADIR DEWAN PERWAKILAN RAKYAT KABUPATEN KEEROM
                </Text>
                <Image
                  src={resolveUrl(lampiran.anggotaDewan)}
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </Page>
            )}
            {lampiran.mitraKerja && (
              <Page key="mitra" size="A4" style={s.page}>
                <Text style={s.titleCenter}>LAMPIRAN ABSENSI</Text>
                <Text style={s.subTitle}>DAFTAR HADIR MITRA KERJA</Text>
                <Image
                  src={resolveUrl(lampiran.mitraKerja)}
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </Page>
            )}
            {lampiran.tenagaAhli && (
              <Page key="ta" size="A4" style={s.page}>
                <Text style={s.titleCenter}>LAMPIRAN ABSENSI</Text>
                <Text style={s.subTitle}>DAFTAR HADIR TENAGA AHLI</Text>
                <Image
                  src={resolveUrl(lampiran.tenagaAhli)}
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </Page>
            )}
          </>
        );
      })()}
    </Document>
  );
};
