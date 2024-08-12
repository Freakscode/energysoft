import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center bg-clip-content px-20 py-5">
        <Image src="/Logo.svg" alt="logo" width={400} height={160}/>
        <span className="border-l rotate-45 h-20 ml-20 mr-20 " />
        <Image src="/Unisucre.svg" alt="Logo Universidad de Sucre" width={140} height={0} />
      </div>
      <div>
      <p className="text-4xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center bg-clip-text text-transparent bg-gradient-to-tr from-green-500 to-purple-300 font-extrabold">
        TOMA MEJORES DECISIONES CON TECHO
      </p>
      <p className="text-xl lg:text-2xl mx-auto max-w-xl text-center mt-5 bg-clip-text text-transparent bg-gradient-to-tr from-green-500 to-purple-300 font-extrabold">
      CONSULTA, ANALIZA Y VISUALIZA TU CONSUMO ELÉCTRICO.
      </p>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
