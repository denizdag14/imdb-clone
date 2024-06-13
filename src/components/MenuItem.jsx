import Link from 'next/link';

export default function MenuItem({title, address, Icon}) {
  return (
    <Link href={address} className='hover:text-yellow-500 flex items-center gap-1'>
        <Icon className="text-2xl sm:hidden text-yellow-500 hover:text-yellow-600" />
        <p className='uppercase hidden sm:inline text-sm pt-1'>{title}</p>
    </Link>
  )
}
