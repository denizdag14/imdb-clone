import Link from 'next/link';

export default function MenuItem({title, address, Icon}) {
  return (
    <Link href={address} className='hover:text-amber-500 flex items-center gap-1'>
        <Icon className="text-2xl sm:hidden" />
        <p className='uppercase hidden sm:inline text-sm'>{title}</p>
    </Link>
  )
}
