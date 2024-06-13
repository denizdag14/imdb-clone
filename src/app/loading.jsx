import Image from "next/image";

export default function loading() {
  return (
    <div className="flex justify-center mt-16">
        <Image width={500} height={500} className="h-52" src="spinner.svg" alt="" style={{ width: 'auto', height: 'auto' }} />
    </div>
  )
}