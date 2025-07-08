import Image from "next/image";
import UploadForm from "../component/UploadForm";
import Navbar from "../component/Navbar";
import PlantShowcase from '../component/PlantShowcase';

export default function Home() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-black py-10 mt-20">
      <UploadForm/>
    </main>
     <main>
      <PlantShowcase />
    </main>
    </>
  );
}
