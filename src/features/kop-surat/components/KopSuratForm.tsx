"use client";

import { useForm } from "react-hook-form";
import { Input, Button, Card, CardBody, Divider } from "@heroui/react";
import { useKopSuratStore } from "../store/useKopSuratStore";
import { KopSuratConfig } from "../types";
import { useEffect } from "react";

export const KopSuratForm = () => {
  const { config, updateConfig, resetConfig } = useKopSuratStore();

  const { register, handleSubmit, reset } = useForm<KopSuratConfig>({
    defaultValues: config,
  });

  // Sync form when config changes (e.g. reset)
  useEffect(() => {
    reset(config);
  }, [config, reset]);

  const onSubmit = (data: KopSuratConfig) => {
    updateConfig(data);
    alert("Pengaturan Kop Surat berhasil disimpan");
  };

  const handleReset = () => {
    if (
      confirm("Apakah anda yakin ingin mengembalikan pengaturan ke default?")
    ) {
      resetConfig();
      alert("Pengaturan dikembalikan ke default");
    }
  };

  return (
    <Card className="w-full">
      <CardBody className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Edit Informasi Kop Surat</h3>
            <Button
              color="danger"
              variant="light"
              onPress={handleReset}
              size="sm"
            >
              Reset Default
            </Button>
          </div>
          <Divider />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <Input
                label="Logo URL"
                placeholder="/logo-dprk.png"
                {...register("logoUrl")}
                description="URL lokasi file gambar logo (bisa path lokal atau URL eksternal)"
              />
            </div>

            <Input
              label="Nama Instansi"
              placeholder="DEWAN PERWAKILAN RAKYAT DAERAH"
              {...register("institutionName")}
            />
            <Input
              label="Nama Wilayah/Daerah"
              placeholder="KABUPATEN KEEROM"
              {...register("districtName")}
            />

            <div className="col-span-2">
              <Input
                label="Alamat Lengkap"
                placeholder="Jl. Trans Papua No. ..."
                {...register("address")}
              />
            </div>

            <Input
              label="Nomor Telepon"
              placeholder="..."
              {...register("phone")}
            />
            <Input label="Email" placeholder="..." {...register("email")} />
            <Input
              label="Kode Pos"
              placeholder="99468"
              {...register("postalCode")}
            />
            <Input
              label="Website"
              placeholder="www.example.com"
              {...register("website")}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              color="primary"
              type="submit"
              className="px-8 font-semibold"
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
