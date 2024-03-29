"use client";
import useProdukModule from "./lib";

const Produk = () => {
  const { useProdukList } = useProdukModule();
  const { data } = useProdukList();
  return <>
   {data?.data.map ((produk, index) => (
    <section key={index}>
        {produk.nama_produk}
        <br />
        {produk.deskripsi_produk}
        <br />
        {produk.harga}
        <br />
        {produk.stok}
    </section>
   ))}
</>;
};

export default Produk;
